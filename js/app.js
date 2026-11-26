/**
 * Remnant Word Hub — BibleGateway-Inspired 3-Column Study Bible Engine
 * Left: 365-Day Reading Plan & Finish Tracker
 * Center: Full 66-Book KJV (Strong's) & NKJV Scripture + Study Context & Chapter Map
 * Right: Insights & Reflect (Personal Reflections, Self-Built Topics & Live 14,000+ BLB Lexicon)
 */

(function () {
  const STORAGE_KEYS = {
    START_DATE: "rwh_plan_start_date_v1",
    READ_CHAPTERS: "rwh_read_chapters_v1",
    STUDY_LOGS: "rwh_study_logs_v1",
    THEME: "rwh_theme_v2",
    FONT_SIZE: "rwh_font_size_v1"
  };

  const chapterApiCache = {};
  const strongsApiCache = {};

  let state = {
    mobilePane: "scripture", // plan | scripture | reflect
    showLeftPane: true,
    showRightPane: true,
    reflectTab: "compose", // compose | notes | lexicon
    notesScope: "all", // all | book | chapter
    activeTopicFilter: "",

    startDateISO: "",
    readChapters: {},
    yearPlan: [],
    tileFilter: "all",
    tileSearch: "",
    selectedDayNumber: 1,

    currentBook: "John",
    currentChapter: 1,
    highlightedVerse: null,
    readerMode: "parallel", // nkjv | kjv | parallel
    showStrongs: true,
    showContextMap: false,
    fontSizeRem: 1.08,

    activeStrongsCode: "G3056",
    activeLexiconSummary: null,
    pickerTestament: "ALL",
    pickerSelectedBook: "John",
    studyLogs: []
  };

  // Date Utilities
  function toLocalISOString(dateObj) {
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function parseLocalISO(isoStr) {
    const parts = (isoStr || "").split("-").map(Number);
    if (parts.length !== 3 || !parts[0]) return new Date();
    return new Date(parts[0], parts[1] - 1, parts[2], 12, 0, 0);
  }

  function addDays(dateObj, days) {
    const d = new Date(dateObj.getTime());
    d.setDate(d.getDate() + days);
    return d;
  }

  function formatReadableDate(dateObj, includeYear = true) {
    const opts = { month: "short", day: "numeric" };
    if (includeYear) opts.year = "numeric";
    return dateObj.toLocaleDateString("en-US", opts);
  }

  // Build flat canonical list of all 1,189 chapters
  function buildAllCanonicalChapters() {
    const list = [];
    window.BIBLE_BOOKS.forEach((b) => {
      for (let c = 1; c <= b.chapters; c++) {
        list.push({
          key: `${b.name}_${c}`,
          bookId: b.id,
          book: b.name,
          abbr: b.abbr,
          chapter: c,
          testament: b.testament,
          category: b.category,
          label: `${b.name} ${c}`,
          shortLabel: `${b.abbr} ${c}`
        });
      }
    });
    return list;
  }

  const ALL_CHAPTERS = buildAllCanonicalChapters();
  const TOTAL_BIBLE_CHAPTERS = ALL_CHAPTERS.length; // 1,189

  function generate365DayPlan(startISO) {
    const startDate = parseLocalISO(startISO);
    const plan = [];
    let cursor = 0;

    for (let dayIndex = 0; dayIndex < 365; dayIndex++) {
      const nextCursor = Math.round(((dayIndex + 1) * TOTAL_BIBLE_CHAPTERS) / 365);
      const dayChapters = ALL_CHAPTERS.slice(cursor, nextCursor);
      cursor = nextCursor;

      const assignedDate = addDays(startDate, dayIndex);
      const firstCh = dayChapters[0];
      const lastCh = dayChapters[dayChapters.length - 1];

      let rangeLabel = "";
      if (firstCh.book === lastCh.book) {
        rangeLabel =
          firstCh.chapter === lastCh.chapter
            ? `${firstCh.book} ${firstCh.chapter}`
            : `${firstCh.book} ${firstCh.chapter}–${lastCh.chapter}`;
      } else {
        rangeLabel = `${firstCh.abbr} ${firstCh.chapter} – ${lastCh.abbr} ${lastCh.chapter}`;
      }

      plan.push({
        dayNumber: dayIndex + 1,
        dateISO: toLocalISOString(assignedDate),
        readableDate: formatReadableDate(assignedDate, true),
        shortDate: formatReadableDate(assignedDate, false),
        rangeLabel,
        chapters: dayChapters
      });
    }
    return plan;
  }

  function loadState() {
    const todayISO = toLocalISOString(new Date());
    const savedStart = localStorage.getItem(STORAGE_KEYS.START_DATE);
    state.startDateISO = savedStart || todayISO;
    if (!savedStart) {
      localStorage.setItem(STORAGE_KEYS.START_DATE, state.startDateISO);
    }

    try {
      const savedRead = JSON.parse(localStorage.getItem(STORAGE_KEYS.READ_CHAPTERS) || "{}");
      state.readChapters = savedRead && typeof savedRead === "object" ? savedRead : {};
    } catch (e) {
      state.readChapters = {};
    }

    try {
      const savedLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDY_LOGS) || "[]");
      // Strip out any old pre-canned demo seeds so notes feed 100% from what the user studies themselves
      state.studyLogs = Array.isArray(savedLogs)
        ? savedLogs.filter((item) => item && !String(item.id).startsWith("seed-log-"))
        : [];
      saveStudyLogs();
    } catch (e) {
      state.studyLogs = [];
    }

    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "light";
    applyThemeDOM(savedTheme);

    const savedFont = parseFloat(localStorage.getItem(STORAGE_KEYS.FONT_SIZE) || "1.08");
    if (!isNaN(savedFont) && savedFont >= 0.85 && savedFont <= 1.55) {
      state.fontSizeRem = savedFont;
      document.documentElement.style.setProperty("--scripture-size", `${savedFont}rem`);
    }

    state.yearPlan = generate365DayPlan(state.startDateISO);
    state.selectedDayNumber = getCurrentPlanDayNumber();

    // Default passage input in Reflect composer
    const passageInput = document.getElementById("log-passage-input");
    if (passageInput && !passageInput.value) {
      passageInput.value = `${state.currentBook} ${state.currentChapter}`;
    }
  }

  function applyThemeDOM(themeMode) {
    const btn = document.getElementById("dark-mode-toggle-btn");
    if (themeMode === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      if (btn) btn.textContent = "☀️";
    } else {
      document.documentElement.removeAttribute("data-theme");
      if (btn) btn.textContent = "🌙";
    }
  }

  function saveReadChapters() {
    localStorage.setItem(STORAGE_KEYS.READ_CHAPTERS, JSON.stringify(state.readChapters));
  }

  function saveStudyLogs() {
    localStorage.setItem(STORAGE_KEYS.STUDY_LOGS, JSON.stringify(state.studyLogs));
  }

  function getCurrentPlanDayNumber() {
    const start = parseLocalISO(state.startDateISO);
    const now = parseLocalISO(toLocalISOString(new Date()));
    const diffDays = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));
    return Math.min(365, Math.max(1, diffDays + 1));
  }

  // ==========================================================================
  // WORKSPACE PANE & HEADER CONTROLS
  // ==========================================================================

  window.toggleDesktopPane = function (side) {
    const ws = document.getElementById("main-workspace");
    if (!ws) return;
    if (side === "left") {
      state.showLeftPane = !state.showLeftPane;
      ws.classList.toggle("hide-left-pane", !state.showLeftPane);
      document
        .getElementById("toggle-left-pane-btn")
        ?.classList.toggle("active-pane-toggle", state.showLeftPane);
    } else {
      state.showRightPane = !state.showRightPane;
      ws.classList.toggle("hide-right-pane", !state.showRightPane);
      document
        .getElementById("toggle-right-pane-btn")
        ?.classList.toggle("active-pane-toggle", state.showRightPane);
    }
  };

  window.setMobilePane = function (paneName) {
    state.mobilePane = paneName;
    const map = {
      plan: "pane-left-plan",
      scripture: "pane-center-scripture",
      reflect: "pane-right-reflect"
    };
    Object.keys(map).forEach((k) => {
      const el = document.getElementById(map[k]);
      if (el) el.classList.toggle("mobile-active", k === paneName);
    });
    document.querySelectorAll(".mob-pane-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-mpane") === paneName);
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.toggleTheme = function () {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    const next = isDark ? "light" : "dark";
    applyThemeDOM(next);
    localStorage.setItem(STORAGE_KEYS.THEME, next);
    if (window.RWH_CLOUD) {
      window.RWH_CLOUD.syncSettings();
    }
  };

  window.adjustScriptureFontSize = function (delta) {
    state.fontSizeRem = Math.min(1.52, Math.max(0.86, +(state.fontSizeRem + delta * 0.08).toFixed(2)));
    document.documentElement.style.setProperty("--scripture-size", `${state.fontSizeRem}rem`);
    localStorage.setItem(STORAGE_KEYS.FONT_SIZE, String(state.fontSizeRem));
    if (window.RWH_CLOUD) {
      window.RWH_CLOUD.syncSettings();
    }
  };

  // Smart BibleGateway-style Passage Lookup (e.g., "Rom 8:29", "1 Cor 13", "Ps 23", "John 3:16")
  const COMMON_ALIASES = {
    gen: "Genesis", ge: "Genesis", exo: "Exodus", ex: "Exodus", lev: "Leviticus",
    num: "Numbers", deu: "Deuteronomy", dt: "Deuteronomy", jos: "Joshua", josh: "Joshua",
    jdg: "Judges", rut: "Ruth", "1sa": "1 Samuel", "1sam": "1 Samuel", "2sa": "2 Samuel", "2sam": "2 Samuel",
    "1ki": "1 Kings", "2ki": "2 Kings", "1ch": "1 Chronicles", "2ch": "2 Chronicles",
    neh: "Nehemiah", est: "Esther", ps: "Psalms", psa: "Psalms", psalm: "Psalms",
    pro: "Proverbs", prov: "Proverbs", ecc: "Ecclesiastes", sng: "Song of Solomon", song: "Song of Solomon",
    isa: "Isaiah", jer: "Jeremiah", lam: "Lamentations", ezk: "Ezekiel", eze: "Ezekiel",
    dan: "Daniel", hos: "Hosea", jol: "Joel", amo: "Amos", oba: "Obadiah", jon: "Jonah",
    mic: "Micah", nam: "Nahum", hab: "Habakkuk", zep: "Zephaniah", hag: "Haggai", zec: "Zechariah", mal: "Malachi",
    mat: "Matthew", matt: "Matthew", mt: "Matthew", mrk: "Mark", mk: "Mark", luk: "Luke", lk: "Luke",
    jhn: "John", jn: "John", act: "Acts", rom: "Romans", rm: "Romans",
    "1co": "1 Corinthians", "1cor": "1 Corinthians", "2co": "2 Corinthians", "2cor": "2 Corinthians",
    gal: "Galatians", eph: "Ephesians", php: "Philippians", phil: "Philippians", col: "Colossians",
    "1th": "1 Thessalonians", "2th": "2 Thessalonians", "1ti": "1 Timothy", "1tim": "1 Timothy",
    "2ti": "2 Timothy", "2tim": "2 Timothy", tit: "Titus", phm: "Philemon", heb: "Hebrews",
    jas: "James", jam: "James", "1pe": "1 Peter", "1pet": "1 Peter", "2pe": "2 Peter", "2pet": "2 Peter",
    "1jn": "1 John", "2jn": "2 John", "3jn": "3 John", jud: "Jude", rev: "Revelation", re: "Revelation"
  };

  function parsePassageQuery(raw) {
    const cleaned = (raw || "").trim().replace(/\s+/g, " ");
    if (!cleaned) return null;

    const match = cleaned.match(/^([1-3]?\s*[a-zA-Z\s]+?)(?:\s+(\d+)(?::(\d+))?)?$/);
    if (!match) return null;

    const bookPart = match[1].trim().toLowerCase();
    const compactBook = bookPart.replace(/\s+/g, "");
    const chNum = match[2] ? parseInt(match[2], 10) : 1;
    const vNum = match[3] ? parseInt(match[3], 10) : null;

    let foundBook = null;
    if (COMMON_ALIASES[compactBook]) {
      foundBook = window.BIBLE_BOOKS.find((b) => b.name === COMMON_ALIASES[compactBook]);
    }
    if (!foundBook) {
      foundBook =
        window.BIBLE_BOOKS.find((b) => b.name.toLowerCase() === bookPart) ||
        window.BIBLE_BOOKS.find((b) => b.abbr.toLowerCase() === compactBook) ||
        window.BIBLE_BOOKS.find((b) => b.name.toLowerCase().startsWith(bookPart));
    }
    if (!foundBook) return null;

    const safeCh = Math.min(foundBook.chapters, Math.max(1, chNum || 1));
    return { book: foundBook.name, chapter: safeCh, verse: vNum };
  }

  window.handlePassageSearch = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const input = document.getElementById("passage-search-input");
    const val = (input?.value || "").trim();
    if (!val) {
      window.openBookPickerModal();
      return;
    }

    const parsed = parsePassageQuery(val);
    if (parsed) {
      state.currentBook = parsed.book;
      state.currentChapter = parsed.chapter;
      state.highlightedVerse = parsed.verse;
      if (input) input.value = "";
      window.setMobilePane("scripture");
      renderBibleReader().then(() => {
        if (parsed.verse) {
          window.selectVerseForReflection(parsed.verse, false);
          const vEl = document.getElementById(`verse-block-${parsed.verse}`);
          if (vEl) vEl.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      });
    } else {
      // Open Book Picker with search prefilled
      window.openBookPickerModal();
      const pickerSearch = document.getElementById("picker-book-search");
      if (pickerSearch) {
        pickerSearch.value = val;
        window.renderBookPickerContent();
      }
    }
  };

  // ==========================================================================
  // LEFT PANE: 365-DAY READING PLAN & DYNAMIC FINISH FORECASTER
  // ==========================================================================

  function computeCompletionForecast() {
    const startDate = parseLocalISO(state.startDateISO);
    const todayDate = parseLocalISO(toLocalISOString(new Date()));
    const targetFinishDate = addDays(startDate, 364);

    const chaptersReadCount = Object.keys(state.readChapters).length;
    const chaptersRemaining = Math.max(0, TOTAL_BIBLE_CHAPTERS - chaptersReadCount);
    const percentComplete = ((chaptersReadCount / TOTAL_BIBLE_CHAPTERS) * 100).toFixed(1);

    const rawElapsed = Math.floor((todayDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const daysElapsed = Math.max(1, rawElapsed);

    let expectedChaptersByToday = 0;
    const activeDayIdx = Math.min(365, daysElapsed);
    for (let i = 0; i < activeDayIdx; i++) {
      expectedChaptersByToday += state.yearPlan[i].chapters.length;
    }

    let completedTilesCount = 0;
    state.yearPlan.forEach((tile) => {
      if (tile.chapters.every((ch) => Boolean(state.readChapters[ch.key]))) {
        completedTilesCount++;
      }
    });

    const standardDailyQuota = TOTAL_BIBLE_CHAPTERS / 365;
    const chapterDeltaVsSchedule = chaptersReadCount - expectedChaptersByToday;
    const daysAheadOrBehind = Math.round(chapterDeltaVsSchedule / standardDailyQuota);

    let projectedDaysRemaining;
    let effectiveVelocity;
    if (chaptersReadCount === 0) {
      effectiveVelocity = standardDailyQuota;
      projectedDaysRemaining = 365;
    } else {
      effectiveVelocity = chaptersReadCount / daysElapsed;
      projectedDaysRemaining = Math.ceil(chaptersRemaining / effectiveVelocity);
    }

    const projectedFinishDate =
      chaptersRemaining === 0 ? todayDate : addDays(todayDate, Math.max(0, projectedDaysRemaining));

    return {
      startDate,
      todayDate,
      targetFinishDate,
      projectedFinishDate,
      chaptersReadCount,
      chaptersRemaining,
      percentComplete,
      completedTilesCount,
      daysElapsed,
      chapterDeltaVsSchedule,
      daysAheadOrBehind,
      effectiveVelocity: effectiveVelocity.toFixed(1),
      projectedDaysRemaining
    };
  }

  window.toggleChapterRead = function (chapterKey, stopProp) {
    if (stopProp && stopProp.stopPropagation) stopProp.stopPropagation();
    const todayISO = toLocalISOString(new Date());
    let isNowRead = false;
    if (state.readChapters[chapterKey]) {
      delete state.readChapters[chapterKey];
    } else {
      state.readChapters[chapterKey] = todayISO;
      isNowRead = true;
    }
    saveReadChapters();
    renderAllTrackerViews();
    if (window.RWH_CLOUD) {
      window.RWH_CLOUD.syncSingleChapter(chapterKey, isNowRead, todayISO);
    }
  };

  window.toggleDayTileCompletion = function (dayNumber) {
    const tile = state.yearPlan.find((d) => d.dayNumber === dayNumber);
    if (!tile) return;
    const todayISO = toLocalISOString(new Date());
    const allAlreadyRead = tile.chapters.every((ch) => Boolean(state.readChapters[ch.key]));
    const keys = tile.chapters.map((ch) => ch.key);

    tile.chapters.forEach((ch) => {
      if (allAlreadyRead) {
        delete state.readChapters[ch.key];
      } else {
        state.readChapters[ch.key] = todayISO;
      }
    });

    saveReadChapters();
    renderAllTrackerViews();
    renderBibleReaderHeaderOnly();
    if (window.RWH_CLOUD) {
      window.RWH_CLOUD.syncBatchChapters(keys, !allAlreadyRead, todayISO);
    }
  };

  window.openChapterInReader = function (bookName, chapterNum) {
    state.currentBook = bookName;
    state.currentChapter = Number(chapterNum);
    state.highlightedVerse = null;
    state.pickerSelectedBook = bookName;
    window.setMobilePane("scripture");
    renderAllTrackerViews();
    renderBibleReader();
  };

  window.selectDayTile = function (dayNumber) {
    state.selectedDayNumber = Number(dayNumber);
    renderAllTrackerViews();
  };

  window.updatePlanStartDate = function (newISO) {
    if (!newISO) return;
    state.startDateISO = newISO;
    localStorage.setItem(STORAGE_KEYS.START_DATE, newISO);
    state.yearPlan = generate365DayPlan(newISO);
    state.selectedDayNumber = getCurrentPlanDayNumber();
    renderAllTrackerViews();
    if (window.RWH_CLOUD) {
      window.RWH_CLOUD.syncSettings();
    }
  };

  function renderAllTrackerViews() {
    const forecast = computeCompletionForecast();
    const selectedTile =
      state.yearPlan.find((d) => d.dayNumber === state.selectedDayNumber) || state.yearPlan[0];

    const startInput = document.getElementById("plan-start-input");
    if (startInput) startInput.value = state.startDateISO;

    const mobPct = document.getElementById("mob-plan-pct");
    if (mobPct) mobPct.textContent = `${Math.round(parseFloat(forecast.percentComplete))}%`;

    // 1. Compact Summary & Projected Finish Card
    const summaryEl = document.getElementById("tracker-summary-panel");
    if (summaryEl) {
      const pctNum = Math.min(100, parseFloat(forecast.percentComplete) || 0);
      const r = 27;
      const circ = 2 * Math.PI * r;
      const offset = circ - (pctNum / 100) * circ;

      let scheduleBadge = "";
      if (forecast.chaptersReadCount === 0) {
        scheduleBadge = `Target Finish: <strong>${formatReadableDate(forecast.targetFinishDate)}</strong>`;
      } else if (forecast.daysAheadOrBehind > 0) {
        scheduleBadge = `<strong>${forecast.daysAheadOrBehind}d ahead</strong> • Projected Finish: <strong>${formatReadableDate(forecast.projectedFinishDate)}</strong>`;
      } else if (forecast.daysAheadOrBehind === 0) {
        scheduleBadge = `<strong>On track</strong> • Projected Finish: <strong>${formatReadableDate(forecast.projectedFinishDate)}</strong>`;
      } else {
        scheduleBadge = `Current pace finishes <strong>${formatReadableDate(forecast.projectedFinishDate)}</strong> (${Math.abs(forecast.daysAheadOrBehind)}d behind 365 target)`;
      }

      summaryEl.innerHTML = `
        <div class="tracker-ring-row">
          <div class="mini-ring-wrap">
            <svg class="mini-ring-svg" viewBox="0 0 68 68">
              <circle cx="34" cy="34" r="${r}" fill="none" stroke="var(--border-line)" stroke-width="6" />
              <circle cx="34" cy="34" r="${r}" fill="none" stroke="var(--accent-primary)" stroke-width="6" stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${offset}" />
            </svg>
            <span class="mini-ring-label">${forecast.percentComplete}%</span>
          </div>
          <div>
            <div style="font-weight:800;font-size:0.95rem;color:var(--text-ink);">
              ${forecast.chaptersReadCount} / ${TOTAL_BIBLE_CHAPTERS} Chapters
            </div>
            <div style="font-size:0.75rem;color:var(--text-muted);margin-top:0.12rem;">
              ${forecast.completedTilesCount} of 365 days completed
            </div>
            <div style="font-size:0.73rem;color:var(--accent-gold);font-weight:700;margin-top:0.15rem;">
              Pace: ${forecast.effectiveVelocity} ch/day
            </div>
          </div>
        </div>
        <div class="finish-date-callout">
          🏁 ${scheduleBadge}
        </div>
      `;
    }

    // 2. Active Day Assignment Card
    const todayCard = document.getElementById("today-assignment-panel");
    if (todayCard && selectedTile) {
      const readInTile = selectedTile.chapters.filter((ch) => Boolean(state.readChapters[ch.key])).length;
      const totalInTile = selectedTile.chapters.length;
      const isTileComplete = readInTile === totalInTile;

      const hypotheticalReadCount = forecast.chaptersReadCount + (totalInTile - readInTile);
      const hypotheticalPace = Math.max(
        TOTAL_BIBLE_CHAPTERS / 365,
        hypotheticalReadCount / forecast.daysElapsed
      );
      const hypotheticalRemaining = Math.max(0, TOTAL_BIBLE_CHAPTERS - hypotheticalReadCount);
      const hypotheticalDaysLeft = Math.ceil(hypotheticalRemaining / hypotheticalPace);
      const hypotheticalFinishDate = addDays(forecast.todayDate, hypotheticalDaysLeft);

      todayCard.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:0.4rem;">
          <div>
            <div class="pane-eyebrow">Day ${selectedTile.dayNumber} of 365 • ${selectedTile.shortDate}</div>
            <div style="font-family:var(--font-serif-title);font-size:1rem;font-weight:700;color:var(--text-ink);">
              ${selectedTile.rangeLabel}
            </div>
          </div>
          <span style="font-family:var(--font-mono);font-size:0.72rem;font-weight:700;color:var(--accent-primary);">
            ${readInTile}/${totalInTile}
          </span>
        </div>

        <div class="chapter-pill-list">
          ${selectedTile.chapters
            .map((ch) => {
              const isRead = Boolean(state.readChapters[ch.key]);
              const isReadingNow =
                ch.book === state.currentBook && ch.chapter === state.currentChapter;
              return `
                <div class="plan-ch-chip ${isRead ? "done" : ""} ${isReadingNow ? "active-reading" : ""}">
                  <span class="mini-check" onclick="window.toggleChapterRead('${ch.key}', event)" title="Mark Read/Unread">
                    ${isRead ? "✓" : ""}
                  </span>
                  <span onclick="window.openChapterInReader('${ch.book}', ${ch.chapter})">
                    ${ch.shortLabel}
                  </span>
                </div>
              `;
            })
            .join("")}
        </div>

        <div style="font-size:0.73rem;color:var(--text-muted);margin-bottom:0.65rem;line-height:1.4;">
          ${
            isTileComplete
              ? `✓ Day ${selectedTile.dayNumber} finished! Finishing Bible on <strong>${formatReadableDate(forecast.projectedFinishDate)}</strong>.`
              : `Read today's ${totalInTile} ch → finishes Bible by <strong>${formatReadableDate(hypotheticalFinishDate)}</strong>.`
          }
        </div>

        <div style="display:flex;gap:0.45rem;">
          <button class="btn-crimson" style="flex:1;padding:0.45rem 0.65rem;font-size:0.76rem;" onclick="window.openChapterInReader('${selectedTile.chapters[0].book}', ${selectedTile.chapters[0].chapter})">
            Read ${selectedTile.chapters[0].shortLabel}
          </button>
          <button class="btn-secondary" style="padding:0.45rem 0.65rem;font-size:0.75rem;" onclick="window.toggleDayTileCompletion(${selectedTile.dayNumber})">
            ${isTileComplete ? "Undo" : "✓ Mark Day"}
          </button>
        </div>
      `;
    }

    renderSidebarTilesList();
  }

  window.setTileFilter = function (filterKey) {
    state.tileFilter = filterKey;
    document.querySelectorAll(".tile-filter-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-filter") === filterKey);
    });
    renderSidebarTilesList();
  };

  window.setTileSearch = function (query) {
    state.tileSearch = (query || "").trim().toLowerCase();
    renderSidebarTilesList();
  };

  function renderSidebarTilesList() {
    const listEl = document.getElementById("sidebar-tiles-list");
    if (!listEl) return;

    const currentPlanDay = getCurrentPlanDayNumber();
    const filtered = state.yearPlan.filter((tile) => {
      const readCount = tile.chapters.filter((ch) => Boolean(state.readChapters[ch.key])).length;
      const isComplete = readCount === tile.chapters.length;

      if (state.tileFilter === "completed" && !isComplete) return false;
      if (state.tileFilter === "remaining" && isComplete) return false;
      if (state.tileFilter === "ot" && !tile.chapters.some((c) => c.testament === "OT")) return false;
      if (state.tileFilter === "nt" && !tile.chapters.some((c) => c.testament === "NT")) return false;

      if (state.tileSearch) {
        const matchDay = `day ${tile.dayNumber}`.includes(state.tileSearch) || String(tile.dayNumber) === state.tileSearch;
        const matchRange = tile.rangeLabel.toLowerCase().includes(state.tileSearch);
        const matchBook = tile.chapters.some((c) => c.book.toLowerCase().includes(state.tileSearch));
        return matchDay || matchRange || matchBook;
      }
      return true;
    });

    listEl.innerHTML = filtered
      .map((tile) => {
        const readCount = tile.chapters.filter((ch) => Boolean(state.readChapters[ch.key])).length;
        const totalCount = tile.chapters.length;
        const isDone = readCount === totalCount;
        const isSelected = tile.dayNumber === state.selectedDayNumber;
        const isToday = tile.dayNumber === currentPlanDay;

        return `
          <div class="sidebar-day-row ${isSelected ? "is-selected" : ""} ${isDone ? "is-done" : ""}" onclick="window.selectDayTile(${tile.dayNumber})">
            <div style="min-width:0;">
              <div style="font-size:0.68rem;font-weight:800;color:var(--text-muted);font-family:var(--font-mono);">
                DAY ${tile.dayNumber}${isToday ? " • TODAY" : ""} · ${tile.shortDate}
              </div>
              <div style="font-size:0.82rem;font-weight:700;color:var(--text-ink);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">
                ${tile.rangeLabel}
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:0.45rem;flex-shrink:0;">
              <span style="font-size:0.7rem;color:var(--text-muted);font-family:var(--font-mono);">${readCount}/${totalCount}</span>
              <button
                type="button"
                class="mini-check"
                style="${isDone ? "background:var(--accent-emerald);border-color:var(--accent-emerald);color:#fff;" : ""}"
                onclick="event.stopPropagation(); window.toggleDayTileCompletion(${tile.dayNumber})"
                title="Mark Day ${tile.dayNumber} Complete"
              >${isDone ? "✓" : ""}</button>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // ==========================================================================
  // CENTER PANE: BIBLEGATEWAY EDITORIAL SCRIPTURE + CONTEXT & MAP
  // ==========================================================================

  window.openBookPickerModal = function () {
    state.pickerSelectedBook = state.currentBook;
    document.getElementById("book-picker-modal").classList.add("open");
    window.renderBookPickerContent();
  };

  window.closeBookPickerModal = function () {
    document.getElementById("book-picker-modal").classList.remove("open");
  };

  window.setPickerTestament = function (testament) {
    state.pickerTestament = testament;
    document.querySelectorAll(".picker-testament-btn").forEach((b) => {
      b.classList.toggle("active", b.getAttribute("data-t") === testament);
    });
    window.renderBookPickerContent();
  };

  window.selectPickerBook = function (bookName) {
    state.pickerSelectedBook = bookName;
    window.renderBookPickerContent();
    document.getElementById("picker-chapters-section")?.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  window.pickBookAndChapter = function (bookName, chNum) {
    state.currentBook = bookName;
    state.currentChapter = Number(chNum);
    state.highlightedVerse = null;
    window.closeBookPickerModal();
    window.setMobilePane("scripture");
    renderAllTrackerViews();
    renderBibleReader();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.renderBookPickerContent = function () {
    const gridEl = document.getElementById("picker-books-grid");
    const chSec = document.getElementById("picker-chapters-section");
    const searchVal = (document.getElementById("picker-book-search")?.value || "").trim().toLowerCase();
    if (!gridEl || !chSec) return;

    const books = window.BIBLE_BOOKS.filter((b) => {
      if (state.pickerTestament !== "ALL" && b.testament !== state.pickerTestament) return false;
      if (searchVal && !b.name.toLowerCase().includes(searchVal) && !b.abbr.toLowerCase().includes(searchVal)) {
        return false;
      }
      return true;
    });

    gridEl.innerHTML = books
      .map((b) => {
        const isActive = b.name === state.pickerSelectedBook;
        return `
          <button class="book-btn ${isActive ? "active" : ""}" onclick="window.selectPickerBook('${b.name}')">
            <span>${b.name}</span>
            <span style="font-size:0.69rem;color:var(--text-muted);font-family:var(--font-mono);">${b.chapters}</span>
          </button>
        `;
      })
      .join("");

    const activeBookObj = window.BIBLE_BOOKS.find((b) => b.name === state.pickerSelectedBook) || window.BIBLE_BOOKS[0];
    let chHtml = `
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div class="pane-eyebrow">${activeBookObj.name} • Select Chapter</div>
        <span style="font-size:0.72rem;color:var(--accent-emerald);font-weight:700;">Green = Read ✓</span>
      </div>
      <div class="chapters-grid">
    `;
    for (let c = 1; c <= activeBookObj.chapters; c++) {
      const chKey = `${activeBookObj.name}_${c}`;
      const isRead = Boolean(state.readChapters[chKey]);
      const isCurrent = activeBookObj.name === state.currentBook && c === state.currentChapter;
      chHtml += `
        <button class="ch-num-btn ${isCurrent ? "active" : ""} ${isRead ? "is-read" : ""}" onclick="window.pickBookAndChapter('${activeBookObj.name}', ${c})">
          ${c}
        </button>
      `;
    }
    chHtml += `</div>`;
    chSec.innerHTML = chHtml;
  };

  window.navigateChapter = function (delta) {
    const idx = ALL_CHAPTERS.findIndex(
      (c) => c.book === state.currentBook && c.chapter === state.currentChapter
    );
    if (idx === -1) return;
    const nextIdx = Math.min(ALL_CHAPTERS.length - 1, Math.max(0, idx + delta));
    const target = ALL_CHAPTERS[nextIdx];
    state.currentBook = target.book;
    state.currentChapter = target.chapter;
    state.highlightedVerse = null;
    renderAllTrackerViews();
    renderBibleReader();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.setReaderVersionMode = function (mode) {
    state.readerMode = mode;
    const sel = document.getElementById("header-version-select");
    if (sel && sel.value !== mode) sel.value = mode;
    const parBtn = document.getElementById("opt-parallel-btn");
    if (parBtn) parBtn.classList.toggle("active", mode === "parallel");
    renderBibleReader();
  };

  window.toggleParallelQuick = function () {
    const next = state.readerMode === "parallel" ? "nkjv" : "parallel";
    window.setReaderVersionMode(next);
  };

  window.toggleStrongsVisibility = function () {
    state.showStrongs = !state.showStrongs;
    document.body.classList.toggle("hide-strongs", !state.showStrongs);
    const btn = document.getElementById("opt-strongs-btn");
    if (btn) {
      btn.classList.toggle("active", state.showStrongs);
      btn.textContent = state.showStrongs ? "🔎 Strong's Numbers: ON" : "🔎 Strong's Numbers: OFF";
    }
  };

  window.toggleContextMapPanel = function () {
    state.showContextMap = !state.showContextMap;
    const panel = document.getElementById("reader-study-context-map");
    const btn = document.getElementById("opt-context-map-btn");
    if (panel) panel.classList.toggle("hidden", !state.showContextMap);
    if (btn) btn.classList.toggle("active", state.showContextMap);
  };

  function normalizeBollsStrongs(text, testament) {
    if (!text) return "";
    const prefix = testament === "OT" ? "H" : "G";
    return text
      .replace(/<S>(\d+)<\/S>/g, (_, num) => ` {${prefix}${num}}`)
      .replace(/<[^>]+>/g, "")
      .replace(/\s+/g, " ")
      .trim();
  }

  function cleanHtmlTags(text) {
    if (!text) return "";
    return text.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  }

  function formatTextWithStrongsTokens(rawText) {
    if (!rawText) return "";
    return rawText.replace(/\{([HG]\d+)\}/g, function (_, code) {
      const lex = window.STRONGS_LEXICON && window.STRONGS_LEXICON[code];
      const activeClass = state.activeStrongsCode === code ? "active-token" : "";
      const tooltip = lex ? `${lex.original} (${lex.translit}) — ${lex.definition}` : `Inspect ${code} in Lexicon`;
      return `<span class="strongs-token ${activeClass}" onclick="event.stopPropagation(); window.inspectStrongs('${code}', true)" title="${tooltip.replace(/"/g, "&quot;")}">${code}</span>`;
    });
  }

  async function loadFullChapterKjvAndNkjv(bookName, chapterNum) {
    const chapterKey = `${bookName}_${chapterNum}`;
    if (chapterApiCache[chapterKey]) return chapterApiCache[chapterKey];

    const bookMeta = window.BIBLE_BOOKS.find((b) => b.name === bookName) || window.BIBLE_BOOKS[0];
    const curatedMeta = window.CURATED_CHAPTERS && window.CURATED_CHAPTERS[chapterKey];

    try {
      const [kjvResp, nkjvResp] = await Promise.all([
        fetch(`https://bolls.life/get-chapter/KJV/${bookMeta.id}/${chapterNum}/`),
        fetch(`https://bolls.life/get-chapter/NKJV/${bookMeta.id}/${chapterNum}/`)
      ]);

      if (!kjvResp.ok || !nkjvResp.ok) throw new Error("API status error");

      const [kjvArr, nkjvArr] = await Promise.all([kjvResp.json(), nkjvResp.json()]);
      if (!Array.isArray(kjvArr) || kjvArr.length === 0) throw new Error("Empty chapter");

      const nkjvByVerse = {};
      if (Array.isArray(nkjvArr)) {
        nkjvArr.forEach((v) => {
          nkjvByVerse[v.verse] = cleanHtmlTags(v.text);
        });
      }

      const mergedVerses = kjvArr.map((vObj) => ({
        v: vObj.verse,
        kjv: normalizeBollsStrongs(vObj.text, bookMeta.testament),
        nkjv: nkjvByVerse[vObj.verse] || cleanHtmlTags(vObj.text)
      }));

      const result = {
        book: bookName,
        chapter: chapterNum,
        verses: mergedVerses
      };

      chapterApiCache[chapterKey] = result;
      return result;
    } catch (err) {
      if (curatedMeta) return curatedMeta;
      return {
        book: bookName,
        chapter: chapterNum,
        verses: [
          {
            v: 1,
            kjv: `Connect to the internet to load ${bookName} ${chapterNum} (KJV & NKJV).`,
            nkjv: `Connect to the internet to load ${bookName} ${chapterNum} (KJV & NKJV).`
          }
        ]
      };
    }
  }

  function getVersionFullName(mode) {
    if (mode === "nkjv") return "New King James Version (NKJV)";
    if (mode === "kjv") return "King James Version (KJV with Strong's)";
    return "Parallel Study: King James Version (KJV) & New King James Version (NKJV)";
  }

  function renderBibleReaderHeaderOnly() {
    const bookName = state.currentBook;
    const chapterNum = state.currentChapter;
    const chapterKey = `${bookName}_${chapterNum}`;
    const isChapterRead = Boolean(state.readChapters[chapterKey]);

    const refBtn = document.getElementById("header-active-ref");
    if (refBtn) refBtn.textContent = `${bookName} ${chapterNum}`;

    const headerEl = document.getElementById("scripture-chapter-header");
    if (headerEl) {
      headerEl.innerHTML = `
        <div>
          <h1 class="chapter-main-heading">${bookName} ${chapterNum}</h1>
          <div class="chapter-version-subtitle">${getVersionFullName(state.readerMode)}</div>
        </div>
        <div class="chapter-quick-nav">
          <button class="btn-secondary" onclick="window.navigateChapter(-1)" title="Previous Chapter">‹ Prev</button>
          <button class="${isChapterRead ? "btn-secondary" : "btn-crimson"}" onclick="window.toggleChapterRead('${chapterKey}'); renderBibleReaderHeaderOnly();">
            ${isChapterRead ? "✓ Read in Plan" : "✓ Mark Read"}
          </button>
          <button class="btn-secondary" onclick="window.navigateChapter(1)" title="Next Chapter">Next ›</button>
        </div>
      `;
    }

    const footerEl = document.getElementById("reader-chapter-footer");
    if (footerEl) {
      footerEl.innerHTML = `
        <button class="btn-secondary" onclick="window.navigateChapter(-1)">← Previous Chapter</button>
        <button class="${isChapterRead ? "btn-secondary" : "btn-crimson"}" onclick="window.toggleChapterRead('${chapterKey}'); renderBibleReaderHeaderOnly();">
          ${isChapterRead ? "✓ Completed in 365 Plan" : "✓ Mark " + bookName + " " + chapterNum + " Read"}
        </button>
        <button class="btn-secondary" onclick="window.navigateChapter(1)">Next Chapter →</button>
      `;
    }
  }

  // Click any verse to populate the Right-Hand "Insights & Reflect" composer
  window.selectVerseForReflection = function (verseNum, switchOnMobile = true) {
    state.highlightedVerse = Number(verseNum);
    const ref = `${state.currentBook} ${state.currentChapter}:${verseNum}`;

    document.querySelectorAll(".bgw-verse-block").forEach((el) => {
      el.classList.toggle("selected-for-reflect", el.id === `verse-block-${verseNum}`);
    });

    const passageInput = document.getElementById("log-passage-input");
    if (passageInput) passageInput.value = ref;

    window.switchReflectTab("compose");
    if (switchOnMobile && window.innerWidth <= 1180) {
      window.setMobilePane("reflect");
    }
    const titleInput = document.getElementById("log-title-input");
    if (titleInput && !titleInput.value) titleInput.focus();
  };

  function verseHasSavedNote(bookName, chapterNum, verseNum) {
    const exactPrefix = `${bookName} ${chapterNum}:${verseNum}`.toLowerCase();
    return state.studyLogs.some((item) =>
      (item.passage || "").toLowerCase().includes(exactPrefix)
    );
  }

  async function renderBibleReader() {
    const bookName = state.currentBook;
    const chapterNum = state.currentChapter;
    const chapterKey = `${bookName}_${chapterNum}`;

    renderBibleReaderHeaderOnly();
    renderStudyBibleContextAndMap(bookName, chapterNum);

    // Keep Reflect passage input synced to current chapter if user hasn't typed a draft
    const editId = document.getElementById("log-edit-id")?.value;
    const titleDraft = document.getElementById("log-title-input")?.value;
    const bodyDraft = document.getElementById("log-christ-input")?.value;
    const passageInput = document.getElementById("log-passage-input");
    if (passageInput && !editId && !titleDraft && !bodyDraft) {
      passageInput.value = state.highlightedVerse
        ? `${bookName} ${chapterNum}:${state.highlightedVerse}`
        : `${bookName} ${chapterNum}`;
    }

    const versesEl = document.getElementById("reader-verses-container");
    if (versesEl && !chapterApiCache[chapterKey]) {
      versesEl.innerHTML = `<div class="loading-box">Loading ${bookName} ${chapterNum}...</div>`;
    }

    const chapterData = await loadFullChapterKjvAndNkjv(bookName, chapterNum);
    if (state.currentBook !== bookName || state.currentChapter !== chapterNum) return;

    if (versesEl) {
      if (state.readerMode === "parallel") {
        versesEl.innerHTML = chapterData.verses
          .map((vObj) => {
            const isSel = state.highlightedVerse === vObj.v;
            const hasNote = verseHasSavedNote(bookName, chapterNum, vObj.v);
            return `
              <div id="verse-block-${vObj.v}" class="bgw-verse-block bgw-parallel-grid ${isSel ? "selected-for-reflect" : ""}">
                <div>
                  <div class="parallel-col-label">KJV</div>
                  <div class="bgw-verse-text">
                    ${hasNote ? '<span class="verse-has-note-dot" title="You have a reflection on this verse"></span>' : ""}
                    <sup class="bgw-verse-sup" onclick="window.selectVerseForReflection(${vObj.v}, true)">${vObj.v}</sup>
                    ${formatTextWithStrongsTokens(vObj.kjv)}
                  </div>
                </div>
                <div>
                  <button type="button" class="verse-reflect-trigger" onclick="window.selectVerseForReflection(${vObj.v}, true)">
                    ✍️ Reflect
                  </button>
                  <div class="parallel-col-label">NKJV</div>
                  <div class="bgw-verse-text">
                    <sup class="bgw-verse-sup" onclick="window.selectVerseForReflection(${vObj.v}, true)">${vObj.v}</sup>
                    ${formatTextWithStrongsTokens(vObj.nkjv)}
                  </div>
                </div>
              </div>
            `;
          })
          .join("");
      } else {
        const isKjv = state.readerMode === "kjv";
        versesEl.innerHTML = chapterData.verses
          .map((vObj) => {
            const isSel = state.highlightedVerse === vObj.v;
            const hasNote = verseHasSavedNote(bookName, chapterNum, vObj.v);
            const rawTxt = isKjv ? vObj.kjv : vObj.nkjv;
            return `
              <div id="verse-block-${vObj.v}" class="bgw-verse-block ${isSel ? "selected-for-reflect" : ""}">
                <button type="button" class="verse-reflect-trigger" onclick="window.selectVerseForReflection(${vObj.v}, true)">
                  ✍️ Reflect
                </button>
                <span class="bgw-verse-text">
                  ${hasNote ? '<span class="verse-has-note-dot" title="You have a reflection on this verse"></span>' : ""}
                  <sup class="bgw-verse-sup" onclick="window.selectVerseForReflection(${vObj.v}, true)">${vObj.v}</sup>
                  ${formatTextWithStrongsTokens(rawTxt)}
                </span>
              </div>
            `;
          })
          .join("");
      }
    }

    if (state.notesScope !== "all") {
      window.renderStudyLogs();
    }
  }

  // Interactive Study Bible Context & Chapter Atlas
  window.inspectMapLocation = function (locId) {
    const loc = window.BIBLICAL_LOCATIONS && window.BIBLICAL_LOCATIONS[locId];
    if (!loc) return;
    const detailBar = document.getElementById("active-map-loc-detail");
    if (detailBar) {
      detailBar.innerHTML = `
        <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.35rem;margin-bottom:0.2rem;">
          <strong>📍 ${loc.name} (${loc.ancientName})</strong>
          <span style="font-family:var(--font-mono);font-size:0.7rem;color:var(--accent-lexicon);">${loc.lat}°N, ${loc.lon}°E</span>
        </div>
        <div style="font-size:0.73rem;color:var(--text-muted);margin-bottom:0.15rem;">${loc.modernRegion} • ${loc.elevation}</div>
        <div>${loc.spiritualSignificance}</div>
      `;
    }
  };

  function renderStudyBibleContextAndMap(bookName, chapterNum) {
    const container = document.getElementById("reader-study-context-map");
    if (!container || typeof window.getChapterStudyAndMapData !== "function") return;

    const info = window.getChapterStudyAndMapData(bookName, chapterNum);
    const activeLoc = info.activeLocation;
    const routeLocs = info.routeLocations || [activeLoc];
    const polylinePoints = routeLocs.map((l) => `${l.svgX},${l.svgY}`).join(" ");
    const allLocs = Object.values(window.BIBLICAL_LOCATIONS || {});
    const routeIds = new Set(routeLocs.map((r) => r.id));

    const pinsSvg = allLocs
      .map((loc) => {
        const isPrimary = loc.id === activeLoc.id;
        const isRouteStop = routeIds.has(loc.id);
        const radius = isPrimary ? 7.5 : isRouteStop ? 5 : 3;
        const fill = isPrimary ? "#f5c542" : isRouteStop ? "#38bdf8" : "rgba(148,163,184,0.45)";
        const stroke = isPrimary ? "#ffffff" : isRouteStop ? "#090d16" : "none";
        const showLabel = isPrimary || isRouteStop;

        return `
          <g class="map-pin-group" onclick="window.inspectMapLocation('${loc.id}')">
            ${
              isPrimary
                ? `<circle cx="${loc.svgX}" cy="${loc.svgY}" r="14" fill="rgba(245,197,66,0.28)">
                     <animate attributeName="r" values="10;18;10" dur="2.2s" repeatCount="indefinite" />
                   </circle>`
                : ""
            }
            <circle cx="${loc.svgX}" cy="${loc.svgY}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
            ${
              showLabel
                ? `<text x="${loc.svgX}" y="${loc.svgY - (isPrimary ? 11 : 8)}" text-anchor="middle" fill="${isPrimary ? "#f5c542" : "#e2e8f0"}" font-size="${isPrimary ? "11.5" : "9.5"}" font-weight="${isPrimary ? "800" : "600"}" font-family="Plus Jakarta Sans, sans-serif" style="paint-order:stroke;stroke:#070a12;stroke-width:3px;stroke-linejoin:round;">
                     ${loc.name.split(" (")[0].split(" &")[0]}
                   </text>`
                : ""
            }
          </g>
        `;
      })
      .join("");

    container.innerHTML = `
      <div>
        <div class="pane-eyebrow">Study Bible Context • ${info.bookName} ${info.chapterNum}</div>
        <h3 class="pane-title" style="margin-bottom:0.55rem;">Historical & Redemptive Context</h3>

        <div class="context-meta-tags">
          <span class="context-meta-tag"><strong>Author:</strong> ${info.author}</span>
          <span class="context-meta-tag"><strong>Date:</strong> ${info.dateWritten}</span>
          <span class="context-meta-tag"><strong>Setting:</strong> ${info.dispensation}</span>
        </div>

        <div class="context-item">
          <div class="context-item-label">Historical Setting</div>
          <div>${info.historicalSetting}</div>
        </div>

        <div class="context-item">
          <div class="context-item-label">Christocentric Thread</div>
          <div>${info.christocentricThread}</div>
        </div>

        <div class="context-item" style="margin-bottom:0;">
          <div class="context-item-label">Study Key</div>
          <div>${info.apostolicKey}</div>
        </div>
      </div>

      <div>
        <div class="pane-eyebrow">Chapter Geography</div>
        <h3 class="pane-title" style="font-size:0.95rem;margin-bottom:0.35rem;">${info.mapCaption}</h3>

        <div class="biblical-map-frame">
          <svg viewBox="0 0 820 410" class="biblical-svg-map" role="img" aria-label="Biblical Map">
            <rect width="820" height="410" fill="#0b192e" />
            <path d="M 35,40 L 95,45 L 135,115 L 115,145 L 85,115 L 65,125 L 45,75 Z" fill="#1e2b3e" stroke="rgba(245,197,66,0.25)" stroke-width="1.2" />
            <path d="M 190,55 L 275,65 L 270,120 L 250,165 L 210,175 L 195,125 Z" fill="#1e2b3e" stroke="rgba(245,197,66,0.25)" stroke-width="1.2" />
            <path d="M 300,85 L 490,75 L 680,70 L 815,85 L 815,405 L 330,405 L 335,310 L 415,310 L 435,365 L 455,380 L 470,340 L 472,295 L 478,240 L 505,180 L 455,175 L 335,180 L 305,140 Z" fill="#1e2b3e" stroke="rgba(245,197,66,0.28)" stroke-width="1.2" />
            <path d="M 390,405 Q 402,355 405,320 M 392,312 L 405,320 L 418,312" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.7" />
            <path d="M 498,241 L 495,254 L 493,286" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.85" />
            <ellipse cx="495" cy="252" rx="3" ry="4.5" fill="#38bdf8" />
            <ellipse cx="493" cy="291" rx="3.5" ry="7" fill="#38bdf8" />
            <path d="M 650,115 Q 575,160 620,220 Q 680,260 755,295" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.7" />
            <path d="M 675,115 Q 660,175 705,235 Q 740,275 755,295" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.7" />
            <text x="195" y="245" fill="rgba(56,189,248,0.45)" font-size="11" font-style="italic" font-family="Lora, serif">MEDITERRANEAN SEA</text>
            ${
              routeLocs.length > 1
                ? `<polyline points="${polylinePoints}" fill="none" stroke="#f5c542" stroke-width="2.4" stroke-dasharray="5,4" opacity="0.88" />`
                : ""
            }
            ${pinsSvg}
          </svg>
        </div>

        <div id="active-map-loc-detail" class="map-caption-box">
          <div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:0.35rem;margin-bottom:0.2rem;">
            <strong>📍 ${activeLoc.name} (${activeLoc.ancientName})</strong>
            <span style="font-family:var(--font-mono);font-size:0.7rem;color:var(--accent-lexicon);">${activeLoc.lat}°N, ${activeLoc.lon}°E</span>
          </div>
          <div style="font-size:0.73rem;color:var(--text-muted);margin-bottom:0.15rem;">${activeLoc.modernRegion} • ${activeLoc.elevation}</div>
          <div>${activeLoc.spiritualSignificance}</div>
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // RIGHT PANE: INSIGHTS & REFLECT (PERSONAL NOTES + SELF-BUILT TOPICS + LEXICON)
  // ==========================================================================

  window.switchReflectTab = function (tabKey) {
    state.reflectTab = tabKey;
    document.querySelectorAll(".reflect-tab-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-rtab") === tabKey);
    });
    document.querySelectorAll(".reflect-subpanel").forEach((panel) => {
      panel.classList.toggle("active", panel.id === `rpanel-${tabKey}`);
    });
  };

  window.resetNoteComposer = function () {
    document.getElementById("study-log-form")?.reset();
    document.getElementById("log-edit-id").value = "";
    document.getElementById("log-passage-input").value = state.highlightedVerse
      ? `${state.currentBook} ${state.currentChapter}:${state.highlightedVerse}`
      : `${state.currentBook} ${state.currentChapter}`;
    const submitBtn = document.getElementById("save-note-submit-btn");
    if (submitBtn) submitBtn.textContent = "💾 Save Reflection";
    const cancelBtn = document.getElementById("cancel-edit-note-btn");
    if (cancelBtn) cancelBtn.style.display = "none";
  };

  window.saveNewStudyLog = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const editId = (document.getElementById("log-edit-id").value || "").trim();
    const passage = (document.getElementById("log-passage-input").value || "").trim();
    const title = (document.getElementById("log-title-input").value || "").trim();
    const topicTag = (document.getElementById("log-topic-input").value || "").trim() || "Personal Study";
    const christSubstance = (document.getElementById("log-christ-input").value || "").trim();
    const firstMentionAndLexicon = (document.getElementById("log-lexicon-input").value || "").trim();
    const rhemaLegislation = (document.getElementById("log-rhema-input").value || "").trim();

    if (!title || !passage || !christSubstance) return;

    let savedEntry;
    if (editId) {
      const idx = state.studyLogs.findIndex((item) => item.id === editId);
      if (idx !== -1) {
        savedEntry = Object.assign({}, state.studyLogs[idx], {
          passage,
          title,
          topicTag,
          christSubstance,
          firstMentionAndLexicon,
          rhemaLegislation
        });
        state.studyLogs[idx] = savedEntry;
      }
    }

    if (!savedEntry) {
      savedEntry = {
        id: "log-" + Date.now(),
        date: toLocalISOString(new Date()),
        title,
        passage,
        topicTag,
        ministerPattern: "Personal Study",
        firstMentionAndLexicon,
        christSubstance,
        rhemaLegislation
      };
      state.studyLogs.unshift(savedEntry);
    }

    saveStudyLogs();
    window.resetNoteComposer();
    window.renderStudyLogs();
    renderBibleReader();
    window.switchReflectTab("notes");

    if (window.RWH_CLOUD) {
      window.RWH_CLOUD.syncUpsertStudyLog(savedEntry);
    }
  };

  window.editStudyLog = function (logId) {
    const entry = state.studyLogs.find((item) => item.id === logId);
    if (!entry) return;
    document.getElementById("log-edit-id").value = entry.id;
    document.getElementById("log-passage-input").value = entry.passage || "";
    document.getElementById("log-title-input").value = entry.title || "";
    document.getElementById("log-topic-input").value = entry.topicTag || "";
    document.getElementById("log-christ-input").value = entry.christSubstance || "";
    document.getElementById("log-lexicon-input").value = entry.firstMentionAndLexicon || "";
    document.getElementById("log-rhema-input").value = entry.rhemaLegislation || "";

    const submitBtn = document.getElementById("save-note-submit-btn");
    if (submitBtn) submitBtn.textContent = "✓ Update Reflection";
    const cancelBtn = document.getElementById("cancel-edit-note-btn");
    if (cancelBtn) cancelBtn.style.display = "inline-flex";

    window.switchReflectTab("compose");
  };

  window.deleteStudyLog = function (logId) {
    state.studyLogs = state.studyLogs.filter((l) => l.id !== logId);
    saveStudyLogs();
    window.renderStudyLogs();
    renderBibleReader();
    if (window.RWH_CLOUD) {
      window.RWH_CLOUD.syncDeleteStudyLog(logId);
    }
  };

  window.setNotesScope = function (scope) {
    state.notesScope = scope;
    document.querySelectorAll(".notes-scope-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-scope") === scope);
    });
    window.renderStudyLogs();
  };

  window.togglePersonalTopicFilter = function (topic) {
    state.activeTopicFilter = state.activeTopicFilter === topic ? "" : topic;
    window.renderStudyLogs();
  };

  window.jumpToLoggedPassage = function (passageStr) {
    const firstRef = (passageStr || "").split(/[;,]/)[0].trim();
    const parsed = parsePassageQuery(firstRef);
    if (parsed) {
      state.currentBook = parsed.book;
      state.currentChapter = parsed.chapter;
      state.highlightedVerse = parsed.verse;
      window.setMobilePane("scripture");
      renderAllTrackerViews();
      renderBibleReader().then(() => {
        if (parsed.verse) {
          document.getElementById(`verse-block-${parsed.verse}`)?.scrollIntoView({
            behavior: "smooth",
            block: "center"
          });
        }
      });
    }
  };

  // Build Topics Cloud & Autocomplete Datalist STRICTLY from what the user has studied themselves
  function renderPersonalStudiedTopics() {
    const cloudEl = document.getElementById("personal-topics-cloud");
    const datalistEl = document.getElementById("user-studied-topics-datalist");

    const topicCounts = {};
    state.studyLogs.forEach((item) => {
      const raw = (item.topicTag || "").trim();
      if (!raw) return;
      raw.split(",").forEach((part) => {
        const clean = part.trim();
        if (clean) {
          topicCounts[clean] = (topicCounts[clean] || 0) + 1;
        }
      });
    });

    const uniqueTopics = Object.keys(topicCounts).sort((a, b) => topicCounts[b] - topicCounts[a]);

    if (datalistEl) {
      datalistEl.innerHTML = uniqueTopics.map((t) => `<option value="${t.replace(/"/g, "&quot;")}"></option>`).join("");
    }

    if (cloudEl) {
      if (uniqueTopics.length === 0) {
        cloudEl.innerHTML = "";
      } else {
        cloudEl.innerHTML = uniqueTopics
          .map((t) => {
            const isAct = state.activeTopicFilter === t;
            const safeT = t.replace(/'/g, "\\'");
            return `<span class="user-topic-chip ${isAct ? "active" : ""}" onclick="window.togglePersonalTopicFilter('${safeT}')">#${t} (${topicCounts[t]})</span>`;
          })
          .join("");
      }
    }
  }

  window.renderStudyLogs = function () {
    const listEl = document.getElementById("study-logs-list");
    const countBadge = document.getElementById("notes-count-badge");
    if (countBadge) countBadge.textContent = state.studyLogs.length;

    renderPersonalStudiedTopics();
    if (!listEl) return;

    const q = (document.getElementById("notes-search-input")?.value || "").trim().toLowerCase();
    const bookLower = state.currentBook.toLowerCase();
    const chapterPrefix = `${state.currentBook} ${state.currentChapter}`.toLowerCase();

    const filtered = state.studyLogs.filter((item) => {
      const pLower = (item.passage || "").toLowerCase();
      if (state.notesScope === "book" && !pLower.includes(bookLower)) return false;
      if (state.notesScope === "chapter" && !pLower.includes(chapterPrefix)) return false;

      if (state.activeTopicFilter) {
        const tags = (item.topicTag || "")
          .split(",")
          .map((s) => s.trim().toLowerCase());
        if (!tags.includes(state.activeTopicFilter.toLowerCase())) return false;
      }

      if (q) {
        return (
          (item.title || "").toLowerCase().includes(q) ||
          pLower.includes(q) ||
          (item.topicTag || "").toLowerCase().includes(q) ||
          (item.christSubstance || "").toLowerCase().includes(q) ||
          (item.firstMentionAndLexicon || "").toLowerCase().includes(q) ||
          (item.rhemaLegislation || "").toLowerCase().includes(q)
        );
      }
      return true;
    });

    if (filtered.length === 0) {
      listEl.innerHTML = `
        <div class="loading-box" style="padding:1.6rem 1rem;">
          ${
            state.studyLogs.length === 0
              ? "Your study notebook is clean and ready. Click any verse or open <strong>✍️ Reflect</strong> to log your own insights and build your personal topic library."
              : "No notes match the current filter."
          }
        </div>
      `;
      return;
    }

    listEl.innerHTML = filtered
      .map((entry) => {
        const safePassage = (entry.passage || "").replace(/'/g, "\\'");
        return `
          <div class="note-card">
            <div class="note-card-top">
              <div style="display:flex;align-items:center;gap:0.35rem;flex-wrap:wrap;">
                <span class="note-passage-pill" onclick="window.jumpToLoggedPassage('${safePassage}')" title="Jump to ${entry.passage}">
                  ${entry.passage}
                </span>
                ${
                  entry.topicTag
                    ? `<span style="font-size:0.7rem;font-weight:700;color:var(--text-muted);">#${entry.topicTag}</span>`
                    : ""
                }
              </div>
              <span style="font-size:0.69rem;color:var(--text-muted);font-family:var(--font-mono);">${entry.date}</span>
            </div>

            <div class="note-title">${entry.title}</div>
            <div class="note-body-text">${entry.christSubstance || ""}</div>

            ${
              entry.firstMentionAndLexicon
                ? `<div style="margin-top:0.5rem;padding-top:0.45rem;border-top:1px dashed var(--border-line);font-size:0.78rem;color:var(--text-muted);">
                     <strong style="color:var(--accent-lexicon);">Word / Cross-Ref:</strong> ${entry.firstMentionAndLexicon}
                   </div>`
                : ""
            }

            ${
              entry.rhemaLegislation
                ? `<div style="margin-top:0.45rem;padding:0.45rem 0.6rem;background:var(--bg-subtle);border-radius:6px;font-size:0.78rem;font-style:italic;color:var(--text-ink);">
                     "${entry.rhemaLegislation}"
                   </div>`
                : ""
            }

            <div style="display:flex;justify-content:flex-end;gap:0.4rem;margin-top:0.6rem;">
              <button type="button" class="btn-secondary" style="padding:0.22rem 0.52rem;font-size:0.71rem;" onclick="window.editStudyLog('${entry.id}')">Edit</button>
              <button type="button" class="btn-secondary" style="padding:0.22rem 0.52rem;font-size:0.71rem;" onclick="window.deleteStudyLog('${entry.id}')">Delete</button>
            </div>
          </div>
        `;
      })
      .join("");
  };

  window.exportAllStudyData = function () {
    const payload = {
      exportedAt: new Date().toISOString(),
      app: "Remnant Word Hub",
      startDateISO: state.startDateISO,
      readChaptersCount: Object.keys(state.readChapters).length,
      readChapters: state.readChapters,
      studyLogs: state.studyLogs
    };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `remnant-word-hub-backup-${toLocalISOString(new Date())}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // ==========================================================================
  // LIVE 14,000+ BLUE LETTER BIBLE STRONG'S LEXICON (IN RIGHT SIDEBAR)
  // ==========================================================================

  window.sendActiveLexiconToReflection = function () {
    if (!state.activeLexiconSummary) return;
    const lexBox = document.getElementById("log-lexicon-input");
    if (lexBox) {
      const prefix = lexBox.value ? lexBox.value.trim() + "\n" : "";
      lexBox.value = prefix + state.activeLexiconSummary;
    }
    window.switchReflectTab("compose");
    lexBox?.focus();
  };

  window.inspectStrongs = async function (code, focusRightPane = false) {
    const cleanCode = (code || "").toUpperCase().trim();
    if (!cleanCode) return;
    state.activeStrongsCode = cleanCode;

    window.switchReflectTab("lexicon");
    if (focusRightPane) {
      if (window.innerWidth <= 1180) {
        window.setMobilePane("reflect");
      } else if (!state.showRightPane) {
        window.toggleDesktopPane("right");
      }
    }

    document.querySelectorAll(".center-scripture-pane .strongs-token").forEach((el) => {
      el.classList.toggle("active-token", el.textContent.trim() === cleanCode);
    });

    await renderConcordanceInspector();
  };

  window.searchStrongsConcordance = function (query) {
    const q = (query || "").trim().toLowerCase();
    const resultsEl = document.getElementById("concordance-search-results");
    if (!resultsEl) return;

    if (!q) {
      resultsEl.innerHTML = "";
      return;
    }

    let directHtml = "";
    if (/^[hg]\d{1,4}$/i.test(q)) {
      const upper = q.toUpperCase();
      directHtml = `
        <div onclick="window.inspectStrongs('${upper}')" style="padding:0.45rem 0.65rem;background:var(--accent-primary-soft);border:1px solid var(--accent-primary);border-radius:7px;margin-top:0.35rem;cursor:pointer;display:flex;justify-content:space-between;font-size:0.8rem;">
          <span>Lookup Strong's <strong>${upper}</strong></span>
          <span style="font-weight:700;color:var(--accent-primary);">Open →</span>
        </div>
      `;
    }

    const matches = Object.values(window.STRONGS_LEXICON || {}).filter((item) => {
      return (
        item.number.toLowerCase().includes(q) ||
        item.translit.toLowerCase().includes(q) ||
        item.original.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q)
      );
    });

    resultsEl.innerHTML =
      directHtml +
      matches
        .map(
          (m) => `
          <div onclick="window.inspectStrongs('${m.number}')" style="padding:0.45rem 0.65rem;background:var(--bg-paper);border:1px solid var(--border-line);border-radius:7px;margin-top:0.3rem;cursor:pointer;display:flex;justify-content:space-between;font-size:0.8rem;">
            <span><strong style="color:var(--accent-lexicon);font-family:var(--font-mono);">${m.number}</strong> · ${m.original} (<em>${m.translit}</em>)</span>
            <span style="color:var(--accent-primary);font-weight:700;">→</span>
          </div>
        `
        )
        .join("");
  };

  async function renderConcordanceInspector() {
    const panel = document.getElementById("blb-lexicon-content");
    if (!panel) return;

    const code = state.activeStrongsCode || "G3056";
    const curated = window.STRONGS_LEXICON && window.STRONGS_LEXICON[code];

    if (curated) {
      state.activeLexiconSummary = `${curated.number} ${curated.original} (${curated.translit}): ${curated.definition}`;
      panel.innerHTML = `
        <div class="lex-card">
          <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.45rem;">
            <div>
              <span class="strongs-token" style="vertical-align:baseline;margin:0;">${curated.number} • ${curated.lang}</span>
              <div style="font-family:var(--font-scripture);font-size:1.5rem;font-weight:700;color:var(--text-ink);margin-top:0.15rem;">
                ${curated.original}
              </div>
            </div>
            <div style="text-align:right;">
              <div style="font-weight:700;font-size:0.9rem;">${curated.translit}</div>
              <div style="font-size:0.73rem;color:var(--text-muted);">/${curated.pronunciation}/</div>
              <div style="font-size:0.7rem;color:var(--accent-gold);font-weight:700;">${curated.partOfSpeech}</div>
            </div>
          </div>

          <button type="button" class="btn-crimson" style="width:100%;padding:0.45rem;font-size:0.76rem;" onclick="window.sendActiveLexiconToReflection()">
            + Add ${curated.number} (${curated.translit}) to My Reflection
          </button>
        </div>

        <div class="lex-card">
          <div class="lex-card-title">Strong's Definition</div>
          <div class="lex-card-body">${curated.definition}</div>
        </div>

        <div class="lex-card">
          <div class="lex-card-title">Thayer's / BDB Usage Outline</div>
          <div class="lex-card-body">
            <ul>${curated.blbOutline.map((line) => `<li>${line}</li>`).join("")}</ul>
          </div>
        </div>

        <div class="lex-card">
          <div class="lex-card-title">Law of First Mention</div>
          <div class="lex-card-body">${curated.firstMention}</div>
        </div>

        <div class="lex-card" style="margin-bottom:0;">
          <div class="lex-card-title">Key Cross-References</div>
          <div style="display:flex;flex-wrap:wrap;gap:0.3rem;margin-top:0.25rem;">
            ${curated.keyRefs
              .map(
                (ref) =>
                  `<span class="note-passage-pill" onclick="window.jumpToLoggedPassage('${ref}')">${ref}</span>`
              )
              .join("")}
          </div>
        </div>
      `;
      return;
    }

    if (strongsApiCache[code]) {
      renderLiveStrongsEntry(panel, code, strongsApiCache[code]);
      return;
    }

    panel.innerHTML = `<div class="loading-box">Loading lexicon for <strong>${code}</strong>...</div>`;
    try {
      const resp = await fetch(`https://bolls.life/dictionary-definition/BDBT/${encodeURIComponent(code)}/`);
      const arr = await resp.json();
      if (Array.isArray(arr) && arr.length > 0) {
        strongsApiCache[code] = arr[0];
        if (state.activeStrongsCode === code) {
          renderLiveStrongsEntry(panel, code, arr[0]);
        }
      } else {
        panel.innerHTML = `<div class="lex-card">No lexicon entry found for <strong>${code}</strong>.</div>`;
      }
    } catch (e) {
      panel.innerHTML = `<div class="lex-card">Connect to the internet to load live lexicon for <strong>${code}</strong>.</div>`;
    }
  }

  function renderLiveStrongsEntry(panel, code, apiObj) {
    const lang = code.startsWith("H") ? "Hebrew (BDB)" : "Greek (Thayer's)";
    const plainDef = cleanHtmlTags(apiObj.definition || "").slice(0, 220);
    state.activeLexiconSummary = `${code} ${apiObj.lexeme || ""} (${apiObj.transliteration || ""}): ${plainDef}...`;

    panel.innerHTML = `
      <div class="lex-card">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.5rem;">
          <div>
            <span class="strongs-token" style="vertical-align:baseline;margin:0;">${code} • ${lang}</span>
            <div style="font-family:var(--font-scripture);font-size:1.35rem;font-weight:700;color:var(--text-ink);margin-top:0.15rem;">
              ${apiObj.lexeme || code}
            </div>
          </div>
          <div style="text-align:right;">
            <div style="font-weight:700;font-size:0.88rem;">${apiObj.transliteration || ""}</div>
            <div style="font-size:0.73rem;color:var(--text-muted);">${apiObj.pronunciation || ""}</div>
          </div>
        </div>

        <button type="button" class="btn-crimson" style="width:100%;padding:0.45rem;font-size:0.76rem;" onclick="window.sendActiveLexiconToReflection()">
          + Add ${code} to My Reflection
        </button>
      </div>

      <div class="lex-card" style="margin-bottom:0;">
        <div class="lex-card-title">Complete Lexicon Definition</div>
        <div class="lex-card-body">${apiObj.definition || ""}</div>
      </div>
    `;
  }

  // ==========================================================================
  // SUPABASE CLOUD SYNC STATE BRIDGE
  // ==========================================================================

  window.RWH_APP = {
    getStateSnapshot: function () {
      return {
        startDateISO: state.startDateISO,
        theme: document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light",
        fontSizeRem: state.fontSizeRem,
        readChapters: Object.assign({}, state.readChapters),
        studyLogs: state.studyLogs.slice()
      };
    },
    applyMergedCloudState: function (merged) {
      if (merged.startDateISO && merged.startDateISO !== state.startDateISO) {
        state.startDateISO = merged.startDateISO;
        localStorage.setItem(STORAGE_KEYS.START_DATE, state.startDateISO);
        state.yearPlan = generate365DayPlan(state.startDateISO);
        state.selectedDayNumber = getCurrentPlanDayNumber();
      }
      if (merged.theme) {
        const normTheme = merged.theme === "dark" || merged.theme === "royal-dark" ? "dark" : "light";
        applyThemeDOM(normTheme);
        localStorage.setItem(STORAGE_KEYS.THEME, normTheme);
      }
      if (merged.fontSizeRem && !isNaN(merged.fontSizeRem)) {
        state.fontSizeRem = Number(merged.fontSizeRem);
        document.documentElement.style.setProperty("--scripture-size", `${state.fontSizeRem}rem`);
        localStorage.setItem(STORAGE_KEYS.FONT_SIZE, String(state.fontSizeRem));
      }
      if (merged.readChapters) {
        state.readChapters = merged.readChapters;
        saveReadChapters();
      }
      if (Array.isArray(merged.studyLogs)) {
        state.studyLogs = merged.studyLogs.filter(
          (item) => item && !String(item.id).startsWith("seed-log-")
        );
        saveStudyLogs();
      }
      renderAllTrackerViews();
      window.renderStudyLogs();
      renderBibleReader();
    }
  };

  // Boot Workspace
  document.addEventListener("DOMContentLoaded", function () {
    loadState();
    renderAllTrackerViews();
    renderBibleReader();
    window.renderStudyLogs();
    renderConcordanceInspector();
  });
})();
