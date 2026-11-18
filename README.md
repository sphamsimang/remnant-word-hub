# Remnant Word Hub — Apostolic Bible Study, BLB Concordance & 365-Day Tile Tracker

A GitHub Pages ready web application built for systematic **KJV & NKJV Bible Reading**, **Blue Letter Bible (BLB) Strong's Hebrew/Greek Concordance & Lexicon Exegesis**, **365-Day Yearly Tile Bible Study & Completion Date Forecasting**, **Apostolic Topic Pre-Studies**, and a structured **Exegesis Study Notes & Logbook**.

## Key Features

1. **365-Day Tile Bible Study Tracker & Live Completion Date Forecaster**
   - Automatically starts **today** and distributes all **1,189 chapters** of the Bible (Genesis 1 to Revelation 22) across **365 daily tiles**.
   - **Dynamic Finish Indicator**: Checking off the chapters for today's tile immediately calculates and displays your **Projected Bible Finish Date**, your **daily chapter velocity**, your **days ahead/behind schedule**, and your overall completion percentage.
   - Filter tiles by *All 365 Tiles*, *Remaining*, *Completed*, *Old Testament*, or *New Testament*, or search any book or day number.

2. **Dual KJV & NKJV Parallel Reader + Blue Letter Bible (BLB) Concordance**
   - Read **King James Version (KJV)** and **New King James Version (NKJV)** side-by-side in parallel columns or toggle single-version view.
   - Click any embedded **Strong's Hebrew/Greek Token** (e.g., `H7225 Reshith`, `H1818 Dam`, `G3056 Logos`, `G4487 Rhema`, `G2222 Zoe`, `G4991 Soteria`, `G129 Haima`, `G5207 Huios`, `G4416 Prototokos`, `G1411 Dunamis`, `G1849 Exousia`) to inspect:
     - Original Hebrew/Greek script, transliteration, and pronunciation
     - Blue Letter Bible Strong's definition and Thayer's / BDB outline of biblical usage
     - **Law of First Mention**
     - **Apostolic Exegesis Lens** (following the hermeneutic precision of **Apostle Arome Osayi**, **Apostle Tolu Agboola**, and **Apostle Gideon Adoma**)

3. **6-Pillar Apostolic Topic Pre-Studies**
   - **The Core Concepts of Christ & What He Brought** (*New Creation Ontology, Zoe Life, Monogenes to Prototokos, Melchizedek Priesthood*)
   - **The Three-Dimensional Architecture of Salvation (`Soteria`)** (*Justification of the Spirit, Sanctification of the Soul, Glorification of the Body*)
   - **The Mystery, Voice & Legal Jurisdiction of the Blood of Jesus** (*Leviticus 17:11 Nephesh in the Blood, Kaphar vs. Hilasterion Mercy Seat, Hebrews 12:24 & Revelation 12:11 Courtroom Victory*)
   - **The Economy of Sonship: From Infant Birth (`Teknon`) to Mature Governance (`Huios`)** (*Galatians 4:1-2 Tutors, Romans 8:14-19 Manifestation of Sons, Hebrews 12:7 Chastening*)
   - **The Anatomy of the Word (`Logos` & `Rhema`) & Spiritual Legislation**
   - **The Priesthood of the Believer, Spiritual Altars & Kingdom Dominion (`Exousia` vs. `Dunamis`)**

4. **Beyond Blue Letter Bible: Apostolic Study Notes & Exegesis Logbook**
   - Log structured study entries decomposed into:
     1. *Law of First Mention, OT Shadow & Hebrew/Greek Lexicon*
     2. *New Testament Substance & What Christ Brought (Legal vs. Vital)*
     3. *Personal Rhema Legislation & Priestly Altar Response*
   - Persists automatically in `localStorage` with one-click JSON Backup Export.

## Hosting on GitHub Pages

1. Push this folder to a GitHub repository (`main` branch).
2. In your GitHub repository, navigate to **Settings → Pages**.
3. Under **Build and deployment**, select **GitHub Actions** (using the included `.github/workflows/deploy-pages.yml`) or **Deploy from a branch** (`main` / `/ (root)`).
4. Your app will be live at `https://<your-github-username>.github.io/<repo-name>/`.
