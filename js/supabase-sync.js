/**
 * Remnant Word Hub — Supabase Cloud Sync Engine (sphamsimang / qzhyefggtlttefrswpxa)
 * Syncs 365-Day Reading Tracker, Plan Settings & Apostolic Study Logbook across Phone & Desktop.
 */

(function () {
  const SUPABASE_URL = "https://qzhyefggtlttefrswpxa.supabase.co";
  const SUPABASE_PUBLISHABLE_KEY = "sb_publishable_khSUmKmw7kk3mNImw1EgVQ_K1lShiJW";

  let sbClient = null;
  let currentUser = null;
  let authMode = "signin"; // signin | signup
  let isSyncing = false;

  function initClient() {
    if (!window.supabase || typeof window.supabase.createClient !== "function") {
      updateHeaderCloudBadge("offline");
      return;
    }
    sbClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

    // Listen to auth changes without awaiting inside the callback
    sbClient.auth.onAuthStateChange(function (event, session) {
      const nextUser = session && session.user ? session.user : null;
      const prevId = currentUser ? currentUser.id : null;
      currentUser = nextUser;
      renderCloudModalState();

      if (currentUser && (event === "INITIAL_SESSION" || event === "SIGNED_IN" || prevId !== currentUser.id)) {
        setTimeout(function () {
          performFullCloudMerge();
        }, 0);
      } else if (!currentUser) {
        updateHeaderCloudBadge("signed-out");
      }
    });
  }

  function updateHeaderCloudBadge(status) {
    const btn = document.getElementById("cloud-sync-header-btn");
    if (!btn) return;

    if (status === "syncing") {
      btn.innerHTML = `<span>↻</span><span class="btn-label-desktop">Syncing...</span>`;
      btn.style.borderColor = "var(--gold)";
    } else if (status === "synced" && currentUser) {
      const shortEmail = (currentUser.email || "Account").split("@")[0];
      btn.innerHTML = `<span style="color:var(--emerald);">☁️</span><span class="btn-label-desktop">${shortEmail}</span>`;
      btn.style.borderColor = "rgba(52, 211, 153, 0.55)";
    } else {
      btn.innerHTML = `<span>☁️</span><span class="btn-label-desktop">Cloud Sync</span>`;
      btn.style.borderColor = "";
    }
  }

  function setCloudStatusMessage(msg, isError) {
    const el = document.getElementById("cloud-auth-status-msg");
    if (!el) return;
    if (!msg) {
      el.style.display = "none";
      el.textContent = "";
      return;
    }
    el.style.display = "block";
    el.style.borderColor = isError ? "var(--crimson)" : "var(--emerald)";
    el.style.color = isError ? "var(--crimson)" : "var(--emerald)";
    el.style.background = isError ? "var(--crimson-soft)" : "var(--emerald-soft)";
    el.textContent = msg;
  }

  // Bi-directional smart merge between local device state and Supabase Postgres
  async function performFullCloudMerge() {
    if (!sbClient || !currentUser || !window.RWH_APP || isSyncing) return;
    isSyncing = true;
    updateHeaderCloudBadge("syncing");

    try {
      const uid = currentUser.id;
      const local = window.RWH_APP.getStateSnapshot();

      const [settingsRes, chaptersRes, logsRes] = await Promise.all([
        sbClient.from("user_study_settings").select("*").eq("user_id", uid).maybeSingle(),
        sbClient.from("user_read_chapters").select("chapter_key, read_date").eq("user_id", uid),
        sbClient
          .from("user_study_logs")
          .select("*")
          .eq("user_id", uid)
          .order("created_at", { ascending: false })
      ]);

      if (settingsRes.error) throw settingsRes.error;
      if (chaptersRes.error) throw chaptersRes.error;
      if (logsRes.error) throw logsRes.error;

      // 1. Settings Merge
      let mergedStartDate = local.startDateISO;
      let mergedTheme = local.theme;
      let mergedFont = local.fontSizeRem;

      if (settingsRes.data) {
        mergedStartDate = settingsRes.data.plan_start_date || mergedStartDate;
        mergedTheme = settingsRes.data.theme || mergedTheme;
        mergedFont = Number(settingsRes.data.font_size_rem || mergedFont);
      } else {
        await sbClient.from("user_study_settings").upsert(
          {
            user_id: uid,
            plan_start_date: mergedStartDate,
            theme: mergedTheme,
            font_size_rem: mergedFont,
            updated_at: new Date().toISOString()
          },
          { onConflict: "user_id" }
        );
      }

      // 2. Read Chapters Merge (Union of Cloud + Local)
      const cloudChaptersMap = {};
      (chaptersRes.data || []).forEach(function (row) {
        cloudChaptersMap[row.chapter_key] = row.read_date;
      });

      const mergedReadChapters = Object.assign({}, local.readChapters, cloudChaptersMap);
      const unsyncedChapters = Object.keys(local.readChapters)
        .filter(function (k) {
          return !cloudChaptersMap[k];
        })
        .map(function (k) {
          return {
            user_id: uid,
            chapter_key: k,
            read_date: local.readChapters[k]
          };
        });

      if (unsyncedChapters.length > 0) {
        await sbClient
          .from("user_read_chapters")
          .upsert(unsyncedChapters, { onConflict: "user_id,chapter_key" });
      }

      // 3. Study Logbook Merge (Union by client_id)
      const cloudLogs = logsRes.data || [];
      const cloudLogById = {};
      const mappedCloudLogs = cloudLogs.map(function (r) {
        cloudLogById[r.client_id] = true;
        return {
          id: r.client_id,
          date: r.entry_date,
          title: r.title,
          passage: r.passage,
          topicTag: r.topic_tag,
          ministerPattern: r.minister_pattern,
          firstMentionAndLexicon: r.first_mention_lexicon,
          christSubstance: r.christ_substance,
          rhemaLegislation: r.rhema_legislation
        };
      });

      const localOnlyLogs = (local.studyLogs || []).filter(function (item) {
        // Don't auto-push default demo seeds if cloud already has real entries, otherwise push all
        if (cloudLogs.length > 0 && String(item.id).startsWith("seed-log-")) return false;
        return !cloudLogById[item.id];
      });

      if (localOnlyLogs.length > 0) {
        const rowsToInsert = localOnlyLogs.map(function (item) {
          return {
            client_id: item.id,
            user_id: uid,
            entry_date: item.date,
            title: item.title,
            passage: item.passage,
            topic_tag: item.topicTag || "General Exegesis",
            minister_pattern: item.ministerPattern || "Apostle Arome Osayi",
            first_mention_lexicon: item.firstMentionAndLexicon || "",
            christ_substance: item.christSubstance || "",
            rhema_legislation: item.rhemaLegislation || ""
          };
        });
        await sbClient
          .from("user_study_logs")
          .upsert(rowsToInsert, { onConflict: "user_id,client_id" });
      }

      const mergedStudyLogs = localOnlyLogs.concat(mappedCloudLogs);

      window.RWH_APP.applyMergedCloudState({
        startDateISO: mergedStartDate,
        theme: mergedTheme,
        fontSizeRem: mergedFont,
        readChapters: mergedReadChapters,
        studyLogs: mergedStudyLogs
      });

      updateHeaderCloudBadge("synced");
      renderCloudModalState();
    } catch (err) {
      console.warn("Cloud merge warning:", err);
      updateHeaderCloudBadge(currentUser ? "synced" : "signed-out");
    } finally {
      isSyncing = false;
    }
  }

  // Modal UI Controls
  window.openCloudSyncModal = function () {
    const modal = document.getElementById("cloud-sync-modal");
    if (modal) {
      modal.classList.add("open");
      setCloudStatusMessage("");
      renderCloudModalState();
    }
  };

  window.closeCloudSyncModal = function () {
    const modal = document.getElementById("cloud-sync-modal");
    if (modal) modal.classList.remove("open");
  };

  window.setCloudAuthMode = function (mode) {
    authMode = mode;
    setCloudStatusMessage("");
    renderCloudModalState();
  };

  function renderCloudModalState() {
    const bodyEl = document.getElementById("cloud-sync-modal-body");
    if (!bodyEl) return;

    if (currentUser) {
      const snap = window.RWH_APP ? window.RWH_APP.getStateSnapshot() : { readChapters: {}, studyLogs: [] };
      const readCount = Object.keys(snap.readChapters || {}).length;
      const logCount = (snap.studyLogs || []).length;

      bodyEl.innerHTML = `
        <div class="lex-block apostolic-highlight" style="margin-bottom:1rem;">
          <div class="lex-block-title">☁️ Connected to Supabase Cloud (sphamsimang)</div>
          <div style="font-size:0.95rem;font-weight:700;color:var(--text-primary);margin:0.25rem 0;">
            ${currentUser.email}
          </div>
          <div style="font-size:0.8rem;color:var(--text-secondary);">
            Synced across Phone & Computer • <strong>${readCount}</strong> chapters read • <strong>${logCount}</strong> study logs
          </div>
        </div>

        <div id="cloud-auth-status-msg" style="display:none;padding:0.65rem 0.85rem;border-radius:10px;border:1px solid;font-size:0.82rem;margin-bottom:0.9rem;"></div>

        <div style="display:flex;gap:0.65rem;flex-wrap:wrap;">
          <button class="btn-gold" style="flex:1;" onclick="window.RWH_CLOUD.manualSyncNow()">
            ↻ Sync Now
          </button>
          <button class="btn-outline" onclick="window.RWH_CLOUD.signOut()">
            Sign Out
          </button>
        </div>
      `;
      return;
    }

    bodyEl.innerHTML = `
      <p style="font-size:0.84rem;color:var(--text-secondary);margin-bottom:1rem;line-height:1.55;">
        Sign in or create an account to automatically sync your <strong>365-Day Reading Progress</strong> and <strong>Apostolic Study Logbook</strong> across your phone, tablet, and computer.
      </p>

      <div class="filter-pills" style="margin-bottom:1rem;">
        <button type="button" class="filter-pill ${authMode === "signin" ? "active" : ""}" onclick="window.setCloudAuthMode('signin')">
          Sign In
        </button>
        <button type="button" class="filter-pill ${authMode === "signup" ? "active" : ""}" onclick="window.setCloudAuthMode('signup')">
          Create Account
        </button>
      </div>

      <div id="cloud-auth-status-msg" style="display:none;padding:0.65rem 0.85rem;border-radius:10px;border:1px solid;font-size:0.82rem;margin-bottom:0.9rem;"></div>

      <form onsubmit="window.RWH_CLOUD.submitAuthForm(event)">
        <div class="form-group">
          <label class="form-label" for="cloud-email-input">Email Address</label>
          <input type="email" id="cloud-email-input" class="text-input" style="width:100%;" placeholder="you@example.com" required />
        </div>
        <div class="form-group">
          <label class="form-label" for="cloud-password-input">Password (min 6 characters)</label>
          <input type="password" id="cloud-password-input" class="text-input" style="width:100%;" minlength="6" placeholder="••••••••" required />
        </div>
        <button type="submit" id="cloud-submit-btn" class="btn-gold" style="width:100%;padding:0.72rem;margin-top:0.35rem;">
          ${authMode === "signin" ? "☁️ Sign In & Sync Progress" : "✨ Create Cloud Sync Account"}
        </button>
      </form>
    `;
  }

  // Public Cloud Sync API used by app.js & modal
  window.RWH_CLOUD = {
    submitAuthForm: async function (e) {
      if (e && e.preventDefault) e.preventDefault();
      if (!sbClient) return;

      const email = (document.getElementById("cloud-email-input")?.value || "").trim();
      const password = document.getElementById("cloud-password-input")?.value || "";
      const btn = document.getElementById("cloud-submit-btn");
      if (!email || !password) return;

      if (btn) btn.disabled = true;
      setCloudStatusMessage("");

      try {
        if (authMode === "signup") {
          const redirectUrl = window.location.origin + window.location.pathname;
          const { data, error } = await sbClient.auth.signUp({
            email: email,
            password: password,
            options: { emailRedirectTo: redirectUrl }
          });
          if (error) throw error;
          if (data.session) {
            setCloudStatusMessage("Account created and synced!", false);
          } else {
            setCloudStatusMessage(
              "Check your email inbox to confirm your account, then sign in here!",
              false
            );
          }
        } else {
          const { error } = await sbClient.auth.signInWithPassword({
            email: email,
            password: password
          });
          if (error) throw error;
          setCloudStatusMessage("Signed in! Syncing your study data...", false);
        }
      } catch (err) {
        setCloudStatusMessage(err.message || "Authentication failed.", true);
      } finally {
        if (btn) btn.disabled = false;
      }
    },

    manualSyncNow: async function () {
      await performFullCloudMerge();
      setCloudStatusMessage("✓ All 365-Day chapters & study logs are up to date!", false);
    },

    signOut: async function () {
      if (!sbClient) return;
      await sbClient.auth.signOut();
      currentUser = null;
      updateHeaderCloudBadge("signed-out");
      renderCloudModalState();
    },

    syncSingleChapter: async function (chapterKey, isRead, dateISO) {
      if (!sbClient || !currentUser) return;
      updateHeaderCloudBadge("syncing");
      try {
        if (isRead) {
          await sbClient.from("user_read_chapters").upsert(
            {
              user_id: currentUser.id,
              chapter_key: chapterKey,
              read_date: dateISO
            },
            { onConflict: "user_id,chapter_key" }
          );
        } else {
          await sbClient
            .from("user_read_chapters")
            .delete()
            .eq("user_id", currentUser.id)
            .eq("chapter_key", chapterKey);
        }
      } finally {
        updateHeaderCloudBadge("synced");
      }
    },

    syncBatchChapters: async function (chapterKeys, markAsRead, dateISO) {
      if (!sbClient || !currentUser || !Array.isArray(chapterKeys) || chapterKeys.length === 0) return;
      updateHeaderCloudBadge("syncing");
      try {
        if (markAsRead) {
          const rows = chapterKeys.map(function (k) {
            return {
              user_id: currentUser.id,
              chapter_key: k,
              read_date: dateISO
            };
          });
          await sbClient
            .from("user_read_chapters")
            .upsert(rows, { onConflict: "user_id,chapter_key" });
        } else {
          await sbClient
            .from("user_read_chapters")
            .delete()
            .eq("user_id", currentUser.id)
            .in("chapter_key", chapterKeys);
        }
      } finally {
        updateHeaderCloudBadge("synced");
      }
    },

    syncSettings: async function () {
      if (!sbClient || !currentUser || !window.RWH_APP) return;
      const snap = window.RWH_APP.getStateSnapshot();
      await sbClient.from("user_study_settings").upsert(
        {
          user_id: currentUser.id,
          plan_start_date: snap.startDateISO,
          theme: snap.theme,
          font_size_rem: snap.fontSizeRem,
          updated_at: new Date().toISOString()
        },
        { onConflict: "user_id" }
      );
    },

    syncUpsertStudyLog: async function (entry) {
      if (!sbClient || !currentUser || !entry) return;
      updateHeaderCloudBadge("syncing");
      try {
        await sbClient.from("user_study_logs").upsert(
          {
            client_id: entry.id,
            user_id: currentUser.id,
            entry_date: entry.date,
            title: entry.title,
            passage: entry.passage,
            topic_tag: entry.topicTag || "General Exegesis",
            minister_pattern: entry.ministerPattern || "Apostle Arome Osayi",
            first_mention_lexicon: entry.firstMentionAndLexicon || "",
            christ_substance: entry.christSubstance || "",
            rhema_legislation: entry.rhemaLegislation || "",
            updated_at: new Date().toISOString()
          },
          { onConflict: "user_id,client_id" }
        );
      } finally {
        updateHeaderCloudBadge("synced");
      }
    },

    syncDeleteStudyLog: async function (clientId) {
      if (!sbClient || !currentUser || !clientId) return;
      updateHeaderCloudBadge("syncing");
      try {
        await sbClient
          .from("user_study_logs")
          .delete()
          .eq("user_id", currentUser.id)
          .eq("client_id", clientId);
      } finally {
        updateHeaderCloudBadge("synced");
      }
    }
  };

  document.addEventListener("DOMContentLoaded", initClient);
})();
