/**
 * Remnant Word Hub — Bible Metadata, Curated KJV/NKJV Parallel Corpus,
 * Strong's Lexicon & Concordance Engine, and 365-Day Yearly Plan Generator.
 */

window.BIBLE_BOOKS = [
  // Old Testament (39 Books, 929 Chapters)
  { id: 1, name: "Genesis", abbr: "Gen", testament: "OT", chapters: 50, category: "Pentateuch" },
  { id: 2, name: "Exodus", abbr: "Exo", testament: "OT", chapters: 40, category: "Pentateuch" },
  { id: 3, name: "Leviticus", abbr: "Lev", testament: "OT", chapters: 27, category: "Pentateuch" },
  { id: 4, name: "Numbers", abbr: "Num", testament: "OT", chapters: 36, category: "Pentateuch" },
  { id: 5, name: "Deuteronomy", abbr: "Deu", testament: "OT", chapters: 34, category: "Pentateuch" },
  { id: 6, name: "Joshua", abbr: "Jos", testament: "OT", chapters: 24, category: "History" },
  { id: 7, name: "Judges", abbr: "Jdg", testament: "OT", chapters: 21, category: "History" },
  { id: 8, name: "Ruth", abbr: "Rut", testament: "OT", chapters: 4, category: "History" },
  { id: 9, name: "1 Samuel", abbr: "1Sa", testament: "OT", chapters: 31, category: "History" },
  { id: 10, name: "2 Samuel", abbr: "2Sa", testament: "OT", chapters: 24, category: "History" },
  { id: 11, name: "1 Kings", abbr: "1Ki", testament: "OT", chapters: 22, category: "History" },
  { id: 12, name: "2 Kings", abbr: "2Ki", testament: "OT", chapters: 25, category: "History" },
  { id: 13, name: "1 Chronicles", abbr: "1Ch", testament: "OT", chapters: 29, category: "History" },
  { id: 14, name: "2 Chronicles", abbr: "2Ch", testament: "OT", chapters: 36, category: "History" },
  { id: 15, name: "Ezra", abbr: "Ezr", testament: "OT", chapters: 10, category: "History" },
  { id: 16, name: "Nehemiah", abbr: "Neh", testament: "OT", chapters: 13, category: "History" },
  { id: 17, name: "Esther", abbr: "Est", testament: "OT", chapters: 10, category: "History" },
  { id: 18, name: "Job", abbr: "Job", testament: "OT", chapters: 42, category: "Poetry & Wisdom" },
  { id: 19, name: "Psalms", abbr: "Psa", testament: "OT", chapters: 150, category: "Poetry & Wisdom" },
  { id: 20, name: "Proverbs", abbr: "Pro", testament: "OT", chapters: 31, category: "Poetry & Wisdom" },
  { id: 21, name: "Ecclesiastes", abbr: "Ecc", testament: "OT", chapters: 12, category: "Poetry & Wisdom" },
  { id: 22, name: "Song of Solomon", abbr: "Sng", testament: "OT", chapters: 8, category: "Poetry & Wisdom" },
  { id: 23, name: "Isaiah", abbr: "Isa", testament: "OT", chapters: 66, category: "Major Prophets" },
  { id: 24, name: "Jeremiah", abbr: "Jer", testament: "OT", chapters: 52, category: "Major Prophets" },
  { id: 25, name: "Lamentations", abbr: "Lam", testament: "OT", chapters: 5, category: "Major Prophets" },
  { id: 26, name: "Ezekiel", abbr: "Ezk", testament: "OT", chapters: 48, category: "Major Prophets" },
  { id: 27, name: "Daniel", abbr: "Dan", testament: "OT", chapters: 12, category: "Major Prophets" },
  { id: 28, name: "Hosea", abbr: "Hos", testament: "OT", chapters: 14, category: "Minor Prophets" },
  { id: 29, name: "Joel", abbr: "Jol", testament: "OT", chapters: 3, category: "Minor Prophets" },
  { id: 30, name: "Amos", abbr: "Amo", testament: "OT", chapters: 9, category: "Minor Prophets" },
  { id: 31, name: "Obadiah", abbr: "Oba", testament: "OT", chapters: 1, category: "Minor Prophets" },
  { id: 32, name: "Jonah", abbr: "Jon", testament: "OT", chapters: 4, category: "Minor Prophets" },
  { id: 33, name: "Micah", abbr: "Mic", testament: "OT", chapters: 7, category: "Minor Prophets" },
  { id: 34, name: "Nahum", abbr: "Nam", testament: "OT", chapters: 3, category: "Minor Prophets" },
  { id: 35, name: "Habakkuk", abbr: "Hab", testament: "OT", chapters: 3, category: "Minor Prophets" },
  { id: 36, name: "Zephaniah", abbr: "Zep", testament: "OT", chapters: 3, category: "Minor Prophets" },
  { id: 37, name: "Haggai", abbr: "Hag", testament: "OT", chapters: 2, category: "Minor Prophets" },
  { id: 38, name: "Zechariah", abbr: "Zec", testament: "OT", chapters: 14, category: "Minor Prophets" },
  { id: 39, name: "Malachi", abbr: "Mal", testament: "OT", chapters: 4, category: "Minor Prophets" },
  // New Testament (27 Books, 260 Chapters)
  { id: 40, name: "Matthew", abbr: "Mat", testament: "NT", chapters: 28, category: "Gospels" },
  { id: 41, name: "Mark", abbr: "Mrk", testament: "NT", chapters: 16, category: "Gospels" },
  { id: 42, name: "Luke", abbr: "Luk", testament: "NT", chapters: 24, category: "Gospels" },
  { id: 43, name: "John", abbr: "Jhn", testament: "NT", chapters: 21, category: "Gospels" },
  { id: 44, name: "Acts", abbr: "Act", testament: "NT", chapters: 28, category: "Acts / Early Church" },
  { id: 45, name: "Romans", abbr: "Rom", testament: "NT", chapters: 16, category: "Pauline Epistles" },
  { id: 46, name: "1 Corinthians", abbr: "1Co", testament: "NT", chapters: 16, category: "Pauline Epistles" },
  { id: 47, name: "2 Corinthians", abbr: "2Co", testament: "NT", chapters: 13, category: "Pauline Epistles" },
  { id: 48, name: "Galatians", abbr: "Gal", testament: "NT", chapters: 6, category: "Pauline Epistles" },
  { id: 49, name: "Ephesians", abbr: "Eph", testament: "NT", chapters: 6, category: "Pauline Epistles" },
  { id: 50, name: "Philippians", abbr: "Php", testament: "NT", chapters: 4, category: "Pauline Epistles" },
  { id: 51, name: "Colossians", abbr: "Col", testament: "NT", chapters: 4, category: "Pauline Epistles" },
  { id: 52, name: "1 Thessalonians", abbr: "1Th", testament: "NT", chapters: 5, category: "Pauline Epistles" },
  { id: 53, name: "2 Thessalonians", abbr: "2Th", testament: "NT", chapters: 3, category: "Pauline Epistles" },
  { id: 54, name: "1 Timothy", abbr: "1Ti", testament: "NT", chapters: 6, category: "Pastoral Epistles" },
  { id: 55, name: "2 Timothy", abbr: "2Ti", testament: "NT", chapters: 4, category: "Pastoral Epistles" },
  { id: 56, name: "Titus", abbr: "Tit", testament: "NT", chapters: 3, category: "Pastoral Epistles" },
  { id: 57, name: "Philemon", abbr: "Phm", testament: "NT", chapters: 1, category: "Pastoral Epistles" },
  { id: 58, name: "Hebrews", abbr: "Heb", testament: "NT", chapters: 13, category: "General Epistles" },
  { id: 59, name: "James", abbr: "Jas", testament: "NT", chapters: 5, category: "General Epistles" },
  { id: 60, name: "1 Peter", abbr: "1Pe", testament: "NT", chapters: 5, category: "General Epistles" },
  { id: 61, name: "2 Peter", abbr: "2Pe", testament: "NT", chapters: 3, category: "General Epistles" },
  { id: 62, name: "1 John", abbr: "1Jn", testament: "NT", chapters: 5, category: "General Epistles" },
  { id: 63, name: "2 John", abbr: "2Jn", testament: "NT", chapters: 1, category: "General Epistles" },
  { id: 64, name: "3 John", abbr: "3Jn", testament: "NT", chapters: 1, category: "General Epistles" },
  { id: 65, name: "Jude", abbr: "Jud", testament: "NT", chapters: 1, category: "General Epistles" },
  { id: 66, name: "Revelation", abbr: "Rev", testament: "NT", chapters: 22, category: "Prophecy / Apocalypse" }
];

// Blue Letter Bible + Apostolic Lexicon (Strong's Hebrew & Greek with First Mention & Apostolic Nuance)
window.STRONGS_LEXICON = {
  "H7225": {
    number: "H7225",
    lang: "Hebrew",
    original: "רֵאשִׁית",
    translit: "rêʼshîyth",
    pronunciation: "ray-sheeth'",
    partOfSpeech: "Feminine Noun",
    definition: "The first, in place, time, order or rank (specifically, a firstfruit); beginning, chief, principal thing.",
    blbOutline: [
      "I. beginning, chief, first, choice part",
      "1. beginning (of time and creation order)",
      "2. first, chief (in rank and excellence)",
      "3. firstfruits (offering consecrated unto God)"
    ],
    firstMention: "Genesis 1:1 — 'In the beginning (reshith) God created the heaven and the earth.'",
    apostolicExegesis: "In apostolic hermeneutics (Arome Osayi / Tolu Agboola), 'reshith' does not merely signify a chronological clock-tick; it signifies 'in the Headship/Firstborn Order'. Compare with Proverbs 8:22 and Colossians 1:18 — all creation emerged inside the jurisdictional authority of the Firstfruits (Christ).",
    keyRefs: ["Genesis 1:1", "Proverbs 1:7", "Proverbs 4:7", "Jeremiah 2:3"]
  },
  "H430": {
    number: "H430",
    lang: "Hebrew",
    original: "אֱלֹהִים",
    translit: "ʼĔlôhîym",
    pronunciation: "el-o-heem'",
    partOfSpeech: "Masculine Plural Noun",
    definition: "Gods in the ordinary sense; but specifically used (in the plural thus, especially with the article) of the supreme God; occasionally applied by way of deference to magistrates and judges.",
    blbOutline: [
      "I. (plural) rulers, judges, divine ones, angels",
      "II. (plural intensive - singular meaning) God, the Supreme Creator and Triune Counsel"
    ],
    firstMention: "Genesis 1:1 — 'In the beginning God (Elohim) created...'",
    apostolicExegesis: "Elohim reveals God as the Uncreated Supreme Judge and Plurality of Majesty functioning in singular legislative agreement ('bara' is singular). Notice Psalm 82:6 where man regenerated into divine council shares the delegated judicial administration under the Great Elohim.",
    keyRefs: ["Genesis 1:1", "Genesis 1:26", "Deuteronomy 6:4", "Psalm 82:1", "Psalm 82:6"]
  },
  "H7307": {
    number: "H7307",
    lang: "Hebrew",
    original: "רוּחַ",
    translit: "rûwach",
    pronunciation: "roo'-akh",
    partOfSpeech: "Feminine Noun",
    definition: "Wind; by resemblance breath, i.e. a sensible (or even violent) exhalation; figuratively, life, anger, unsubstantiality; by extension, a region of the sky; by resemblance spirit, but only of a rational being (including its expression and functions).",
    blbOutline: [
      "I. breath, wind, spirit",
      "1. breath (of mouth or nostrils)",
      "2. wind (of heaven, quarter-winds)",
      "3. spirit (of the living, seat of emotion, courage, and prophetic vitality)",
      "4. Spirit of God (the executive agency of Elohim)"
    ],
    firstMention: "Genesis 1:2 — 'And the Spirit (Ruwach) of God moved upon the face of the waters.'",
    apostolicExegesis: "Whenever chaos ('tohu wa-bohu') exists, the Ruwach Elohim brooding ('rachaph' — vibrating/incubating like an eagle over its nest) is the prerequisite for the spoken Word ('Amar') to produce light. You cannot legislate with the Word until you have incubated with the Spirit.",
    keyRefs: ["Genesis 1:2", "Genesis 6:3", "Job 33:4", "Ezekiel 37:9", "Joel 2:28"]
  },
  "H5315": {
    number: "H5315",
    lang: "Hebrew",
    original: "נֶפֶשׁ",
    translit: "nephesh",
    pronunciation: "neh'-fesh",
    partOfSpeech: "Feminine Noun",
    definition: "Properly, a breathing creature, i.e. animal of (abstractly) vitality; used very widely in a literal, accommodated or figurative sense (bodily or mental) — soul, life, person, desire, appetite.",
    blbOutline: [
      "I. soul, self, life, creature, person, appetite, mind, living being",
      "1. that which breathes, the breathing substance or being",
      "2. the inner being of man (seat of appetites, emotions, and volition)"
    ],
    firstMention: "Genesis 1:20 / Genesis 2:7 — '...and man became a living soul (nephesh chayyah).'",
    apostolicExegesis: "Leviticus 17:11 locks a spiritual law: 'For the life (nephesh) of the flesh is in the blood (dam).' When Adam sinned, his nephesh was corrupted through the fall, which is why animal blood could only cover (kaphar), whereas the incorruptible Blood of the Divine Logos cleanses the conscience.",
    keyRefs: ["Genesis 2:7", "Leviticus 17:11", "Deuteronomy 6:5", "Psalm 42:1"]
  },
  "H1818": {
    number: "H1818",
    lang: "Hebrew",
    original: "דָּם",
    translit: "dâm",
    pronunciation: "dawm",
    partOfSpeech: "Masculine Noun",
    definition: "Blood (as that which when shed causes death) of man or an animal; by analogy, the juice of the grape; figuratively (especially in the plural) bloodshed.",
    blbOutline: [
      "I. blood",
      "1. of wine (figurative)",
      "2. of sacrificial blood on the altar of atonement",
      "3. of bloodguiltiness or judicial vengeance"
    ],
    firstMention: "Genesis 4:10 — 'The voice of thy brother's blood (damim - plural) crieth unto me from the ground.'",
    apostolicExegesis: "In Genesis 4:10, 'blood' is plural ('damim') — indicating that blood has a judicial voice in the courts of heaven and speaks across generations. Compare with Hebrews 12:24: the Blood of Jesus speaks better things than that of Abel — moving from an outcry of vengeance to a verdict of eternal justification.",
    keyRefs: ["Genesis 4:10", "Genesis 9:6", "Exodus 12:13", "Leviticus 17:11"]
  },
  "H3722": {
    number: "H3722",
    lang: "Hebrew",
    original: "כָּפַר",
    translit: "kâphar",
    pronunciation: "kaw-far'",
    partOfSpeech: "Verb",
    definition: "A primitive root; to cover (specifically with bitumen); figuratively, to expiate or condone, to placate or cancel: appease, make (an) atonement, cleanse, disannul, forgive, be merciful, pacify, pardon, purge, put off, make reconciliation.",
    blbOutline: [
      "I. to cover, purge, make an atonement, make reconciliation, cover over with pitch",
      "1. (Qal) to coat or cover with pitch (as Noah's ark)",
      "2. (Piel) to cover over, pacify, propitiate, make atonement for sin"
    ],
    firstMention: "Genesis 6:14 — '...and shalt pitch (kaphar) it within and without with pitch (kopher).'",
    apostolicExegesis: "By the Law of First Mention (Genesis 6:14), atonement ('kaphar') is the waterproof pitch applied both inside and outside the Ark so the waters of judgment cannot penetrate. Old Testament kaphar covered sin temporarily; New Testament 'hilasterion' (Rom 3:25) and 'aphesis' remove the sin nature completely.",
    keyRefs: ["Genesis 6:14", "Exodus 30:10", "Leviticus 16:30", "Leviticus 17:11", "Isaiah 28:18"]
  },
  "G3056": {
    number: "G3056",
    lang: "Greek",
    original: "λόγος",
    translit: "lógos",
    pronunciation: "log'-os",
    partOfSpeech: "Masculine Noun",
    definition: "From G3004; something said (including the thought); by implication, a topic (subject of discourse), also reasoning (the mental faculty) or motive; by extension, a computation; specially, (with the article in John) the Divine Expression (i.e. Christ).",
    blbOutline: [
      "I. of speech: a word, uttered by a living voice, embodies a conception or idea",
      "II. the sayings of God: decree, mandate or order",
      "III. The Personal Wisdom and Power in union with God, His minister in creation and government of the universe (Christ)"
    ],
    firstMention: "Matthew 5:37 / John 1:1 (Theological First Principle) — 'In the beginning was the Word (Logos), and the Word was with God, and the Word was God.'",
    apostolicExegesis: "Apostle Arome Osayi & Tolu Agboola distinction: 'Logos' is the total mind, eternal counsel, intelligence, and personhood of God codified into expression. When the eternal Logos is breathed upon a specific believer for a present kairos moment, it is experienced as 'Rhema' (G4487). You build stability on Logos; you wage warfare with Rhema.",
    keyRefs: ["John 1:1", "John 1:14", "Acts 20:32", "Hebrews 4:12", "1 John 1:1", "Revelation 19:13"]
  },
  "G4487": {
    number: "G4487",
    lang: "Greek",
    original: "ῥῆμα",
    translit: "rhêma",
    pronunciation: "hray'-mah",
    partOfSpeech: "Neuter Noun",
    definition: "From G4483; an utterance (individually, collectively or specifically); by implication, a matter or topic (especially of narration, command or dispute).",
    blbOutline: [
      "I. that which is or has been uttered by the living voice, thing spoken, word",
      "II. any sound produced by the voice and having definite meaning",
      "III. subject matter of speech, thing, matter, business"
    ],
    firstMention: "Matthew 4:4 — 'Man shall not live by bread alone, but by every word (rhema) that proceedeth out of the mouth of God.'",
    apostolicExegesis: "Notice the present continuous participle in Matthew 4:4: 'proceeding' out of the mouth of God. Rhema is an active, spoken prophetic utterance loaded with creative force (Luke 1:37 — 'No rhema from God shall be void of power/dunamis'). In Ephesians 6:17, the Sword of the Spirit is specifically the 'rhema' of God.",
    keyRefs: ["Matthew 4:4", "Luke 1:37", "Luke 1:38", "Romans 10:17", "Ephesians 6:17", "Hebrews 11:3"]
  },
  "G2222": {
    number: "G2222",
    lang: "Greek",
    original: "ζωή",
    translit: "zōḗ",
    pronunciation: "dzo-ay'",
    partOfSpeech: "Feminine Noun",
    definition: "Life, both of physical (present) and of spiritual (particularly future) existence; specifically, the uncreated, eternal life of God Himself.",
    blbOutline: [
      "I. life",
      "1. the state of one who is possessed of vitality",
      "2. of the absolute fulness of life, both essential and ethical, which belongs to God, and through Him both to the hypostatic 'logos' and to Christ"
    ],
    firstMention: "Matthew 7:14 / John 1:4 — 'In him was life (zoe); and the life was the light of men.'",
    apostolicExegesis: "Greek differentiates three words translated 'life' in English: 'Bios' (G979 — biological/manner of physical living), 'Psuche' (G5590 — soulical/psychological life of the intellect, will, and emotions), and 'Zoe' (G2222 — the indestructible, uncreated Life of God). Christianity is not religion improving 'Psuche'; it is the implantation of 'Zoe' into man's spirit (1 John 5:11-12).",
    keyRefs: ["John 1:4", "John 5:26", "John 10:10", "John 14:6", "Romans 8:2", "1 John 5:12"]
  },
  "G5590": {
    number: "G5590",
    lang: "Greek",
    original: "ψυχή",
    translit: "psychḗ",
    pronunciation: "psoo-khay'",
    partOfSpeech: "Feminine Noun",
    definition: "From G5594; breath, i.e. (by implication) spirit, abstractly or concretely (the animal sentient principle only; thus distinguished on the one hand from G4151, which is the rational and immortal soul; and on the other from G2222, which is mere vitality).",
    blbOutline: [
      "I. breath of life, the vital force which animates the body",
      "II. the soul: the seat of the feelings, desires, affections, aversions"
    ],
    firstMention: "Matthew 2:20 / Matthew 16:25 — 'For whosoever will save his life (psuche) shall lose it...'",
    apostolicExegesis: "Apostolic anthropology (1 Thess 5:23, Heb 4:12) distinguishes 'Pneuma' (spirit) from 'Psuche' (soul). At the New Birth, your Pneuma is instantly recreated (2 Cor 5:17), while your Psuche must undergo progressive salvation ('soteria' of the soul, James 1:21, 1 Pet 1:9) through the renewing of the mind (Rom 12:2) and the way of the Cross.",
    keyRefs: ["Matthew 16:25", "1 Corinthians 2:14", "1 Thessalonians 5:23", "Hebrews 4:12", "James 1:21", "1 Peter 1:9"]
  },
  "G4151": {
    number: "G4151",
    lang: "Greek",
    original: "πνεῦμα",
    translit: "pneûma",
    pronunciation: "pnyoo'-mah",
    partOfSpeech: "Neuter Noun",
    definition: "From G4154; a current of air, i.e. breath (blast) or a breeze; by analogy or figuratively, a spirit, i.e. (human) the rational soul, (by implication) vital principle, mental disposition, etc., or (superhuman) an angel, demon, or (divine) God, Christ's spirit, the Holy Spirit.",
    blbOutline: [
      "I. the third person of the triune God, the Holy Spirit, coequal, coeternal with the Father and the Son",
      "II. the spirit, i.e. the vital principal by which the body is animated (human spirit)",
      "III. a spirit, i.e. a simple essence, devoid of all or at least all grosser matter"
    ],
    firstMention: "Matthew 1:18 / John 3:6 — 'That which is born of the flesh is flesh; and that which is born of the Spirit (Pneuma) is spirit (pneuma).'",
    apostolicExegesis: "Man's spirit (pneuma) is the lamp of the Lord (Proverbs 20:27) and the sanctuary where the Holy Spirit joins Himself in organic union ('he that is joined unto the Lord is one spirit' — 1 Cor 6:17). All governmental jurisdiction in the Kingdom operates from Pneuma outward.",
    keyRefs: ["John 3:6", "John 4:24", "Romans 8:16", "1 Corinthians 6:17", "1 Thessalonians 5:23", "Hebrews 4:12"]
  },
  "G4991": {
    number: "G4991",
    lang: "Greek",
    original: "σωτηρία",
    translit: "sōtēría",
    pronunciation: "so-tay-ree'-ah",
    partOfSpeech: "Feminine Noun",
    definition: "Feminine of a derivative of G4990 as (properly, abstract) noun; rescue or safety (physically or morally):—deliver, health, salvation, save, saving.",
    blbOutline: [
      "I. deliverance, preservation, safety, salvation",
      "1. deliverance from the molestation of enemies",
      "2. in an ethical sense, that which concludes to the souls safety or salvation",
      "3. the sum of benefits and blessings which the Christians, redeemed from all earthly ills, enjoy in Christ"
    ],
    firstMention: "Luke 1:69 — 'And hath raised up an horn of salvation (soteria) for us...'",
    apostolicExegesis: "As taught by Apostle Arome Osayi, Apostle Tolu Agboola, and Apostle Gideon Adoma, 'Soteria' is a panoramic three-tense reality: (1) Past tense — Justification (saved from the penalty of sin in our spirit); (2) Present continuous tense — Sanctification / Theosis (being saved from the power and tyranny of sin in our soul); (3) Future tense — Glorification (saved from the presence of corruption in our body, Rom 8:23). Neglecting such 'great salvation' (Heb 2:3) reduces Christianity to an entry ticket rather than fullness of stature.",
    keyRefs: ["Luke 1:69", "Acts 4:12", "Romans 1:16", "Philippians 2:12", "Hebrews 2:3", "1 Peter 1:9"]
  },
  "G129": {
    number: "G129",
    lang: "Greek",
    original: "αἷμα",
    translit: "haîma",
    pronunciation: "hah'-ee-mah",
    partOfSpeech: "Neuter Noun",
    definition: "Blood, literally (of men or animals), figuratively (the juice of grapes) or specially (the atoning blood of Christ); by implication, bloodshed, also kindred.",
    blbOutline: [
      "I. blood",
      "1. of man or animals, the seat of physical life",
      "2. the blood of Christ shed for the remission of sins and inauguration of the New Covenant"
    ],
    firstMention: "Matthew 16:17 / Matthew 26:28 — 'For this is my blood (haima) of the new testament, which is shed for many for the remission of sins.'",
    apostolicExegesis: "The Blood of Christ ('Haima') operates in seven distinct legal and spiritual dimensions in Heaven and Earth: (1) Propitiation at the Heavenly Mercy Seat (Heb 9:12), (2) Remission/Forgiveness of sins (Eph 1:7), (3) Justification from guilt (Rom 5:9), (4) Sanctification & purging of dead works from the conscience (Heb 9:14), (5) Bold access into the Holiest (Heb 10:19), (6) Judicial Advocacy speaking better things than Abel (Heb 12:24), and (7) Weapon of Legal Victory over the Accuser (Rev 12:11).",
    keyRefs: ["Matthew 26:28", "Acts 20:28", "Romans 3:25", "Ephesians 1:7", "Hebrews 9:14", "Hebrews 12:24", "1 John 1:7", "Revelation 12:11"]
  },
  "G1411": {
    number: "G1411",
    lang: "Greek",
    original: "δύναμις",
    translit: "dýnamis",
    pronunciation: "doo'-nam-is",
    partOfSpeech: "Feminine Noun",
    definition: "From G1410; force (literally or figuratively); specially, miraculous power (usually by implication, a miracle itself):—ability, abundance, meaning, might(-ily, -y, -y deed), (worker of) miracle(-s), power, strength, violence, mighty (wonderful) work.",
    blbOutline: [
      "I. strength, power, ability",
      "1. inherent power, power residing in a thing by virtue of its nature",
      "2. power for performing miracles",
      "3. moral power and excellence of soul"
    ],
    firstMention: "Matthew 7:22 / Acts 1:8 — 'But ye shall receive power (dunamis), after that the Holy Ghost is come upon you...'",
    apostolicExegesis: "Must be distinguished from 'Exousia' (G1849). 'Dunamis' is inherent, explosive, miracle-working capacity and spiritual energy residing inside the believer by the Holy Spirit. 'Exousia' is delegated legal jurisdiction and badge of authority. A believer with Exousia but no Dunamis has legal right without kinetic force to enforce it; a believer with both legislates the Kingdom.",
    keyRefs: ["Acts 1:8", "Romans 1:16", "1 Corinthians 2:4", "Ephesians 1:19", "Ephesians 3:20", "Hebrews 6:5"]
  },
  "G1849": {
    number: "G1849",
    lang: "Greek",
    original: "ἐξουσία",
    translit: "exousía",
    pronunciation: "ex-oo-see'-ah",
    partOfSpeech: "Feminine Noun",
    definition: "From G1832 (in the sense of ability); privilege, i.e. (subjectively) force, capacity, competency, freedom, or (objectively) mastery (concretely, magistrate, superhuman, potentate, token of control), delegated influence:—authority, jurisdiction, liberty, power, right, strength.",
    blbOutline: [
      "I. power of choice, liberty of doing as one pleases",
      "II. the power of authority (influence) and of right (privilege)",
      "III. the power of rule or government (the power of him whose will and commands must be submitted to by others)"
    ],
    firstMention: "Matthew 7:29 — 'For he taught them as one having authority (exousia), and not as the scribes.'",
    apostolicExegesis: "In John 1:12 ('gave he power/exousia to become the sons of God') and Luke 10:19 ('Behold, I give unto you power/exousia to tread on serpents... over all the power/dunamis of the enemy'), the KJV translates both as 'power', but NKJV clarifies 'authority' vs 'power'. Our lowest legal Exousia in Christ outranks the highest kinetic Dunamis of Satan.",
    keyRefs: ["Matthew 28:18", "Luke 10:19", "John 1:12", "Ephesians 1:21", "Colossians 1:13", "Colossians 2:15"]
  },
  "G2435": {
    number: "G2435",
    lang: "Greek",
    original: "ἱλαστήριον",
    translit: "hilastḗrion",
    pronunciation: "hil-as-tay'-ree-on",
    partOfSpeech: "Neuter Noun / Adjective",
    definition: "Neuter of a derivative of G2433; an expiatory (place or thing), i.e. (concretely) an atoning victim, or (specially) the lid of the Ark (in the Temple):—mercyseat, propitiation.",
    blbOutline: [
      "I. relating to an appeasing or expiating, having placating or expiating force, expiatory",
      "II. a means of appeasing or expiating, a propitiation",
      "1. the cover of the ark of the covenant in the Holy of Holies (the Mercy Seat)"
    ],
    firstMention: "Romans 3:25 — 'Whom God hath set forth to be a propitiation (hilasterion) through faith in his blood...'",
    apostolicExegesis: "In the Septuagint (LXX) and Hebrews 9:5, 'hilasterion' is the exact word for the solid gold Mercy Seat covering the Ark of the Covenant where the High Priest sprinkled blood on Yom Kippur. Paul declares in Romans 3:25 that Jesus Christ Himself IS the living Mercy Seat — the meeting place where God's righteous wrath against sin is fully satisfied by His own Blood.",
    keyRefs: ["Romans 3:25", "Hebrews 9:5", "1 John 2:2", "1 John 4:10"]
  },
  "G5207": {
    number: "G5207",
    lang: "Greek",
    original: "υἱός",
    translit: "huiós",
    pronunciation: "hwee-os'",
    partOfSpeech: "Masculine Noun",
    definition: "A 'son' (sometimes of animals), used very widely of immediate, remote or figuratively, kinship:—child, foal, son.",
    blbOutline: [
      "I. a son",
      "1. used to describe one who shares the nature, character, and legal standing of his father",
      "2. mature sons placed in inheritance and judicial administration (huiothesia)"
    ],
    firstMention: "Matthew 1:1 / Romans 8:14 — 'For as many as are led by the Spirit of God, they are the sons (huioi) of God.'",
    apostolicExegesis: "Crucial apostolic distinction (Arome Osayi & Tolu Agboola): Greek uses 'Teknon' (G5043 — born child/infant by birth, John 1:12, Rom 8:16) and 'Huios' (G5207 — mature, governed son of stature entrusted with the Father's estate, Rom 8:14, 8:19, Gal 4:1-7, Heb 12:5-8). You become a 'Teknon' by regeneration; you become a 'Huios' by tutelage, chastening, and being led by the Spirit. Creation is not waiting for the manifestation of 'Tekna' (babies), but of the 'Huioi' (mature sons, Rom 8:19).",
    keyRefs: ["Matthew 3:17", "Romans 8:14", "Romans 8:19", "Galatians 4:6", "Hebrews 2:10", "Hebrews 12:7"]
  },
  "G3439": {
    number: "G3439",
    lang: "Greek",
    original: "μονογενής",
    translit: "monogenḗs",
    pronunciation: "mon-og-en-ace'",
    partOfSpeech: "Adjective",
    definition: "From G3441 and G1096; only-born, i.e. sole or unique of its kind:—only (begotten, child).",
    blbOutline: [
      "I. single of its kind, only",
      "1. used of only sons or daughters",
      "2. used of Christ, denotes the unique Son of God prior to His resurrection harvest"
    ],
    firstMention: "John 1:14 — '...and we beheld his glory, the glory as of the only begotten (monogenes) of the Father...'",
    apostolicExegesis: "Compare 'Monogenes' (only begotten, John 1:14, 3:16) with 'Prototokos' (G4416 — Firstborn among many brethren, Rom 8:29, Col 1:15, 18, Heb 1:6). In the Incarnation, Jesus came as the 'Monogenes' — the single seed falling into the ground (John 12:24). Through Death and Resurrection, the Monogenes became the 'Prototokos' (Firstborn) so that God could bring 'many sons (huioi) unto glory' (Heb 2:10).",
    keyRefs: ["John 1:14", "John 1:18", "John 3:16", "Hebrews 11:17", "1 John 4:9"]
  },
  "G4416": {
    number: "G4416",
    lang: "Greek",
    original: "πρωτότοκος",
    translit: "prōtótokos",
    pronunciation: "pro-tot-ok'-os",
    partOfSpeech: "Adjective / Noun",
    definition: "From G4413 and the alternate of G5088; first-born (usually as noun, literally or figuratively):—firstbegotten(-born).",
    blbOutline: [
      "I. the firstborn",
      "1. of man or beast",
      "2. of Christ, the firstborn of all creation and firstborn from the dead, head of a new race of glorified sons"
    ],
    firstMention: "Luke 2:7 / Romans 8:29 — '...that he might be the firstborn (prototokos) among many brethren.'",
    apostolicExegesis: "Christ is the 'Prototokos' in four arenas: (1) Prototokos of every creature (archetype & heir of creation, Col 1:15); (2) Prototokos from the dead (pioneer of resurrection life, Col 1:18, Rev 1:5); (3) Prototokos among many brethren (pattern Son for the Church, Rom 8:29); and (4) The Church of the Firstborn ('ekklesia prototokon') registered in heaven (Heb 12:23), possessing the double-portion birthright of priesthood and kingship.",
    keyRefs: ["Romans 8:29", "Colossians 1:15", "Colossians 1:18", "Hebrews 1:6", "Hebrews 12:23", "Revelation 1:5"]
  },
  "G3341": {
    number: "G3341",
    lang: "Greek",
    original: "μετάνοια",
    translit: "metánoia",
    pronunciation: "met-an'-oy-ah",
    partOfSpeech: "Feminine Noun",
    definition: "From G3340; (subjectively) compunction (for guilt, including reformation); by implication, reversal (of [another's] decision):—repentance.",
    blbOutline: [
      "I. a change of mind, as it appears to one who repents, of a purpose he has formed or of something he has done"
    ],
    firstMention: "Matthew 3:8 — 'Bring forth therefore fruits meet for repentance (metanoia).'",
    apostolicExegesis: "From 'meta' (after/change) + 'noeo/nous' (mind/perception/governance of thought). Metanoia is not mere emotional weeping; it is a constitutional shift in mental governance, alignment, and worldview to match the Kingdom of God ('Repent/metanoeo, for the Kingdom of Heaven is at hand').",
    keyRefs: ["Matthew 3:8", "Acts 20:21", "Romans 2:4", "2 Corinthians 7:10", "Hebrews 6:1"]
  }
};

// Curated Dual-Version (KJV & NKJV) Foundational Chapters with Embedded Strong's Tags
// Any chapter not in this curated offline high-density dictionary is fetched on-demand or generated with rich synopsis + parallel reading.
window.CURATED_CHAPTERS = {
  "Genesis_1": {
    book: "Genesis",
    chapter: 1,
    theme: "The Cosmological Mandate, Elohim's Legislative Word & The Dominion Charter of Man",
    apostolicHeadline: "Notice the sequence of creation: Chaos ('tohu wa-bohu') -> Incubation of the Spirit ('Ruwach') -> Legislative Decree ('Amar') -> Separation of Light from Darkness -> Dominion ('Radah') entrusted to Image-Bearers.",
    verses: [
      {
        v: 1,
        kjv: "In the beginning {H7225} God {H430} created the heaven and the earth.",
        nkjv: "In the beginning {H7225} God {H430} created the heavens and the earth."
      },
      {
        v: 2,
        kjv: "And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit {H7307} of God {H430} moved upon the face of the waters.",
        nkjv: "The earth was without form, and void; and darkness was on the face of the deep. And the Spirit {H7307} of God {H430} was hovering over the face of the waters."
      },
      {
        v: 3,
        kjv: "And God {H430} said, Let there be light: and there was light.",
        nkjv: "Then God {H430} said, \"Let there be light\"; and there was light."
      },
      {
        v: 4,
        kjv: "And God {H430} saw the light, that it was good: and God divided the light from the darkness.",
        nkjv: "And God {H430} saw the light, that it was good; and God divided the light from the darkness."
      },
      {
        v: 5,
        kjv: "And God {H430} called the light Day, and the darkness he called Night. And the evening and the morning were the first day.",
        nkjv: "God {H430} called the light Day, and the darkness He called Night. So the evening and the morning were the first day."
      },
      {
        v: 26,
        kjv: "And God {H430} said, Let us make man in our image, after our likeness: and let them have dominion over the fish of the sea, and over the fowl of the air, and over the cattle, and over all the earth, and over every creeping thing that creepeth upon the earth.",
        nkjv: "Then God {H430} said, \"Let Us make man in Our image, according to Our likeness; let them have dominion over the fish of the sea, over the birds of the air, and over the cattle, over all the earth and over every creeping thing that creeps on the earth.\""
      },
      {
        v: 27,
        kjv: "So God {H430} created man in his own image, in the image of God created he him; male and female created he them.",
        nkjv: "So God {H430} created man in His own image; in the image of God He created him; male and female He created them."
      },
      {
        v: 28,
        kjv: "And God {H430} blessed them, and God said unto them, Be fruitful, and multiply, and replenish the earth, and subdue it: and have dominion over the fish of the sea, and over the fowl of the air, and over every living thing that moveth upon the earth.",
        nkjv: "Then God {H430} blessed them, and God said to them, \"Be fruitful and multiply; fill the earth and subdue it; have dominion over the fish of the sea, over the birds of the air, and over every living thing that moves on the earth.\""
      }
    ]
  },
  "Leviticus_17": {
    book: "Leviticus",
    chapter: 17,
    theme: "The Mystery of the Blood — The Nephesh in the Blood Upon the Altar of Atonement",
    apostolicHeadline: "Leviticus 17:11 is the legal key to both Testaments: God forbade the eating of blood because the life ('Nephesh') of the flesh is encapsulated in the blood ('Dam'), and God reserved blood exclusively for judicial atonement ('Kaphar') upon the altar.",
    verses: [
      {
        v: 10,
        kjv: "And whatsoever man there be of the house of Israel, or of the strangers that sojourn among you, that eateth any manner of blood {H1818}; I will even set my face against that soul {H5315} that eateth blood, and will cut him off from among his people.",
        nkjv: "'And whatever man of the house of Israel, or of the strangers who dwell among you, who eats any blood {H1818}, I will set My face against that person {H5315} who eats blood, and will cut him off from among his people."
      },
      {
        v: 11,
        kjv: "For the life {H5315} of the flesh is in the blood {H1818}: and I have given it to you upon the altar to make an atonement {H3722} for your souls {H5315}: for it is the blood {H1818} that maketh an atonement {H3722} for the soul {H5315}.",
        nkjv: "For the life {H5315} of the flesh is in the blood {H1818}, and I have given it to you upon the altar to make atonement {H3722} for your souls {H5315}; for it is the blood {H1818} that makes atonement {H3722} for the soul {H5315}.'"
      },
      {
        v: 14,
        kjv: "For it is the life {H5315} of all flesh; the blood {H1818} of it is for the life thereof: therefore I said unto the children of Israel, Ye shall eat the blood of no manner of flesh: for the life {H5315} of all flesh is the blood {H1818} thereof: whosoever eateth it shall be cut off.",
        nkjv: "for it is the life {H5315} of all flesh. Its blood {H1818} sustains its life. Therefore I said to the children of Israel, 'You shall not eat the blood of any flesh, for the life {H5315} of all flesh is its blood {H1818}. Whoever eats it shall be cut off.'"
      }
    ]
  },
  "John_1": {
    book: "John",
    chapter: 1,
    theme: "The Eternal Logos, The Implantation of Zoe Life & The Jurisdiction of Sonship",
    apostolicHeadline: "John bypasses Bethlehem and goes back before Genesis 1:1 into eternity past: The Logos who was face-to-face ('pros ton Theon') with God became tabernacled in flesh so that men born of bloods could receive 'Exousia' to become offspring of God.",
    verses: [
      {
        v: 1,
        kjv: "In the beginning {H7225} was the Word {G3056}, and the Word {G3056} was with God, and the Word {G3056} was God.",
        nkjv: "In the beginning {H7225} was the Word {G3056}, and the Word {G3056} was with God, and the Word {G3056} was God."
      },
      {
        v: 2,
        kjv: "The same was in the beginning with God.",
        nkjv: "He was in the beginning with God."
      },
      {
        v: 3,
        kjv: "All things were made by him; and without him was not any thing made that was made.",
        nkjv: "All things were made through Him, and without Him nothing was made that was made."
      },
      {
        v: 4,
        kjv: "In him was life {G2222}; and the life {G2222} was the light of men.",
        nkjv: "In Him was life {G2222}, and the life {G2222} was the light of men."
      },
      {
        v: 5,
        kjv: "And the light shineth in darkness; and the darkness comprehended it not.",
        nkjv: "And the light shines in the darkness, and the darkness did not comprehend it."
      },
      {
        v: 12,
        kjv: "But as many as received him, to them gave he power {G1849} to become the sons {G5207} of God, even to them that believe on his name:",
        nkjv: "But as many as received Him, to them He gave the right {G1849} to become children {G5207} of God, to those who believe in His name:"
      },
      {
        v: 13,
        kjv: "Which were born, not of blood {G129}, nor of the will of the flesh, nor of the will of man, but of God.",
        nkjv: "who were born, not of blood {G129}, nor of the will of the flesh, nor of the will of man, but of God."
      },
      {
        v: 14,
        kjv: "And the Word {G3056} was made flesh, and dwelt among us, (and we beheld his glory, the glory as of the only begotten {G3439} of the Father,) full of grace and truth.",
        nkjv: "And the Word {G3056} became flesh and dwelt among us, and we beheld His glory, the glory as of the only begotten {G3439} of the Father, full of grace and truth."
      },
      {
        v: 29,
        kjv: "The next day John seeth Jesus coming unto him, and saith, Behold the Lamb of God, which taketh away the sin of the world.",
        nkjv: "The next day John saw Jesus coming toward him, and said, \"Behold! The Lamb of God who takes away the sin of the world!\""
      }
    ]
  },
  "Romans_3": {
    book: "Romans",
    chapter: 3,
    theme: "The Courtroom Verdict: Justification by Grace & Christ Set Forth as the Mercy Seat (Hilasterion)",
    apostolicHeadline: "In Romans 3, Paul convenes the Supreme Court of Heaven: After proving that both Jew and Gentile are under sin, God unveils a righteousness apart from the Law — setting forth Christ as the 'Hilasterion' (Mercy Seat) through faith in His Blood.",
    verses: [
      {
        v: 21,
        kjv: "But now the righteousness of God without the law is manifested, being witnessed by the law and the prophets;",
        nkjv: "But now the righteousness of God apart from the law is revealed, being witnessed by the Law and the Prophets,"
      },
      {
        v: 22,
        kjv: "Even the righteousness of God which is by faith of Jesus Christ unto all and upon all them that believe: for there is no difference:",
        nkjv: "even the righteousness of God, through faith in Jesus Christ, to all and on all who believe. For there is no difference;"
      },
      {
        v: 23,
        kjv: "For all have sinned, and come short of the glory of God;",
        nkjv: "for all have sinned and fall short of the glory of God,"
      },
      {
        v: 24,
        kjv: "Being justified freely by his grace through the redemption that is in Christ Jesus:",
        nkjv: "being justified freely by His grace through the redemption that is in Christ Jesus,"
      },
      {
        v: 25,
        kjv: "Whom God hath set forth to be a propitiation {G2435} through faith in his blood {G129}, to declare his righteousness for the remission of sins that are past, through the forbearance of God;",
        nkjv: "whom God set forth as a propitiation {G2435} by His blood {G129}, through faith, to demonstrate His righteousness, because in His forbearance God had passed over the sins that were previously committed,"
      },
      {
        v: 26,
        kjv: "To declare, I say, at this time his righteousness: that he might be just, and the justifier of him which believeth in Jesus.",
        nkjv: "to demonstrate at the present time His righteousness, that He might be just and the justifier of the one who has faith in Jesus."
      }
    ]
  },
  "Romans_8": {
    book: "Romans",
    chapter: 8,
    theme: "The Law of the Spirit of Life (Zoe), The Governance of Mature Sons (Huioi) & Conformation to the Firstborn (Prototokos)",
    apostolicHeadline: "Romans 8 is the pinnacle of Pauline theology: A higher spiritual statute ('The Law of the Spirit of Zoe') overrides the lower law of sin and death, ushering believers from infant adoption ('Tekna') into Spirit-led mature Sonship ('Huioi') until creation itself is liberated.",
    verses: [
      {
        v: 1,
        kjv: "There is therefore now no condemnation to them which are in Christ Jesus, who walk not after the flesh, but after the Spirit {G4151}.",
        nkjv: "There is therefore now no condemnation to those who are in Christ Jesus, who do not walk according to the flesh, but according to the Spirit {G4151}."
      },
      {
        v: 2,
        kjv: "For the law of the Spirit {G4151} of life {G2222} in Christ Jesus hath made me free from the law of sin and death.",
        nkjv: "For the law of the Spirit {G4151} of life {G2222} in Christ Jesus has made me free from the law of sin and death."
      },
      {
        v: 11,
        kjv: "But if the Spirit {G4151} of him that raised up Jesus from the dead dwell in you, he that raised up Christ from the dead shall also quicken your mortal bodies by his Spirit {G4151} that dwelleth in you.",
        nkjv: "But if the Spirit {G4151} of Him who raised Jesus from the dead dwells in you, He who raised Christ from the dead will also give life {G2222} to your mortal bodies through His Spirit {G4151} who dwells in you."
      },
      {
        v: 14,
        kjv: "For as many as are led by the Spirit {G4151} of God, they are the sons {G5207} of God.",
        nkjv: "For as many as are led by the Spirit {G4151} of God, these are sons {G5207} of God."
      },
      {
        v: 15,
        kjv: "For ye have not received the spirit {G4151} of bondage again to fear; but ye have received the Spirit {G4151} of adoption, whereby we cry, Abba, Father.",
        nkjv: "For you did not receive the spirit {G4151} of bondage again to fear, but you received the Spirit {G4151} of adoption by whom we cry out, \"Abba, Father.\""
      },
      {
        v: 16,
        kjv: "The Spirit {G4151} itself beareth witness with our spirit {G4151}, that we are the children of God:",
        nkjv: "The Spirit {G4151} Himself bears witness with our spirit {G4151} that we are children of God,"
      },
      {
        v: 19,
        kjv: "For the earnest expectation of the creature waiteth for the manifestation of the sons {G5207} of God.",
        nkjv: "For the earnest expectation of the creation eagerly waits for the revealing of the sons {G5207} of God."
      },
      {
        v: 29,
        kjv: "For whom he did foreknow, he also did predestinate to be conformed to the image of his Son {G5207}, that he might be the firstborn {G4416} among many brethren.",
        nkjv: "For whom He foreknew, He also predestined to be conformed to the image of His Son {G5207}, that He might be the firstborn {G4416} among many brethren."
      }
    ]
  },
  "Ephesians_1": {
    book: "Ephesians",
    chapter: 1,
    theme: "Eternal Election in the Heavenlies, Redemption Through His Blood & The Exceeding Greatness of Dunamis",
    apostolicHeadline: "Ephesians 1 unveils the economy of the mystery hidden in God before the foundation of the world: Redemption by the Blood ('Haima'), the seal of the Spirit ('Pneuma'), and the spirit of wisdom and revelation to know the exceeding greatness of His 'Dunamis' and 'Exousia'.",
    verses: [
      {
        v: 3,
        kjv: "Blessed be the God and Father of our Lord Jesus Christ, who hath blessed us with all spiritual {G4151} blessings in heavenly places in Christ:",
        nkjv: "Blessed be the God and Father of our Lord Jesus Christ, who has blessed us with every spiritual {G4151} blessing in the heavenly places in Christ,"
      },
      {
        v: 7,
        kjv: "In whom we have redemption through his blood {G129}, the forgiveness of sins, according to the riches of his grace;",
        nkjv: "In Him we have redemption through His blood {G129}, the forgiveness of sins, according to the riches of His grace"
      },
      {
        v: 17,
        kjv: "That the God of our Lord Jesus Christ, the Father of glory, may give unto you the spirit {G4151} of wisdom and revelation in the knowledge of him:",
        nkjv: "that the God of our Lord Jesus Christ, the Father of glory, may give to you the spirit {G4151} of wisdom and revelation in the knowledge of Him,"
      },
      {
        v: 18,
        kjv: "The eyes of your understanding being enlightened; that ye may know what is the hope of his calling, and what the riches of the glory of his inheritance in the saints,",
        nkjv: "the eyes of your understanding being enlightened; that you may know what is the hope of His calling, what are the riches of the glory of His inheritance in the saints,"
      },
      {
        v: 19,
        kjv: "And what is the exceeding greatness of his power {G1411} to us-ward who believe, according to the working of his mighty power,",
        nkjv: "and what is the exceeding greatness of His power {G1411} toward us who believe, according to the working of His mighty power"
      },
      {
        v: 20,
        kjv: "Which he wrought in Christ, when he raised him from the dead, and set him at his own right hand in the heavenly places,",
        nkjv: "which He worked in Christ when He raised Him from the dead and seated Him at His right hand in the heavenly places,"
      },
      {
        v: 21,
        kjv: "Far above all principality, and power {G1849}, and might {G1411}, and dominion, and every name that is named, not only in this world, but also in that which is to come:",
        nkjv: "far above all principality and power {G1849} and might {G1411} and dominion, and every name that is named, not only in this age but also in that which is to come."
      }
    ]
  },
  "Hebrews_4": {
    book: "Hebrews",
    chapter: 4,
    theme: "The Surgical Sword of the Logos Dividing Soul (Psuche) & Spirit (Pneuma) and the Throne of Grace",
    apostolicHeadline: "Before we approach the Throne of Grace (v. 16), we must submit to the surgical altar of the Living Word ('Logos', v. 12-13) which pierces and separates what is merely soulish ('Psuche') from what is genuinely spiritual ('Pneuma').",
    verses: [
      {
        v: 11,
        kjv: "Let us labour therefore to enter into that rest, lest any man fall after the same example of unbelief.",
        nkjv: "Let us therefore be diligent to enter that rest, lest anyone fall according to the same example of disobedience."
      },
      {
        v: 12,
        kjv: "For the word {G3056} of God is quick {G2222}, and powerful, and sharper than any twoedged sword, piercing even to the dividing asunder of soul {G5590} and spirit {G4151}, and of the joints and marrow, and is a discerner of the thoughts and intents of the heart.",
        nkjv: "For the word {G3056} of God is living {G2222} and powerful, and sharper than any two-edged sword, piercing even to the division of soul {G5590} and spirit {G4151}, and of joints and marrow, and is a discerner of the thoughts and intents of the heart."
      },
      {
        v: 13,
        kjv: "Neither is there any creature that is not manifest in his sight: but all things are naked and opened unto the eyes of him with whom we have to do.",
        nkjv: "And there is no creature hidden from His sight, but all things are naked and open to the eyes of Him to whom we must give account."
      },
      {
        v: 14,
        kjv: "Seeing then that we have a great high priest, that is passed into the heavens, Jesus the Son {G5207} of God, let us hold fast our profession.",
        nkjv: "Seeing then that we have a great High Priest who has passed through the heavens, Jesus the Son {G5207} of God, let us hold fast our confession."
      },
      {
        v: 16,
        kjv: "Let us therefore come boldly unto the throne of grace, that we may obtain mercy, and find grace to help in time of need.",
        nkjv: "Let us therefore come boldly to the throne of grace, that we may obtain mercy and find grace to help in time of need."
      }
    ]
  },
  "Hebrews_9": {
    book: "Hebrews",
    chapter: 9,
    theme: "The Heavenly Tabernacle & The Eternal Efficacy of the Blood of Christ Purging the Conscience",
    apostolicHeadline: "The earthly tabernacle was only a shadow; Christ entered the true Heavenly Sanctuary not with the blood of goats and calves, but by His own Blood ('Haima'), obtaining eternal redemption and purging our conscience from dead works to serve the living God.",
    verses: [
      {
        v: 11,
        kjv: "But Christ being come an high priest of good things to come, by a greater and more perfect tabernacle, not made with hands, that is to say, not of this building;",
        nkjv: "But Christ came as High Priest of the good things to come, with the greater and more perfect tabernacle not made with hands, that is, not of this creation."
      },
      {
        v: 12,
        kjv: "Neither by the blood {G129} of goats and calves, but by his own blood {G129} he entered in once into the holy place, having obtained eternal redemption for us.",
        nkjv: "Not with the blood {G129} of goats and calves, but with His own blood {G129} He entered the Most Holy Place once for all, having obtained eternal redemption."
      },
      {
        v: 13,
        kjv: "For if the blood {G129} of bulls and of goats, and the ashes of an heifer sprinkling the unclean, sanctifieth to the purifying of the flesh:",
        nkjv: "For if the blood {G129} of bulls and goats and the ashes of a heifer, sprinkling the unclean, sanctifies for the purifying of the flesh,"
      },
      {
        v: 14,
        kjv: "How much more shall the blood {G129} of Christ, who through the eternal Spirit {G4151} offered himself without spot to God, purge your conscience from dead works to serve the living {G2222} God?",
        nkjv: "how much more shall the blood {G129} of Christ, who through the eternal Spirit {G4151} offered Himself without spot to God, cleanse your conscience from dead works to serve the living {G2222} God?"
      },
      {
        v: 22,
        kjv: "And almost all things are by the law purged with blood {G129}; and without shedding of blood {G129} is no remission.",
        nkjv: "And according to the law almost all things are purified with blood {G129}, and without shedding of blood {G129} there is no remission."
      }
    ]
  },
  "Hebrews_12": {
    book: "Hebrews",
    chapter: 12,
    theme: "The Chastening of Mature Sons (Huioi), Mount Zion & The Blood That Speaks Better Things Than Abel",
    apostolicHeadline: "Hebrews 12 synthesizes the entire apostolic journey: Enduring the Father's chastening as legitimate 'Huioi' (v. 5-10) brings us into the experiential jurisdiction of Mount Zion, the Church of the Firstborn ('Prototokos'), and the Blood ('Haima') of sprinkling that speaks better verdicts than Abel.",
    verses: [
      {
        v: 1,
        kjv: "Wherefore seeing we also are compassed about with so great a cloud of witnesses, let us lay aside every weight, and the sin which doth so easily beset us, and let us run with patience the race that is set before us,",
        nkjv: "Therefore we also, since we are surrounded by so great a cloud of witnesses, let us lay aside every weight, and the sin which so easily ensnares us, and let us run with endurance the race that is set before us,"
      },
      {
        v: 2,
        kjv: "Looking unto Jesus the author and finisher of our faith; who for the joy that was set before him endured the cross, despising the shame, and is set down at the right hand of the throne of God.",
        nkjv: "looking unto Jesus, the author and finisher of our faith, who for the joy that was set before Him endured the cross, despising the shame, and has sat down at the right hand of the throne of God."
      },
      {
        v: 7,
        kjv: "If ye endure chastening, God dealeth with you as with sons {G5207}; for what son {G5207} is he whom the father chasteneth not?",
        nkjv: "If you endure chastening, God deals with you as with sons {G5207}; for what son {G5207} is there whom a father does not chasten?"
      },
      {
        v: 22,
        kjv: "But ye are come unto mount Sion, and unto the city of the living {G2222} God, the heavenly Jerusalem, and to an innumerable company of angels,",
        nkjv: "But you have come to Mount Zion and to the city of the living {G2222} God, the heavenly Jerusalem, to an innumerable company of angels,"
      },
      {
        v: 23,
        kjv: "To the general assembly and church of the firstborn {G4416}, which are written in heaven, and to God the Judge of all, and to the spirits {G4151} of just men made perfect,",
        nkjv: "to the general assembly and church of the firstborn {G4416} who are registered in heaven, to God the Judge of all, to the spirits {G4151} of just men made perfect,"
      },
      {
        v: 24,
        kjv: "And to Jesus the mediator of the new covenant, and to the blood {G129} of sprinkling, that speaketh better things than that of Abel.",
        nkjv: "to Jesus the Mediator of the new covenant, and to the blood {G129} of sprinkling that speaks better things than that of Abel."
      }
    ]
  },
  "Revelation_12": {
    book: "Revelation",
    chapter: 12,
    theme: "Judicial Warfare in the Heavenlies: Overcoming the Accuser by the Blood of the Lamb & The Word of Testimony",
    apostolicHeadline: "Satan is primarily the 'Accuser of our brethren' ('Kategoros') operating on legal charges day and night. He is not overcome by mere human willpower, but by three weapons: (1) The Blood ('Haima') of the Lamb, (2) The Word ('Logos') of their testimony, and (3) Dying to self-preservation ('Psuche') unto death.",
    verses: [
      {
        v: 9,
        kjv: "And the great dragon was cast out, that old serpent, called the Devil, and Satan, which deceiveth the whole world: he was cast out into the earth, and his angels were cast out with him.",
        nkjv: "So the great dragon was cast out, that serpent of old, called the Devil and Satan, who deceives the whole world; he was cast to the earth, and his angels were cast out with him."
      },
      {
        v: 10,
        kjv: "And I heard a loud voice saying in heaven, Now is come salvation {G4991}, and strength {G1411}, and the kingdom of our God, and the power {G1849} of his Christ: for the accuser of our brethren is cast down, which accused them before our God day and night.",
        nkjv: "Then I heard a loud voice saying in heaven, \"Now salvation {G4991}, and strength {G1411}, and the kingdom of our God, and the power {G1849} of His Christ have come, for the accuser of our brethren, who accused them before our God day and night, has been cast down."
      },
      {
        v: 11,
        kjv: "And they overcame him by the blood {G129} of the Lamb, and by the word {G3056} of their testimony; and they loved not their lives {G5590} unto the death.",
        nkjv: "And they overcame him by the blood {G129} of the Lamb and by the word {G3056} of their testimony, and they did not love their lives {G5590} to the death.\""
      }
    ]
  }
};
