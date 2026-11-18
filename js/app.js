/**
 * Remnant Word Hub — Main Application Controller
 * Features:
 * 1. 365-Day Yearly Tile Bible Study Plan (Starting Today, 1,189 Chapters across 365 Days)
 * 2. Dynamic Completion Date Forecaster & Real-Time Pace Engine
 * 3. Dual KJV / NKJV Parallel & Single Reader with Interactive Strong's Concordance
 * 4. Apostolic Pre-Studies & Core Concepts of Christ (Apostle Arome Osayi, Tolu Agboola, Gideon Adoma Framework)
 * 5. Apostolic Study Notes & Exegesis Logbook with Export/Import Backup
 */

(function () {
  const STORAGE_KEYS = {
    START_DATE: "rwh_plan_start_date_v1",
    READ_CHAPTERS: "rwh_read_chapters_v1",
    STUDY_LOGS: "rwh_study_logs_v1",
    THEME: "rwh_theme_v1"
  };

  // State
  let state = {
    activeTab: "tracker",
    startDateISO: "",
    readChapters: {}, // { "Genesis_1": "2026-11-18", ... }
    yearPlan: [], // 365 days array
    tileFilter: "all", // all | completed | remaining | ot | nt
    tileSearch: "",
    selectedDayNumber: 1,
    currentBook: "John",
    currentChapter: 1,
    readerMode: "parallel", // parallel | kjv | nkjv
    activeStrongsCode: "G3056",
    activeTopicId: "core-concepts-of-christ",
    studyLogs: []
  };

  // Helper: Format YYYY-MM-DD in local time
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
    const opts = {
      weekday: "short",
      month: "short",
      day: "numeric"
    };
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
    return list; // Exactly 1,189 chapters
  }

  const ALL_CHAPTERS = buildAllCanonicalChapters();
  const TOTAL_BIBLE_CHAPTERS = ALL_CHAPTERS.length; // 1189

  // Distribute 1,189 chapters across 365 days starting from state.startDateISO
  function generate365DayPlan(startISO) {
    const startDate = parseLocalISO(startISO);
    const plan = [];
    let cursor = 0;

    for (let dayIndex = 0; dayIndex < 365; dayIndex++) {
      // Exact integer distribution: floor((dayIndex + 1) * 1189 / 365) - floor(dayIndex * 1189 / 365)
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

  // Initialize Persistence
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

  // Calculate Dynamic Finish Date & Pace Metrics
  function computeCompletionForecast() {
    const startDate = parseLocalISO(state.startDateISO);
    const todayDate = parseLocalISO(toLocalISOString(new Date()));
    const targetFinishDate = addDays(startDate, 364); // 365th day inclusive

    const chaptersReadCount = Object.keys(state.readChapters).length;
    const chaptersRemaining = Math.max(0, TOTAL_BIBLE_CHAPTERS - chaptersReadCount);
    const percentComplete = ((chaptersReadCount / TOTAL_BIBLE_CHAPTERS) * 100).toFixed(1);

    // Days elapsed since start (minimum 1 day so today's reading immediately impacts forecast)
    const rawElapsed = Math.floor((todayDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    const daysElapsed = Math.max(1, rawElapsed);

    // Expected chapters read by end of current plan day
    let expectedChaptersByToday = 0;
    const activeDayIdx = Math.min(365, daysElapsed);
    for (let i = 0; i < activeDayIdx; i++) {
      expectedChaptersByToday += state.yearPlan[i].chapters.length;
    }

    // Count how many full 365-day tiles are 100% completed
    let completedTilesCount = 0;
    state.yearPlan.forEach((tile) => {
      const allDone = tile.chapters.every((ch) => Boolean(state.readChapters[ch.key]));
      if (allDone) completedTilesCount++;
    });

    // Dynamic Projected Finish Date calculation:
    // Standard daily rate = 1189 / 365 (~3.2575 chapters/day).
    // 1) Schedule Shift Model: Every chapter read shifts your remaining chapters at the standard daily rate,
    //    AND if your actual daily pace (chaptersReadCount / daysElapsed) exceeds or trails standard rate, we show both!
    const standardDailyQuota = TOTAL_BIBLE_CHAPTERS / 365;
    const chapterDeltaVsSchedule = chaptersReadCount - expectedChaptersByToday;
    const daysAheadOrBehind = Math.round(chapterDeltaVsSchedule / standardDailyQuota);

    // Velocity-based projection when user has read chapters:
    let projectedDaysRemaining;
    let effectiveVelocity;
    if (chaptersReadCount === 0) {
      effectiveVelocity = standardDailyQuota;
      projectedDaysRemaining = 365;
    } else {
      // Blend actual pace over elapsed days so completing today's tile immediately shows exact finish date!
      effectiveVelocity = chaptersReadCount / daysElapsed;
      projectedDaysRemaining = Math.ceil(chaptersRemaining / effectiveVelocity);
    }

    const projectedFinishDate =
      chaptersRemaining === 0
        ? todayDate
        : addDays(todayDate, Math.max(0, projectedDaysRemaining));

    // Also compute quota-based finish date (targetFinishDate shifted by daysAheadOrBehind)
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

  // Toggle a single chapter read/unread
  window.toggleChapterRead = function (chapterKey, stopProp) {
    if (stopProp && stopProp.stopPropagation) stopProp.stopPropagation();
    const todayISO = toLocalISOString(new Date());
    if (state.readChapters[chapterKey]) {
      delete state.readChapters[chapterKey];
    } else {
      state.readChapters[chapterKey] = todayISO;
    }
    saveReadChapters();
    renderAllTrackerViews();
  };

  // Mark or unmark an entire Day Tile (all chapters for that day)
  window.toggleDayTileCompletion = function (dayNumber) {
    const tile = state.yearPlan.find((d) => d.dayNumber === dayNumber);
    if (!tile) return;
    const todayISO = toLocalISOString(new Date());
    const allAlreadyRead = tile.chapters.every((ch) => Boolean(state.readChapters[ch.key]));

    tile.chapters.forEach((ch) => {
      if (allAlreadyRead) {
        delete state.readChapters[ch.key];
      } else {
        state.readChapters[ch.key] = todayISO;
      }
    });

    saveReadChapters();
    renderAllTrackerViews();
  };

  // Open a chapter directly in the Parallel KJV/NKJV Reader
  window.openChapterInReader = function (bookName, chapterNum) {
    state.currentBook = bookName;
    state.currentChapter = Number(chapterNum);
    switchTab("reader");
    renderBibleReader();
  };

  // Inspect a Day Tile in the Active Assignment Spotlight
  window.selectDayTile = function (dayNumber) {
    state.selectedDayNumber = Number(dayNumber);
    renderAllTrackerViews();
  };

  // Reset or Change Plan Start Date
  window.updatePlanStartDate = function (newISO) {
    if (!newISO) return;
    state.startDateISO = newISO;
    localStorage.setItem(STORAGE_KEYS.START_DATE, newISO);
    state.yearPlan = generate365DayPlan(newISO);
    state.selectedDayNumber = getCurrentPlanDayNumber();
    renderAllTrackerViews();
  };

  // Render Top Ticker & 365-Day Tracker Dashboard
  function renderAllTrackerViews() {
    const forecast = computeCompletionForecast();
    const selectedTile =
      state.yearPlan.find((d) => d.dayNumber === state.selectedDayNumber) || state.yearPlan[0];

    // 1. Update Top Header Live Completion Ticker
    const tickerEl = document.getElementById("live-completion-ticker");
    if (tickerEl) {
      let paceStatusText = "";
      if (forecast.chaptersReadCount === 0) {
        paceStatusText = `Read Day ${selectedTile.dayNumber}'s chapters today to lock in your ${formatReadableDate(forecast.targetFinishDate)} finish!`;
      } else if (forecast.daysAheadOrBehind > 0) {
        paceStatusText = `${forecast.daysAheadOrBehind} Day(s) AHEAD of schedule — Projected Finish: ${formatReadableDate(forecast.projectedFinishDate)}`;
      } else if (forecast.daysAheadOrBehind === 0) {
        paceStatusText = `ON TRACK — Finishing ${formatReadableDate(forecast.projectedFinishDate)} (${forecast.effectiveVelocity} ch/day pace)`;
      } else {
        paceStatusText = `${Math.abs(forecast.daysAheadOrBehind)} Day(s) behind target — At current pace finishing ${formatReadableDate(forecast.projectedFinishDate)}`;
      }

      tickerEl.innerHTML = `
        <div class="ticker-inner">
          <div class="ticker-stats">
            <span class="ticker-pill">📅 Plan Start: <strong class="ticker-highlight">${formatReadableDate(forecast.startDate)}</strong></span>
            <span class="ticker-pill">📖 Progress: <strong class="ticker-highlight">${forecast.chaptersReadCount} / ${TOTAL_BIBLE_CHAPTERS} Chapters (${forecast.percentComplete}%)</strong></span>
            <span class="ticker-pill">🏁 365-Day Target Finish: <strong class="ticker-highlight">${formatReadableDate(forecast.targetFinishDate)}</strong></span>
          </div>
          <div class="finish-indicator-badge">
            ⚡ ${paceStatusText}
          </div>
        </div>
      `;
    }

    // 2. Update Nav Badge
    const navTrackerBadge = document.getElementById("nav-tracker-badge");
    if (navTrackerBadge) {
      navTrackerBadge.textContent = `${forecast.percentComplete}%`;
    }

    // 3. Update Hero Forecast Panel
    const forecastPanel = document.getElementById("forecast-hero-panel");
    if (forecastPanel) {
      const selectedAllRead = selectedTile.chapters.every((ch) => Boolean(state.readChapters[ch.key]));
      const deltaColor =
        forecast.chapterDeltaVsSchedule >= 0 ? "var(--emerald-vital)" : "var(--gold-primary)";

      forecastPanel.innerHTML = `
        <div class="card-header">
          <div>
            <div class="section-eyebrow">365-Day Apostolic Bible Study Tracker</div>
            <h2 class="section-title">Yearly Completion Forecaster & Pace Engine</h2>
          </div>
          <div style="display:flex;align-items:center;gap:0.5rem;flex-wrap:wrap;">
            <label for="plan-start-input" style="font-size:0.75rem;color:var(--text-muted);font-weight:600;">Start Date:</label>
            <input type="date" id="plan-start-input" class="select-input" value="${state.startDateISO}" onchange="window.updatePlanStartDate(this.value)" />
          </div>
        </div>

        <div class="forecast-kpis">
          <div class="kpi-box highlight-finish">
            <div class="kpi-label">Projected Finish Date (At Current Pace)</div>
            <div class="kpi-value">${formatReadableDate(forecast.projectedFinishDate)}</div>
            <div class="kpi-sub">
              ${
                forecast.chaptersReadCount === 0
                  ? `Complete today's ${selectedTile.chapters.length} chapters to activate live velocity`
                  : `Velocity: ${forecast.effectiveVelocity} chapters/day (${forecast.projectedDaysRemaining} days left)`
              }
            </div>
          </div>

          <div class="kpi-box">
            <div class="kpi-label">365-Day Fixed Target Date</div>
            <div class="kpi-value">${formatReadableDate(forecast.targetFinishDate)}</div>
            <div class="kpi-sub">
              Schedule Status: <span style="color:${deltaColor};font-weight:800;">
                ${
                  forecast.chapterDeltaVsSchedule > 0
                    ? `+${forecast.chapterDeltaVsSchedule} chapters ahead (${formatReadableDate(forecast.scheduleAdjustedFinishDate)})`
                    : forecast.chapterDeltaVsSchedule === 0
                    ? `Exact On-Schedule Pace!`
                    : `${forecast.chapterDeltaVsSchedule} chapters to catch up`
                }
              </span>
            </div>
          </div>

          <div class="kpi-box">
            <div class="kpi-label">Total Chapters & Tiles Completed</div>
            <div class="kpi-value">${forecast.chaptersReadCount} <span style="font-size:0.9rem;color:var(--text-muted);font-weight:500;">/ ${TOTAL_BIBLE_CHAPTERS} Ch</span></div>
            <div class="kpi-sub">${forecast.completedTilesCount} of 365 Daily Tiles 100% Finished</div>
          </div>
        </div>

        <div class="progress-track-wrap">
          <div class="progress-meta">
            <span>Whole Counsel of God Progress (Genesis 1 to Revelation 22)</span>
            <span>${forecast.percentComplete}% Complete (${forecast.chaptersRemaining} chapters remaining)</span>
          </div>
          <div class="progress-bar-outer">
            <div class="progress-bar-inner" style="width: ${Math.min(100, forecast.percentComplete)}%;"></div>
          </div>
        </div>
      `;
    }

    // 4. Update Selected / Today's Assignment Card
    const todayCard = document.getElementById("today-assignment-panel");
    if (todayCard && selectedTile) {
      const readInTile = selectedTile.chapters.filter((ch) => Boolean(state.readChapters[ch.key])).length;
      const totalInTile = selectedTile.chapters.length;
      const isTileComplete = readInTile === totalInTile;

      // Calculate what happens when this tile is completed
      const hypotheticalReadCount =
        forecast.chaptersReadCount + (totalInTile - readInTile);
      const hypotheticalPace = Math.max(
        TOTAL_BIBLE_CHAPTERS / 365,
        hypotheticalReadCount / forecast.daysElapsed
      );
      const hypotheticalRemaining = Math.max(0, TOTAL_BIBLE_CHAPTERS - hypotheticalReadCount);
      const hypotheticalDaysLeft = Math.ceil(hypotheticalRemaining / hypotheticalPace);
      const hypotheticalFinishDate = addDays(forecast.todayDate, hypotheticalDaysLeft);

      todayCard.innerHTML = `
        <div>
          <div class="card-header" style="margin-bottom:0.5rem;">
            <div>
              <div class="section-eyebrow">Day ${selectedTile.dayNumber} of 365 • ${selectedTile.readableDate}</div>
              <h3 class="section-title">${selectedTile.rangeLabel}</h3>
            </div>
            <span class="verse-ref-badge">${readInTile}/${totalInTile} Read</span>
          </div>

          <div class="finish-feedback-banner">
            ${
              isTileComplete
                ? `✅ <strong>Day ${selectedTile.dayNumber} Completed!</strong> By finishing these ${totalInTile} chapters, your projected completion date for the entire Bible is <strong>${formatReadableDate(forecast.projectedFinishDate)}</strong> (${forecast.projectedDaysRemaining} days from today).`
                : `⏳ <strong>Finish Indicator:</strong> Checking off today's <strong>${totalInTile} chapters (${selectedTile.rangeLabel})</strong> brings you to <strong>${hypotheticalReadCount} chapters (${((hypotheticalReadCount / TOTAL_BIBLE_CHAPTERS) * 100).toFixed(1)}%)</strong> and sets your projected Bible finish date to <strong>${formatReadableDate(hypotheticalFinishDate)}</strong>!`
            }
          </div>

          <div style="font-size:0.78rem;color:var(--text-muted);margin-bottom:0.35rem;">
            Click a chapter checkbox to mark it read, or click the book title to study it in KJV / NKJV:
          </div>

          <div class="chapter-chips-wrap">
            ${selectedTile.chapters
              .map((ch) => {
                const isRead = Boolean(state.readChapters[ch.key]);
                return `
                  <div class="chapter-chip ${isRead ? "read-done" : ""}">
                    <span class="chip-check" onclick="window.toggleChapterRead('${ch.key}', event)" title="Mark ${ch.label} Read/Unread">
                      ${isRead ? "✓" : ""}
                    </span>
                    <span onclick="window.openChapterInReader('${ch.book}', ${ch.chapter})" title="Open ${ch.label} in Parallel KJV/NKJV Reader">
                      ${ch.label}
                    </span>
                  </div>
                `;
              })
              .join("")}
          </div>
        </div>

        <div style="display:flex;align-items:center;justify-content:space-between;gap:0.75rem;flex-wrap:wrap;margin-top:0.75rem;padding-top:0.85rem;border-top:1px solid var(--border-subtle);">
          <button class="btn-gold" onclick="window.toggleDayTileCompletion(${selectedTile.dayNumber})">
            ${isTileComplete ? "↺ Unmark Day " + selectedTile.dayNumber : "✓ Complete All Day " + selectedTile.dayNumber + " Chapters"}
          </button>
          <button class="btn-outline" onclick="window.openChapterInReader('${selectedTile.chapters[0].book}', ${selectedTile.chapters[0].chapter})">
            📖 Study ${selectedTile.chapters[0].label} in Reader →
          </button>
        </div>
      `;
    }

    // 5. Render 365-Day Interactive Tile Matrix
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
              <span class="tile-day-num">DAY ${tile.dayNumber} ${isToday ? "• TODAY" : ""}</span>
              <span>${tile.shortDate}</span>
            </div>
            <div class="tile-passages">${tile.rangeLabel}</div>
            <div class="tile-footer">
              <span>${readCount}/${totalCount} ch</span>
              <span onclick="event.stopPropagation(); window.toggleDayTileCompletion(${tile.dayNumber})" style="cursor:pointer;font-weight:800;color:${isComplete ? "#4ade80" : "var(--gold-primary)"};">
                ${isComplete ? "✓ DONE" : "Mark ✓"}
              </span>
            </div>
          </div>
        `;
      })
      .join("");
  }

  // ==========================================================================
  // VIEW 2: PARALLEL KJV / NKJV BIBLE READER + BLB CONCORDANCE ENGINE
  // ==========================================================================

  function initReaderSelectors() {
    const bookSelect = document.getElementById("reader-book-select");
    if (!bookSelect) return;

    bookSelect.innerHTML = window.BIBLE_BOOKS.map(
      (b) => `<option value="${b.name}" ${b.name === state.currentBook ? "selected" : ""}>${b.name} (${b.testament})</option>`
    ).join("");

    populateChapterSelector();
  }

  function populateChapterSelector() {
    const chSelect = document.getElementById("reader-chapter-select");
    const bookMeta = window.BIBLE_BOOKS.find((b) => b.name === state.currentBook) || window.BIBLE_BOOKS[0];
    if (!chSelect || !bookMeta) return;

    if (state.currentChapter > bookMeta.chapters) {
      state.currentChapter = 1;
    }

    const opts = [];
    for (let c = 1; c <= bookMeta.chapters; c++) {
      opts.push(`<option value="${c}" ${c === state.currentChapter ? "selected" : ""}>Chapter ${c}</option>`);
    }
    chSelect.innerHTML = opts.join("");
  }

  window.onReaderBookChange = function (newBook) {
    state.currentBook = newBook;
    state.currentChapter = 1;
    populateChapterSelector();
    renderBibleReader();
  };

  window.onReaderChapterChange = function (newCh) {
    state.currentChapter = Number(newCh);
    renderBibleReader();
  };

  window.setReaderVersionMode = function (mode) {
    state.readerMode = mode;
    document.querySelectorAll(".version-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-mode") === mode);
    });
    renderBibleReader();
  };

  window.jumpToCuratedChapter = function (key) {
    const [book, ch] = key.split("_");
    state.currentBook = book;
    state.currentChapter = Number(ch);
    initReaderSelectors();
    renderBibleReader();
  };

  // Parse embedded Strong's codes like {G3056} or {H7225} into interactive BLB pills
  function formatTextWithStrongsTokens(rawText) {
    if (!rawText) return "";
    return rawText.replace(/\{([HG]\d+)\}/g, function (_, code) {
      const lex = window.STRONGS_LEXICON[code];
      const activeClass = state.activeStrongsCode === code ? "active-token" : "";
      const tooltip = lex ? `${lex.original} (${lex.translit}) — ${lex.definition}` : code;
      return `<span class="strongs-token ${activeClass}" onclick="window.inspectStrongs('${code}')" title="${tooltip.replace(/"/g, "&quot;")}">${code}</span>`;
    });
  }

  // Generate Dynamic Apostolic Overview & Live Fetch Fallback for any of the 1,189 chapters
  function getChapterDataOrGenerate(bookName, chapterNum) {
    const chapterKey = `${bookName}_${chapterNum}`;
    if (window.CURATED_CHAPTERS[chapterKey]) {
      return window.CURATED_CHAPTERS[chapterKey];
    }

    const bookMeta = window.BIBLE_BOOKS.find((b) => b.name === bookName) || window.BIBLE_BOOKS[0];
    const defaultStrongs = bookMeta.testament === "OT" ? "{H430}" : "{G3056}";
    const spiritStrongs = bookMeta.testament === "OT" ? "{H7307}" : "{G4151}";
    const lifeStrongs = bookMeta.testament === "OT" ? "{H5315}" : "{G2222}";

    return {
      book: bookName,
      chapter: chapterNum,
      isDynamicChapter: true,
      theme: `${bookName} Chapter ${chapterNum} — Canonical Category: ${bookMeta.category} (${bookMeta.testament})`,
      apostolicHeadline: `Apostolic Reading Protocol for ${bookName} ${chapterNum}: Examine the Law of First Mention, identify the covenant shadow or New Creation substance in Christ, and log your Rhema insights in the Study Logbook.`,
      verses: [
        {
          v: 1,
          kjv: `[${bookName} ${chapterNum}:1 • KJV Study Focus] Search the scriptures; for in them ye think ye have eternal life ${lifeStrongs}: and they are they which testify of Christ the Living Word ${defaultStrongs}. (Click "Load Full Chapter KJV Text" below or log your study notes directly).`,
          nkjv: `[${bookName} ${chapterNum}:1 • NKJV Study Focus] You search the Scriptures, for in them you think you have eternal life ${lifeStrongs}; and these are they which testify of Me, the Eternal Word ${defaultStrongs} and Spirit ${spiritStrongs}.`
        }
      ]
    };
  }

  // Optional live KJV public-domain API fetch when user wants all verses of an uncurated chapter
  window.fetchFullChapterOnline = async function (bookName, chapterNum) {
    const statusBtn = document.getElementById("fetch-online-chapter-btn");
    if (statusBtn) {
      statusBtn.textContent = "⏳ Fetching Full Chapter Verses...";
      statusBtn.disabled = true;
    }
    try {
      const resp = await fetch(`https://bible-api.com/${encodeURIComponent(bookName + " " + chapterNum)}?translation=kjv`);
      if (!resp.ok) throw new Error("Network response not ok");
      const data = await resp.json();
      if (data && Array.isArray(data.verses) && data.verses.length > 0) {
        const chapterKey = `${bookName}_${chapterNum}`;
        window.CURATED_CHAPTERS[chapterKey] = {
          book: bookName,
          chapter: chapterNum,
          theme: `${bookName} Chapter ${chapterNum} — Full KJV & Modern NKJV Study Comparison`,
          apostolicHeadline: `Comparing KJV and NKJV parallel alignment across all ${data.verses.length} verses of ${bookName} ${chapterNum}. Click any Strong's token or "Log Verse to Journal" to record apostolic exegesis.`,
          verses: data.verses.map((vObj) => {
            const cleanKjv = (vObj.text || "").trim();
            // Modernize archaic KJV pronouns/verbs for side-by-side NKJV study comparison while offline/GitHub hosted
            const studyNkjv = cleanKjv
              .replace(/\bVerily, verily, I say unto you\b/gi, "Most assuredly, I say to you")
              .replace(/\bsaith\b/gi, "says")
              .replace(/\bhath\b/gi, "has")
              .replace(/\bdoth\b/gi, "does")
              .replace(/\bunto\b/gi, "to")
              .replace(/\bye\b/g, "you")
              .replace(/\bYe\b/g, "You")
              .replace(/\bthou\b/gi, "you")
              .replace(/\bthee\b/gi, "you")
              .replace(/\bthy\b/gi, "your")
              .replace(/\bthine\b/gi, "yours")
              .replace(/\bSpirit\b/g, "Spirit {G4151}")
              .replace(/\bblood\b/g, "blood {G129}")
              .replace(/\bword\b/gi, "word {G3056}");
            return {
              v: vObj.verse,
              kjv: cleanKjv,
              nkjv: studyNkjv
            };
          })
        };
        renderBibleReader();
      }
    } catch (err) {
      if (statusBtn) {
        statusBtn.textContent = "⚠️ Offline Mode Active (Using Local Study Synopsis)";
      }
    }
  };

  window.openLogModalWithVerse = function (passageRef, kjvQuote) {
    switchTab("journal");
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

  function renderBibleReader() {
    const chapterKey = `${state.currentBook}_${state.currentChapter}`;
    const chapterData = getChapterDataOrGenerate(state.currentBook, state.currentChapter);
    const isChapterRead = Boolean(state.readChapters[chapterKey]);

    const headerEl = document.getElementById("reader-chapter-banner");
    if (headerEl) {
      headerEl.innerHTML = `
        <div style="display:flex;align-items:flex-start;justify-content:space-between;gap:1rem;flex-wrap:wrap;">
          <div>
            <div class="banner-theme">${chapterData.book} ${chapterData.chapter} • ${chapterData.theme}</div>
            <div class="banner-desc">${chapterData.apostolicHeadline}</div>
          </div>
          <div style="display:flex;align-items:center;gap:0.55rem;flex-wrap:wrap;">
            ${
              chapterData.isDynamicChapter
                ? `<button id="fetch-online-chapter-btn" class="btn-outline" onclick="window.fetchFullChapterOnline('${state.currentBook}', ${state.currentChapter})">🌐 Load All ${state.currentBook} ${state.currentChapter} Verses</button>`
                : ""
            }
            <button class="${isChapterRead ? "btn-gold" : "btn-outline"}" onclick="window.toggleChapterRead('${chapterKey}'); renderBibleReader();">
              ${isChapterRead ? "✓ Chapter Marked Read in 365 Tracker" : "☐ Mark Chapter Read in 365 Tracker"}
            </button>
          </div>
        </div>
      `;
    }

    renderStudyBibleContextAndMap(state.currentBook, state.currentChapter);

    const versesEl = document.getElementById("reader-verses-container");
    if (versesEl) {
      const isSingle = state.readerMode !== "parallel";
      versesEl.innerHTML = chapterData.verses
        .map((vObj) => {
          const refLabel = `${chapterData.book} ${chapterData.chapter}:${vObj.v}`;
          const safeQuote = (vObj.kjv || "").replace(/'/g, "\\'").replace(/"/g, "&quot;");

          return `
            <div class="verse-row">
              <div class="verse-row-header">
                <span class="verse-ref-badge">${refLabel}</span>
                <div class="verse-actions">
                  <button class="verse-action-btn" onclick="window.openLogModalWithVerse('${refLabel}', '${safeQuote}')">
                    ✍️ Log Exegesis Note
                  </button>
                </div>
              </div>
              <div class="parallel-columns ${isSingle ? "single-col" : ""}">
                ${
                  state.readerMode === "parallel" || state.readerMode === "kjv"
                    ? `
                      <div class="version-col">
                        <div><span class="version-tag">KJV • King James Version (With Strong's)</span></div>
                        <div>${formatTextWithStrongsTokens(vObj.kjv)}</div>
                      </div>
                    `
                    : ""
                }
                ${
                  state.readerMode === "parallel" || state.readerMode === "nkjv"
                    ? `
                      <div class="version-col">
                        <div><span class="version-tag">NKJV • New King James Version</span></div>
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

    renderConcordanceInspector();
  }

  // Render Study Bible Context Panel + Interactive SVG Biblical World Map for Every Chapter
  window.inspectMapLocation = function (locId) {
    const loc = window.BIBLICAL_LOCATIONS && window.BIBLICAL_LOCATIONS[locId];
    if (!loc) return;
    const detailBar = document.getElementById("active-map-loc-detail");
    if (detailBar) {
      detailBar.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.25rem;">
          <strong style="color:var(--gold-light);font-size:0.86rem;">📍 ${loc.name} (${loc.ancientName})</strong>
          <span style="font-family:var(--font-mono);font-size:0.71rem;color:var(--cyan-lexicon);">Lat ${loc.lat}°N, Lon ${loc.lon}°E • ${loc.elevation}</span>
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

    // Build SVG polyline points for the book's covenant/apostolic journey route
    const polylinePoints = routeLocs.map((l) => `${l.svgX},${l.svgY}`).join(" ");

    // Render all Biblical Locations on the map with active & route highlighting
    const allLocs = Object.values(window.BIBLICAL_LOCATIONS || {});
    const routeIds = new Set(routeLocs.map((r) => r.id));

    const pinsSvg = allLocs
      .map((loc) => {
        const isPrimary = loc.id === activeLoc.id;
        const isRouteStop = routeIds.has(loc.id);
        const radius = isPrimary ? 7.5 : isRouteStop ? 5 : 3.2;
        const fill = isPrimary ? "#d4af37" : isRouteStop ? "#38bdf8" : "rgba(148,163,184,0.45)";
        const stroke = isPrimary ? "#ffffff" : isRouteStop ? "#0b0f17" : "none";
        const showLabel = isPrimary || isRouteStop;

        return `
          <g class="map-pin-group" onclick="window.inspectMapLocation('${loc.id}')">
            ${
              isPrimary
                ? `<circle cx="${loc.svgX}" cy="${loc.svgY}" r="14" fill="rgba(212,175,55,0.25)">
                     <animate attributeName="r" values="10;18;10" dur="2.2s" repeatCount="indefinite" />
                   </circle>`
                : ""
            }
            <circle cx="${loc.svgX}" cy="${loc.svgY}" r="${radius}" fill="${fill}" stroke="${stroke}" stroke-width="1.5" />
            ${
              showLabel
                ? `<text x="${loc.svgX}" y="${loc.svgY - (isPrimary ? 11 : 8)}" text-anchor="middle" fill="${isPrimary ? "#f3d474" : "#cbd5e1"}" font-size="${isPrimary ? "11" : "9.5"}" font-weight="${isPrimary ? "800" : "600"}" font-family="Inter, sans-serif" style="paint-order:stroke;stroke:#0b0f17;stroke-width:3px;stroke-linejoin:round;">
                     ${loc.name.split(" (")[0].split(" &")[0]}
                   </text>`
                : ""
            }
          </g>
        `;
      })
      .join("");

    container.innerHTML = `
      <!-- Left: Study Bible Historical, Redemptive & Apostolic Context -->
      <div class="study-context-card">
        <div class="section-eyebrow">Study Bible Exegetical Context • ${info.bookName} ${info.chapterNum}</div>
        <h4 class="section-title" style="font-size:1.06rem;margin-bottom:0.65rem;">Historical Setting & Christocentric Architecture</h4>

        <div class="study-meta-pills">
          <span class="study-meta-pill">✍️ <strong>Author:</strong> ${info.author}</span>
          <span class="study-meta-pill">⏳ <strong>Date:</strong> ${info.dateWritten}</span>
          <span class="study-meta-pill">🏛️ <strong>Dispensation:</strong> ${info.dispensation}</span>
        </div>

        <div class="study-context-block">
          <div class="study-context-label">📜 Chapter & Book Historical Context</div>
          <div>${info.historicalSetting}</div>
        </div>

        <div class="study-context-block">
          <div class="study-context-label">👑 Christocentric Revelation (Christ in ${info.bookName})</div>
          <div>${info.christocentricThread}</div>
        </div>

        <div class="study-context-block">
          <div class="study-context-label">🔥 Apostolic Exegesis Key (Osayi • Agboola • Adoma Lens)</div>
          <div>${info.apostolicKey}</div>
        </div>
      </div>

      <!-- Right: Interactive Chapter Geographical Map & Covenant Route -->
      <div class="study-map-card">
        <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.4rem;">
          <div>
            <div class="section-eyebrow">Interactive Study Bible Atlas & Chapter Map</div>
            <h4 class="section-title" style="font-size:1.02rem;">${info.mapCaption}</h4>
          </div>
          <span class="verse-ref-badge" style="font-size:0.7rem;">Click Any Pin</span>
        </div>

        <div class="biblical-map-stage">
          <svg viewBox="0 0 820 410" class="biblical-svg-map" role="img" aria-label="Biblical World Map for ${info.bookName} ${info.chapterNum}">
            <defs>
              <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#0a192f" />
                <stop offset="100%" stop-color="#0f2542" />
              </linearGradient>
              <linearGradient id="landGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1c2738" />
                <stop offset="100%" stop-color="#253247" />
              </linearGradient>
            </defs>

            <!-- Base Sea Background -->
            <rect width="820" height="410" fill="url(#seaGrad)" />

            <!-- Grid Lines (Ancient Cartography Latitude/Longitude) -->
            <g stroke="rgba(212,175,55,0.08)" stroke-width="1" stroke-dasharray="3,3">
              <line x1="0" y1="100" x2="820" y2="100" />
              <line x1="0" y1="200" x2="820" y2="200" />
              <line x1="0" y1="300" x2="820" y2="300" />
              <line x1="200" y1="0" x2="200" y2="410" />
              <line x1="400" y1="0" x2="400" y2="410" />
              <line x1="600" y1="0" x2="600" y2="410" />
            </g>

            <!-- Stylized Landmasses: Italy, Greece, Asia Minor, Levant/Canaan, Egypt/Sinai, Mesopotamia/Persia -->
            <!-- Italy Boot -->
            <path d="M 35,40 L 95,45 L 135,115 L 115,145 L 85,115 L 65,125 L 45,75 Z" fill="url(#landGrad)" stroke="rgba(212,175,55,0.25)" stroke-width="1.2" />
            <!-- Greece / Macedonia / Achaia -->
            <path d="M 190,55 L 275,65 L 270,120 L 250,165 L 210,175 L 195,125 Z" fill="url(#landGrad)" stroke="rgba(212,175,55,0.25)" stroke-width="1.2" />
            <!-- Asia Minor (Turkey) + Levant + Mesopotamia + Arabia + Egypt Continent Mass -->
            <path d="M 300,85 L 490,75 L 680,70 L 815,85 L 815,405 L 330,405 L 335,310 L 415,310 L 435,365 L 455,380 L 470,340 L 472,295 L 478,240 L 505,180 L 455,175 L 335,180 L 305,140 Z" fill="url(#landGrad)" stroke="rgba(212,175,55,0.28)" stroke-width="1.2" />

            <!-- Major Biblical Rivers & Seas: Nile, Jordan/Galilee/Dead Sea, Euphrates & Tigris -->
            <!-- Nile River & Delta -->
            <path d="M 390,405 Q 402,355 405,320 M 392,312 L 405,320 L 418,312" fill="none" stroke="#38bdf8" stroke-width="2.2" opacity="0.65" />
            <!-- Jordan River, Sea of Galilee & Dead Sea -->
            <path d="M 498,241 L 495,254 L 493,286" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.8" />
            <ellipse cx="495" cy="252" rx="3" ry="4.5" fill="#38bdf8" />
            <ellipse cx="493" cy="291" rx="3.5" ry="7" fill="#38bdf8" />
            <!-- Euphrates & Tigris Rivers flowing from Ararat to Persian Gulf -->
            <path d="M 650,115 Q 575,160 620,220 Q 680,260 755,295" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.65" />
            <path d="M 675,115 Q 660,175 705,235 Q 740,275 755,295" fill="none" stroke="#38bdf8" stroke-width="2" opacity="0.65" />

            <!-- Regional Water & Continent Labels -->
            <text x="210" y="245" fill="rgba(56,189,248,0.45)" font-size="11" font-style="italic" font-family="Merriweather, serif">THE GREAT SEA (MEDITERRANEAN)</text>
            <text x="640" y="218" fill="rgba(212,175,55,0.35)" font-size="10" font-weight="700" letter-spacing="2">MESOPOTAMIA</text>
            <text x="360" y="130" fill="rgba(212,175,55,0.35)" font-size="10" font-weight="700" letter-spacing="2">ASIA MINOR</text>
            <text x="355" y="365" fill="rgba(212,175,55,0.35)" font-size="10" font-weight="700" letter-spacing="2">EGYPT</text>

            <!-- Active Book/Chapter Covenant & Apostolic Journey Path -->
            ${
              routeLocs.length > 1
                ? `<polyline points="${polylinePoints}" fill="none" stroke="#d4af37" stroke-width="2.4" stroke-dasharray="5,4" opacity="0.85" />`
                : ""
            }

            <!-- Interactive Biblical Location Pins -->
            ${pinsSvg}
          </svg>
        </div>

        <!-- Active Location Geopolitical & Spiritual Significance Bar -->
        <div id="active-map-loc-detail" class="map-loc-detail-bar">
          <div style="display:flex;justify-content:space-between;align-items:center;flex-wrap:wrap;gap:0.4rem;margin-bottom:0.25rem;">
            <strong style="color:var(--gold-light);font-size:0.86rem;">📍 ${activeLoc.name} (${activeLoc.ancientName})</strong>
            <span style="font-family:var(--font-mono);font-size:0.71rem;color:var(--cyan-lexicon);">Lat ${activeLoc.lat}°N, Lon ${activeLoc.lon}°E • ${activeLoc.elevation}</span>
          </div>
          <div style="font-size:0.76rem;color:var(--text-muted);margin-bottom:0.2rem;">Modern Region: ${activeLoc.modernRegion}</div>
          <div>${activeLoc.spiritualSignificance}</div>
        </div>
      </div>
    `;
  }

  // Inspect a Strong's Hebrew/Greek entry in the BLB + Apostolic Lexicon Drawer
  window.inspectStrongs = function (code) {
    if (!window.STRONGS_LEXICON[code]) return;
    state.activeStrongsCode = code;
    renderBibleReader();
  };

  window.searchStrongsConcordance = function (query) {
    const q = (query || "").trim().toLowerCase();
    const resultsEl = document.getElementById("concordance-search-results");
    if (!resultsEl) return;

    if (!q) {
      resultsEl.innerHTML = "";
      return;
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

    resultsEl.innerHTML = matches
      .map(
        (m) => `
        <div onclick="window.inspectStrongs('${m.number}')" style="padding:0.5rem 0.7rem;background:var(--bg-primary);border:1px solid var(--border-subtle);border-radius:7px;margin-top:0.35rem;cursor:pointer;display:flex;justify-content:space-between;align-items:center;">
          <span><strong style="color:var(--cyan-lexicon);font-family:var(--font-mono);">${m.number}</strong> • ${m.original} (<em>${m.translit}</em>)</span>
          <span style="font-size:0.73rem;color:var(--gold-primary);">Inspect →</span>
        </div>
      `
      )
      .join("");
  };

  function renderConcordanceInspector() {
    const panel = document.getElementById("blb-lexicon-content");
    if (!panel) return;

    const entry = window.STRONGS_LEXICON[state.activeStrongsCode] || window.STRONGS_LEXICON["G3056"];

    panel.innerHTML = `
      <div class="lexicon-badge-header">
        <div>
          <span class="strongs-token" style="margin:0 0 0.25rem 0;">${entry.number} • ${entry.lang}</span>
          <div class="lexicon-original-word">${entry.original}</div>
        </div>
        <div style="text-align:right;">
          <div style="font-size:0.95rem;font-weight:700;color:var(--text-primary);">${entry.translit}</div>
          <div style="font-size:0.76rem;color:var(--text-muted);">/${entry.pronunciation}/</div>
        </div>
      </div>

      <div class="lexicon-meta-grid">
        <div class="lex-meta-item">
          <div class="lex-meta-label">Part of Speech</div>
          <div class="lex-meta-val">${entry.partOfSpeech}</div>
        </div>
        <div class="lex-meta-item">
          <div class="lex-meta-label">Lexical Origin</div>
          <div class="lex-meta-val">${entry.lang} Concordance</div>
        </div>
      </div>

      <div class="lex-block">
        <div class="lex-block-title">Blue Letter Bible (BLB) Strong's Definition</div>
        <div class="lex-block-body">${entry.definition}</div>
      </div>

      <div class="lex-block">
        <div class="lex-block-title">Thayer's / Brown-Driver-Briggs Outline of Biblical Usage</div>
        <ul style="padding-left:1.1rem;font-size:0.82rem;color:var(--text-secondary);line-height:1.55;">
          ${entry.blbOutline.map((line) => `<li>${line}</li>`).join("")}
        </ul>
      </div>

      <div class="lex-block">
        <div class="lex-block-title">Law of First Mention</div>
        <div class="lex-block-body">${entry.firstMention}</div>
      </div>

      <div class="lex-block apostolic-highlight">
        <div class="lex-block-title">🔥 Apostolic Exegesis (Osayi • Agboola • Adoma Lens)</div>
        <div class="lex-block-body">${entry.apostolicExegesis}</div>
      </div>

      <div class="lex-block" style="margin-bottom:0;">
        <div class="lex-block-title">Key Concordance Cross-References</div>
        <div style="display:flex;flex-wrap:wrap;gap:0.35rem;margin-top:0.35rem;">
          ${entry.keyRefs
            .map((ref) => `<span class="verse-ref-badge" style="font-size:0.72rem;">${ref}</span>`)
            .join("")}
        </div>
      </div>
    `;
  }

  // ==========================================================================
  // VIEW 3: APOSTOLIC TOPIC PRE-STUDIES & CORE CONCEPTS OF CHRIST
  // ==========================================================================

  window.selectApostolicTopic = function (topicId) {
    state.activeTopicId = topicId;
    renderApostolicTopics();
  };

  window.logTopicToJournal = function (topicId) {
    const topic = window.APOSTOLIC_TOPICS.find((t) => t.id === topicId);
    if (!topic) return;
    switchTab("journal");
    document.getElementById("log-title-input").value = `Pre-Study Meditation: ${topic.title}`;
    document.getElementById("log-passage-input").value = topic.governingScriptures.map((g) => g.ref).join("; ");
    document.getElementById("log-topic-select").value = topic.title;
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
          <div style="font-size:0.78rem;color:var(--text-muted);line-height:1.35;">${t.subtitle}</div>
          <div class="topic-ministers">
            ${t.ministerTags.map((m) => `<span class="minister-pill">${m}</span>`).join("")}
          </div>
        </div>
      `;
    }).join("");

    const activeTopic =
      window.APOSTOLIC_TOPICS.find((t) => t.id === state.activeTopicId) || window.APOSTOLIC_TOPICS[0];

    detailEl.innerHTML = `
      <div class="card-header" style="border-bottom:1px solid var(--border-subtle);padding-bottom:1rem;margin-bottom:1.25rem;">
        <div>
          <div class="section-eyebrow">${activeTopic.category} • Systematic Apostolic Breakdown</div>
          <h2 class="section-title" style="font-size:1.5rem;">${activeTopic.title}</h2>
          <p style="color:var(--text-secondary);font-size:0.92rem;margin-top:0.25rem;">${activeTopic.subtitle}</p>
          <div class="topic-ministers" style="margin-top:0.6rem;">
            ${activeTopic.ministerTags.map((m) => `<span class="minister-pill">🎙️Hermeneutic Pattern: ${m}</span>`).join("")}
          </div>
        </div>
        <button class="btn-gold" onclick="window.logTopicToJournal('${activeTopic.id}')">
          ✍️ Clone Pre-Study to My Logbook
        </button>
      </div>

      <!-- Pillar 1: Core Thesis & Parallel KJV/NKJV Governing Scriptures -->
      <div class="pillar-section">
        <span class="pillar-number-badge">Pillar 01 • Core Apostolic Thesis & Governing Scriptures</span>
        <h3 class="pillar-heading">The Eternal Counsel & Scriptural Foundation (KJV / NKJV)</h3>
        <p style="font-size:0.93rem;color:var(--text-primary);margin-bottom:1rem;line-height:1.7;">
          ${activeTopic.pillars.thesis}
        </p>
        <div style="display:flex;flex-direction:column;gap:0.75rem;">
          ${activeTopic.governingScriptures
            .map(
              (gs) => `
              <div class="verse-row" style="background:var(--bg-card);">
                <div class="verse-row-header">
                  <span class="verse-ref-badge">${gs.ref}</span>
                </div>
                <div class="parallel-columns">
                  <div class="version-col" style="font-size:0.88rem;">
                    <div><span class="version-tag">KJV</span></div>
                    <div>${gs.kjv}</div>
                  </div>
                  <div class="version-col" style="font-size:0.88rem;">
                    <div><span class="version-tag">NKJV</span></div>
                    <div>${gs.nkjv}</div>
                  </div>
                </div>
              </div>
            `
            )
            .join("")}
        </div>
      </div>

      <!-- Pillar 2: Law of First Mention & Old Testament Typology -->
      <div class="pillar-section">
        <span class="pillar-number-badge">Pillar 02 • Law of First Mention & Old Testament Shadow</span>
        <h3 class="pillar-heading">Tracing the Pattern from Genesis & The Torah</h3>
        <p style="font-size:0.92rem;color:var(--text-secondary);line-height:1.7;">
          ${activeTopic.pillars.firstMentionAndTypology}
        </p>
      </div>

      <!-- Pillar 3: Hebrew & Greek Lexical Decomposition -->
      <div class="pillar-section">
        <span class="pillar-number-badge">Pillar 03 • Blue Letter Bible Lexical Decomposition</span>
        <h3 class="pillar-heading">Hebrew & Greek Word Architecture (Click Strong's to Inspect)</h3>
        <div class="what-christ-brought-grid">
          ${activeTopic.pillars.lexicalBreakdown
            .map(
              (lb) => `
              <div class="brought-item-card">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:0.4rem;">
                  <span class="brought-item-title" style="margin:0;">${lb.word}</span>
                  <span class="strongs-token" onclick="switchTab('reader'); window.inspectStrongs('${lb.code.split(" ")[0]}');">${lb.code}</span>
                </div>
                <p style="font-size:0.85rem;color:var(--text-secondary);line-height:1.55;">${lb.insight}</p>
              </div>
            `
            )
            .join("")}
        </div>
      </div>

      <!-- Pillar 4: What Christ Brought (New Testament Substance) -->
      <div class="pillar-section">
        <span class="pillar-number-badge">Pillar 04 • The New Creation Substance & What Christ Brought</span>
        <h3 class="pillar-heading">Legal Transaction vs. Vital Experiential Reality</h3>
        <div class="what-christ-brought-grid">
          ${activeTopic.pillars.whatChristBrought
            .map(
              (item) => `
              <div class="brought-item-card">
                <div class="brought-item-title">${item.title}</div>
                <p style="font-size:0.86rem;color:var(--text-secondary);line-height:1.6;">${item.detail}</p>
              </div>
            `
            )
            .join("")}
        </div>
      </div>

      <!-- Pillar 5: Apostolic Synthesis (Osayi / Agboola / Adoma Alignment) -->
      <div class="pillar-section" style="border-left:4px solid var(--gold-primary);background:linear-gradient(145deg, var(--bg-secondary), var(--gold-dim));">
        <span class="pillar-number-badge">Pillar 05 • Apostolic Synthesis & Doctrinal Balance</span>
        <h3 class="pillar-heading">Line-Upon-Line Apostolic Exegesis</h3>
        <p style="font-size:0.93rem;color:var(--text-primary);line-height:1.7;">
          ${activeTopic.pillars.apostolicSynthesis}
        </p>
      </div>

      <!-- Pillar 6: Altar Response & Judicial Legislation -->
      <div class="pillar-section" style="border-left:4px solid var(--crimson-blood);background:linear-gradient(145deg, var(--bg-secondary), var(--crimson-dim));margin-bottom:0;">
        <span class="pillar-number-badge" style="background:var(--crimson-blood);color:#fff;">Pillar 06 • Priestly Altar Response & Judicial Legislation</span>
        <h3 class="pillar-heading">Spoken Rhema Decree & Consecration Prayer</h3>
        <p style="font-family:var(--font-reading);font-style:italic;font-size:0.96rem;color:var(--text-primary);line-height:1.75;">
          "${activeTopic.pillars.altarAndLegislation}"
        </p>
      </div>
    `;
  }

  // ==========================================================================
  // VIEW 4: APOSTOLIC STUDY NOTES & EXEGESIS LOGBOOK
  // ==========================================================================

  window.saveNewStudyLog = function (e) {
    if (e && e.preventDefault) e.preventDefault();
    const title = (document.getElementById("log-title-input").value || "").trim();
    const passage = (document.getElementById("log-passage-input").value || "").trim();
    const topicTag = document.getElementById("log-topic-select").value || "General Exegesis";
    const ministerPattern = document.getElementById("log-minister-select").value || "Apostle Arome Osayi Pattern";
    const firstMentionAndLexicon = (document.getElementById("log-lexicon-input").value || "").trim();
    const christSubstance = (document.getElementById("log-christ-input").value || "").trim();
    const rhemaLegislation = (document.getElementById("log-rhema-input").value || "").trim();

    if (!title || !passage) {
      alert("Please enter a Study Title and Governing Scripture Passage(s).");
      return;
    }

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
  };

  window.deleteStudyLog = function (logId) {
    state.studyLogs = state.studyLogs.filter((l) => l.id !== logId);
    saveStudyLogs();
    renderStudyLogs();
  };

  window.exportAllStudyData = function () {
    const payload = {
      exportedAt: new Date().toISOString(),
      app: "Remnant Word Hub — Apostolic Bible Study & 365-Day Tracker",
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
      listEl.innerHTML = `
        <div class="card-panel" style="text-align:center;color:var(--text-muted);padding:2.5rem;">
          No study log entries match your filter. Use the Apostolic Exegesis Builder on the left to log a study!
        </div>
      `;
      return;
    }

    listEl.innerHTML = filtered
      .map(
        (entry) => `
        <div class="log-entry-card">
          <div class="log-entry-meta">
            <div>
              <span class="verse-ref-badge">${entry.passage}</span>
              <span class="minister-pill" style="margin-left:0.35rem;">${entry.topicTag}</span>
              <span class="minister-pill" style="margin-left:0.25rem;">🎙️ ${entry.ministerPattern}</span>
            </div>
            <div style="display:flex;align-items:center;gap:0.6rem;">
              <span style="font-size:0.75rem;color:var(--text-muted);font-family:var(--font-mono);">${entry.date}</span>
              <button class="verse-action-btn" onclick="window.deleteStudyLog('${entry.id}')" title="Delete Entry">✕</button>
            </div>
          </div>

          <h3 style="font-family:var(--font-serif);font-size:1.12rem;color:var(--text-primary);margin-bottom:0.75rem;">
            ${entry.title}
          </h3>

          ${
            entry.firstMentionAndLexicon
              ? `
                <div style="margin-bottom:0.65rem;font-size:0.86rem;">
                  <strong style="color:var(--cyan-lexicon);text-transform:uppercase;font-size:0.73rem;letter-spacing:0.05em;">1. First Mention & Hebrew/Greek Lexicon Breakdown:</strong>
                  <div style="color:var(--text-secondary);margin-top:0.15rem;">${entry.firstMentionAndLexicon}</div>
                </div>
              `
              : ""
          }

          ${
            entry.christSubstance
              ? `
                <div style="margin-bottom:0.65rem;font-size:0.86rem;">
                  <strong style="color:var(--gold-primary);text-transform:uppercase;font-size:0.73rem;letter-spacing:0.05em;">2. Christocentric Substance (What Christ Brought):</strong>
                  <div style="color:var(--text-secondary);margin-top:0.15rem;">${entry.christSubstance}</div>
                </div>
              `
              : ""
          }

          ${
            entry.rhemaLegislation
              ? `
                <div style="padding:0.65rem 0.85rem;background:var(--bg-card);border-left:3px solid var(--crimson-blood);border-radius:7px;font-size:0.86rem;">
                  <strong style="color:var(--crimson-blood);text-transform:uppercase;font-size:0.72rem;letter-spacing:0.05em;">3. Spoken Rhema Legislation & Altar Action:</strong>
                  <div style="color:var(--text-primary);font-style:italic;margin-top:0.15rem;">"${entry.rhemaLegislation}"</div>
                </div>
              `
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

  // Navigation & Theme Switching
  window.switchTab = function (tabId) {
    state.activeTab = tabId;
    document.querySelectorAll(".nav-btn").forEach((btn) => {
      btn.classList.toggle("active", btn.getAttribute("data-tab") === tabId);
    });
    document.querySelectorAll(".view-section").forEach((sec) => {
      sec.classList.toggle("active", sec.id === `view-${tabId}`);
    });
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
  };

  // Boot Application on DOMContentLoaded
  document.addEventListener("DOMContentLoaded", function () {
    loadState();
    initReaderSelectors();
    renderAllTrackerViews();
    renderBibleReader();
    renderApostolicTopics();
    renderStudyLogs();
  });
})();
