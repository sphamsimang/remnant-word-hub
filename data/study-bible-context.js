/**
 * Remnant Word Hub — Study Bible Context & Interactive Geographical Map Engine
 * Provides Study Bible Historical/Redemptive Context, Author, Date, Dispensation,
 * Christocentric Thread, and Interactive Biblical Map Coordinates & Journey Paths
 * for every Book and Chapter of the Bible (all 66 Books / 1,189 Chapters).
 */

window.BIBLICAL_LOCATIONS = {
  eden_mesopotamia: {
    id: "eden_mesopotamia",
    name: "Eden & The Tigris-Euphrates Cradle",
    ancientName: "Gan-Eden / Shinar / Ur of the Chaldees",
    modernRegion: "Mesopotamia (Modern Iraq / Persian Gulf Headwaters)",
    lat: 31.0,
    lon: 47.4,
    svgX: 740,
    svgY: 285,
    elevation: "Alluvial Plain (~10m)",
    spiritualSignificance: "The seat of Original Creation, the Tree of Life, the Priesthood of Eden (Gen 2:15), and the Abrahamic call out of Ur."
  },
  ararat: {
    id: "ararat",
    name: "Mountains of Ararat",
    ancientName: "Harei Ararat",
    modernRegion: "Eastern Anatolia (Modern Turkey / Armenia Border)",
    lat: 39.7,
    lon: 44.3,
    svgX: 675,
    svgY: 115,
    elevation: "5,137m Peak",
    spiritualSignificance: "The resting place of Noah's Ark after the Flood judgment and the first altar of the renewed earth (Genesis 8:4, 20)."
  },
  haran: {
    id: "haran",
    name: "Haran (Padan-Aram)",
    ancientName: "Charran",
    modernRegion: "Upper Mesopotamia (Southeastern Turkey)",
    lat: 36.86,
    lon: 39.03,
    svgX: 575,
    svgY: 165,
    elevation: "365m",
    spiritualSignificance: "The staging threshold where Abraham paused before crossing the Euphrates into Canaan, and where Jacob served for Rachel and Leah."
  },
  shechem: {
    id: "shechem",
    name: "Shechem (Between Mt. Gerizim & Mt. Ebal)",
    ancientName: "Shekem / Sychar (John 4)",
    modernRegion: "Samaria Highlands",
    lat: 32.21,
    lon: 35.28,
    svgX: 488,
    svgY: 272,
    elevation: "550m",
    spiritualSignificance: "Abraham's first altar in Canaan (Gen 12:6-7), Joshua's covenant renewal (Josh 24), and Jesus unveiling Living Water at Jacob's Well (John 4)."
  },
  bethel: {
    id: "bethel",
    name: "Bethel (House of God)",
    ancientName: "Luz / Beth-El",
    modernRegion: "Central Hill Country of Ephraim/Benjamin",
    lat: 31.93,
    lon: 35.22,
    svgX: 485,
    svgY: 282,
    elevation: "880m",
    spiritualSignificance: "The Portal of Heaven where Jacob saw the ladder of angelic traffic (Genesis 28:12-19) — fulfilled in Christ the Son of Man (John 1:51)."
  },
  hebron: {
    id: "hebron",
    name: "Hebron (Oaks of Mamre)",
    ancientName: "Kiriath-Arba / Mamre",
    modernRegion: "Judean Mountains",
    lat: 31.53,
    lon: 35.09,
    svgX: 481,
    svgY: 296,
    elevation: "930m",
    spiritualSignificance: "The seat of Abraham's covenant communion, the Cave of Machpelah burial ground of the Patriarchs, and David's first royal capital for 7 years."
  },
  goshen_egypt: {
    id: "goshen_egypt",
    name: "Goshen & Memphis (Egypt)",
    ancientName: "Eretz Goshen / Mizraim",
    modernRegion: "Eastern Nile Delta, Egypt",
    lat: 30.8,
    lon: 31.8,
    svgX: 405,
    svgY: 320,
    elevation: "Nile Delta (~15m)",
    spiritualSignificance: "The furnace of affliction and the Passover Night where the Blood of the Lamb on the doorpost delivered Israel from Pharaoh's bondage (Exodus 12)."
  },
  red_sea: {
    id: "red_sea",
    name: "Red Sea Crossing (Yam Suph)",
    ancientName: "Yam Suph",
    modernRegion: "Gulf of Suez / Gulf of Aqaba",
    lat: 29.5,
    lon: 32.6,
    svgX: 425,
    svgY: 352,
    elevation: "Sea Level",
    spiritualSignificance: "Typifies baptism into Christ (1 Cor 10:1-2), permanently severing the believer from Egypt's pursuit."
  },
  mount_sinai: {
    id: "mount_sinai",
    name: "Mount Sinai (Mount Horeb)",
    ancientName: "Har Sinai / Horeb",
    modernRegion: "Southern Sinai Peninsula",
    lat: 28.54,
    lon: 33.97,
    svgX: 452,
    svgY: 375,
    elevation: "2,285m",
    spiritualSignificance: "The Mountain of the Burning Bush, the Mosaic Law, and the Heavenly Pattern of the Tabernacle shown to Moses (Exodus 19–40; Leviticus 1–27)."
  },
  kadesh_barnea: {
    id: "kadesh_barnea",
    name: "Kadesh-Barnea & Wilderness of Paran",
    ancientName: "Midbar Paran / Kadesh",
    modernRegion: "Negev / Northern Sinai Border",
    lat: 30.65,
    lon: 34.42,
    svgX: 465,
    svgY: 322,
    elevation: "380m",
    spiritualSignificance: "The testing ground of faith vs. unbelief where the 12 spies returned (Numbers 13–14) and where the Bronze Serpent was lifted up (Numbers 21; John 3:14)."
  },
  plains_of_moab: {
    id: "plains_of_moab",
    name: "Plains of Moab & Mount Nebo",
    ancientName: "Arvot Moav / Har Nevo",
    modernRegion: "East of the Jordan River overlooking Jericho",
    lat: 31.76,
    lon: 35.72,
    svgX: 502,
    svgY: 288,
    elevation: "817m (Mt. Nebo)",
    spiritualSignificance: "Where Moses delivered the covenant exposition of Deuteronomy to the new generation before Joshua led them across the Jordan."
  },
  jericho_gilgal: {
    id: "jericho_gilgal",
    name: "Gilgal & Jericho (Jordan Crossing)",
    ancientName: "Gilgal / Yericho",
    modernRegion: "Lower Jordan Valley",
    lat: 31.87,
    lon: 35.44,
    svgX: 493,
    svgY: 284,
    elevation: "-258m (Below Sea Level)",
    spiritualSignificance: "Where the stone memorial of the Jordan crossing was raised, the reproach of Egypt was rolled away by circumcision, and the walls fell by faith (Joshua 1–6)."
  },
  shiloh: {
    id: "shiloh",
    name: "Shiloh (Tabernacle Sanctuary)",
    ancientName: "Shiloh",
    modernRegion: "Ephraim Hill Country",
    lat: 32.05,
    lon: 35.29,
    svgX: 489,
    svgY: 277,
    elevation: "715m",
    spiritualSignificance: "Where the Tabernacle and Ark rested for over 300 years during the Judges, and where young Samuel heard the prophetic voice of the Lord (1 Samuel 1–3)."
  },
  jerusalem_zion: {
    id: "jerusalem_zion",
    name: "Jerusalem (Mount Zion & Mount Moriah)",
    ancientName: "Salem / Jebus / Yerushalayim / Zion",
    modernRegion: "Judean Plateau, Israel",
    lat: 31.77,
    lon: 35.23,
    svgX: 486,
    svgY: 287,
    elevation: "754m",
    spiritualSignificance: "The City of Melchizedek (Gen 14), Abraham's altar on Moriah (Gen 22), David's Tabernacle, Solomon's Temple, Calvary's Cross, the Empty Tomb, and the Upper Room of Pentecost."
  },
  bethlehem: {
    id: "bethlehem",
    name: "Bethlehem (Ephrathah)",
    ancientName: "Beit-Lechem (House of Bread)",
    modernRegion: "Judean Hills (9 km South of Jerusalem)",
    lat: 31.70,
    lon: 35.20,
    svgX: 485,
    svgY: 291,
    elevation: "775m",
    spiritualSignificance: "The fields of Ruth and Boaz (Kinsman-Redeemer), the anointing of David by Samuel, and the Incarnation birthplace of Christ the Living Bread (Micah 5:2; Luke 2)."
  },
  mount_carmel: {
    id: "mount_carmel",
    name: "Mount Carmel & Jezreel Valley",
    ancientName: "Har HaKarmel",
    modernRegion: "Northern Coastal Ridge overlooking Haifa & Megiddo",
    lat: 32.73,
    lon: 35.04,
    svgX: 478,
    svgY: 256,
    elevation: "546m",
    spiritualSignificance: "Where Elijah repaired the broken altar of Jehovah and called down fire that broke the jurisdiction of Baal (1 Kings 18)."
  },
  nineveh: {
    id: "nineveh",
    name: "Nineveh (Assyrian Capital)",
    ancientName: "Ninweh",
    modernRegion: "Upper Tigris River (Modern Mosul, Iraq)",
    lat: 36.36,
    lon: 43.15,
    svgX: 658,
    svgY: 175,
    elevation: "225m",
    spiritualSignificance: "The great imperial city where Jonah preached repentance (Jonah 3) and against whose later cruelty Nahum prophesied judgment."
  },
  babylon: {
    id: "babylon",
    name: "Babylon & River Chebar",
    ancientName: "Bavel / Chaldea",
    modernRegion: "Lower Euphrates (Modern Hillah, Iraq)",
    lat: 32.54,
    lon: 44.42,
    svgX: 682,
    svgY: 255,
    elevation: "35m",
    spiritualSignificance: "The crucible of the 70-year Judean exile where Ezekiel saw the Cherubim glory by the River Chebar (Ezek 1) and Daniel legislated over empires from the prayer altar."
  },
  shushan_persia: {
    id: "shushan_persia",
    name: "Shushan (Susa) — Persian Citadel",
    ancientName: "Shushan HaBirah",
    modernRegion: "Khuzestan / Zagros Foothills (Modern Iran)",
    lat: 32.19,
    lon: 48.25,
    svgX: 760,
    svgY: 262,
    elevation: "85m",
    spiritualSignificance: "The royal palace where Queen Esther fasted and interceded for the preservation of the covenant people, and from where Nehemiah was commissioned to rebuild Jerusalem's walls."
  },
  galilee_capernaum: {
    id: "galilee_capernaum",
    name: "Sea of Galilee, Capernaum & Nazareth",
    ancientName: "Kinneret / Kfar Nahum / Natzrat",
    modernRegion: "Galilee Region, Northern Israel",
    lat: 32.88,
    lon: 35.57,
    svgX: 495,
    svgY: 252,
    elevation: "-210m (Sea of Galilee)",
    spiritualSignificance: "Galilee of the Gentiles where the Great Light dawned (Isa 9:1-2; Matt 4:15-16) — headquarters of Jesus' earthly miracles, the Sermon on the Mount, and the calling of the Apostles."
  },
  caesarea_philippi: {
    id: "caesarea_philippi",
    name: "Caesarea Philippi & Mount Hermon",
    ancientName: "Paneas / Har Chermon",
    modernRegion: "Base of Mount Hermon, Golan Heights",
    lat: 33.25,
    lon: 35.69,
    svgX: 499,
    svgY: 241,
    elevation: "350m (Base) to 2,814m (Hermon Peak)",
    spiritualSignificance: "Where Peter received the revelation 'Thou art the Christ, the Son of the living God', Jesus unveiled the Ekklesia against the gates of Hades (Matt 16:16-19), and was Transfigured (Matt 17)."
  },
  damascus: {
    id: "damascus",
    name: "Damascus",
    ancientName: "Dammeseq",
    modernRegion: "Syria (East of the Anti-Lebanon Mountains)",
    lat: 33.51,
    lon: 36.29,
    svgX: 515,
    svgY: 232,
    elevation: "680m",
    spiritualSignificance: "Where the risen and glorified Christ arrested Saul of Tarsus on the Damascus Road and commissioned him as the Apostle to the Gentiles (Acts 9)."
  },
  antioch_syria: {
    id: "antioch_syria",
    name: "Antioch of Syria",
    ancientName: "Antiocheia on the Orontes",
    modernRegion: "Modern Antakya, Southern Turkey",
    lat: 36.20,
    lon: 36.16,
    svgX: 510,
    svgY: 180,
    elevation: "70m",
    spiritualSignificance: "The Apostolic Launchpad where believers were first called Christians and where as prophets and teachers ministered to the Lord and fasted, the Holy Spirit sent out Barnabas and Paul (Acts 11:26; 13:1-3)."
  },
  ephesus: {
    id: "ephesus",
    name: "Ephesus (Asia Minor)",
    ancientName: "Ephesos",
    modernRegion: "Aegean Coast of Western Turkey (Selçuk)",
    lat: 37.94,
    lon: 27.34,
    svgX: 315,
    svgY: 145,
    elevation: "Coastal Plain",
    spiritualSignificance: "Where Paul reasoned daily in the School of Tyrannus for two years until all Asia heard the Word of the Lord (Acts 19:10), and recipient of the Epistle to the Ephesians on the Heavenlies."
  },
  philippi_thessalonica: {
    id: "philippi_thessalonica",
    name: "Philippi & Thessalonica (Macedonia)",
    ancientName: "Philippoi / Thessalonike",
    modernRegion: "Northern Greece (Macedonia)",
    lat: 41.01,
    lon: 24.28,
    svgX: 255,
    svgY: 95,
    elevation: "60m",
    spiritualSignificance: "The European bridgehead of the Gospel after the Macedonian Call (Acts 16), where Paul and Silas sang praises at midnight and prison foundations were shaken."
  },
  corinth_athens: {
    id: "corinth_athens",
    name: "Corinth & Athens (Achaia)",
    ancientName: "Korinthos / Athenai",
    modernRegion: "Southern Greece (Isthmus of Corinth & Attica)",
    lat: 37.90,
    lon: 22.88,
    svgX: 228,
    svgY: 150,
    elevation: "80m",
    spiritualSignificance: "The intellectual and commercial hub of Greece where Paul confronted the altar to the Unknown God on Mars' Hill (Acts 17) and established the charismatic church at Corinth."
  },
  rome: {
    id: "rome",
    name: "Rome (Imperial Capital)",
    ancientName: "Roma",
    modernRegion: "Tiber River, Central Italy",
    lat: 41.89,
    lon: 12.49,
    svgX: 75,
    svgY: 82,
    elevation: "21m",
    spiritualSignificance: "The heart of the Roman Empire where Paul addressed his master legal treatise on Righteousness and Sonship (Romans) and preached the Kingdom unhindered from his prison quarters (Acts 28:30-31)."
  },
  patmos: {
    id: "patmos",
    name: "Isle of Patmos",
    ancientName: "Patmos (Aegean Sea)",
    modernRegion: "Dodecanese Islands, Aegean Sea (Greece)",
    lat: 37.32,
    lon: 26.54,
    svgX: 295,
    svgY: 158,
    elevation: "Aegean Island",
    spiritualSignificance: "The rocky island of exile where the Apostle John was 'in the Spirit on the Lord's day' and received the Apocalypse—the unveiling of the glorified Christ and the New Jerusalem (Revelation 1:9-10)."
  }
};

// Book-Level Study Bible Profiles (Author, Date, Historical Context, Apostolic & Christocentric Lens, Default Map Route)
window.BOOK_STUDY_PROFILES = {
  "Genesis": {
    author: "Moses (By Prophetic Revelation on Sinai/Wilderness)",
    dateWritten: "c. 1445–1405 BC (Covering Creation to c. 1805 BC)",
    dispensation: "Creation, Conscience & Patriarchal Covenants",
    historicalSetting: "Traces the origins of the cosmos, the garden priesthood of Adam, the fall, the pre-Flood world, the dispersion at Babel, and the four generations of Patriarchs (Abraham, Isaac, Jacob, and Joseph) journeying from Ur of the Chaldees through Canaan into Goshen, Egypt.",
    christocentricThread: "Christ is the Uncreated Creator Seed: the Seed of the Woman crushing the Serpent (3:15), Noah's Ark pitched within and without (6:14), Melchizedek King of Salem bringing bread and wine (14:18), the Ram on Mount Moriah (22:13), Jacob's Ladder (28:12), and Judah's Shiloh Scepter (49:10).",
    apostolicKey: "Genesis is the seed-plot of the entire Bible. Every doctrine developed in Paul and Hebrews has its Law of First Mention anchored in Genesis.",
    primaryLocation: "eden_mesopotamia",
    journeyPath: ["eden_mesopotamia", "haran", "shechem", "bethel", "hebron", "goshen_egypt"]
  },
  "Exodus": {
    author: "Moses",
    dateWritten: "c. 1445–1405 BC",
    dispensation: "Redemption by Blood & The Mosaic Covenant Pattern",
    historicalSetting: "Israel multiplies in Egyptian bondage under Pharaoh until God raises Moses at the Burning Bush, executes 10 judgments on the gods of Egypt, institutes the Passover Blood, parts the Red Sea, and gives the Law and Tabernacle blueprint at Mount Sinai.",
    christocentricThread: "Christ is our Passover Lamb slain without blemish (12:5-13; 1 Cor 5:7), the Manna from Heaven (16:15; John 6:32), the Smitten Rock gushing living water (17:6; 1 Cor 10:4), and the Tabernacle of God dwelling among men (25:8; John 1:14).",
    apostolicKey: "Exodus reveals the progression of salvation: Blood delivers us from Pharaoh's legal ownership in Egypt; Water severs Egypt's pursuit; the Wilderness and Tabernacle reorder our worship and governance.",
    primaryLocation: "mount_sinai",
    journeyPath: ["goshen_egypt", "red_sea", "mount_sinai"]
  },
  "Leviticus": {
    author: "Moses",
    dateWritten: "c. 1445 BC (At the foot of Mount Sinai)",
    dispensation: "Priestly Access, Atoning Blood & Sanctification",
    historicalSetting: "Delivered across one month at Mount Sinai right after the Tabernacle was erected, instructing the Aaronic priesthood and Israel on how a holy God can dwell in the midst of a redeemed people without consuming them.",
    christocentricThread: "Christ is all Five Offerings (Burnt, Grain, Peace, Sin, Trespass), our Great High Priest entering inside the Veil on the Day of Atonement (Lev 16; Heb 9), the Life-Blood upon the Altar (Lev 17:11), and the Seven Feasts of Jehovah.",
    apostolicKey: "In Exodus, God gets Israel out of Egypt; in Leviticus, God establishes the legal jurisprudence of the Altar, the Blood ('Dam' containing 'Nephesh'), and priestly consecration ('Be ye holy, for I am holy').",
    primaryLocation: "mount_sinai",
    journeyPath: ["mount_sinai"]
  },
  "Numbers": {
    author: "Moses",
    dateWritten: "c. 1405 BC",
    dispensation: "Wilderness Testing, Spiritual Warfare & Inheritance Preparation",
    historicalSetting: "Chronicles the 38-year wilderness journey from Mount Sinai to Kadesh-Barnea and the Plains of Moab. While the first unbelieving generation perished in the wilderness, God formed and numbered a new warrior generation ready to possess Canaan.",
    christocentricThread: "Christ is the Pillar of Cloud and Fire guiding the camp (9:15), the Bronze Serpent lifted on a pole for dying sinners (21:8-9; John 3:14), the Water-yielding Rock, and the Star out of Jacob and Scepter out of Israel (24:17).",
    apostolicKey: "Numbers illustrates the danger of an unrenewed soul ('Psyche'): though redeemed out of Egypt by blood, unbelief and murmuring at Kadesh-Barnea barred the first generation from entering God's rest (Hebrews 3:7–4:11).",
    primaryLocation: "kadesh_barnea",
    journeyPath: ["mount_sinai", "kadesh_barnea", "plains_of_moab"]
  },
  "Deuteronomy": {
    author: "Moses (Final Chapter by Joshua)",
    dateWritten: "c. 1405 BC (On the Plains of Moab)",
    dispensation: "Covenant Renewal & Transition to Kingdom Possession",
    historicalSetting: "Spoken on the eastern bank of the Jordan River overlooking Jericho during the final 40 days of Moses' life, preparing the second generation to conquer and govern Canaan under God's covenant laws.",
    christocentricThread: "Christ is the Prophet Like Unto Moses whom every soul must hear (18:15-19; Acts 3:22) and the Living Word by which man lives—the very book Jesus quoted three times to defeat Satan in the wilderness (8:3; 6:13, 16; Matt 4:4-10).",
    apostolicKey: "Deuteronomy teaches that territorial dominion in Canaan is directly proportional to heart obedience and meditation upon the written Word.",
    primaryLocation: "plains_of_moab",
    journeyPath: ["plains_of_moab", "jericho_gilgal"]
  },
  "Joshua": {
    author: "Joshua",
    dateWritten: "c. 1390–1375 BC",
    dispensation: "Possessing the Inheritance & Spiritual Warfare in the Heavenlies",
    historicalSetting: "Israel crosses the Jordan River on dry ground, rolls away the reproach of Egypt at Gilgal, topples Jericho, conquers the central, southern, and northern coalitions of Canaan, and divides the tribal inheritances.",
    christocentricThread: "Christ is our true 'Yehoshua' (Joshua / Jesus — Captain of our Salvation, Heb 2:10, 4:8), the Commander of the Army of the LORD with drawn sword (5:13-15), and the Scarlet Cord of Rahab's redemption (2:18).",
    apostolicKey: "The Book of Joshua is the Old Testament counterpart to the Epistle to the Ephesians: learning how to place our feet upon every spiritual inheritance already legally granted to us in Christ.",
    primaryLocation: "jericho_gilgal",
    journeyPath: ["plains_of_moab", "jericho_gilgal", "shechem", "shiloh"]
  },
  "Judges": {
    author: "Samuel the Prophet (Tradition)",
    dateWritten: "c. 1045–1000 BC",
    dispensation: "The Cycles of Apostasy & Charismatic Deliverers",
    historicalSetting: "Covers the ~350 turbulent years between Joshua's death and the rise of Samuel, when 'there was no king in Israel; everyone did what was right in his own eyes' (21:25), cycling through rebellion, oppression, repentance, and Spirit-empowered Judges.",
    christocentricThread: "Christ is the Supreme Judge-Deliverer whose Spirit comes upon flawed vessels (Othniel, Deborah, Gideon, Samson) to break enemy yokes.",
    apostolicKey: "Judges reveals the difference between episodic charismatic giftings (like Samson's raw 'Dunamis' without inner character) and true governed Sonship under a King.",
    primaryLocation: "shiloh",
    journeyPath: ["shiloh", "shechem", "mount_carmel"]
  },
  "Ruth": {
    author: "Samuel",
    dateWritten: "c. 1010 BC",
    dispensation: "Grace During the Days of the Judges",
    historicalSetting: "Set during the dark era of the Judges, following a Moabite widow (Ruth) who cleaves in covenant loyalty to Naomi and comes under the wings of Boaz in the harvest fields of Bethlehem.",
    christocentricThread: "Christ is our 'Goel' — the Kinsman-Redeemer who has both the blood-right, the wealth, and the love to purchase the bankrupt estate and take the Gentile bride as His own (Ruth 3–4), establishing the royal lineage of David and Jesus.",
    apostolicKey: "Ruth unveils how a Gentile outsider excluded by the Law is brought by grace into the royal Messianic genealogy at Bethlehem (House of Bread).",
    primaryLocation: "bethlehem",
    journeyPath: ["plains_of_moab", "bethlehem"]
  },
  "1 Samuel": {
    author: "Samuel, Nathan & Gad",
    dateWritten: "c. 930 BC",
    dispensation: "Transition from Priestly Judges to the Monarchy",
    historicalSetting: "Begins at the corrupt priesthood of Eli in Shiloh, chronicles the birth and prophetic ministry of Samuel through Hannah's travail, the tragic rise and disobedience of King Saul, and the secret anointing and wilderness furnace of David.",
    christocentricThread: "Christ is the Anointed King ('Mashiach') after God's own heart who slays the champion Goliath in the Valley of Elah and endures rejection before ascending the throne.",
    apostolicKey: "1 Samuel contrasts the 'Order of Saul' (impatience, people-pleasing, charisma without obedience: 'To obey is better than sacrifice', 15:22) with the 'Order of David' (brokenness, waiting on God's timing in the Cave of Adullam).",
    primaryLocation: "shiloh",
    journeyPath: ["shiloh", "bethlehem", "hebron"]
  },
  "2 Samuel": {
    author: "Nathan & Gad",
    dateWritten: "c. 930 BC",
    dispensation: "The Davidic Kingdom & The Eternal Throne Covenant",
    historicalSetting: "David reigns 7.5 years in Hebron over Judah, then 33 years in Jerusalem over all Israel, capturing Mount Zion, bringing up the Ark of the Covenant, receiving the Davidic Covenant (ch. 7), and enduring family chastenings.",
    christocentricThread: "Christ is the Eternal Son of David whose throne and kingdom are established forever (2 Samuel 7:12-16; Luke 1:32-33).",
    apostolicKey: "David's Tabernacle on Mount Zion (where the Ark dwelt without a veil amid 24/7 prophetic worship) became the blueprint for the New Testament Ekklesia (Amos 9:11; Acts 15:16).",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["hebron", "jerusalem_zion"]
  },
  "1 Kings": {
    author: "Jeremiah (Tradition)",
    dateWritten: "c. 560–550 BC",
    dispensation: "Temple Glory, Divided Kingdom & The Prophetic Mantle of Elijah",
    historicalSetting: "Opens with Solomon's wisdom and the dedication of the First Temple on Mount Moriah, followed by Solomon's compromise, the splitting of the Kingdom into Israel (North) and Judah (South), and Elijah's fiery confrontation with Baal on Mount Carmel.",
    christocentricThread: "Christ is Greater than Solomon in wisdom and glory (Matt 12:42) and the Living Temple filled with the cloud of the Father's glory.",
    apostolicKey: "1 Kings 18:30 is a cornerstone apostolic law: before fire can fall from heaven to turn a nation back to God, Elijah first had to repair the Altar of the LORD that was broken down.",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["jerusalem_zion", "shechem", "mount_carmel", "mount_sinai"]
  },
  "2 Kings": {
    author: "Jeremiah",
    dateWritten: "c. 560–550 BC",
    dispensation: "Double-Portion Prophetic Ministry & The Fall of Samaria and Jerusalem",
    historicalSetting: "Begins with Elijah's translation in a whirlwind and Elisha receiving the double-portion mantle, then traces the spiritual decline of both kingdoms until Assyria captures Samaria (722 BC) and Babylon destroys Jerusalem (586 BC).",
    christocentricThread: "Christ is the Ascended Master who pours out His Spirit upon His watching disciples and cleanses lepers like Naaman in the waters of grace.",
    apostolicKey: "Elisha's refusal to stop at Gilgal, Bethel, or Jericho until he crossed the Jordan with Elijah (2 Kings 2) models the price of apostolic succession and spiritual hunger.",
    primaryLocation: "mount_carmel",
    journeyPath: ["jericho_gilgal", "mount_carmel", "jerusalem_zion", "babylon"]
  },
  "1 Chronicles": {
    author: "Ezra the Scribe",
    dateWritten: "c. 450–430 BC",
    dispensation: "Priestly Genealogy & The Blueprint of Davidic Worship",
    historicalSetting: "Written after the Babylonian Exile to remind the returned remnant of their royal and priestly identity, tracing genealogies from Adam to David and detailing David's ordering of the Levitical singers, gatekeepers, and Temple preparations.",
    christocentricThread: "Christ is the Root and Offspring of David, the true Architect of the Father's House.",
    apostolicKey: "1 Chronicles looks at David's reign from Heaven's priestly perspective: emphasizing the Ark, the Altar of Ornan's threshing floor (ch. 21), and the 24 courses of prophetic ministry.",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["hebron", "jerusalem_zion"]
  },
  "2 Chronicles": {
    author: "Ezra the Scribe",
    dateWritten: "c. 450–430 BC",
    dispensation: "The Kings of Judah, Temple Revivals & The Cyrus Decree",
    historicalSetting: "Focuses exclusively on the southern line of David in Judah—highlighting the great revivals under Asa, Jehoshaphat, Hezekiah, and Josiah, the Babylonian exile, and the decree of Cyrus to rebuild the House of God.",
    christocentricThread: "Christ is the True Reformer who cleanses the Temple and restores the Passover.",
    apostolicKey: "2 Chronicles 7:14 and 20:12 ('Neither know we what to do, but our eyes are upon Thee') unlock the principles of territorial revival and praise-driven spiritual warfare.",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["jerusalem_zion", "babylon"]
  },
  "Ezra": {
    author: "Ezra the Scribe",
    dateWritten: "c. 450–440 BC",
    dispensation: "Post-Exilic Restoration of the Altar, Temple & The Word",
    historicalSetting: "Records two waves of Jewish exiles returning from Babylon to Jerusalem: first under Zerubbabel and Joshua the High Priest (538 BC) to rebuild the Altar and Temple; second under Ezra (458 BC) to restore the Law and covenant holiness.",
    christocentricThread: "Christ is the Restorer of the Breach who brings His people out of Babylonian captivity back to Mount Zion.",
    apostolicKey: "Ezra 7:10 defines the three-step apostolic discipline of every Bible teacher: 'For Ezra had prepared his heart to (1) SEEK the law of the LORD, and to (2) DO it, and to (3) TEACH in Israel statutes and judgments.'",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["babylon", "jerusalem_zion"]
  },
  "Nehemiah": {
    author: "Nehemiah",
    dateWritten: "c. 430 BC",
    dispensation: "Rebuilding the Walls & Gates of Government",
    historicalSetting: "Commissioned from Shushan the Palace by King Artaxerxes in 445 BC, Nehemiah journeys to Jerusalem and rallies the remnant—with a trowel in one hand and a sword in the other—to rebuild the broken walls in 52 days.",
    christocentricThread: "Christ is our Intercessor and Master Builder who restores the broken hedges and gates of His Church.",
    apostolicKey: "Ezra rebuilt the Temple (Priesthood/Worship), while Nehemiah rebuilt the Walls (Kingship/Government & Spiritual Boundaries). A church with an altar but no walls is overrun by Sanballat and Tobiah.",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["shushan_persia", "jerusalem_zion"]
  },
  "Esther": {
    author: "Mordecai (Tradition)",
    dateWritten: "c. 465 BC",
    dispensation: "Divine Providence & Royal Intercession in the Courts of Empire",
    historicalSetting: "Set in Shushan (Susa), capital of the Persian Empire under King Ahasuerus (Xerxes I), where Haman plots the total annihilation of the Jewish people and Queen Esther risks her life after a three-day fast to overturn the decree.",
    christocentricThread: "Christ is our Royal Advocate who enters the King's presence on our behalf and issues a higher counter-decree of life that cancels the sentence of death.",
    apostolicKey: "Esther demonstrates how spiritual legislation works: a royal decree in Persia could not be revoked, so Mordecai and Esther wrote a higher counter-decree empowering the Jews to destroy their enemies (Esther 8).",
    primaryLocation: "shushan_persia",
    journeyPath: ["shushan_persia"]
  },
  "Job": {
    author: "Job / Moses (Tradition)",
    dateWritten: "c. 2000–1800 BC (Patriarchal Era)",
    dispensation: "Patriarchal Priesthood, The Heavenly Courtroom & The Crucible of Suffering",
    historicalSetting: "Set in the Land of Uz (Edom/Northern Arabia border) during the Patriarchal age before the Mosaic Law. Pulls back the curtain on the heavenly council where Satan challenges Job's devotion, leading to intense testing and God's whirlwind revelation.",
    christocentricThread: "Christ is our Living Redeemer ('Goel') who stands upon the earth at the latter day (19:25) and our Daysman/Mediator (9:33) bridging the gulf between God and man.",
    apostolicKey: "Job reveals that behind earthly trials lies an invisible courtroom drama in the heavenlies, and that God uses deep dealings to move a righteous man from hearing by the ear to seeing God face-to-face (Job 42:5).",
    primaryLocation: "plains_of_moab",
    journeyPath: ["plains_of_moab"]
  },
  "Psalms": {
    author: "David (73), Asaph (12), Sons of Korah (11), Solomon (2), Moses (1), Ethan, Heman & Anonymous",
    dateWritten: "c. 1440–430 BC (1,000-Year Span)",
    dispensation: "The Prayer Altar, Prophetic Worship & Messianic Heartbeat of Zion",
    historicalSetting: "Five books of inspired prayers, war songs, laments, and royal anthems forged in caves, battlefields, and the Sanctuary on Mount Zion.",
    christocentricThread: "Christ is the Suffering Messiah of Psalm 22, the Good Shepherd of Psalm 23, the Ascended King of Glory of Psalm 24, the Conquering Son of Psalm 2, and the Eternal Priest after the Order of Melchizedek seated at the Father's right hand (Psalm 110:1, 4).",
    apostolicKey: "The Psalms teach the believer how to turn raw human emotion into priestly dialogue at the altar and how to wield high praises as a two-edged sword to execute written judgments upon principalities (Psalm 149:6-9).",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["bethlehem", "hebron", "jerusalem_zion"]
  },
  "Proverbs": {
    author: "Solomon, Agur & King Lemuel",
    dateWritten: "c. 970–700 BC",
    dispensation: "Practical Kingdom Wisdom & The Fear of the LORD",
    historicalSetting: "Compiled during the golden zenith of Israel's monarchy in Jerusalem to train royal sons in judicial discernment, integrity, speech governance, and mastery over appetites.",
    christocentricThread: "Christ is the Personified Wisdom of God ('Chokmah') present with the Father as Master Craftsman when the heavens were established (Proverbs 8:22-31; 1 Cor 1:24, 30).",
    apostolicKey: "Proverbs 4:7 and 20:27 ('The spirit of man is the candle of the LORD') govern the discipline of the soul ('Psyche') so that heavenly revelation translates into earthly excellence.",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["jerusalem_zion"]
  },
  "Ecclesiastes": {
    author: "Solomon ('Qoheleth' — The Preacher/Assembler)",
    dateWritten: "c. 935 BC",
    dispensation: "The Bankruptcy of Life 'Under the Sun' Apart from Eternity",
    historicalSetting: "Written from Jerusalem at the end of Solomon's life after testing maximum wealth, pleasure, intellect, and architecture, proving that everything 'under the sun' cannot satisfy a heart into which God has set Eternity ('Olam', 3:11).",
    christocentricThread: "Christ is the One Shepherd (12:11) who lifts man above the futility of life 'under the sun' into heavenly seating 'above the sun'.",
    apostolicKey: "Ecclesiastes dismantles secular humanism and materialism so the soul anchors its entire purpose in fearing God and keeping His commandments (12:13).",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["jerusalem_zion"]
  },
  "Song of Solomon": {
    author: "Solomon",
    dateWritten: "c. 965 BC",
    dispensation: "Bridal Intimacy & The Chambers of the King",
    historicalSetting: "A royal wedding canticle celebrating the deepening union between the Shepherd-King and His Shulamite bride from the vineyards of En-Gedi and Lebanon to the banqueting house in Jerusalem.",
    christocentricThread: "Christ is the Heavenly Bridegroom who draws His Bride into the inner chambers, whose love is stronger than death and a vehement flame (8:6).",
    apostolicKey: "Before a believer can exercise judicial weight on the throne, they must first be conquered by bridal passion in the secret chamber ('Draw me, we will run after thee', 1:4).",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["jerusalem_zion", "caesarea_philippi"]
  },
  "Isaiah": {
    author: "Isaiah the Prophet",
    dateWritten: "c. 740–680 BC",
    dispensation: "The Fifth Gospel — The Throne Vision, Suffering Servant & New Heavens",
    historicalSetting: "Ministered in Jerusalem during the reigns of Uzziah, Jotham, Ahaz, and Hezekiah as the Assyrian Empire swallowed the northern kingdom and besieged Judah.",
    christocentricThread: "Christ is Immanuel born of a Virgin (7:14), the Child Born and Son Given bearing the Government (9:6), the Branch from Jesse endowed with the Sevenfold Spirit (11:1-2), and the Pierced Lamb of Isaiah 53.",
    apostolicKey: "Isaiah 6 shows that true prophetic commissioning only happens after we see the Lord high and lifted up and a live coal from the altar purges our lips.",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["jerusalem_zion", "nineveh", "babylon"]
  },
  "Jeremiah": {
    author: "Jeremiah (Assisted by Baruch)",
    dateWritten: "c. 627–580 BC",
    dispensation: "Uprooting & Planting — The Warning of Judgment & The New Covenant Promise",
    historicalSetting: "Prophesied in Jerusalem for 40 years through the final five kings of Judah, enduring arrest and the cistern dungeon as Nebuchadnezzar besieged Jerusalem, before being taken to Egypt.",
    christocentricThread: "Christ is the LORD Our Righteousness ('Jehovah Tsidkenu', 23:6), the Fountain of Living Waters (2:13), and the Mediator of the New Covenant written on the heart (31:31-34; Heb 8:8-12).",
    apostolicKey: "Jeremiah 1:9-10 defines the sixfold apostolic mandate over nations: to root out, pull down, destroy, throw down, build, and plant.",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["jerusalem_zion", "babylon", "goshen_egypt"]
  },
  "Lamentations": {
    author: "Jeremiah",
    dateWritten: "c. 586 BC",
    dispensation: "Priestly Intercession Over the Ruins of Jerusalem",
    historicalSetting: "Five acrostic funeral dirges composed amidst the smoking ruins of Jerusalem immediately after the Babylonian destruction of Solomon's Temple in 586 BC.",
    christocentricThread: "Christ is the Man of Sorrows who wept over Jerusalem (Luke 19:41) and whose compassions fail not, new every morning (3:22-23).",
    apostolicKey: "Lamentations teaches watchmen how to travail in brokenness over the state of the Church until God's mercies restore what sin broke down.",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["jerusalem_zion"]
  },
  "Ezekiel": {
    author: "Ezekiel the Priest-Prophet",
    dateWritten: "c. 593–571 BC",
    dispensation: "The Throne-Chariot Glory, The Valley of Dry Bones & The Millennial River",
    historicalSetting: "Carried captive to Babylon with King Jehoiachin in 597 BC, Ezekiel prophesied to the exiles by the River Chebar in Mesopotamia, seeing the glory depart from the corrupt Jerusalem Temple and return to a future glorified Sanctuary.",
    christocentricThread: "Christ is the Man upon the Sapphire Throne above the firmament (1:26), the True Shepherd of Israel (34:23), and the Sanctuary from whose threshold flows the life-giving River (47:1-12).",
    apostolicKey: "Ezekiel 37 unveils the synergy of Logos and Ruwach: first you prophesy the Word to the dry bones (structural alignment), then you prophesy to the Wind ('Ruwach') to breathe life into them so they stand as an exceeding great army.",
    primaryLocation: "babylon",
    journeyPath: ["jerusalem_zion", "babylon"]
  },
  "Daniel": {
    author: "Daniel",
    dateWritten: "c. 605–530 BC",
    dispensation: "Kingdom Government Over World Empires & Apocalyptic Prophecy",
    historicalSetting: "Taken from Jerusalem to Babylon as a teenager in 605 BC, Daniel served in the highest imperial courts of Babylon and Medo-Persia for over 70 years without defiling himself, interpreting dreams and governing provinces through prayer.",
    christocentricThread: "Christ is the Stone Cut Without Hands that smashes the empires of man (2:34-35), the Fourth Man in the fiery furnace (3:25), the Son of Man receiving dominion from the Ancient of Days (7:13-14), and Messiah the Prince cut off for us (9:26).",
    apostolicKey: "Daniel 9:2 and 10:12 show how apostolic intercessors war in the heavenlies: Daniel understood by books (written Logos) the 70-year timeline, then set his face in fasting and prayer to dislodge the Prince of Persia.",
    primaryLocation: "babylon",
    journeyPath: ["jerusalem_zion", "babylon", "shushan_persia"]
  },
  "Hosea": {
    author: "Hosea",
    dateWritten: "c. 755–715 BC",
    dispensation: "Covenant Love Reclaiming the Unfaithful Bride",
    historicalSetting: "Prophesied to the Northern Kingdom of Israel (Samaria/Ephraim) during its final decades before the Assyrian conquest, living out a prophetic marriage to Gomer to display God's unbreakable covenant mercy.",
    christocentricThread: "Christ is the Faithful Bridegroom who buys back His wayward bride from the slave market with silver and barley (3:2) and declares, 'I will ransom them from the power of the grave' (13:14).",
    apostolicKey: "Hosea 4:6 and 6:1-3 warn that a generation is destroyed not merely for lack of power, but for lack of 'Da'ath' (experiential, intimate knowledge of God and His Word).",
    primaryLocation: "shechem",
    journeyPath: ["shechem", "jerusalem_zion"]
  },
  "Joel": {
    author: "Joel",
    dateWritten: "c. 835–800 BC",
    dispensation: "The Day of the LORD & The End-Time Outpouring of the Spirit",
    historicalSetting: "Triggered by a devastating locust plague in Judah, Joel calls the priests and elders to blow the trumpet in Zion, sanctify a fast, weep between the porch and the altar, and prepare for the outpouring of the Spirit.",
    christocentricThread: "Christ is the Baptizer in the Holy Spirit who fulfilled Joel 2:28-32 on the Day of Pentecost (Acts 2:16-21) and who roars out of Zion as Judge and Refuge.",
    apostolicKey: "Joel 2 establishes the law of restoration: when the priesthood weeps between the porch and the altar (2:17), God restores the years the locust ate (2:25) and pours out His Spirit upon all flesh (2:28).",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["jerusalem_zion"]
  },
  "Amos": {
    author: "Amos of Tekoa",
    dateWritten: "c. 760–750 BC",
    dispensation: "The Plumbline of Righteousness & Restoration of David's Tabernacle",
    historicalSetting: "A Judean herdsman and dresser of sycamore trees sent north to Bethel to confront the luxury, injustice, and idolatrous religion of Israel under King Jeroboam II.",
    christocentricThread: "Christ is the Rebuilder of the fallen Tabernacle of David so that the remnant of mankind and all the Gentiles called by His name may seek the LORD (Amos 9:11-12; Acts 15:16-17).",
    apostolicKey: "Amos 3:7 ('Surely the Lord GOD will do nothing, but He revealeth His secret unto His servants the prophets') defines the prophetic council ('Sod') of God.",
    primaryLocation: "bethel",
    journeyPath: ["bethlehem", "bethel"]
  },
  "Obadiah": {
    author: "Obadiah",
    dateWritten: "c. 586 BC (Or c. 845 BC)",
    dispensation: "Judgment on Edom (The Flesh) & Saviors on Mount Zion",
    historicalSetting: "Shortest book in the Old Testament, indicting Edom (descendants of Esau) for gloating over and looting their brother Jacob (Judah) during Jerusalem's calamity.",
    christocentricThread: "Christ is the Chief Deliverer ascending Mount Zion so that 'the kingdom shall be the LORD's' (v. 21).",
    apostolicKey: "Obadiah 1:17 and 1:21 summarize the apostolic vision: 'But upon Mount Zion shall be deliverance, and there shall be holiness; and the house of Jacob shall possess their possessions... And saviours (deliverers) shall come up on Mount Zion to judge the mount of Esau.'",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["plains_of_moab", "jerusalem_zion"]
  },
  "Jonah": {
    author: "Jonah son of Amittai",
    dateWritten: "c. 760 BC",
    dispensation: "The Sign of the Prophet Jonah & Mercy to the Gentiles",
    historicalSetting: "A Galilean prophet from Gath-Hepher commissioned to go northeast to Nineveh, capital of Assyria, who instead fled west from Joppa toward Tarshish, was swallowed by a great fish for 3 days, and then sparked history's greatest citywide repentance.",
    christocentricThread: "Christ Himself declared Jonah in the belly of the great fish for three days and three nights as the supreme sign of His own death, burial, and resurrection (Jonah 1:17; Matt 12:39-41).",
    apostolicKey: "Jonah 2:9 ('Salvation is of the LORD') proves that God's redemptive mandate encompasses nations and empires when a messenger carries the exact word God bade him preach (3:2).",
    primaryLocation: "nineveh",
    journeyPath: ["galilee_capernaum", "nineveh"]
  },
  "Micah": {
    author: "Micah of Moresheth",
    dateWritten: "c. 735–700 BC",
    dispensation: "The Ruler Out of Bethlehem & The Mountain of the LORD's House",
    historicalSetting: "A contemporary of Isaiah ministering in the Judean foothills, defending the oppressed against corrupt rulers and false prophets while unveiling the birthplace of the Messiah.",
    christocentricThread: "Christ is the Eternal Ruler born in Bethlehem Ephrathah whose 'goings forth have been from of old, from everlasting' (Micah 5:2; Matt 2:5-6) and the Breaker ('Porets') who goes up before His people (2:13).",
    apostolicKey: "Micah 4:1-2 prophesies the exaltation of the Mountain of the House of the LORD in the latter days as the legislative center from which the Law goes forth.",
    primaryLocation: "bethlehem",
    journeyPath: ["bethlehem", "jerusalem_zion"]
  },
  "Nahum": {
    author: "Nahum the Elkoshite",
    dateWritten: "c. 650–615 BC",
    dispensation: "Divine Vengeance on Nineveh & Stronghold in the Day of Trouble",
    historicalSetting: "Written ~100 years after Jonah's revival, after Nineveh returned to brutal cruelty and idolatry, predicting Nineveh's complete overthrow in 612 BC.",
    christocentricThread: "Christ is the Messenger upon the mountains who publishes peace (1:15) and the Stronghold in the day of trouble who knows those who trust in Him (1:7).",
    apostolicKey: "Nahum reveals the balance of God's nature: 'The LORD is slow to anger, and great in power, and will not at all acquit the wicked' (1:3).",
    primaryLocation: "nineveh",
    journeyPath: ["jerusalem_zion", "nineveh"]
  },
  "Habakkuk": {
    author: "Habakkuk",
    dateWritten: "c. 608–605 BC",
    dispensation: "Standing Upon the Watchtower & Living by Faith",
    historicalSetting: "Written in Jerusalem on the eve of the Babylonian invasion, recording a prophet's honest dialogue with God over why iniquity seemed unchecked and how the righteous survive shaking empires.",
    christocentricThread: "Christ is the Glory of the LORD covering the earth as the waters cover the sea (2:14) and the Object of saving faith.",
    apostolicKey: "Habakkuk 2:1-4 is the foundation of three New Testament epistles (Romans 1:17; Galatians 3:11; Hebrews 10:38): 'I will stand upon my watch... Write the vision, and make it plain upon tables... The just shall live by his faith.'",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["jerusalem_zion", "babylon"]
  },
  "Zephaniah": {
    author: "Zephaniah (Great-grandson of King Hezekiah)",
    dateWritten: "c. 630–625 BC",
    dispensation: "The Searching Lamp of the Day of the LORD & The Singing King",
    historicalSetting: "Prophesied during the early years of King Josiah's reign in Jerusalem, exposing lukewarm complacency ('settled on their lees', 1:12) and sparking Josiah's national reformation.",
    christocentricThread: "Christ is the King of Israel mighty to save in our midst, who rejoices over His bride with singing (3:15-17).",
    apostolicKey: "Zephaniah 3:9 promises the restoration of a 'pure language' (purified lips) so that all may call upon the name of the LORD to serve Him with one consent.",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["jerusalem_zion"]
  },
  "Haggai": {
    author: "Haggai the Prophet",
    dateWritten: "520 BC (Four dated messages across 4 months)",
    dispensation: "Prioritizing God's House & The Latter Glory of the Temple",
    historicalSetting: "Delivered in Jerusalem 16 years after the returned exiles laid the Temple foundation but stopped building due to opposition and personal comfort ('ceiled houses').",
    christocentricThread: "Christ is the 'Desire of All Nations' whose personal entry into the Second Temple filled it with a glory greater than Solomon's (2:7-9) and the Royal Signet Ring of Zerubbabel (2:23).",
    apostolicKey: "Haggai 1:5-9 exposes why many believers experience financial and spiritual leakage ('bags with holes'): when we prioritize our own paneled houses while the House and Kingdom of God lie waste.",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["babylon", "jerusalem_zion"]
  },
  "Zechariah": {
    author: "Zechariah the Priest-Prophet",
    dateWritten: "520–480 BC",
    dispensation: "Night Visions, The Cleansing of the Priesthood & The Pierced King",
    historicalSetting: "Ministered alongside Haggai in post-exilic Jerusalem, strengthening Joshua the High Priest and Governor Zerubbabel through eight night visions and sweeping Messianic prophecies.",
    christocentricThread: "Christ is the Branch (3:8; 6:12), the King riding lowly upon a donkey (9:9), the Shepherd sold for 30 pieces of silver (11:12-13), the Pierced One upon whom Jerusalem will look (12:10), and the King standing on the Mount of Olives (14:4).",
    apostolicKey: "Zechariah 3 & 4 reveal the two essentials of apostolic building: (1) Joshua the High Priest has his filthy garments removed in the heavenly courtroom as Satan is rebuked (ch. 3), and (2) Zerubbabel builds 'Not by might, nor by power, but by My Spirit, saith the LORD of hosts' (4:6).",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["babylon", "jerusalem_zion"]
  },
  "Malachi": {
    author: "Malachi ('My Messenger')",
    dateWritten: "c. 430–420 BC",
    dispensation: "The Final Old Testament Seal, Purifying the Sons of Levi & The Sun of Righteousness",
    historicalSetting: "The closing prophetic voice before 400 years of intertestamental silence, confronting a cynical priesthood in Jerusalem offering blemished sacrifices and robbing God.",
    christocentricThread: "Christ is the Lord and Messenger of the Covenant suddenly coming to His Temple as a Refiner's Fire (3:1-3) and the Sun of Righteousness rising with healing in His wings (4:2).",
    apostolicKey: "Malachi 4:5-6 seals the Old Testament with the Elijah spirit of reconciliation: turning the hearts of the fathers to the children and the hearts of the children to their fathers before the great Day of the LORD.",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["jerusalem_zion"]
  },
  "Matthew": {
    author: "Matthew (Levi) the Apostle",
    dateWritten: "c. AD 55–65",
    dispensation: "The Gospel of the King & The Constitution of the Kingdom of Heaven",
    historicalSetting: "Written primarily to a Jewish audience to demonstrate from over 60 Old Testament prophecies that Jesus of Nazareth is the promised Son of David, Son of Abraham, and Messianic King.",
    christocentricThread: "Christ is the Lion of the Tribe of Judah, Immanuel ('God with us', 1:23; 28:20), the Lawgiver on the Mount (ch. 5–7), and the Builder of the triumphant Ekklesia (16:18).",
    apostolicKey: "Matthew 16:18-19 and 28:18-20 establish the governmental mandate of the Church ('Ekklesia' — legislative senate called out to bind and loose on earth what is ratified in heaven).",
    primaryLocation: "galilee_capernaum",
    journeyPath: ["bethlehem", "goshen_egypt", "galilee_capernaum", "caesarea_philippi", "jerusalem_zion"]
  },
  "Mark": {
    author: "John Mark (Under the Apostolic Testimony of Simon Peter)",
    dateWritten: "c. AD 55–63 (From Rome)",
    dispensation: "The Gospel of the Suffering Servant & Miraculous Action",
    historicalSetting: "Addressed to the active Roman mind, moving rapidly with the word 'immediately' ('eutheos' — 42 times) from Jesus' baptism at the Jordan to His mighty works in Galilee and His atoning sacrifice in Jerusalem.",
    christocentricThread: "Christ is the Tireless Servant of Jehovah who 'came not to be ministered unto, but to minister, and to give His life a ransom for many' (Mark 10:45).",
    apostolicKey: "Mark 3:14 reveals the apostolic order of ministry: 'And He ordained twelve, (1) that they should BE WITH HIM, and (2) that He might SEND THEM FORTH to preach, and (3) to have power (exousia) to heal sicknesses, and to cast out devils.' Intimacy precedes deployment!",
    primaryLocation: "galilee_capernaum",
    journeyPath: ["galilee_capernaum", "caesarea_philippi", "jerusalem_zion"]
  },
  "Luke": {
    author: "Luke the Beloved Physician & Historian (Companion of Paul)",
    dateWritten: "c. AD 59–62",
    dispensation: "The Gospel of the Perfect Son of Man & The Anointing of the Spirit",
    historicalSetting: "An orderly, eyewitness historical investigation addressed to Theophilus, tracing Jesus' genealogy all the way back to Adam (ch. 3) to show Him as the Savior of all humanity, filled with the Holy Spirit and prayer.",
    christocentricThread: "Christ is the Perfect Son of Man who came 'to seek and to save that which was lost' (19:10) and who opened the Scriptures on the Emmaus Road showing how all Moses, the Prophets, and the Psalms testified of Him (24:27, 44).",
    apostolicKey: "Luke highlights the prayer life of Jesus and the distinction between leaving the Jordan 'full of the Holy Ghost' (4:1) and returning after conquering Satan in the wilderness 'in the power (dunamis) of the Spirit' (4:14).",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["bethlehem", "galilee_capernaum", "jericho_gilgal", "jerusalem_zion"]
  },
  "John": {
    author: "John the Beloved Apostle",
    dateWritten: "c. AD 85–90 (From Ephesus)",
    dispensation: "The Gospel of the Eternal Son of God, The Logos & Implantation of Zoe",
    historicalSetting: "Written decades after the Synoptic Gospels to fortify the Church against early Gnostic heresies, structuring its narrative around 7 Miraculous Signs, 7 'I AM' declarations, and the Upper Room Discourse (ch. 13–17).",
    christocentricThread: "Christ is the Eternal Logos made flesh (1:1, 14), the Lamb of God (1:29), the Bread of Life (6:35), the Light of the World (8:12), the Door & Good Shepherd (10:9, 11), the Resurrection and the Life (11:25), the Way, Truth, and Life (14:6), and the True Vine (15:1).",
    apostolicKey: "John's Gospel unveils the ontological heart of Christianity: receiving 'Zoe' (God's uncreated life) and 'Exousia' to become offspring of God, and dwelling in mutual indwelling union with the Father, Son, and Spirit (John 14–17).",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["jerusalem_zion", "shechem", "galilee_capernaum", "jerusalem_zion"]
  },
  "Acts": {
    author: "Luke the Physician",
    dateWritten: "c. AD 62 (From Rome)",
    dispensation: "The Acts of the Holy Spirit Through the Apostolic Ekklesia",
    historicalSetting: "Volume 2 of Luke's treatise to Theophilus, recording the 30-year explosion of the Gospel from the Upper Room in Jerusalem (AD 30/33) across Judea, Samaria, Antioch, Asia Minor, Greece, and finally to imperial Rome (AD 62).",
    christocentricThread: "Christ is the Ascended Lord continuing 'all that Jesus began both to do and teach' (1:1) by pouring out the Promise of the Father and confirming His Word with signs following.",
    apostolicKey: "Acts 1:8, 2:42, 6:4 ('We will give ourselves continually to prayer, and to the ministry of the word'), and 19:20 ('So mightily grew the word of God and prevailed') form the blueprint for apostolic territorial transformation.",
    primaryLocation: "antioch_syria",
    journeyPath: ["jerusalem_zion", "damascus", "antioch_syria", "ephesus", "philippi_thessalonica", "corinth_athens", "rome"]
  },
  "Romans": {
    author: "Paul the Apostle",
    dateWritten: "c. AD 57 (Written from Corinth to the Church at Rome)",
    dispensation: "The Constitutional Jurisprudence of the Gospel: Justification, Sonship & Consecration",
    historicalSetting: "Written from Corinth at the close of Paul's third missionary journey to establish the believers in the imperial capital of Rome in the systematic architecture of God's righteousness.",
    christocentricThread: "Christ is our Propitiation/Mercy Seat ('Hilasterion', 3:25), the Last Adam whose obedience justifies many (5:19), our Life in the Spirit (8:2), and the Firstborn ('Prototokos') among many brethren (8:29).",
    apostolicKey: "Romans is structured like a courtroom masterpiece: Condemnation (ch. 1–3:20) → Justification by the Blood (3:21–5:21) → Sanctification & Identification with the Cross (ch. 6–7) → Spirit-Led Sonship ('Huioi') & Glorification (ch. 8) → Israel's Dispensational Place (ch. 9–11) → Living Sacrifice Transformation (ch. 12–16).",
    primaryLocation: "rome",
    journeyPath: ["corinth_athens", "rome"]
  },
  "1 Corinthians": {
    author: "Paul the Apostle",
    dateWritten: "c. AD 55 (Written from Ephesus)",
    dispensation: "Ordering the Local Ekklesia, The Cross vs. Carnality & The Gifts of the Spirit",
    historicalSetting: "Addressed to the gifted yet divided church at Corinth (a wealthy Greek port city), correcting sectarian factions, moral compromise, misunderstanding of the Lord's Supper, and disorder in spiritual gifts ('Charismata').",
    christocentricThread: "Christ Crucified is the Power ('Dunamis') of God and the Wisdom ('Sophia') of God (1:24), our Passover sacrificed for us (5:7), the Last Adam who became a life-giving Spirit (15:45), and the Firstfruits of resurrection.",
    apostolicKey: "1 Corinthians 2:14–3:3 diagnoses the three classes of men: the Natural man ('Psuchikos' — unregenerated soul-man), the Carnal babe in Christ ('Sarkikos' / 'Nepios'), and the Spiritual man ('Pneumatikos') who judges all things.",
    primaryLocation: "corinth_athens",
    journeyPath: ["ephesus", "corinth_athens"]
  },
  "2 Corinthians": {
    author: "Paul the Apostle",
    dateWritten: "c. AD 55–56 (Written from Macedonia)",
    dispensation: "New Creation Ontology, The Ministry of the Spirit & Power Made Perfect in Weakness",
    historicalSetting: "Paul's most deeply personal epistle, defending authentic apostolic authority not by flashy credentials, but by carrying the dying of Jesus in the earthen vessel so the life of Jesus may be manifested.",
    christocentricThread: "Christ is the Image of God shining in our hearts (4:4-6), the Sinless One made sin for us so we might become the righteousness of God in Him (5:21), and the Lord who is the Spirit transforming us from glory to glory (3:17-18).",
    apostolicKey: "2 Corinthians 3:6, 4:7-12, 5:17 ('New Creation'), and 10:3-6 ('Weapons of our warfare pulling down strongholds') unveil how death works in the apostle so life works in the Church.",
    primaryLocation: "philippi_thessalonica",
    journeyPath: ["ephesus", "philippi_thessalonica", "corinth_athens"]
  },
  "Galatians": {
    author: "Paul the Apostle",
    dateWritten: "c. AD 49–50",
    dispensation: "The Charter of Christian Liberty, The Cross & Progression from Infant Heir to Governed Son",
    historicalSetting: "Written with urgent apostolic fire to the churches of Galatia (Central Asia Minor) after Judaizers tried to bring Gentile believers back under Mosaic circumcision and legalistic bondage.",
    christocentricThread: "Christ redeemed us from the curse of the Law, being made a curse for us (3:13), and lives inside the crucified believer ('Christ liveth in me', 2:20).",
    apostolicKey: "Galatians 4:1-7 & 4:19 unlock the apostolic doctrine of Sonship: though the heir is legally lord of all, as long as he is an infant ('Nepios') he differs nothing from a slave until Christ is fully formed in him ('muh-pho-o').",
    primaryLocation: "antioch_syria",
    journeyPath: ["jerusalem_zion", "antioch_syria", "ephesus"]
  },
  "Ephesians": {
    author: "Paul the Apostle",
    dateWritten: "c. AD 60–62 (Prison Epistle from Rome)",
    dispensation: "The Eternal Purpose of God, Heavenly Seating in Christ & The Stature of the Body",
    historicalSetting: "Written from Paul's Roman imprisonment as a circular encyclical centered on Ephesus—the church where Paul had poured out his deepest mysteries for three years (Acts 20:27).",
    christocentricThread: "Christ is the Head over all things to the Church, which is His Body, the fullness of Him that filleth all in all (1:22-23), and the Chief Cornerstone of God's Habitation (2:20-22).",
    apostolicKey: "Ephesians divides into Three Postures of the Believer: (1) **SIT** — Seated with Christ in the heavenlies far above principalities (ch. 1–3); (2) **WALK** — Walking worthy of the vocation unto the measure of the stature of the fullness of Christ (ch. 4–6:9); (3) **STAND** — Standing in the armor of God against wicked spirits in heavenly places (6:10-20).",
    primaryLocation: "ephesus",
    journeyPath: ["rome", "ephesus"]
  },
  "Philippians": {
    author: "Paul the Apostle",
    dateWritten: "c. AD 61–62 (From Roman Imprisonment)",
    dispensation: "The Mind of Christ (Kenosis), The Excellency of Knowing Him & Pressing Toward the Prize",
    historicalSetting: "Sent to the beloved church at Philippi in Macedonia—the first church Paul planted in Europe (Acts 16)—thanking them for their partnership and calling them into the self-emptying mind of Christ.",
    christocentricThread: "Christ is the Self-Emptying Servant exalted to the highest place and given the Name above every name (2:5-11), and our supreme prize: 'For to me to live is Christ, and to die is gain' (1:21).",
    apostolicKey: "Philippians 3:10 sets the fourfold cry of the mature believer: 'That I may know Him, and the power (dunamis) of His resurrection, and the fellowship of His sufferings, being made conformable unto His death.'",
    primaryLocation: "philippi_thessalonica",
    journeyPath: ["rome", "philippi_thessalonica"]
  },
  "Colossians": {
    author: "Paul the Apostle",
    dateWritten: "c. AD 60–62 (Prison Epistle from Rome)",
    dispensation: "The Absolute Supremacy & All-Sufficiency of Christ the Firstborn (Prototokos)",
    historicalSetting: "Written from Rome to Colossae in the Lycus Valley of Asia Minor to dismantle a syncretistic heresy combining angel-worship, ascetic legalism, and philosophical mysticism.",
    christocentricThread: "Christ is the Image of the Invisible God, the Firstborn ('Prototokos') of all creation and Firstborn from the dead, in whom dwells all the fullness of the Godhead bodily (1:15-19; 2:9), and 'Christ in you, the hope of glory' (1:27).",
    apostolicKey: "If Ephesians reveals the **Body** of Christ, Colossians reveals the **Head** of the Body: declaring that we are 'complete in Him' (2:10) and that at the Cross He disarmed principalities and powers, triumphing over them in it (2:15).",
    primaryLocation: "ephesus",
    journeyPath: ["rome", "ephesus"]
  },
  "1 Thessalonians": {
    author: "Paul, Silvanus & Timothy",
    dateWritten: "c. AD 51 (From Corinth)",
    dispensation: "Tripartite Sanctification (Spirit, Soul & Body) & The Watchful Hope of Christ's Return",
    historicalSetting: "Written to the young Macedonian church in Thessalonica, born amid fierce persecution (Acts 17), commending their work of faith, labor of love, and patience of hope.",
    christocentricThread: "Christ is our Coming King who delivers us from the wrath to come (1:10) and descends from heaven with a shout to catch up His Bride (4:16-17).",
    apostolicKey: "1 Thessalonians 5:23 is the primary apostolic text on biblical anthropology: 'And the very God of peace sanctify you wholly; and I pray God your whole SPIRIT (pneuma) and SOUL (psuche) and BODY (soma) be preserved blameless.'",
    primaryLocation: "philippi_thessalonica",
    journeyPath: ["philippi_thessalonica", "corinth_athens"]
  },
  "2 Thessalonians": {
    author: "Paul, Silvanus & Timothy",
    dateWritten: "c. AD 51–52 (From Corinth)",
    dispensation: "Prophetic Discernment Concerning the Day of the Lord & The Mystery of Iniquity",
    historicalSetting: "Sent shortly after 1 Thessalonians to correct false letters claiming the Day of the Lord had already arrived, unveiling the Restrainer and the destruction of the Lawless One.",
    christocentricThread: "Christ is the Returning Lord who will consume the lawless one with the breath of His mouth and the brightness of His coming (2:8) and be glorified in His saints (1:10).",
    apostolicKey: "2 Thessalonians 2:10-12 warns that the only antidote against end-time strong delusion is cultivating 'the love of the truth'.",
    primaryLocation: "philippi_thessalonica",
    journeyPath: ["corinth_athens", "philippi_thessalonica"]
  },
  "1 Timothy": {
    author: "Paul the Apostle",
    dateWritten: "c. AD 63–65 (From Macedonia to Timothy at Ephesus)",
    dispensation: "Apostolic Order, Sound Doctrine & Governance in the House of God",
    historicalSetting: "Addressed to Paul's spiritual son Timothy, whom he left in charge at Ephesus to silence false teachers, order public intercession, and appoint qualified elders and deacons.",
    christocentricThread: "Christ is the One Mediator between God and men (2:5) and the Great Mystery of Godliness: 'God was manifest in the flesh, justified in the Spirit...' (3:16).",
    apostolicKey: "1 Timothy 1:18 and 4:14-16 demonstrate how an apostolic son wages a good warfare by the prophecies that went before on him, taking heed both to himself (character) and to the doctrine (truth).",
    primaryLocation: "ephesus",
    journeyPath: ["philippi_thessalonica", "ephesus"]
  },
  "2 Timothy": {
    author: "Paul the Apostle",
    dateWritten: "c. AD 66–67 (From the Mamertine Dungeon in Rome)",
    dispensation: "Passing the Apostolic Baton, Rightly Dividing the Word & Enduring to the Finish",
    historicalSetting: "Paul's final canonical letter before his martyrdom under Nero in Rome, charging Timothy to guard the sacred deposit, endure hardness as a good soldier, and commit the truth to faithful men.",
    christocentricThread: "Christ is the Righteous Judge who has abolished death and brought life and immortality to light through the Gospel (1:10; 4:8).",
    apostolicKey: "2 Timothy 2:2 (four generations of apostolic reproduction) and 2:15 ('Study to shew thyself approved unto God, a workman that needeth not to be ashamed, rightly dividing the word of truth') are the motto of this study hub.",
    primaryLocation: "rome",
    journeyPath: ["rome", "ephesus"]
  },
  "Titus": {
    author: "Paul the Apostle",
    dateWritten: "c. AD 63–65",
    dispensation: "Setting Things in Order & The Transforming Grace of God",
    historicalSetting: "Sent to Titus on the Mediterranean island of Crete to set in order things that were lacking and appoint elders in every city.",
    christocentricThread: "Christ is our 'Great God and our Saviour Jesus Christ, who gave Himself for us, that He might redeem us from all iniquity' (2:13-14).",
    apostolicKey: "Titus 2:11-12 defines true grace: Biblical grace is not a license to sin; it is the divine teacher ('paideuo') that instructs us to deny ungodliness and live soberly, righteously, and godly in this present world.",
    primaryLocation: "corinth_athens",
    journeyPath: ["corinth_athens", "ephesus"]
  },
  "Philemon": {
    author: "Paul the Apostle",
    dateWritten: "c. AD 60–62 (From Rome)",
    dispensation: "Imputation & New Creation Brotherhood",
    historicalSetting: "A personal letter sent from Paul's Roman imprisonment to Philemon in Colossae on behalf of Onesimus, a runaway slave whom Paul led to Christ in Rome.",
    christocentricThread: "Christ is the Divine Advocate who says to the Father concerning our debt: 'If he hath wronged thee, or oweth thee ought, put that on Mine account' (v. 18).",
    apostolicKey: "Philemon is a living portrait of the doctrine of imputation and how the Gospel transforms social hierarchies into genuine spiritual brotherhood.",
    primaryLocation: "rome",
    journeyPath: ["rome", "ephesus"]
  },
  "Hebrews": {
    author: "Apostolic Author (Pauline Circle / Apollos / Barnabas)",
    dateWritten: "c. AD 64–68 (Before the AD 70 Destruction of the Jerusalem Temple)",
    dispensation: "The Better Covenant, The Order of Melchizedek & The Heavenly Sanctuary Blood",
    historicalSetting: "Addressed to Jewish Christians tempted under persecution to retreat back into the visible rituals of the Levitical Temple, proving that every Old Testament shadow has found its eternal substance in Christ.",
    christocentricThread: "Christ is the Express Image of the Father's person (1:3), the Captain of our Salvation bringing many sons to glory (2:10), our Great High Priest after the Order of Melchizedek (ch. 5–7), the Mediator of a Better Covenant entering the Heavenly Holy of Holies by His own Blood (ch. 8–10), and the Author and Finisher of our Faith on Mount Zion (ch. 12).",
    apostolicKey: "Hebrews is the master commentary on Leviticus: unlocking the surgical sword dividing soul and spirit (4:12), pressing past elementary milk into solid food and the Melchizedek priesthood (5:12–6:20), the purging of the conscience by the Blood (9:14), and the chastening of mature 'Huioi' on Mount Zion (12:5-24).",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["mount_sinai", "jerusalem_zion", "rome"]
  },
  "James": {
    author: "James (Jacob), the Lord's Brother & Pillar of the Jerusalem Church",
    dateWritten: "c. AD 45–49 (Earliest New Testament Epistle)",
    dispensation: "Living Faith Demonstrated by Works & The Implanted Word Saving the Soul",
    historicalSetting: "Written from Jerusalem to the twelve tribes scattered abroad, calling believers to authentic wisdom, endurance in trials, mastery of the tongue, and practical righteousness.",
    christocentricThread: "Christ is the Lord of Glory (2:1) and the Coming Judge standing at the door (5:9).",
    apostolicKey: "James 1:21 ('Receive with meekness the engrafted/implanted word, which is able to save your souls/psuche') is a key text on the progressive salvation of the soul after the new birth of the spirit.",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["jerusalem_zion"]
  },
  "1 Peter": {
    author: "Simon Peter the Apostle",
    dateWritten: "c. AD 63–64 (Written from Rome / 'Babylon')",
    dispensation: "The Royal Priesthood, Fiery Trials & The Salvation of the Soul",
    historicalSetting: "Addressed to suffering believers scattered across Pontus, Galatia, Cappadocia, Asia, and Bithynia as imperial fiery trials began to break out.",
    christocentricThread: "Christ is the Precious Lamb without blemish foreordained before the foundation of the world (1:19-20), the Living Stone and Chief Cornerstone (2:4-6), and the Chief Shepherd appearing with a crown of glory (5:4).",
    apostolicKey: "1 Peter 1:9 ('Receiving the end of your faith, even the salvation of your souls') and 2:5, 9 ('A holy priesthood... a royal priesthood') show how suffering purifies faith like gold and establishes our priestly identity.",
    primaryLocation: "rome",
    journeyPath: ["jerusalem_zion", "antioch_syria", "rome"]
  },
  "2 Peter": {
    author: "Simon Peter the Apostle",
    dateWritten: "c. AD 66–67 (Shortly before his martyrdom in Rome)",
    dispensation: "Partakers of the Divine Nature & The Sure Prophetic Word",
    historicalSetting: "Peter's final testament warning the Church against false teachers within and scoffers denying the Lord's return.",
    christocentricThread: "Christ is the Transfigured Majesty witnessed on the Holy Mount (1:16-18) and the Morning Star rising in our hearts (1:19).",
    apostolicKey: "2 Peter 1:3-11 unveils how God's 'exceeding great and precious promises' make us **partakers of the divine nature** ('theias koinonoi phuseos'), and how adding virtue, knowledge, temperance, patience, godliness, brotherly kindness, and love secures an abundant entrance ('plousios') into the everlasting Kingdom.",
    primaryLocation: "rome",
    journeyPath: ["caesarea_philippi", "rome"]
  },
  "1 John": {
    author: "John the Beloved Apostle",
    dateWritten: "c. AD 85–90 (From Ephesus)",
    dispensation: "Fellowship in the Light, The Cleansing Blood, The Anointing & Eternal Zoe",
    historicalSetting: "Written from Ephesus to counter Gnostic teachers who denied the real incarnation of Christ and separated spiritual knowledge from righteous living and brotherly love.",
    christocentricThread: "Christ is the Word of Life whom we have heard, seen, and handled (1:1), our Advocate with the Father and Propitiation for our sins (2:1-2), and the Son of God manifested to destroy the works of the devil (3:8).",
    apostolicKey: "1 John 1:7 ('Walk in the light... and the blood of Jesus Christ His Son cleanseth us from all sin'), 2:20, 27 ('The anointing which ye have received of Him abideth in you'), and 5:11-12 ('He that hath the Son hath Zoe') anchor apostolic assurance.",
    primaryLocation: "ephesus",
    journeyPath: ["jerusalem_zion", "ephesus"]
  },
  "2 John": {
    author: "John the Elder",
    dateWritten: "c. AD 85–90 (From Ephesus)",
    dispensation: "Walking in Truth and Love & Guarding the Threshold of Doctrine",
    historicalSetting: "A concise pastoral warning to 'the elect lady and her children' not to host or bid Godspeed to deceivers who do not confess Jesus Christ coming in the flesh.",
    christocentricThread: "Christ is the Incarnate Son of the Father in truth and love (v. 3, 7).",
    apostolicKey: "2 John v. 8-9 warns believers to guard the doctrine of Christ so we do not lose the things we have wrought, but receive a full reward.",
    primaryLocation: "ephesus",
    journeyPath: ["ephesus"]
  },
  "3 John": {
    author: "John the Elder",
    dateWritten: "c. AD 85–90 (From Ephesus)",
    dispensation: "Soul Prosperity & Fellowhelpers to the Truth",
    historicalSetting: "Addressed to beloved Gaius, commending his hospitality toward traveling apostolic brethren in contrast to power-hungry Diotrephes.",
    christocentricThread: "Christ is the Name for whose sake apostolic laborers go forth taking nothing of the Gentiles (v. 7).",
    apostolicKey: "3 John v. 2 ('I wish above all things that thou mayest prosper and be in health, even as thy soul/psuche prospereth') links external stewardship and health to the inward prosperity of a truth-aligned soul.",
    primaryLocation: "ephesus",
    journeyPath: ["ephesus"]
  },
  "Jude": {
    author: "Jude (Judas), Brother of James and Servant of Jesus Christ",
    dateWritten: "c. AD 65–68",
    dispensation: "Earnestly Contending for the Once-Delivered Faith & Praying in the Holy Ghost",
    historicalSetting: "An urgent Trumpet blast calling the Church to contend for the apostolic faith against ungodly men turning the grace of God into lasciviousness.",
    christocentricThread: "Christ is the Only Wise God our Savior who is able to keep us from falling and present us faultless before the presence of His glory with exceeding joy (v. 24-25).",
    apostolicKey: "Jude 1:20 ('But ye, beloved, building up yourselves on your most holy faith, praying in the Holy Ghost') is the primary apostolic engine for generating spiritual edema/charge ('oikodomeo').",
    primaryLocation: "jerusalem_zion",
    journeyPath: ["jerusalem_zion"]
  },
  "Revelation": {
    author: "John the Apostle",
    dateWritten: "c. AD 95 (On the Isle of Patmos during Domitian's reign)",
    dispensation: "The Apocalypse of Jesus Christ, The Overcomers, The Courtroom Throne & The New Jerusalem",
    historicalSetting: "Received by John while exiled on the rocky island of Patmos in the Aegean Sea, addressed first to the Seven Churches of Asia Minor and unfolding the throne room of Heaven, the Tribulation seals/trumpets/bowls, the fall of Babylon, the Millennial Reign, and the New Heavens and New Earth.",
    christocentricThread: "Christ is the Alpha and Omega walking among the Golden Lampstands (ch. 1), the Lion of Judah who is the Lamb as it had been slain worthy to open the Seven-Sealed Scroll (ch. 5), the King of Kings and Lord of Lords named The Word of God (19:13-16), and the Lamp of the New Jerusalem (21:23).",
    apostolicKey: "Revelation 1:6, 5:9-10 ('Made us unto our God kings and priests: and we shall reign on the earth'), and 12:11 ('They overcame him by the blood of the Lamb, and by the word of their testimony, and they loved not their lives/psuche unto the death') bring the entire 1,189-chapter canon to its triumphant climax!",
    primaryLocation: "patmos",
    journeyPath: ["patmos", "ephesus", "jerusalem_zion"]
  }
};

// Specific Chapter-Level Geopolitical & Study Overrides for Key Turning Points
window.CHAPTER_GEO_OVERRIDES = {
  "Genesis_1": {
    locationId: "eden_mesopotamia",
    studyContext: "Genesis 1 records the Cosmic Creation Week. Before human geography existed, the Spirit of God ('Ruwach Elohim') brooded over the primordial waters, and Elohim framed the heavens, earth, and man by ten spoken decrees ('And God said...').",
    mapCaption: "The Cradle of Creation & The Four River Headwaters of Eden (Genesis 1–2)"
  },
  "Genesis_12": {
    locationId: "shechem",
    studyContext: "Abram obeys the call of the God of Glory (Acts 7:2), departing Ur and Haran to cross into Canaan. His first stop in the Promised Land is Shechem (at the terebinth tree of Moreh) and Bethel, where he raises his first altars.",
    mapCaption: "Abraham's Covenant Journey: Ur → Haran → Shechem → Bethel → Hebron"
  },
  "Exodus_12": {
    locationId: "goshen_egypt",
    studyContext: "In the land of Goshen in Egypt's Nile Delta, God institutes the Passover ('Pesach'). The blood of a spotless lamb applied with hyssop to the lintel and two side-posts legally shields every household from the Destroyer.",
    mapCaption: "Goshen (Nile Delta) to the Red Sea — The Night of the Passover Blood"
  },
  "Leviticus_17": {
    locationId: "mount_sinai",
    studyContext: "Given from the Tabernacle of Meeting at the foot of Mount Sinai. God centralizes all sacrifice at the brazen altar and reveals why blood is sacred: the 'Nephesh' (soul/life) of the flesh is in the 'Dam' (blood) for atonement ('Kaphar').",
    mapCaption: "Encampment of Israel at Mount Sinai before the Tabernacle Altar"
  },
  "John_1": {
    locationId: "jerusalem_zion",
    studyContext: "Opens in Eternity Past ('In the beginning was the Logos'), then shifts geographically to Bethany beyond the Jordan where John the Baptist cries 'Behold the Lamb of God!' and Jesus calls His first Galilean disciples.",
    mapCaption: "Bethany Beyond the Jordan to Galilee — The Incarnate Logos Manifested to Israel"
  },
  "Romans_3": {
    locationId: "rome",
    studyContext: "Written by Paul from Corinth (Gaius' house) and carried by Phoebe of Cenchrea to the saints in imperial Rome. Paul uses the highest Roman and Levitical legal terminology to unveil Christ as our 'Hilasterion' (Mercy Seat) through faith in His Blood.",
    mapCaption: "From Corinth to Imperial Rome — The Supreme Courtroom Manifesto of Justification"
  },
  "Romans_8": {
    locationId: "rome",
    studyContext: "Addressed to believers living in the shadow of Caesar's throne in Rome, declaring a higher imperial statute: 'The Law of the Spirit of Life (Zoe) in Christ Jesus' and the groaning of all creation for the unveiling of the mature 'Huioi' (Sons of God).",
    mapCaption: "Rome — The Seat of Empire Confronted by the Jurisdiction of Mature Sons (Huioi)"
  },
  "Ephesians_1": {
    locationId: "ephesus",
    studyContext: "Written from Paul's Roman custody to Ephesus, capital of Roman Asia and home to the massive temple of Artemis. Against the backdrop of Ephesus' occult principalities, Paul unveils the believer's seating with Christ far above all principality, power ('Exousia'), and might ('Dunamis').",
    mapCaption: "Rome to Ephesus (Asia Minor) — Seated in the Heavenlies Far Above Principalities"
  },
  "Hebrews_4": {
    locationId: "jerusalem_zion",
    studyContext: "Contrasts Israel's wilderness failure at Kadesh-Barnea with the true Sabbath Rest available in Christ. Unveils the Word of God ('Logos') as the High Priest's surgical sacrificial knife dividing soul ('Psuche') from spirit ('Pneuma') before we approach the Throne of Grace.",
    mapCaption: "From Kadesh-Barnea's Wilderness Warning to the Heavenly Throne of Grace"
  },
  "Hebrews_9": {
    locationId: "jerusalem_zion",
    studyContext: "Written while the Second Temple still stood in Jerusalem, comparing the earthly Holy of Holies with the true Heavenly Tabernacle into which Christ entered once for all by His own Blood ('Haima') to purge our conscience from dead works.",
    mapCaption: "Mount Moriah / Jerusalem Temple Shadow Fulfilled in the Heavenly Sanctuary"
  },
  "Hebrews_12": {
    locationId: "jerusalem_zion",
    studyContext: "Contrasts the trembling terror of earthly Mount Sinai (Exodus 19) with our present spiritual arrival at heavenly Mount Zion, the General Assembly and Church of the Firstborn ('Prototokos'), and the Blood of sprinkling speaking better things than Abel.",
    mapCaption: "From Earthly Mount Sinai to Heavenly Mount Zion (The City of the Living God)"
  },
  "Revelation_12": {
    locationId: "patmos",
    studyContext: "Seen by the Apostle John from the rocky Aegean island of Patmos across the water from Ephesus. Unveils the cosmic courtroom war in heaven where Michael casts down the Dragon, and the brethren on earth overcome the Accuser ('Kategoros') by the Blood of the Lamb and the Word of their testimony.",
    mapCaption: "Isle of Patmos Vision — Overcoming the Accuser across the Seven Churches of Asia"
  }
};

// Helper to get Study Bible Context + Map Coordinates for ANY Book & Chapter
window.getChapterStudyAndMapData = function (bookName, chapterNum) {
  const key = `${bookName}_${chapterNum}`;
  const bookProfile = window.BOOK_STUDY_PROFILES[bookName] || window.BOOK_STUDY_PROFILES["John"];
  const override = window.CHAPTER_GEO_OVERRIDES[key];

  // Dynamically pick location along the book's journey path based on chapter progress if no specific override
  let activeLocId = bookProfile.primaryLocation;
  if (override && override.locationId) {
    activeLocId = override.locationId;
  } else if (Array.isArray(bookProfile.journeyPath) && bookProfile.journeyPath.length > 1) {
    const bookMeta = window.BIBLE_BOOKS.find((b) => b.name === bookName);
    const totalCh = bookMeta ? bookMeta.chapters : 10;
    const progressRatio = Math.min(0.99, Math.max(0, (chapterNum - 1) / Math.max(1, totalCh)));
    const pathIdx = Math.floor(progressRatio * bookProfile.journeyPath.length);
    activeLocId = bookProfile.journeyPath[pathIdx] || bookProfile.primaryLocation;
  }

  const primaryLoc = window.BIBLICAL_LOCATIONS[activeLocId] || window.BIBLICAL_LOCATIONS["jerusalem_zion"];
  const routeLocations = (bookProfile.journeyPath || [activeLocId])
    .map((id) => window.BIBLICAL_LOCATIONS[id])
    .filter(Boolean);

  return {
    bookName,
    chapterNum,
    author: bookProfile.author,
    dateWritten: bookProfile.dateWritten,
    dispensation: bookProfile.dispensation,
    historicalSetting: override ? override.studyContext : bookProfile.historicalSetting,
    bookOverview: bookProfile.historicalSetting,
    christocentricThread: bookProfile.christocentricThread,
    apostolicKey: bookProfile.apostolicKey,
    mapCaption: override
      ? override.mapCaption
      : `${bookName} ${chapterNum} Geographical Setting: ${primaryLoc.name} (${primaryLoc.modernRegion})`,
    activeLocation: primaryLoc,
    routeLocations
  };
};
