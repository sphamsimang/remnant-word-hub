/**
 * Remnant Word Hub — Full 66-Book KJV/NKJV Study Bible, Live 14,000+ BLB Concordance,
 * Study Context & Interactive Chapter Maps, Apostolic Pre-Studies & 365-Day Tracker.
 */

(function () {
  const STORAGE_KEYS = {
    START_DATE: "rwh_plan_start_date_v1",
    READ_CHAPTERS: "rwh_read_chapters_v1",
    STUDY_LOGS: "rwh_study_logs_v1",
    THEME: "rwh_theme_v1",
    FONT_SIZE: "rwh_font_size_v1"
  };

  // In-memory caches for full-Bible chapters & live Strong's BDBT definitions
  const chapterApiCache = {};
  const strongsApiCache = {};

  let state = {
    activeTab: "tracker",
    startDateISO: "",
    readChapters: {},
    yearPlan: [],
    tileFilter: "all",
    tileSearch: "",
    selectedDayNumber: 1,
    currentBook: "John",
    currentChapter: 1,
    readerMode: "parallel", // parallel | kjv | nkjv
    showStrongs: true,
    showContextMap: true,
    fontSizeRem: 1.04,
    activeStrongsCode: "G3056",
    activeTopicId: "core-concepts-of-christ",
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
    const opts = { weekday: "short", month: "short", day: "numeric" };
    if (includeYear) opts.year = "numeric";
    return dateObj.toLocaleDateString("en-US", opts);
  }

  // Build flat list of all 1,189 chapters in canonical order
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
      const savedLogs = JSON.parse(localStorage.getItem(STORAGE_KEYS.STUDY_LOGS) || "null");
      if (Array.isArray(savedLogs) && savedLogs.length > 0) {
        state.studyLogs = savedLogs;
      } else {
        state.studyLogs = getSeedStudyLogs(todayISO);
        saveStudyLogs();
      }
    } catch (e) {
      state.studyLogs = getSeedStudyLogs(todayISO);
    }

    const savedTheme = localStorage.getItem(STORAGE_KEYS.THEME) || "royal-dark";
    if (savedTheme === "parchment") {
      document.documentElement.setAttribute("data-theme", "parchment");
    }

    const savedFont = parseFloat(localStorage.getItem(STORAGE_KEYS.FONT_SIZE) || "1.04");
    if (!isNaN(savedFont) && savedFont >= 0.85 && savedFont <= 1.45) {
      state.fontSizeRem = savedFont;
      document.documentElement.style.setProperty("--scripture-size", `${savedFont}rem`);
    }

    state.yearPlan = generate365DayPlan(state.startDateISO);
    state.selectedDayNumber = getCurrentPlanDayNumber();
  }

  function getSeedStudyLogs(todayISO) {
    return [
      {
        id: "seed-log-1",
        date: todayISO,
        title: "The Jurisdiction of the Blood & The Voice of Better Things",
        passage: "Leviticus 17:11; Hebrews 9:12-14; Hebrews 12:24; Revelation 12:11",
        topicTag: "The Power of the Blood",
        ministerPattern: "Apostle Arome Osayi / Apostle Gideon Adoma",
        firstMentionAndLexicon: "First mention of Blood ('Dam' H1818) in Genesis 4:10 is plural ('Damim') — blood carries a judicial voice in the spirit realm. In Leviticus 17:11, the 'Nephesh' (H5315 soul/life) is encapsulated inside the blood for 'Kaphar' (H3722 atonement).",
        christSubstance: "Whereas Abel's blood cried for judicial vengeance from the earth, Christ entered the heavenly tabernacle by His own Blood ('Haima' G129) as our permanent 'Hilasterion' (G2435 Mercy Seat), purging our conscience from dead works.",
        rhemaLegislation: "I overcome the Accuser of the brethren by the Blood of the Lamb and the Word of my testimony. My conscience is purged from dead works to serve the living God!"
      },
      {
        id: "seed-log-2",
        date: todayISO,
        title: "From Infant Birth (Teknon) to Mature Sonship (Huios)",
        passage: "John 1:12; Romans 8:14-19, 29; Galatians 4:1-2",
        topicTag: "Core Concepts of Christ & Sonship",
        ministerPattern: "Apostle Tolu Agboola / Apostle Arome Osayi",
        firstMentionAndLexicon: "Greek distinguishes 'Teknon' (G5043 child born of the Spirit) from 'Nepios' (G3516 non-speaking infant) and 'Huios' (G5207 mature son of stature). Christ moved from 'Monogenes' (G3439 Only Begotten, John 1:14) to 'Prototokos' (G4416 Firstborn among many brethren, Rom 8:29).",
        christSubstance: "Salvation begins with regeneration in the spirit (Justification), but the Father places us under the leadership of the Holy Spirit and the surgical Word (Heb 4:12) so that Christ is formed in our soul until we manifest as mature 'Huioi'.",
        rhemaLegislation: "I yield to the tutelage and governance of the Holy Spirit today. I refuse carnality; I grow unto the measure of the stature of the fullness of Christ."
      }
    ];
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

  // Dynamic Finish Date & Pace Engine
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
    const scheduleAdjustedFinishDate = addDays(targetFinishDate, -daysAheadOrBehind);

    return {
      startDate,
      todayDate,
      targetFinishDate,
      projectedFinishDate,
      scheduleAdjustedFinishDate,
      chaptersReadCount,
      chaptersRemaining,
      percentComplete,
      completedTilesCount,
      daysElapsed,
      expectedChaptersByToday,
      chapterDeltaVsSchedule,
      daysAheadOrBehind,
      effectiveVelocity: effectiveVelocity.toFixed(1),
      projectedDaysRemaining
    };
  }

  // Tracker Actions
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
    if (window.RWH_CLOUD) {
      window.RWH_CLOUD.syncBatchChapters(keys, !allAlreadyRead, todayISO);
    }
  };

  window.openChapterInReader = function (bookName, chapterNum) {
    state.currentBook = bookName;
    state.currentChapter = Number(chapterNum);
    state.pickerSelectedBook = bookName;
    window.switchTab("reader");
    renderBibleReader();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.selectDayTile = function (dayNumber) {
    state.selectedDayNumber = Number(dayNumber);
    renderAllTrackerViews();
    const todayEl = document.getElementById("today-assignment-panel");
    if (todayEl && window.innerWidth <= 768) {
      todayEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
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

  // Render Top Ticker & 365-Day Tracker Dashboard with Circular SVG Ring
  function renderAllTrackerViews() {
    const forecast = computeCompletionForecast();
    const selectedTile =
      state.yearPlan.find((d) => d.dayNumber === state.selectedDayNumber) || state.yearPlan[0];

    // 1. Live Completion Ticker
    const tickerEl = document.getElementById("live-completion-ticker");
    if (tickerEl) {
      let paceStatusText = "";
      if (forecast.chaptersReadCount === 0) {
        paceStatusText = `Target Finish: ${formatReadableDate(forecast.targetFinishDate)}`;
      } else if (forecast.daysAheadOrBehind > 0) {
        paceStatusText = `${forecast.daysAheadOrBehind}d AHEAD • Finish ${formatReadableDate(forecast.projectedFinishDate)}`;
      } else if (forecast.daysAheadOrBehind === 0) {
        paceStatusText = `ON TRACK • Finish ${formatReadableDate(forecast.projectedFinishDate)}`;
      } else {
        paceStatusText = `Pace Finish: ${formatReadableDate(forecast.projectedFinishDate)}`;
      }

      tickerEl.innerHTML = `
        <div class="ticker-inner">
          <div class="ticker-stats">
            <span class="ticker-pill">Start: <strong class="ticker-highlight">${formatReadableDate(forecast.startDate, false)}</strong></span>
            <span class="ticker-pill">Read: <strong class="ticker-highlight">${forecast.chaptersReadCount}/${TOTAL_BIBLE_CHAPTERS} (${forecast.percentComplete}%)</strong></span>
          </div>
          <div class="finish-indicator-badge">
            <span class="pulse-dot"></span>
            <span>${paceStatusText}</span>
          </div>
        </div>
      `;
    }

    const navTrackerBadge = document.getElementById("nav-tracker-badge");
    if (navTrackerBadge) navTrackerBadge.textContent = `${forecast.percentComplete}%`;

    // 2. Hero Forecast Panel with Circular Progress Ring
    const forecastPanel = document.getElementById("forecast-hero-panel");
    if (forecastPanel) {
      const pctNum = Math.min(100, parseFloat(forecast.percentComplete) || 0);
      const radius = 62;
      const circumference = 2 * Math.PI * radius;
      const dashOffset = circumference - (pctNum / 100) * circumference;
      const deltaColor =
        forecast.chapterDeltaVsSchedule >= 0 ? "var(--emerald)" : "var(--gold)";

      forecastPanel.innerHTML = `
        <div class="card-header">
          <div>
            <div class="section-eyebrow">365-Day Apostolic Study Forecaster</div>
            <h2 class="section-title">Yearly Completion Tracker</h2>
          </div>
          <div style="display:flex;align-items:center;gap:0.45rem;">
            <label for="plan-start-input" style="font-size:0.73rem;color:var(--text-muted);font-weight:700;">Start:</label>
            <input type="date" id="plan-start-input" class="select-input" value="${state.startDateISO}" onchange="window.updatePlanStartDate(this.value)" />
          </div>
        </div>

        <div class="forecast-visual-row">
          <div class="progress-ring-card">
            <svg class="progress-ring-svg" viewBox="0 0 150 150">
              <defs>
                <linearGradient id="ringGoldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stop-color="#f7db83" />
                  <stop offset="55%" stop-color="#e0b84c" />
                  <stop offset="100%" stop-color="#34d399" />
                </linearGradient>
              </defs>
              <circle cx="75" cy="75" r="${radius}" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="11" />
              <circle cx="75" cy="75" r="${radius}" fill="none" stroke="url(#ringGoldGrad)" stroke-width="11" stroke-linecap="round" stroke-dasharray="${circumference}" stroke-dashoffset="${dashOffset}" style="transition: stroke-dashoffset 0.6s cubic-bezier(0.22,1,0.36,1);" />
            </svg>
            <div class="progress-ring-center">
              <div class="ring-pct">${forecast.percentComplete}%</div>
              <div class="ring-sub">${forecast.chaptersReadCount} / ${TOTAL_BIBLE_CHAPTERS}</div>
            </div>
          </div>

          <div class="forecast-kpis">
            <div class="kpi-box highlight-finish">
              <div class="kpi-label">Projected Bible Finish Date (Live Pace)</div>
              <div class="kpi-value">${formatReadableDate(forecast.projectedFinishDate)}</div>
              <div class="kpi-sub">
                ${
                  forecast.chaptersReadCount === 0
                    ? `Complete Day ${selectedTile.dayNumber}'s ${selectedTile.chapters.length} chapters to activate velocity`
                    : `Pace: ${forecast.effectiveVelocity} ch/day • ${forecast.projectedDaysRemaining} days remaining`
                }
              </div>
            </div>

            <div class="kpi-box">
              <div class="kpi-label">365-Day Target Finish</div>
              <div class="kpi-value" style="font-size:1.05rem;">${formatReadableDate(forecast.targetFinishDate)}</div>
              <div class="kpi-sub" style="color:${deltaColor};">
                ${
                  forecast.chapterDeltaVsSchedule > 0
                    ? `+${forecast.chapterDeltaVsSchedule} ch ahead`
                    : forecast.chapterDeltaVsSchedule === 0
                    ? `Exact on-schedule`
                    : `${forecast.chapterDeltaVsSchedule} ch behind`
                }
              </div>
            </div>

            <div class="kpi-box">
              <div class="kpi-label">Daily Tiles Finished</div>
              <div class="kpi-value" style="font-size:1.05rem;">${forecast.completedTilesCount} / 365</div>
              <div class="kpi-sub">${forecast.chaptersRemaining} chapters left</div>
            </div>
          </div>
        </div>

        <div class="progress-track-wrap">
          <div class="progress-meta">
            <span>Genesis 1 → Revelation 22</span>
            <span>${forecast.chaptersReadCount} of ${TOTAL_BIBLE_CHAPTERS} Chapters</span>
          </div>
          <div class="progress-bar-outer">
            <div class="progress-bar-inner" style="width:${pctNum}%;"></div>
          </div>
        </div>
      `;
    }

    // 3. Today / Active Tile Reading Spotlight Card
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
        <div>
          <div class="card-header" style="margin-bottom:0.55rem;">
            <div>
              <div class="section-eyebrow">Day ${selectedTile.dayNumber} of 365 • ${selectedTile.readableDate}</div>
              <h3 class="section-title">${selectedTile.rangeLabel}</h3>
            </div>
            <span class="verse-ref-badge">${readInTile}/${totalInTile} Read</span>
          </div>

          <div class="finish-feedback-banner">
            ${
              isTileComplete
                ? `✅ <strong>Day ${selectedTile.dayNumber} Complete!</strong> At your current pace, you will finish the entire Bible on <strong>${formatReadableDate(forecast.projectedFinishDate)}</strong>.`
                : `🏁 <strong>Finish Forecast:</strong> Reading today's <strong>${totalInTile} chapters (${selectedTile.rangeLabel})</strong> puts you at <strong>${((hypotheticalReadCount / TOTAL_BIBLE_CHAPTERS) * 100).toFixed(1)}%</strong> and sets your finish date to <strong>${formatReadableDate(hypotheticalFinishDate)}</strong>.`
            }
          </div>

          <div style="font-size:0.75rem;color:var(--text-muted);margin-bottom:0.3rem;">
            Tap checkbox to mark read, or tap the chapter name to read it now in KJV / NKJV:
          </div>

          <div class="chapter-chips-wrap">
            ${selectedTile.chapters
              .map((ch) => {
                const isRead = Boolean(state.readChapters[ch.key]);
                return `
                  <div class="chapter-chip ${isRead ? "read-done" : ""}">
                    <span class="chip-check" onclick="window.toggleChapterRead('${ch.key}', event)" title="Mark Read/Unread">
                      ${isRead ? "✓" : ""}
                    </span>
                    <span onclick="window.openChapterInReader('${ch.book}', ${ch.chapter})">
                      ${ch.label}
                    </span>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>

        <div style="display:flex;align-items:center;gap:0.65rem;flex-wrap:wrap;margin-top:0.8rem;padding-top:0.85rem;border-top:1px solid var(--border-hairline);">
          <button class="btn-gold" style="flex:1;" onclick="window.openChapterInReader('${selectedTile.chapters[0].book}', ${selectedTile.chapters[0].chapter})">
            📖 Read ${selectedTile.chapters[0].label} Now
          </button>
          <button class="btn-outline" onclick="window.toggleDayTileCompletion(${selectedTile.dayNumber})">
            ${isTileComplete ? "↺ Unmark Day" : "✓ Complete Day"}
          </button>
        </div>
      `;
    }

    render365TileMatrix();
  }

  window.setTileFilter = function (filterKey) {
    state.tileFilter = filterKey;
    document.querySelectorAll(".tile-filter-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-filter") === filterKey);
    });
    render365TileMatrix();
  };

  window.setTileSearch = function (query) {
    state.tileSearch = (query || "").trim().toLowerCase();
    render365TileMatrix();
  };

  function render365TileMatrix() {
    const gridEl = document.getElementById("year-tiles-grid");
    if (!gridEl) return;

    const currentPlanDay = getCurrentPlanDayNumber();
    const filteredTiles = state.yearPlan.filter((tile) => {
      const readCount = tile.chapters.filter((ch) => Boolean(state.readChapters[ch.key])).length;
      const isComplete = readCount === tile.chapters.length;

      if (state.tileFilter === "completed" && !isComplete) return false;
      if (state.tileFilter === "remaining" && isComplete) return false;
      if (state.tileFilter === "ot" && !tile.chapters.some((c) => c.testament === "OT")) return false;
      if (state.tileFilter === "nt" && !tile.chapters.some((c) => c.testament === "NT")) return false;

      if (state.tileSearch) {
        const matchDay = `day ${tile.dayNumber}`.includes(state.tileSearch);
        const matchRange = tile.rangeLabel.toLowerCase().includes(state.tileSearch);
        const matchBook = tile.chapters.some((c) => c.book.toLowerCase().includes(state.tileSearch));
        return matchDay || matchRange || matchBook;
      }
      return true;
    });

    gridEl.innerHTML = filteredTiles
      .map((tile) => {
        const readCount = tile.chapters.filter((ch) => Boolean(state.readChapters[ch.key])).length;
        const totalCount = tile.chapters.length;
        const isComplete = readCount === totalCount;
        const isPartial = readCount > 0 && readCount < totalCount;
        const isSelected = tile.dayNumber === state.selectedDayNumber;
        const isToday = tile.dayNumber === currentPlanDay;

        let statusClass = "";
        if (isComplete) statusClass = "tile-completed";
        else if (isPartial) statusClass = "tile-partial";
        if (isSelected || isToday) statusClass += " tile-today";

        return `
          <div class="day-tile ${statusClass}" onclick="window.selectDayTile(${tile.dayNumber})">
            <div class="tile-top">
              <span class="tile-day-num">DAY ${tile.dayNumber}${isToday ? " • TODAY" : ""}</span>
              <span>${tile.shortDate}</span>
            </div>
            <div class="tile-passages">${tile.rangeLabel}</div>
            <div class="tile-footer">
              <span>${readCount}/${totalCount} ch</span>
              <span onclick="event.stopPropagation(); window.toggleDayTileCompletion(${tile.dayNumber})" style="cursor:pointer;font-weight:800;color:${isComplete ? "var(--emerald)" : "var(--gold)"};">
                ${isComplete ? "✓ DONE" : "Mark ✓"}
              </span>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // ==========================================================================
  // VIEW 2: FULL 66-BOOK KJV & NKJV PARALLEL BIBLE ENGINE + BLB CONCORDANCE
  // ==========================================================================

  // Book & Chapter Picker Modal
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
    const chSection = document.getElementById("picker-chapters-section");
    if (chSection) chSection.scrollIntoView({ behavior: "smooth", block: "nearest" });
  };

  window.pickBookAndChapter = function (bookName, chNum) {
    state.currentBook = bookName;
    state.currentChapter = Number(chNum);
    window.closeBookPickerModal();
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
          <button class="book-pill-btn ${isActive ? "active" : ""}" onclick="window.selectPickerBook('${b.name}')">
            <span>${b.name}</span>
            <span style="font-size:0.7rem;color:var(--text-muted);font-family:var(--font-mono);">${b.chapters}</span>
          </button>
        `;
      })
      .join("");

    const activeBookObj = window.BIBLE_BOOKS.find((b) => b.name === state.pickerSelectedBook) || window.BIBLE_BOOKS[0];
    let chHtml = `
      <div style="display:flex;justify-content:space-between;align-items:center;">
        <div class="section-eyebrow" style="margin:0;">Select Chapter in ${activeBookObj.name} (${activeBookObj.chapters} Chapters)</div>
        <span style="font-size:0.73rem;color:var(--emerald);">Green = Read ✓</span>
      </div>
      <div class="chapters-number-grid">
    `;
    for (let c = 1; c <= activeBookObj.chapters; c++) {
      const chKey = `${activeBookObj.name}_${c}`;
      const isRead = Boolean(state.readChapters[chKey]);
      const isCurrent = activeBookObj.name === state.currentBook && c === state.currentChapter;
      chHtml += `
        <button class="chapter-num-btn ${isCurrent ? "active" : ""} ${isRead ? "is-read" : ""}" onclick="window.pickBookAndChapter('${activeBookObj.name}', ${c})">
          ${c}
        </button>
      `;
    }
    chHtml += `</div>`;
    chSec.innerHTML = chHtml;
  };

  // Navigate Previous (-1) or Next (+1) Chapter across all 1,189 chapters
  window.navigateChapter = function (delta) {
    const idx = ALL_CHAPTERS.findIndex(
      (c) => c.book === state.currentBook && c.chapter === state.currentChapter
    );
    if (idx === -1) return;
    const nextIdx = Math.min(ALL_CHAPTERS.length - 1, Math.max(0, idx + delta));
    const target = ALL_CHAPTERS[nextIdx];
    state.currentBook = target.book;
    state.currentChapter = target.chapter;
    renderBibleReader();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.setReaderVersionMode = function (mode) {
    state.readerMode = mode;
    document.querySelectorAll(".version-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-mode") === mode);
    });
    renderBibleReader();
  };

  window.toggleStrongsVisibility = function () {
    state.showStrongs = !state.showStrongs;
    document.body.classList.toggle("hide-strongs", !state.showStrongs);
    const btn = document.getElementById("toggle-strongs-btn");
    if (btn) btn.textContent = state.showStrongs ? "🔎 Strong's: ON" : "🔎 Strong's: OFF";
  };

  window.toggleContextMapPanel = function () {
    state.showContextMap = !state.showContextMap;
    const panel = document.getElementById("reader-study-context-map");
    const btn = document.getElementById("toggle-context-map-btn");
    if (panel) panel.classList.toggle("collapsed-panel", !state.showContextMap);
    if (btn) {
      btn.classList.toggle("active", state.showContextMap);
      btn.textContent = state.showContextMap
        ? "🗺️ Study Context & Chapter Map: ON"
        : "🗺️ Study Context & Chapter Map: OFF";
    }
  };

  window.adjustScriptureFontSize = function (delta) {
    state.fontSizeRem = Math.min(1.42, Math.max(0.86, +(state.fontSizeRem + delta * 0.08).toFixed(2)));
    document.documentElement.style.setProperty("--scripture-size", `${state.fontSizeRem}rem`);
    localStorage.setItem(STORAGE_KEYS.FONT_SIZE, String(state.fontSizeRem));
  };

  window.jumpToCuratedChapter = function (key) {
    const [book, ch] = key.split("_");
    state.currentBook = book;
    state.currentChapter = Number(ch);
    renderBibleReader();
  };

  // Mobile Bottom Sheet Controls for BLB Concordance
  window.openMobileConcordanceDrawer = function () {
    const aside = document.getElementById("concordance-inspector-aside");
    if (aside) {
      if (window.innerWidth <= 768) {
        aside.classList.add("mobile-sheet-open");
      } else {
        aside.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  };

  window.closeMobileConcordanceDrawer = function () {
    const aside = document.getElementById("concordance-inspector-aside");
    if (aside) aside.classList.remove("mobile-sheet-open");
  };

  // Convert bolls.life <S>7225</S> tags into standardized {H7225} / {G3056} interactive tokens
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
      const lex = window.STRONGS_LEXICON[code];
      const activeClass = state.activeStrongsCode === code ? "active-token" : "";
      const tooltip = lex ? `${lex.original} (${lex.translit}) — ${lex.definition}` : `Inspect Strong's ${code} (BLB)`;
      return `<span class="strongs-token ${activeClass}" onclick="window.inspectStrongs('${code}', true)" title="${tooltip.replace(/"/g, "&quot;")}">${code}</span>`;
    });
  }

  // Fetch FULL Chapter (All Verses) in BOTH Real KJV (with Strong's) and Real NKJV from bolls.life
  async function loadFullChapterKjvAndNkjv(bookName, chapterNum) {
    const chapterKey = `${bookName}_${chapterNum}`;
    if (chapterApiCache[chapterKey]) {
      return chapterApiCache[chapterKey];
    }

    const bookMeta = window.BIBLE_BOOKS.find((b) => b.name === bookName) || window.BIBLE_BOOKS[0];
    const curatedMeta = window.CURATED_CHAPTERS[chapterKey];

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
        verseCount: mergedVerses.length,
        theme: curatedMeta
          ? curatedMeta.theme
          : `${bookName} Chapter ${chapterNum} • Complete KJV (Strong's) & NKJV Parallel`,
        apostolicHeadline: curatedMeta
          ? curatedMeta.apostolicHeadline
          : `Reading all ${mergedVerses.length} verses of ${bookName} ${chapterNum} (${bookMeta.category}). Tap any Strong's Hebrew/Greek code to inspect its full Blue Letter Bible lexicon definition.`,
        verses: mergedVerses
      };

      chapterApiCache[chapterKey] = result;
      return result;
    } catch (err) {
      // Offline / Curated fallback
      if (curatedMeta) return curatedMeta;
      return {
        book: bookName,
        chapter: chapterNum,
        theme: `${bookName} Chapter ${chapterNum} (Offline Mode)`,
        apostolicHeadline: "Unable to reach the live Bible API right now. Please check your internet connection to stream all 1,189 chapters.",
        verses: [
          {
            v: 1,
            kjv: `Connect to the internet to load the complete KJV & NKJV text for ${bookName} ${chapterNum}.`,
            nkjv: `Connect to the internet to load the complete KJV & NKJV text for ${bookName} ${chapterNum}.`
          }
        ]
      };
    }
  }

  window.openLogModalWithVerse = function (passageRef, kjvQuote) {
    window.switchTab("journal");
    const refInput = document.getElementById("log-passage-input");
    const titleInput = document.getElementById("log-title-input");
    const lexInput = document.getElementById("log-lexicon-input");
    if (refInput) refInput.value = passageRef;
    if (titleInput && !titleInput.value) titleInput.value = `Apostolic Exegesis on ${passageRef}`;
    if (lexInput) {
      lexInput.value = `"${kjvQuote.replace(/\{[HG]\d+\}/g, "")}" — [Add First Mention & Strong's Breakdown]`;
      lexInput.focus();
    }
  };

  async function renderBibleReader() {
    const bookName = state.currentBook;
    const chapterNum = state.currentChapter;
    const chapterKey = `${bookName}_${chapterNum}`;
    const isChapterRead = Boolean(state.readChapters[chapterKey]);

    // Update Book/Chapter Picker Label
    const pickerLabel = document.getElementById("active-book-chapter-label");
    if (pickerLabel) pickerLabel.textContent = `${bookName} ${chapterNum}`;

    // Immediately render Study Bible Context & Interactive Chapter Map
    renderStudyBibleContextAndMap(bookName, chapterNum);

    // Show sleek loading skeleton while streaming complete chapter
    const versesEl = document.getElementById("reader-verses-container");
    if (versesEl && !chapterApiCache[chapterKey]) {
      versesEl.innerHTML = `
        <div class="loading-skeleton">
          ✨ Loading complete KJV (Strong's) & NKJV text for <strong>${bookName} ${chapterNum}</strong>...
        </div>
      `;
    }

    const chapterData = await loadFullChapterKjvAndNkjv(bookName, chapterNum);
    // Ensure user didn't navigate away while fetching
    if (state.currentBook !== bookName || state.currentChapter !== chapterNum) return;

    const headerEl = document.getElementById("reader-chapter-banner");
    if (headerEl) {
      headerEl.innerHTML = `
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:0.9rem;flex-wrap:wrap;">
          <div style="flex:1;min-width:220px;">
            <div class="banner-theme">${chapterData.book} ${chapterData.chapter} • ${chapterData.theme}</div>
            <div class="banner-desc">${chapterData.apostolicHeadline}</div>
          </div>
          <button class="${isChapterRead ? "btn-gold" : "btn-outline"}" onclick="window.toggleChapterRead('${chapterKey}'); renderBibleReader();">
            ${isChapterRead ? "✓ Chapter Read in 365 Plan" : "☐ Mark Chapter Read"}
          </button>
        </div>
      `;
    }

    if (versesEl) {
      const isSingle = state.readerMode !== "parallel";
      versesEl.innerHTML = chapterData.verses
        .map((vObj) => {
          const refLabel = `${chapterData.book} ${chapterData.chapter}:${vObj.v}`;
          const safeQuote = (vObj.nkjv || vObj.kjv || "").replace(/'/g, "\\'").replace(/"/g, "&quot;");

          return `
            <div class="verse-row">
              <div class="verse-row-header">
                <span class="verse-ref-badge">${refLabel}</span>
                <button class="verse-action-btn" onclick="window.openLogModalWithVerse('${refLabel}', '${safeQuote}')">
                  ✍️ Log Note
                </button>
              </div>
              <div class="parallel-columns ${isSingle ? "single-col" : ""}">
                ${
                  state.readerMode === "parallel" || state.readerMode === "kjv"
                    ? `
                      <div class="version-col">
                        <div><span class="version-tag">KJV + Strong's</span></div>
                        <div>${formatTextWithStrongsTokens(vObj.kjv)}</div>
                      </div>
                    `
                    : ""
                }
                ${
                  state.readerMode === "parallel" || state.readerMode === "nkjv"
                    ? `
                      <div class="version-col">
                        <div><span class="version-tag">NKJV</span></div>
                        <div>${formatTextWithStrongsTokens(vObj.nkjv)}</div>
                      </div>
                    `
                    : ""
                }
              </div>
            </div>
          `;
        })
        .join("");
    }

    // Bottom Chapter Navigation & Mark Complete Bar
    const footerEl = document.getElementById("reader-chapter-footer");
    if (footerEl) {
      footerEl.innerHTML = `
        <button class="btn-outline" onclick="window.navigateChapter(-1)">← Previous Chapter</button>
        <button class="${isChapterRead ? "btn-outline" : "btn-gold"}" onclick="window.toggleChapterRead('${chapterKey}'); renderBibleReader();">
          ${isChapterRead ? "✓ Completed in 365 Tracker" : "✓ Mark " + bookName + " " + chapterNum + " Read"}
        </button>
        <button class="btn-outline" onclick="window.navigateChapter(1)">Next Chapter →</button>
      `;
    }

    renderConcordanceInspector();
  }

  // Interactive Study Bible Context & SVG Geographical Atlas
  window.inspectMapLocation = function (locId) {
    const loc = window.BIBLICAL_LOCATIONS && window.BIBLICAL_LOCATIONS[locId];
    if (!loc) return;
    const detailBar = document.getElementById("active-map-loc-detail");
    if (detailBar) {
      detailBar.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.25rem;">
          <strong style="color:var(--gold-bright);font-size:0.86rem;">📍 ${loc.name} (${loc.ancientName})</strong>
          <span style="font-family:var(--font-mono);font-size:0.71rem;color:var(--sky);">Lat ${loc.lat}°N, Lon ${loc.lon}°E • ${loc.elevation}</span>
        </div>
        <div style="font-size:0.76rem;color:var(--text-muted);margin-bottom:0.2rem;">Modern Region: ${loc.modernRegion}</div>
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
        const radius = isPrimary ? 7.5 : isRouteStop ? 5 : 3.2;
        const fill = isPrimary ? "#f7db83" : isRouteStop ? "#38bdf8" : "rgba(148,163,184,0.45)";
        const stroke = isPrimary ? "#ffffff" : isRouteStop ? "#090d16" : "none";
        const showLabel = isPrimary || isRouteStop;

        return `
          <g class="map-pin-group" onclick="window.inspectMapLocation('${loc.id}')">
            ${
              isPrimary
                ? `<circle cx="${loc.svgX}" cy="${loc.svgY}" r="14" fill="rgba(224,184,76,0.28)">
                     <animate attributeName="r" values="10;19;10" dur="2.2s" repeatCount="indefinite" />
                   </circle>`
                : ""
            }
            <circle cx="${loc.svgX}" cy="${loc.svgY}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
            ${
              showLabel
                ? `<text x="${loc.svgX}" y="${loc.svgY - (isPrimary ? 11 : 8)}" text-anchor="middle" fill="${isPrimary ? "#f7db83" : "#cbd5e1"}" font-size="${isPrimary ? "11.5" : "9.5"}" font-weight="${isPrimary ? "800" : "600"}" font-family="Plus Jakarta Sans, sans-serif" style="paint-order:stroke;stroke:#070a12;stroke-width:3px;stroke-linejoin:round;">
                     ${loc.name.split(" (")[0].split(" &")[0]}
                   </text>`
                : ""
            }
          </g>
        `;
      })
      .join("");

    container.innerHTML = `
      <div class="study-context-card">
        <div class="section-eyebrow">Study Bible Exegetical Context • ${info.bookName} ${info.chapterNum}</div>
        <h4 class="section-title" style="font-size:1.06rem;margin-bottom:0.65rem;">Historical Setting & Christocentric Lens</h4>

        <div class="study-meta-pills">
          <span class="study-meta-pill">✍️ <strong>Author:</strong> ${info.author}</span>
          <span class="study-meta-pill">⏳ <strong>Date:</strong> ${info.dateWritten}</span>
          <span class="study-meta-pill">🏛️ <strong>Era:</strong> ${info.dispensation}</span>
        </div>

        <div class="study-context-block">
          <div class="study-context-label">📜 Chapter & Book Historical Context</div>
          <div>${info.historicalSetting}</div>
        </div>

        <div class="study-context-block">
          <div class="study-context-label">👑 Christ in ${info.bookName}</div>
          <div>${info.christocentricThread}</div>
        </div>

        <div class="study-context-block">
          <div class="study-context-label">🔥 Apostolic Exegesis Key (Osayi • Agboola • Adoma)</div>
          <div>${info.apostolicKey}</div>
        </div>
      </div>

      <div class="study-map-card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.4rem;">
          <div>
            <div class="section-eyebrow">Interactive Study Bible Atlas</div>
            <h4 class="section-title" style="font-size:1rem;">${info.mapCaption}</h4>
          </div>
          <span class="verse-ref-badge" style="font-size:0.68rem;">Tap Pins</span>
        </div>

        <div class="biblical-map-stage">
          <svg viewBox="0 0 820 410" class="biblical-svg-map" role="img" aria-label="Biblical Map for ${info.bookName} ${info.chapterNum}">
            <defs>
              <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#071426" />
                <stop offset="100%" stop-color="#0e2440" />
              </linearGradient>
              <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1c273b" />
                <stop offset="100%" stop-color="#27364f" />
              </linearGradient>
            </defs>

            <rect width="820" height="410" fill="url(#seaGrad)" />
            <g stroke="rgba(224,184,76,0.08)" stroke-width="1" stroke-dasharray="3,3">
              <line x1="0" y1="100" x2="820" y2="100" />
              <line x1="0" y1="200" x2="820" y2="200" />
              <line x1="0" y1="300" x2="820" y2="300" />
              <line x1="200" y1="0" x2="200" y2="410" />
              <line x1="400" y1="0" x2="400" y2="410" />
              <line x1="600" y1="0" x2="600" y2="410" />
            </g>

            <path d="M 35,40 L 95,45 L 135,115 L 115,145 L 85,115 L 65,125 L 45,75 Z" fill="url(#landGrad)" stroke="rgba(224,184,76,0.28)" stroke-width="1.2" />
            <path d="M 190,55 L 275,65 L 270,120 L 250,165 L 210,175 L 195,125 Z" fill="url(#landGrad)" stroke="rgba(224,184,76,0.28)" stroke-width="1.2" />
            <path d="M 300,85 L 490,75 L 680,70 L 815,85 L 815,405 L 330,405 L 335,310 L 415,310 L 435,365 L 455,380 L 470,340 L 472,295 L 478,240 L 505,180 L 455,175 L 335,180 L 305,140 Z" fill="url(#landGrad)" stroke="rgba(224,184,76,0.3)" stroke-width="1.2" />

            <path d="M 390,405 Q 402,355 405,320 M 392,312 L 405,320 L 418,312" fill="none" stroke="#38bdf8" stroke-width="2.2" opacity="0.7" />
            <path d="M 498,241 L 495,254 L 493,286" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.85" />
            <ellipse cx="495" cy="252" rx="3" ry="4.5" fill="#38bdf8" />
            <ellipse cx="493" cy="291" rx="3.5" ry="7" fill="#38bdf8" />
            <path d="M 650,115 Q 575,160 620,220 Q 680,260 755,295" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.7" />
            <path d="M 675,115 Q 660,175 705,235 Q 740,275 755,295" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.7" />

            <text x="200" y="245" fill="rgba(56,189,248,0.45)" font-size="11" font-style="italic" font-family="Lora, serif">MEDITERRANEAN SEA</text>
            <text x="640" y="218" fill="rgba(224,184,76,0.38)" font-size="10" font-weight="700" letter-spacing="2">MESOPOTAMIA</text>
            <text x="360" y="130" fill="rgba(224,184,76,0.38)" font-size="10" font-weight="700" letter-spacing="2">ASIA MINOR</text>
            <text x="355" y="365" fill="rgba(224,184,76,0.38)" font-size="10" font-weight="700" letter-spacing="2">EGYPT</text>

            ${
              routeLocs.length > 1
                ? `<polyline points="${polylinePoints}" fill="none" stroke="#e0b84c" stroke-width="2.5" stroke-dasharray="5,4" opacity="0.88" />`
                : ""
            }
            ${pinsSvg}
          </svg>
        </div>

        <div id="active-map-loc-detail" class="map-loc-detail-bar">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.25rem;">
            <strong style="color:var(--gold-bright);font-size:0.86rem;">📍 ${activeLoc.name} (${activeLoc.ancientName})</strong>
            <span style="font-family:var(--font-mono);font-size:0.71rem;color:var(--sky);">Lat ${activeLoc.lat}°N, Lon ${activeLoc.lon}°E • ${activeLoc.elevation}</span>
          </div>
          <div style="font-size:0.76rem;color:var(--text-muted);margin-bottom:0.2rem;">Modern Region: ${activeLoc.modernRegion}</div>
          <div>${activeLoc.spiritualSignificance}</div>
        </div>
      </div>
    `;
  }

  // Live 14,000+ Strong's Concordance Lookup (Curated Apostolic + Live BDBT Blue Letter Bible API)
  window.inspectStrongs = async function (code, openSheetOnMobile = false) {
    const cleanCode = (code || "").toUpperCase().trim();
    if (!cleanCode) return;
    state.activeStrongsCode = cleanCode;

    if (openSheetOnMobile && window.innerWidth <= 768) {
      window.openMobileConcordanceDrawer();
    }

    document.querySelectorAll(".verses-container .strongs-token").forEach((el) => {
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

    // Direct Strong's code lookup option (e.g. H1254 or G26)
    let directHtml = "";
    if (/^[hg]\d{1,4}$/i.test(q)) {
      const upper = q.toUpperCase();
      directHtml = `
        <div onclick="window.inspectStrongs('${upper}')" style="padding:0.52rem 0.75rem;background:var(--gold-glow);border:1px solid var(--gold);border-radius:8px;margin-top:0.4rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">
          <span>🔎 Lookup Exact Strong's <strong style="color:var(--gold-bright);font-family:var(--font-mono);">${upper}</strong></span>
          <span style="font-size:0.73rem;color:var(--gold-bright);font-weight:700;">Open →</span>
        </div>
      `;
    }

    const matches = Object.values(window.STRONGS_LEXICON).filter((item) => {
      return (
        item.number.toLowerCase().includes(q) ||
        item.translit.toLowerCase().includes(q) ||
        item.original.toLowerCase().includes(q) ||
        item.definition.toLowerCase().includes(q) ||
        item.apostolicExegesis.toLowerCase().includes(q)
      );
    });

    resultsEl.innerHTML =
      directHtml +
      matches
        .map(
          (m) => `
        <div onclick="window.inspectStrongs('${m.number}')" style="padding:0.5rem 0.72rem;background:var(--bg-elevated);border:1px solid var(--border-hairline);border-radius:8px;margin-top:0.35rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">
          <span><strong style="color:var(--sky);font-family:var(--font-mono);">${m.number}</strong> • ${m.original} (<em>${m.translit}</em>)</span>
          <span style="font-size:0.73rem;color:var(--gold);">Inspect →</span>
        </div>
      `
        )
        .join("");
  };

  async function renderConcordanceInspector() {
    const panel = document.getElementById("blb-lexicon-content");
    if (!panel) return;

    const code = state.activeStrongsCode || "G3056";
    const curated = window.STRONGS_LEXICON[code];

    if (curated) {
      panel.innerHTML = `
        <div class="lexicon-badge-header">
          <div>
            <span class="strongs-token" style="margin:0 0 0.25rem 0;vertical-align:baseline;">${curated.number} • ${curated.lang}</span>
            <div class="lexicon-original-word">${curated.original}</div>
          </div>
          <div style="text-align:right;">
            <div style="font-size:0.95rem;font-weight:700;color:var(--text-primary);">${curated.translit}</div>
            <div style="font-size:0.75rem;color:var(--text-muted);">/${curated.pronunciation}/</div>
          </div>
        </div>

        <div class="lexicon-meta-grid">
          <div class="lex-meta-item">
            <div class="lex-meta-label">Part of Speech</div>
            <div class="lex-meta-val">${curated.partOfSpeech}</div>
          </div>
          <div class="lex-meta-item">
            <div class="lex-meta-label">Lexicon</div>
            <div class="lex-meta-val">${curated.lang} + Apostolic</div>
          </div>
        </div>

        <div class="lex-block">
          <div class="lex-block-title">Blue Letter Bible Strong's Definition</div>
          <div class="lex-block-body">${curated.definition}</div>
        </div>

        <div class="lex-block">
          <div class="lex-block-title">Thayer's / BDB Outline of Biblical Usage</div>
          <ul style="padding-left:1.15rem;font-size:0.82rem;color:var(--text-secondary);line-height:1.55;">
            ${curated.blbOutline.map((line) => `<li>${line}</li>`).join("")}
          </ul>
        </div>

        <div class="lex-block">
          <div class="lex-block-title">Law of First Mention</div>
          <div class="lex-block-body">${curated.firstMention}</div>
        </div>

        <div class="lex-block apostolic-highlight">
          <div class="lex-block-title">🔥 Apostolic Exegesis (Osayi • Agboola • Adoma)</div>
          <div class="lex-block-body">${curated.apostolicExegesis}</div>
        </div>

        <div class="lex-block" style="margin-bottom:0;">
          <div class="lex-block-title">Key Concordance Cross-References</div>
          <div style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-top:0.35rem;">
            ${curated.keyRefs.map((ref) => `<span class="verse-ref-badge" style="font-size:0.71rem;">${ref}</span>`).join("")}
          </div>
        </div>
      `;
      return;
    }

    // Fetch live from Bolls BDB/Thayer's Dictionary for any of the 14,000+ Hebrew/Greek words!
    if (strongsApiCache[code]) {
      renderLiveStrongsEntry(panel, code, strongsApiCache[code]);
      return;
    }

    panel.innerHTML = `<div class="loading-skeleton">🔎 Loading Blue Letter Bible lexicon for <strong>${code}</strong>...</div>`;
    try {
      const resp = await fetch(`https://bolls.life/dictionary-definition/BDBT/${encodeURIComponent(code)}/`);
      const arr = await resp.json();
      if (Array.isArray(arr) && arr.length > 0) {
        strongsApiCache[code] = arr[0];
        if (state.activeStrongsCode === code) {
          renderLiveStrongsEntry(panel, code, arr[0]);
        }
      } else {
        panel.innerHTML = `<div class="lex-block">No lexicon entry found for <strong>${code}</strong>.</div>`;
      }
    } catch (e) {
      panel.innerHTML = `<div class="lex-block">Unable to load live lexicon for <strong>${code}</strong> while offline.</div>`;
    }
  }

  function renderLiveStrongsEntry(panel, code, apiObj) {
    const lang = code.startsWith("H") ? "Hebrew (BDB)" : "Greek (Thayer's)";
    const rawHtml = apiObj.definition || "";
    panel.innerHTML = `
      <div class="lexicon-badge-header">
        <div>
          <span class="strongs-token" style="margin:0 0 0.25rem 0;vertical-align:baseline;">${code} • ${lang}</span>
          <div class="lexicon-original-word" style="font-size:1.35rem;">${apiObj.lexeme || code}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.9rem;font-weight:700;color:var(--text-primary);">${apiObj.transliteration || ""}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);">${apiObj.pronunciation || ""}</div>
        </div>
      </div>

      <div class="lex-block">
        <div class="lex-block-title">Blue Letter Bible (BDB / Thayer's) Complete Definition</div>
        <div class="lex-block-body">${rawHtml}</div>
      </div>

      <div class="lex-block apostolic-highlight" style="margin-bottom:0;">
        <div class="lex-block-title">✍️ Study Tip</div>
        <div class="lex-block-body">Trace the Law of First Mention of <strong>${code}</strong> across the Old and New Testaments and record your Christocentric revelation in the Study Logbook.</div>
      </div>
    `;
  }

  // ==========================================================================
  // VIEW 3: APOSTOLIC TOPIC PRE-STUDIES
  // ==========================================================================

  window.selectApostolicTopic = function (topicId) {
    state.activeTopicId = topicId;
    renderApostolicTopics();
    const detail = document.getElementById("apostolic-topic-detail");
    if (detail && window.innerWidth <= 1024) {
      detail.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  window.logTopicToJournal = function (topicId) {
    const topic = window.APOSTOLIC_TOPICS.find((t) => t.id === topicId);
    if (!topic) return;
    window.switchTab("journal");
    document.getElementById("log-title-input").value = `Pre-Study: ${topic.title}`;
    document.getElementById("log-passage-input").value = topic.governingScriptures.map((g) => g.ref).join("; ");
    document.getElementById("log-lexicon-input").value = topic.pillars.firstMentionAndTypology;
    document.getElementById("log-christ-input").value = topic.pillars.thesis;
    document.getElementById("log-rhema-input").value = topic.pillars.altarAndLegislation;
  };

  function renderApostolicTopics() {
    const listEl = document.getElementById("apostolic-topics-nav");
    const detailEl = document.getElementById("apostolic-topic-detail");
    if (!listEl || !detailEl) return;

    listEl.innerHTML = window.APOSTOLIC_TOPICS.map((t) => {
      const isActive = t.id === state.activeTopicId;
      return `
        <div class="topic-nav-item ${isActive ? "active" : ""}" onclick="window.selectApostolicTopic('${t.id}')">
          <div class="topic-cat-tag">${t.category} • ${t.readingTime}</div>
          <div class="topic-nav-title">${t.title}</div>
          <div style="font-size:0.78rem;color:var(--text-muted);line-height:1.38;">${t.subtitle}</div>
          <div class="topic-ministers">
            ${t.ministerTags.map((m) => `<span class="minister-pill">${m}</span>`).join("")}
          </div>
        </div>
      `;
    }).join("");

    const activeTopic =
      window.APOSTOLIC_TOPICS.find((t) => t.id === state.activeTopicId) || window.APOSTOLIC_TOPICS[0];

    detailEl.innerHTML = `
      <div class="card-header" style="border-bottom:1px solid var(--border-hairline);padding-bottom:1rem;margin-bottom:1.25rem;">
        <div>
          <div class="section-eyebrow">${activeTopic.category} • 6-Pillar Systematic Breakdown</div>
          <h2 class="section-title" style="font-size:1.45rem;">${activeTopic.title}</h2>
          <p style="color:var(--text-secondary);font-size:0.9rem;margin-top:0.25rem;">${activeTopic.subtitle}</p>
          <div class="topic-ministers" style="margin-top:0.6rem;">
            ${activeTopic.ministerTags.map((m) => `<span class="minister-pill">🎙️ ${m}</span>`).join("")}
          </div>
        </div>
        <button class="btn-gold" onclick="window.logTopicToJournal('${activeTopic.id}')">
          ✍️ Clone to Logbook
        </button>
      </div>

      <div class="pillar-section">
        <span class="pillar-number-badge">Pillar 01 • Core Apostolic Thesis & Governing Scriptures</span>
        <h3 class="pillar-heading">Eternal Counsel & Scriptural Foundation (KJV / NKJV)</h3>
        <p style="font-size:0.92rem;color:var(--text-primary);margin-bottom:1rem;line-height:1.7;">${activeTopic.pillars.thesis}</p>
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          ${activeTopic.governingScriptures
            .map(
              (gs) => `
              <div class="verse-row" style="background:var(--bg-surface-solid);">
                <div class="verse-row-header"><span class="verse-ref-badge">${gs.ref}</span></div>
                <div class="parallel-columns">
                  <div class="version-col" style="font-size:0.89rem;"><div><span class="version-tag">KJV</span></div><div>${gs.kjv}</div></div>
                  <div class="version-col" style="font-size:0.89rem;"><div><span class="version-tag">NKJV</span></div><div>${gs.nkjv}</div></div>
                </div>
              </div>
            `
            )
            .join("")}
        </div>
      </div>

      <div class="pillar-section">
        <span class="pillar-number-badge">Pillar 02 • Law of First Mention & Old Testament Shadow</span>
        <h3 class="pillar-heading">Tracing the Pattern from Genesis & The Torah</h3>
        <p style="font-size:0.91rem;color:var(--text-secondary);line-height:1.7;">${activeTopic.pillars.firstMentionAndTypology}</p>
      </div>

      <div class="pillar-section">
        <span class="pillar-number-badge">Pillar 03 • Blue Letter Bible Lexical Decomposition</span>
        <h3 class="pillar-heading">Hebrew & Greek Word Architecture</h3>
        <div class="what-christ-brought-grid">
          ${activeTopic.pillars.lexicalBreakdown
            .map(
              (lb) => `
              <div class="brought-item-card">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;">
                  <span class="brought-item-title" style="margin:0;">${lb.word}</span>
                  <span class="strongs-token" style="vertical-align:baseline;" onclick="window.switchTab('reader'); window.inspectStrongs('${lb.code.split(" ")[0]}', true);">${lb.code}</span>
                </div>
                <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.55;">${lb.insight}</p>
              </div>
            `
            )
            .join("")}
        </div>
      </div>

      <div class="pillar-section">
        <span class="pillar-number-badge">Pillar 04 • New Creation Substance & What Christ Brought</span>
        <h3 class="pillar-heading">Legal Transaction vs. Vital Experiential Reality</h3>
        <div class="what-christ-brought-grid">
          ${activeTopic.pillars.whatChristBrought
            .map(
              (item) => `
              <div class="brought-item-card">
                <div class="brought-item-title">${item.title}</div>
                <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.6;">${item.detail}</p>
              </div>
            `
            )
            .join("")}
        </div>
      </div>

      <div class="pillar-section" style="border-left:4px solid var(--gold);background:linear-gradient(145deg, var(--bg-elevated), var(--gold-glow));">
        <span class="pillar-number-badge">Pillar 05 • Apostolic Synthesis</span>
        <h3 class="pillar-heading">Line-Upon-Line Apostolic Exegesis</h3>
        <p style="font-size:0.92rem;color:var(--text-primary);line-height:1.7;">${activeTopic.pillars.apostolicSynthesis}</p>
      </div>

      <div class="pillar-section" style="border-left:4px solid var(--crimson);background:linear-gradient(145deg, var(--bg-elevated), var(--crimson-soft));margin-bottom:0;">
        <span class="pillar-number-badge" style="background:var(--crimson);color:#fff;">Pillar 06 • Priestly Altar Response</span>
        <h3 class="pillar-heading">Spoken Rhema Decree & Consecration</h3>
        <p style="font-family:var(--font-scripture);font-style:italic;font-size:0.97rem;color:var(--text-primary);line-height:1.75;">
          "${activeTopic.pillars.altarAndLegislation}"
        </p>
      </div>
    `;
  }

  // ==========================================================================
  // VIEW 4: STUDY NOTES & EXEGESIS LOGBOOK
  // ==========================================================================

  window.saveNewStudyLog = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const title = (document.getElementById("log-title-input").value || "").trim();
    const passage = (document.getElementById("log-passage-input").value || "").trim();
    const topicTag = document.getElementById("log-topic-select").value || "General Exegesis";
    const ministerPattern = document.getElementById("log-minister-select").value || "Apostle Arome Osayi";
    const firstMentionAndLexicon = (document.getElementById("log-lexicon-input").value || "").trim();
    const christSubstance = (document.getElementById("log-christ-input").value || "").trim();
    const rhemaLegislation = (document.getElementById("log-rhema-input").value || "").trim();

    if (!title || !passage) return;

    const newEntry = {
      id: "log-" + Date.now(),
      date: toLocalISOString(new Date()),
      title,
      passage,
      topicTag,
      ministerPattern,
      firstMentionAndLexicon,
      christSubstance,
      rhemaLegislation
    };
    state.studyLogs.unshift(newEntry);
    saveStudyLogs();
    document.getElementById("study-log-form").reset();
    renderStudyLogs();
    if (window.RWH_CLOUD) {
      window.RWH_CLOUD.syncUpsertStudyLog(newEntry);
    }
  };

  window.deleteStudyLog = function (logId) {
    state.studyLogs = state.studyLogs.filter((l) => l.id !== logId);
    saveStudyLogs();
    renderStudyLogs();
    if (window.RWH_CLOUD) {
      window.RWH_CLOUD.syncDeleteStudyLog(logId);
    }
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

  function renderStudyLogs(searchQuery = "") {
    const listEl = document.getElementById("study-logs-list");
    const countBadge = document.getElementById("nav-journal-badge");
    if (countBadge) countBadge.textContent = state.studyLogs.length;
    if (!listEl) return;

    const q = (searchQuery || "").trim().toLowerCase();
    const filtered = state.studyLogs.filter((item) => {
      if (!q) return true;
      return (
        item.title.toLowerCase().includes(q) ||
        item.passage.toLowerCase().includes(q) ||
        item.topicTag.toLowerCase().includes(q) ||
        (item.firstMentionAndLexicon || "").toLowerCase().includes(q) ||
        (item.christSubstance || "").toLowerCase().includes(q)
      );
    });

    if (filtered.length === 0) {
      listEl.innerHTML = `<div class="card-panel" style="text-align:center;color:var(--text-muted);padding:2.2rem;">No study log entries match your filter.</div>`;
      return;
    }

    listEl.innerHTML = filtered
      .map(
        (entry) => `
        <div class="log-entry-card">
          <div class="log-entry-meta">
            <div style="display:flex;flex-wrap:wrap;gap:0.35rem;align-items:center;">
              <span class="verse-ref-badge">${entry.passage}</span>
              <span class="minister-pill">${entry.topicTag}</span>
              <span class="minister-pill">🎙️ ${entry.ministerPattern}</span>
            </div>
            <div style="display:flex;align-items:center;gap:0.55rem;">
              <span style="font-size:0.74rem;color:var(--text-muted);font-family:var(--font-mono);">${entry.date}</span>
              <button class="verse-action-btn" onclick="window.deleteStudyLog('${entry.id}')" title="Delete Entry">✕</button>
            </div>
          </div>

          <h3 style="font-family:var(--font-display);font-size:1.1rem;color:var(--text-primary);margin-bottom:0.72rem;">${entry.title}</h3>

          ${
            entry.firstMentionAndLexicon
              ? `<div style="margin-bottom:0.65rem;font-size:0.85rem;"><strong style="color:var(--sky);text-transform:uppercase;font-size:0.71rem;letter-spacing:0.05em;">1. First Mention & Hebrew/Greek Lexicon:</strong><div style="color:var(--text-secondary);margin-top:0.15rem;">${entry.firstMentionAndLexicon}</div></div>`
              : ""
          }
          ${
            entry.christSubstance
              ? `<div style="margin-bottom:0.65rem;font-size:0.85rem;"><strong style="color:var(--gold);text-transform:uppercase;font-size:0.71rem;letter-spacing:0.05em;">2. Christocentric Substance:</strong><div style="color:var(--text-secondary);margin-top:0.15rem;">${entry.christSubstance}</div></div>`
              : ""
          }
          ${
            entry.rhemaLegislation
              ? `<div style="padding:0.65rem 0.85rem;background:var(--bg-surface-solid);border-left:3px solid var(--crimson);border-radius:8px;font-size:0.85rem;"><strong style="color:var(--crimson);text-transform:uppercase;font-size:0.7rem;letter-spacing:0.05em;">3. Spoken Rhema Legislation:</strong><div style="color:var(--text-primary);font-style:italic;margin-top:0.15rem;">"${entry.rhemaLegislation}"</div></div>`
              : ""
          }
        </div>
      `
      )
      .join("");
  }

  window.filterStudyLogs = function (val) {
    renderStudyLogs(val);
  };

  // Sync Desktop & Mobile Navigation Tabs
  window.switchTab = function (tabId) {
    state.activeTab = tabId;
    document.querySelectorAll(".nav-btn, .mobile-tab-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
    });
    document.querySelectorAll(".view-section").forEach((sec) => {
      sec.classList.toggle("active", sec.id === `view-${tabId}`);
    });
    window.closeMobileConcordanceDrawer();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  window.toggleTheme = function () {
    const current = document.documentElement.getAttribute("data-theme");
    if (current === "parchment") {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem(STORAGE_KEYS.THEME, "royal-dark");
    } else {
      document.documentElement.setAttribute("data-theme", "parchment");
      localStorage.setItem(STORAGE_KEYS.THEME, "parchment");
    }
    if (window.RWH_CLOUD) {
      window.RWH_CLOUD.syncSettings();
    }
  };

  // Expose controlled state bridge for Supabase Cloud Sync
  window.RWH_APP = {
    getStateSnapshot: function () {
      return {
        startDateISO: state.startDateISO,
        theme: document.documentElement.getAttribute("data-theme") === "parchment" ? "parchment" : "royal-dark",
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
        if (merged.theme === "parchment") {
          document.documentElement.setAttribute("data-theme", "parchment");
        } else {
          document.documentElement.removeAttribute("data-theme");
        }
        localStorage.setItem(STORAGE_KEYS.THEME, merged.theme);
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
        state.studyLogs = merged.studyLogs;
        saveStudyLogs();
      }
      renderAllTrackerViews();
      renderStudyLogs();
      if (state.activeTab === "reader") {
        renderBibleReader();
      }
    }
  };

  // Boot App
  document.addEventListener("DOMContentLoaded", function () {
    loadState();
    renderAllTrackerViews();
    renderBibleReader();
    renderApostolicTopics();
    renderStudyLogs();
  });
})();
