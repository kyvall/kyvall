const heroes = [
  {
    id: "fanny", name: "Fanny", role: "Assassin", lane: "Jungling", tone: "red", difficulty: 5,
    description: "Assassin bermobilitas tinggi yang mengandalkan kabel untuk berpindah antardinding dan menghabisi target dengan cepat.",
    skills: [
      ["Passive", "Air Superiority", "Damage Fanny meningkat saat terbang. Menyerang musuh ketika terbang juga memulihkan Energy."],
      ["1", "Tornado Strike", "Fanny memutar pedangnya untuk memberikan Physical Damage kepada musuh di sekitarnya."],
      ["2", "Steel Cable", "Fanny meluncurkan kabel ke arah dinding dan tertarik ke sana. Skill ini dapat digunakan berulang selama Energy mencukupi."],
      ["3", "Cut Throat", "Fanny menerjang target dan memberikan Physical Damage. Damage meningkat sesuai jumlah Prey Mark pada target."]
    ]
  },
  {
    id: "ling", name: "Ling", role: "Assassin", lane: "Jungling", tone: "blue", difficulty: 5,
    description: "Assassin lincah yang bergerak di atas tembok, mengumpulkan Lightness Point, dan memilih momen untuk menerjang dari udara.",
    skills: [
      ["Passive", "Cloud Walker", "Ling bergerak di atas tembok dan memulihkan Lightness Point saat berada di sana."],
      ["1", "Finch Poise", "Ling melompat ke tembok. Gunakan kembali untuk berpindah ke tembok lain."],
      ["2", "Defiant Sword", "Ling menerjang ke arah target dan menebas area di depannya; saat di atas tembok ia dapat melakukan serangan kritis."],
      ["3", "Tempest of Blades", "Ling melompat ke udara, menjadi tidak dapat ditargetkan, lalu menghujani area dengan pedang."]
    ]
  },
  {
    id: "gusion", name: "Gusion", role: "Assassin", lane: "Jungling / Mid", tone: "violet", difficulty: 4,
    description: "Assassin burst yang merangkai dagger dan dash dengan cepat. Eksekusi combo dan reset skill menjadi kunci permainan.",
    skills: [
      ["Passive", "Dagger Specialist", "Setiap penggunaan skill menambah Rune. Serangan dasar berikutnya memberi damage ekstra dan memulihkan HP."],
      ["1", "Sword Spike", "Lempar dagger ke arah target. Gunakan kembali untuk berpindah ke target dan menyerangnya."],
      ["2", "Shadowblade Slaughter", "Lempar dagger ke depan lalu panggil kembali untuk menyerang musuh yang terkena."],
      ["3", "Incandescence", "Dash ke arah target dan mereset cooldown dua skill lainnya; gunakan kembali untuk mengubah posisi."]
    ]
  },
  {
    id: "benedetta", name: "Benedetta", role: "Assassin", lane: "EXP Lane / Jungling", tone: "green", difficulty: 4,
    description: "Duelist dengan dash dan parry yang kuat. Charge Sword Intent untuk menentukan kapan masuk dan keluar dari pertarungan.",
    skills: [
      ["Passive", "Elapsed Daytime", "Menahan tombol serangan mengisi Sword Intent. Saat penuh, Benedetta melesat dan menebas ke depan."],
      ["1", "Phantom Slash", "Benedetta mundur sambil menebas, lalu dapat melakukan dash dan tebasan tambahan."],
      ["2", "An Eye for An Eye", "Benedetta menangkis serangan sesaat, menjadi kebal terhadap efek kontrol, lalu menyerang balik."],
      ["3", "Alecto: Final Blow", "Benedetta menebas sepanjang jalur dan meninggalkan area tebasan yang memberi efek slow."]
    ]
  },
  {
    id: "paquito", name: "Paquito", role: "Fighter", lane: "EXP Lane / Jungling", tone: "gold", difficulty: 4,
    description: "Petinju combo dengan Champ Stance. Rangkaian skill yang rapi membuka dash dan serangan yang diperkuat.",
    skills: [
      ["Passive", "Champ Stance", "Skill yang mengenai lawan mengisi Champ Stance. Saat penuh, skill berikutnya diperkuat dan cooldown-nya dipersingkat."],
      ["1", "Heavy Left Punch", "Paquito melayangkan pukulan ke depan. Jika mengenai hero, ia memperoleh Shield."],
      ["2", "Jab", "Paquito dash ke depan dan memberi pukulan kuat kepada lawan di jalurnya."],
      ["3", "Knockout Strike", "Paquito menyerang beruntun dan menggeser target, lalu mengakhiri combo dengan pukulan kuat."]
    ]
  },
  {
    id: "yuzhong", name: "Yu Zhong", role: "Fighter", lane: "EXP Lane", tone: "red", difficulty: 3,
    description: "Fighter sustain yang mengubah Sha Residue menjadi pemulihan, lalu menyelam ke garis belakang dalam wujud Black Dragon.",
    skills: [
      ["Passive", "Cursing Touch", "Damage Yu Zhong menumpuk Sha Residue pada lawan. Saat penuh, efeknya memberi damage dan memulihkan HP Yu Zhong."],
      ["1", "Dragon Tail", "Yu Zhong menyapu jubahnya dan menyerang dengan ujung yang lebih tajam."],
      ["2", "Soul Grip", "Yu Zhong melepaskan energi yang memperlambat target dan memperkuat serangan dasar berikutnya."],
      ["3", "Furious Dive", "Yu Zhong melompat ke area target, memberi damage dan efek airborne setelah jeda singkat."]
    ]
  },
  {
    id: "kagura", name: "Kagura", role: "Mage", lane: "Mid Lane", tone: "violet", difficulty: 4,
    description: "Mage dengan payung Seimei yang dapat berpindah tangan. Posisi payung menentukan jangkauan, kontrol, dan combo Kagura.",
    skills: [
      ["Passive", "Yin Yang Gathering", "Saat mengambil kembali payung, Kagura memperoleh Shield dan memberi efek slow serta stun kepada lawan terdekat."],
      ["1", "Seimei Umbrella Open", "Kagura mengirim payung Seimei ke arah target dan memberikan Magic Damage."],
      ["2", "Rasho Umbrella Flee", "Saat memegang payung, Kagura dapat melepas efek kontrol dan berpindah. Saat payung terpisah, ia berlari ke arahnya."],
      ["3", "Yin Yang Overturn", "Kagura memberi efek knockback di sekitar dirinya atau menarik lawan menuju payung yang terpisah."]
    ]
  },
  {
    id: "xavier", name: "Xavier", role: "Mage", lane: "Mid Lane", tone: "cyan", difficulty: 3,
    description: "Mage jarak jauh yang memperkuat skill lewat Transcendence dan dapat menembakkan serangan melintasi seluruh map.",
    skills: [
      ["Passive", "Transcendence", "Menggunakan skill memberi Transcendence. Pada tahap tertentu, skill Xavier mendapat jangkauan dan efek tambahan."],
      ["1", "Infinite Extension", "Xavier menembakkan Mystic Bullet yang bertambah jauh setiap kali mengenai lawan."],
      ["2", "Mystic Field", "Xavier membuat penghalang yang memperlambat lawan. Skill lain yang melewati field dapat mengikat mereka."],
      ["3", "Dawning Light", "Xavier melepaskan sinar energi lurus dengan jangkauan global dan damage besar."]
    ]
  },
  {
    id: "lunox", name: "Lunox", role: "Mage", lane: "Mid Lane", tone: "gold", difficulty: 4,
    description: "Mage dengan dua wujud: Order dan Chaos. Pilihan mode mengubah skill ultimate menjadi alat bertahan atau burst.",
    skills: [
      ["Passive", "Dreamland Twist", "Power of Order dan Power of Chaos mengubah cara Lunox memperoleh Cooldown Reduction."],
      ["1", "Starlight Pulse", "Lunox memanggil hujan cahaya di area sekitarnya dan memulihkan HP saat mengenai hero lawan."],
      ["2", "Chaos Assault", "Lunox menembakkan energi Chaos yang memberi damage berdasarkan HP lawan."],
      ["3", "Cosmic Fission", "Lunox memberi damage dan efek slow di sekitar dirinya dengan kekuatan Order dan Chaos."]
    ]
  },
  {
    id: "beatrix", name: "Beatrix", role: "Marksman", lane: "Gold Lane", tone: "green", difficulty: 5,
    description: "Marksman fleksibel dengan empat senjata. Pilih loadout sesuai jarak, target, dan kebutuhan tim sebelum pertempuran.",
    skills: [
      ["Passive", "Mechanical Genius", "Beatrix membawa empat senjata dengan pola serangan dan ultimate yang berbeda."],
      ["1", "Masterful Gunner", "Beatrix mengganti ke senjata kedua yang dipilih dan menyiapkannya untuk pertempuran."],
      ["2", "Tactical Reposition", "Beatrix berguling ke depan sambil mengisi ulang senjata yang sedang digunakan."],
      ["3", "Nian's Blessing", "Beatrix menerima bantuan Nian dan memperoleh senjata cadangan untuk dipilih."]
    ]
  },
  {
    id: "brody", name: "Brody", role: "Marksman", lane: "Gold Lane", tone: "blue", difficulty: 3,
    description: "Marksman dengan serangan dasar berat dan lambat. Tandai lawan lebih dulu agar Abyss Impact memberi damage maksimal.",
    skills: [
      ["Passive", "Abyss Corrosion", "Serangan dasar Brody memiliki animasi lebih panjang, memberi damage kuat, dan menumpuk Abyss Mark."],
      ["1", "Abyss Impact", "Brody menembakkan gelombang energi yang memberi damage dan efek slow."],
      ["2", "Corrosive Strike", "Brody menerjang ke target, memberi stun, dan memperoleh kesempatan untuk bergerak kembali."],
      ["3", "Torn-Apart Memory", "Brody memberi damage kepada semua lawan di jangkauan berdasarkan Abyss Mark mereka."]
    ]
  },
  {
    id: "tigreal", name: "Tigreal", role: "Tank", lane: "Roam", tone: "cyan", difficulty: 2,
    description: "Tank inisiator dengan kontrol area. Sabar menunggu posisi yang tepat untuk menarik dan mengunci banyak lawan.",
    skills: [
      ["Passive", "Fearless", "Tigreal memperoleh lapisan perlindungan setelah menggunakan skill atau terkena serangan dasar."],
      ["1", "Attack Wave", "Tigreal menghantam tanah dan melepaskan tiga gelombang energi yang memberi damage serta slow."],
      ["2", "Sacred Hammer", "Tigreal menerjang sambil mendorong lawan; gunakan kembali untuk meluncurkan target ke udara."],
      ["3", "Implosion", "Tigreal menarik lawan di sekitarnya ke dirinya dan memberi efek stun."]
    ]
  },
  {
    id: "mathilda", name: "Mathilda", role: "Support", lane: "Roam", tone: "green", difficulty: 3,
    description: "Support roam yang membuka jalur engage sekaligus membantu rekan berpindah posisi dengan Guiding Wind.",
    skills: [
      ["Passive", "Ancestral Guidance", "Bergerak mengisi energi Mathilda. Serangan dasar berikutnya memperoleh jangkauan dan Magic Damage tambahan."],
      ["1", "Soul Bloom", "Mathilda memanggil Wisp yang menyerang lawan terdekat setelah ia bergerak."],
      ["2", "Guiding Wind", "Mathilda berlari dan memberi Shield. Rekan yang menyentuhnya dapat mengikuti ke posisinya."],
      ["3", "Circling Eagle", "Mathilda menandai lawan, mengitari target, lalu menyerangnya dengan efek knockback."]
    ]
  }
];

const roleData = [
  { id: "jungle", icon: "🌲", name: "JUNGLE", label: "Jungle", tagline: "Become the tempo controller.", groups: [
    ["🌲 HERO POOL", ["Kuasai minimal 3–5 hero Jungler", "Pelajari combo dan mekanik setiap hero", "Pelajari counter dan matchup Jungler", "Latihan Retribution dan timing skill"]],
    ["🌳 FARMING & JUNGLE PATH", ["Pelajari urutan buff dan jungle camp", "Latihan clear jungle secepat dan seefisien mungkin", "Jaga gold dan level agar unggul", "Pelajari variasi jungle path sesuai kondisi match", "Pantau posisi Jungler lawan"]],
    ["🐢 OBJEKTIF & RETRIBUTION", ["Latihan timing mengambil Turtle", "Pelajari timing dan setup Lord", "Kuasai Retribution agar tidak mudah kalah kontes", "Koordinasikan objektif dengan Roamer dan Mid Lane", "Amankan area sekitar objektif sebelum mengambilnya"]],
    ["🗺️ GANK & ROTASI", ["Latihan memilih lane yang paling menguntungkan untuk di-gank", "Pahami kapan harus gank, farming, atau mengambil objektif", "Biasakan melihat minimap", "Pelajari cara membaca posisi lawan", "Manfaatkan keunggulan untuk mengambil turret"]],
    ["⚔️ TEAM FIGHT", ["Tentukan target utama sebelum masuk", "Latihan positioning saat team fight", "Maksimalkan burst atau damage hero", "Tahu kapan masuk dan kapan mundur", "Sinkronisasi dengan Roamer dan Mid Lane"]],
    ["🧠 MENTAL & DECISION MAKING", ["Tetap tenang saat objektif tercuri", "Jangan memaksakan kontes yang tidak menguntungkan", "Evaluasi kesalahan setelah match", "Tonton replay untuk memperbaiki pathing", "Latihan Jungle secara rutin"]]
  ]},
  { id: "roam", icon: "🛡️", name: "ROAM", label: "Roam", tagline: "See the map. Shape the fight.", groups: [
    ["🛡️ HERO POOL", ["Kuasai minimal 3–5 hero Roamer", "Pelajari combo dan mekanik setiap hero", "Pelajari Tank, Support, dan Utility Roamer", "Pelajari counter dan matchup Roamer", "Latihan timing crowd control"]],
    ["🗺️ MAP AWARENESS & VISION", ["Biasakan melihat minimap", "Pelajari posisi lawan dari informasi map", "Buka vision sebelum objektif", "Cek bush dan area berbahaya", "Beri informasi posisi lawan kepada tim"]],
    ["🔄 ROTASI & GANKING", ["Pelajari rotasi dari Mid ke EXP/Gold Lane", "Latihan menentukan lane yang perlu dibantu", "Latihan setup gank", "Bantu mengamankan Turtle", "Bantu setup area Lord", "Bantu menciptakan peluang mengambil turret"]],
    ["🤝 MELINDUNGI TIM", ["Lindungi Gold Laner dan damage dealer", "Bantu menyelamatkan teman yang terjebak", "Pelajari kapan harus peel dan kapan harus engage", "Jaga posisi agar tidak terlalu jauh dari tim", "Prioritaskan keselamatan core saat dibutuhkan"]],
    ["⚔️ TEAM FIGHT & INITIATION", ["Latihan membuka team fight", "Tentukan target prioritas", "Pelajari timing engage dan disengage", "Jangan asal masuk tanpa backup", "Sinkronisasi dengan Jungler dan Mid Lane"]],
    ["🧠 KOMUNIKASI & MENTAL", ["Biasakan memberi info penting kepada tim", "Tetap tenang saat tim tertinggal", "Hindari mati sia-sia demi vision", "Evaluasi keputusan setelah match", "Tonton replay untuk mencari kesalahan", "Latihan Roam secara rutin"]]
  ]},
  { id: "exp", icon: "⚔️", name: "EXP LANE", label: "EXP Lane", tagline: "Win your lane. Own the side lane.", groups: [
    ["⚔️ HERO POOL", ["Kuasai minimal 3–5 hero EXP Lane", "Pelajari combo dan mekanik setiap hero", "Pelajari counter dan matchup", "Pahami power spike setiap hero", "Latihan penggunaan skill dan ultimate secara efektif"]],
    ["🥊 LANING & DUEL", ["Amankan minion dan EXP", "Latihan trade damage dengan lawan", "Pelajari kapan harus bertahan dan kapan menyerang", "Pelajari kapan harus push atau cut lane", "Perhatikan posisi Jungler dan Roamer lawan", "Hindari mati sia-sia di early game"]],
    ["🗺️ ROTASI & MACRO", ["Biasakan melihat minimap", "Pelajari timing rotasi setelah clear lane", "Bantu mengamankan Turtle jika memungkinkan", "Bantu setup Lord pada mid/late game", "Manfaatkan split push saat kondisi memungkinkan", "Pelajari kapan harus join team fight"]],
    ["🛡️ TEAM FIGHT & INISIASI", ["Latihan membuka team fight", "Tentukan target utama sebelum engage", "Lindungi damage dealer jika diperlukan", "Latihan positioning saat team fight", "Pelajari timing engage dan disengage", "Sinkronisasi dengan Roamer dan Jungler"]],
    ["🧠 MEKANIK & MENTAL", ["Tingkatkan kemampuan membaca matchup", "Latihan mekanik hero secara rutin", "Tetap tenang saat kalah lane", "Jangan memaksakan duel yang tidak menguntungkan", "Tonton replay untuk mencari kesalahan", "Evaluasi keputusan setelah match", "Latihan EXP Lane secara rutin"]]
  ]},
  { id: "gold", icon: "💰", name: "GOLD LANE", label: "Gold Lane", tagline: "Farm smart. Carry the late game.", groups: [
    ["🏹 HERO POOL", ["Kuasai minimal 3–5 hero Gold Lane", "Pelajari combo dan mekanik setiap hero", "Pelajari counter dan matchup", "Latihan positioning sesuai jenis hero", "Pelajari power spike setiap hero"]],
    ["💰 FARMING & LANING", ["Latihan last hit minion dengan konsisten", "Maksimalkan gold dari lane", "Pelajari kapan harus poke dan kapan harus mundur", "Pelajari kapan melakukan push turret", "Perhatikan posisi lawan dan Jungler", "Hindari mati sia-sia saat early game"]],
    ["🗺️ MAP AWARENESS & ROTASI", ["Biasakan melihat minimap", "Waspadai gank dari Jungler dan Roamer lawan", "Pelajari kapan harus ikut rotasi", "Bantu objektif ketika kondisi aman", "Manfaatkan kesempatan mengambil turret"]],
    ["⚔️ TEAM FIGHT", ["Fokus menyerang target yang aman", "Latihan positioning di belakang garis depan", "Jaga jarak dari Assassin dan Fighter lawan", "Maksimalkan damage tanpa overextend", "Pelajari kapan harus maju dan mundur", "Sinkronisasi dengan Roamer dan Mid Lane"]],
    ["🧠 MEKANIK & MENTAL", ["Latihan basic attack dan skill secara konsisten", "Tingkatkan reaction time", "Tetap tenang saat kalah lane", "Jangan memaksakan duel yang tidak menguntungkan", "Tonton replay untuk mencari kesalahan", "Evaluasi performa setelah match", "Latihan Gold Lane secara rutin"]]
  ]},
  { id: "mid", icon: "🔮", name: "MID LANE", label: "Mid Lane", tagline: "Control the map. Set the pace.", groups: [
    ["🧙 HERO POOL & MEKANIK", ["Kuasai minimal 3–5 hero Mid Lane", "Pelajari combo dan mekanik setiap hero", "Pelajari counter dan matchup Mid Lane", "Pahami peran Mage dan hero Mid lainnya", "Latihan positioning dan penggunaan skill"]],
    ["🌊 LANING & FARMING", ["Latihan clear minion dengan cepat", "Jaga gold dan exp agar tidak tertinggal", "Perhatikan posisi Jungler dan Roamer lawan", "Pelajari kapan harus push atau bertahan"]],
    ["🗺️ ROTASI & MACRO", ["Latihan rotasi setelah clear mid", "Prioritaskan Turtle dan objektif", "Pahami timing Lord", "Bantu EXP Lane atau Gold Lane pada waktu yang tepat", "Biasakan melihat minimap"]],
    ["👀 MAP AWARENESS & ZONING", ["Biasakan melihat minimap", "Pantau posisi Jungler lawan", "Beri informasi posisi lawan kepada tim", "Kuasai zoning di sekitar objektif", "Hindari posisi yang mudah di-gank"]],
    ["⚔️ TEAM FIGHT", ["Tentukan target sebelum menggunakan combo", "Latihan positioning", "Maksimalkan burst atau crowd control", "Tahu kapan masuk dan kapan mundur", "Sinkronisasi dengan Jungler dan Roamer"]],
    ["🧠 MENTAL & KONSISTENSI", ["Tetap tenang saat kalah lane", "Kurangi kesalahan karena terburu-buru", "Evaluasi permainan setelah match", "Tonton replay untuk mencari kesalahan", "Latihan Mid Lane secara rutin"]]
  ]}
];

const candidateHeroes = [
  { id: "hirara", name: "Hirara", role: "jungle", priority: "high" },
  { id: "aulus", name: "Aulus", role: "jungle", priority: "high" },
  { id: "lukas", name: "Lukas", role: "jungle", priority: "high" },
  { id: "karina", name: "Karina", role: "jungle", priority: "watch" },
  { id: "yi-sun-shin", name: "Yi Sun-shin", role: "jungle", priority: "watch" },
  { id: "rafaela", name: "Rafaela", role: "roam", priority: "high" },
  { id: "marcel", name: "Marcel", role: "roam", priority: "high" },
  { id: "belerick", name: "Belerick", role: "roam", priority: "high" },
  { id: "carmilla", name: "Carmilla", role: "roam", priority: "high" },
  { id: "minotaur", name: "Minotaur", role: "roam", priority: "watch" },
  { id: "masha", name: "Masha", role: "exp", priority: "high" },
  { id: "aulus", name: "Aulus", role: "exp", priority: "high" },
  { id: "gloo", name: "Gloo", role: "exp", priority: "high" },
  { id: "cici", name: "Cici", role: "exp", priority: "watch" },
  { id: "argus", name: "Argus", role: "exp", priority: "watch" },
  { id: "obsidia", name: "Obsidia", role: "gold", priority: "high" },
  { id: "popol-kupa", name: "Popol & Kupa", role: "gold", priority: "high" },
  { id: "hanabi", name: "Hanabi", role: "gold", priority: "high" },
  { id: "bruno", name: "Bruno", role: "gold", priority: "watch" },
  { id: "irithel", name: "Irithel", role: "gold", priority: "watch" },
  { id: "eudora", name: "Eudora", role: "mid", priority: "high" },
  { id: "valir", name: "Valir", role: "mid", priority: "high" },
  { id: "gord", name: "Gord", role: "mid", priority: "watch" },
  { id: "kadita", name: "Kadita", role: "mid", priority: "watch" },
  { id: "kagura", name: "Kagura", role: "mid", priority: "watch" }
];
const heroStudyItems = [
  "Kenali skill pasif dan semua skill",
  "Hafalkan combo utama",
  "Pelajari combo alternatif",
  "Pelajari power spike",
  "Pelajari item/build utama",
  "Pelajari emblem/talent yang cocok",
  "Pelajari matchup",
  "Pelajari counter",
  "Latihan positioning",
  "Latihan team fight",
  "Main minimal 10 match",
  "Tonton dan evaluasi replay"
];

const storageKey = "noxx127-mlbb-skill-wishlist-v1";
const progressStorageKey = "noxx127-skill-progress-v2";
const rankOptions = ["Warrior", "Elite", "Master", "Grandmaster", "Epic", "Legend", "Mythic", "Mythical Honor", "Mythical Glory", "Mythical Immortal"];
const heroGrid = document.getElementById("heroGrid");
const heroSearch = document.getElementById("heroSearch");
const heroSort = document.getElementById("heroSort");
const mobileRole = document.getElementById("mobileRole");
const resultSummary = document.getElementById("resultSummary");
const emptyState = document.getElementById("emptyState");
const clearFilters = document.getElementById("clearFilters");
const heroDialog = document.getElementById("heroDialog");
const toast = document.getElementById("toast");
const sidebar = document.getElementById("sideNav");
const menuToggle = document.getElementById("menuToggle");
const checklistGroups = document.getElementById("checklistGroups");
const skillSearch = document.getElementById("skillSearch");
const watchlistGroups = document.getElementById("watchlistGroups");
const metaSearch = document.getElementById("metaSearch");
const metaRoleFilter = document.getElementById("metaRoleFilter");
const watchlistEmpty = document.getElementById("watchlistEmpty");
const candidateStudy = document.getElementById("candidateStudy");
const skillHeading = document.querySelector(".skill-heading");
const skillList = document.getElementById("skillList");
const balanceNote = document.querySelector(".balance-note");

const roleById = Object.fromEntries(roleData.map((role) => [role.id, role]));
const candidateHeroIds = [...new Set(candidateHeroes.map((hero) => hero.id))];
const heroTasks = candidateHeroIds.flatMap((heroId) => heroStudyItems.map((label, index) => ({ id: `hero:${heroId}:${index + 1}`, heroId, label })));
const roleTasks = roleData.flatMap((role) => role.groups.flatMap((group, groupIndex) => group[1].map((label, taskIndex) => ({ id: `${role.id}-${groupIndex + 1}-${taskIndex + 1}`, role: role.id, label }))));
const allTasks = [...roleTasks, ...heroTasks];
const defaultProgress = { completed: [], heroCompleted: [], focus: "jungle", rank: "", notes: {}, streak: 0, lastActiveDate: "", activeDays: [] };
let toastTimer;
let storageWarning = false;
const state = { view: "dashboard", activeRole: "jungle", role: "Semua", query: "", metaRole: "all", metaPriority: "all", wishlist: loadWishlist(), selectedHero: null, selectedCandidate: null, progress: loadProgress() };

function loadProgress() {
  try {
    const stored = JSON.parse(localStorage.getItem(progressStorageKey) || "{}");
    const saved = stored && typeof stored === "object" && !Array.isArray(stored) ? stored : {};
    return {
      ...defaultProgress,
      ...saved,
      completed: Array.isArray(saved.completed) ? saved.completed.filter((id) => typeof id === "string" && roleTasks.some((task) => task.id === id)) : [],
      heroCompleted: Array.isArray(saved.heroCompleted) ? saved.heroCompleted.filter((id) => typeof id === "string" && heroTasks.some((task) => task.id === id)) : [],
      notes: saved.notes && typeof saved.notes === "object" && !Array.isArray(saved.notes)
        ? Object.fromEntries(Object.entries(saved.notes).filter(([, value]) => typeof value === "string"))
        : {},
      activeDays: Array.isArray(saved.activeDays) ? saved.activeDays.filter((date) => typeof date === "string") : [],
      focus: roleById[saved.focus] ? saved.focus : defaultProgress.focus,
      rank: rankOptions.includes(saved.rank) ? saved.rank : "",
      streak: Number.isSafeInteger(saved.streak) && saved.streak >= 0 ? saved.streak : 0,
      lastActiveDate: typeof saved.lastActiveDate === "string" ? saved.lastActiveDate : ""
    };
  } catch {
    storageWarning = true;
    return { ...defaultProgress, completed: [], heroCompleted: [], notes: {}, activeDays: [] };
  }
}

function saveProgress() {
  try {
    localStorage.setItem(progressStorageKey, JSON.stringify(state.progress));
    return true;
  } catch {
    showToast("Penyimpanan browser tidak tersedia di perangkat ini.");
    return false;
  }
}

function getRoleProgress(roleId) {
  const tasks = roleTasks.filter((task) => task.role === roleId);
  const roleHeroes = [...new Set(candidateHeroes.filter((hero) => hero.role === roleId).map((hero) => hero.id))];
  const relatedHeroTasks = heroTasks.filter((task) => roleHeroes.includes(task.heroId));
  const done = tasks.filter((task) => state.progress.completed.includes(task.id)).length
    + relatedHeroTasks.filter((task) => state.progress.heroCompleted.includes(task.id)).length;
  const total = tasks.length + relatedHeroTasks.length;
  return { done, total, percent: total ? Math.min(100, Math.round(done / total * 100)) : 0 };
}

function getOverallProgress() {
  const done = roleTasks.filter((task) => state.progress.completed.includes(task.id)).length
    + heroTasks.filter((task) => state.progress.heroCompleted.includes(task.id)).length;
  return { done, total: allTasks.length, percent: allTasks.length ? Math.min(100, Math.round(done / allTasks.length * 100)) : 0 };
}

function getCategoryProgress(roleId, groupIndex) {
  const role = roleById[roleId];
  const tasks = role.groups[groupIndex][1].map((_, taskIndex) => `${roleId}-${groupIndex + 1}-${taskIndex + 1}`);
  const done = tasks.filter((id) => state.progress.completed.includes(id)).length;
  return { done, total: tasks.length, percent: Math.round(done / tasks.length * 100) };
}

function loadWishlist() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(saved) ? saved.filter((id) => heroes.some((hero) => hero.id === id)) : [];
  } catch {
    storageWarning = true;
    return [];
  }
}

function saveWishlist() {
  try {
    localStorage.setItem(storageKey, JSON.stringify(state.wishlist));
    return true;
  } catch {
    showToast("Penyimpanan browser tidak tersedia di perangkat ini.");
    return false;
  }
}

function renderRoleCards() {
  document.getElementById("roleGrid").innerHTML = roleData.map((role) => {
    const progress = getRoleProgress(role.id);
    return `<button class="role-tile" type="button" data-view="role" data-role="${role.id}"><span class="tile-top"><span class="tile-icon">${role.icon}</span><span class="tile-arrow">↗</span></span><span class="tile-name">${role.name}</span><span class="tile-caption">${role.tagline}</span><span class="tile-progress"><span>${progress.done} / ${progress.total} CHECKLIST</span><b>${progress.percent}%</b></span><span class="mini-track"><i style="width:${progress.percent}%"></i></span></button>`;
  }).join("");
}

function renderRole() {
  const role = roleById[state.activeRole];
  if (!role) return;
  const progress = getRoleProgress(role.id);
  document.getElementById("roleEyebrow").textContent = `${role.icon} ROLE TRAINING / ${role.name}`;
  document.getElementById("roleTitle").textContent = role.name;
  document.getElementById("roleTagline").textContent = role.tagline;
  document.getElementById("roleEmblem").textContent = role.icon;
  document.getElementById("roleCount").textContent = `${progress.done} / ${progress.total} CHECKLIST`;
  document.getElementById("rolePercent").textContent = `${progress.percent}%`;
  document.getElementById("roleBar").style.width = `${progress.percent}%`;
  checklistGroups.innerHTML = role.groups.map(([title, tasks], groupIndex) => {
    const category = getCategoryProgress(role.id, groupIndex);
    const rows = tasks.map((label, taskIndex) => {
      const id = `${role.id}-${groupIndex + 1}-${taskIndex + 1}`;
      const checked = state.progress.completed.includes(id);
      const matches = `${title} ${label}`.toLocaleLowerCase("id").includes(skillSearch.value.trim().toLocaleLowerCase("id"));
      return { matches, html: `<label class="task-row ${checked ? "is-complete" : ""}"${matches ? "" : " hidden"}><input type="checkbox" data-task="${id}" ${checked ? "checked" : ""}><span class="custom-check" aria-hidden="true">✓</span><span class="task-label">${escapeHTML(label)}</span></label>` };
    });
    const visibleRows = rows.map((row) => row.html).join("");
    return `<section class="checklist-group"${rows.some((row) => row.matches) ? "" : " hidden"}><div class="category-heading"><div><h2>${escapeHTML(title)}</h2><span>${category.done} / ${category.total} SELESAI</span></div><strong>${category.percent}%</strong></div><div class="category-track"><span style="width:${category.percent}%"></span></div><div class="task-list">${visibleRows}</div></section>`;
  }).join("");
}

function getHeroStudyProgress(heroId) {
  const tasks = heroTasks.filter((task) => task.heroId === heroId);
  const done = tasks.filter((task) => state.progress.heroCompleted.includes(task.id)).length;
  const percent = tasks.length ? Math.min(100, Math.round(done / tasks.length * 100)) : 0;
  const status = percent === 100 ? "Dikuasai" : percent >= 75 ? "Hampir dikuasai" : percent > 0 ? "Sedang dipelajari" : "Belum mulai";
  return { done, total: tasks.length, percent, status };
}

function renderWatchlist() {
  const query = metaSearch.value.trim().toLocaleLowerCase("id");
  const visible = candidateHeroes.filter((hero) => {
    const role = roleById[hero.role];
    const matchesRole = state.metaRole === "all" || hero.role === state.metaRole;
    const matchesPriority = state.metaPriority === "all" || hero.priority === state.metaPriority;
    const matchesQuery = `${hero.name} ${role.label} ${role.name}`.toLocaleLowerCase("id").includes(query);
    return matchesRole && matchesPriority && matchesQuery;
  });
  watchlistEmpty.hidden = visible.length > 0;
  watchlistGroups.innerHTML = roleData.map((role) => {
    const entries = visible.filter((hero) => hero.role === role.id);
    if (entries.length === 0) return "";
    const cards = entries.map((hero) => {
      const progress = getHeroStudyProgress(hero.id);
      const priorityLabel = hero.priority === "high" ? "🔥 PRIORITAS TINGGI" : "🟢 DIPANTAU";
      return `<article class="candidate-card"><div class="candidate-card-top"><span class="candidate-role">${role.icon} ${escapeHTML(role.label)}</span><span class="candidate-priority ${hero.priority === "high" ? "is-high" : ""}">${priorityLabel}</span></div><h3>${escapeHTML(hero.name)}</h3><span class="candidate-label">CALON META S43 · PRIORITAS BELAJAR</span><div class="candidate-progress-label"><span>${progress.status}</span><strong>${progress.done} / ${progress.total} · ${progress.percent}%</strong></div><div class="candidate-progress-track"><span style="width:${progress.percent}%"></span></div><button class="candidate-open" type="button" data-study="${hero.id}" data-candidate-role="${hero.role}">BUKA CHECKLIST BELAJAR <span aria-hidden="true">↗</span></button></article>`;
    }).join("");
    const roleProgress = getRoleProgress(role.id);
    return `<section class="watchlist-role"><div class="watchlist-role-heading"><div><span class="eyebrow">${role.icon} ${escapeHTML(role.label.toUpperCase())}</span><h2>${escapeHTML(role.name)}</h2></div><span>${entries.length} CALON · ${roleProgress.percent}% TOTAL ROLE</span></div><div class="candidate-grid">${cards}</div></section>`;
  }).join("");
}

function renderCandidateStudy(heroId) {
  const candidate = candidateHeroes.find((hero) => hero.id === heroId);
  if (!candidate) return;
  const progress = getHeroStudyProgress(heroId);
  document.getElementById("candidateStudyTitle").textContent = `${candidate.name} · ${roleById[candidate.role].label}`;
  document.getElementById("candidateStudyProgress").textContent = `${progress.percent}%`;
  document.getElementById("candidateStudyBar").style.width = `${progress.percent}%`;
  document.getElementById("candidateStudyStatus").textContent = `${progress.status} · ${progress.done} dari ${progress.total} checklist`;
  document.getElementById("candidateStudyList").innerHTML = heroStudyItems.map((label, index) => {
    const taskId = `hero:${heroId}:${index + 1}`;
    const checked = state.progress.heroCompleted.includes(taskId);
    return `<label class="candidate-task ${checked ? "is-complete" : ""}"><input type="checkbox" data-hero-task="${taskId}" ${checked ? "checked" : ""}><span class="custom-check" aria-hidden="true">✓</span><span>${escapeHTML(label)}</span></label>`;
  }).join("");
}

function openCandidateHero(heroId, roleId) {
  const candidate = candidateHeroes.find((hero) => hero.id === heroId && hero.role === roleId);
  if (!candidate) return;
  state.selectedCandidate = heroId;
  state.selectedHero = null;
  candidateStudy.hidden = false;
  skillHeading.hidden = true;
  skillList.hidden = true;
  balanceNote.hidden = true;
  document.getElementById("dialogPortrait").dataset.tone = "green";
  document.getElementById("dialogInitials").textContent = candidate.name.slice(0, 2).toUpperCase();
  document.getElementById("dialogRole").innerHTML = `<span class="eyebrow-line"></span> ${escapeHTML(roleById[candidate.role].label.toUpperCase())} / CALON META S43`;
  document.getElementById("dialogName").textContent = candidate.name;
  document.getElementById("dialogLane").textContent = `${roleById[candidate.role].label} · ${candidate.priority === "high" ? "Prioritas Tinggi" : "Dipantau"}`;
  document.getElementById("dialogDescription").textContent = "Watchlist prediksi berdasarkan data S42 dan tren patch terkini. Status ini bukan klaim Meta S43 resmi.";
  document.getElementById("dialogWish").hidden = true;
  renderCandidateStudy(heroId);
  heroDialog.showModal();
}

function getStreakDays() {
  const today = new Date();
  const day = (today.getDay() + 6) % 7;
  const monday = new Date(today);
  monday.setDate(today.getDate() - day);
  return Array.from({ length: 7 }, (_, index) => {
    const date = new Date(monday);
    date.setDate(monday.getDate() + index);
    const iso = date.toLocaleDateString("sv-SE");
    const isActive = state.progress.activeDays.includes(iso);
    return `<span class="${iso === state.progress.lastActiveDate ? "is-today" : ""} ${isActive ? "is-done" : ""}">${["S", "S", "R", "K", "J", "S", "M"][index]}</span>`;
  }).join("");
}

function renderProgress() {
  const overall = getOverallProgress();
  document.getElementById("analyticsPercent").textContent = `${overall.percent}%`;
  document.getElementById("analyticsCount").textContent = `${overall.done} dari ${overall.total} skill selesai`;
  document.getElementById("analyticsBar").style.width = `${overall.percent}%`;
  document.getElementById("focusSelect").value = state.progress.focus;
  document.getElementById("progressRoleList").innerHTML = roleData.map((role) => {
    const progress = getRoleProgress(role.id);
    return `<button class="progress-role-row ${state.progress.focus === role.id ? "is-focused" : ""}" type="button" data-view="role" data-role="${role.id}"><span class="progress-role-icon">${role.icon}</span><span class="progress-role-name">${role.label}<small>${progress.done} / ${progress.total} skills</small></span><span class="progress-row-track"><i style="width:${progress.percent}%"></i></span><strong>${progress.percent}%</strong></button>`;
  }).join("");
  const unlocked = [overall.done >= 1, overall.percent >= 25, overall.percent >= 50, overall.percent === 100];
  const achievements = [["01", "FIRST STEP", "Skill pertama berhasil dikuasai."], ["25", "BUILDING MOMENTUM", "Selesaikan 25% seluruh skill."], ["50", "HALFWAY THERE", "Selesaikan setengah wishlist."], ["S", "COMPLETE SET", "Kuasai semua skill di wishlist."]];
  document.getElementById("achievementTotal").textContent = `${unlocked.filter(Boolean).length} / 4 UNLOCKED`;
  document.getElementById("achievementGrid").innerHTML = achievements.map(([mark, title, description], index) => `<article class="achievement-card ${unlocked[index] ? "is-unlocked" : ""}"><span class="achievement-mark">${mark}</span><div><h3>${title}</h3><p>${description}</p></div><span class="achievement-status">${unlocked[index] ? "UNLOCKED" : "LOCKED"}</span></article>`).join("");
}

function renderDashboard() {
  const overall = getOverallProgress();
  document.getElementById("overallPercent").textContent = `${overall.percent}%`;
  document.getElementById("overallCount").textContent = `${overall.done} / ${overall.total}`;
  document.getElementById("overallBar").style.width = `${overall.percent}%`;
  document.getElementById("overallRing").style.setProperty("--progress", `${overall.percent * 3.6}deg`);
  document.getElementById("dashboardRank").textContent = state.progress.rank || "Belum dipilih";
  document.getElementById("dashboardStreak").textContent = String(state.progress.streak);
  const focus = roleById[state.progress.focus] || roleById.jungle;
  const focusProgress = getRoleProgress(focus.id);
  document.getElementById("dashboardFocusName").textContent = focus.label;
  document.getElementById("dashboardFocusProgress").textContent = `${focusProgress.percent}%`;
  document.getElementById("dashboardFocusSelect").value = focus.id;
  const achievementTitle = overall.done === 0 ? "FIRST STEP" : overall.percent >= 50 ? "HALFWAY THERE" : overall.percent >= 25 ? "BUILDING MOMENTUM" : "FIRST STEP";
  document.getElementById("dashboardAchievement").textContent = achievementTitle;
  document.getElementById("dashboardAchievementCopy").textContent = overall.done === 0 ? "Selesaikan skill pertama untuk membuka achievement." : `${overall.done} skill selesai. Terus jaga momentum latihannya.`;
  const note = Object.values(state.progress.notes).find((value) => value && value.trim());
  document.getElementById("dashboardNote").textContent = note || "Catatan latihanmu akan muncul di sini.";
  document.getElementById("streakWeek").innerHTML = getStreakDays();
  renderRoleCards();
}

function renderNotes() {
  const fields = [["mainHero", "Hero utama", "Contoh: Fanny"], ["learnHero", "Hero yang ingin dikuasai", "Hero dan mekanik yang ingin dipelajari"], ["mistakes", "Kesalahan yang sering dilakukan", "Apa yang perlu diperbaiki dari match terakhir?"], ["skillFocus", "Skill yang harus ditingkatkan", "Fokus mekanik atau keputusan permainan"], ["nextRank", "Target rank berikutnya", "Rank yang ingin dicapai"], ["focusRole", "Role yang sedang difokuskan", "Role dan alasan memilihnya"]];
  document.getElementById("notesGrid").innerHTML = fields.map(([key, label, placeholder]) => `<label class="note-field"><span>${label}</span><textarea data-note="${key}" rows="3" placeholder="${placeholder}">${escapeHTML(state.progress.notes[key] || "")}</textarea></label>`).join("");
}

function render() {
  const visibleView = state.view === "wishlist" ? "heroes" : state.view;
  document.querySelectorAll(".view").forEach((view) => { view.hidden = view.id !== `${visibleView}View`; });
  document.querySelectorAll("[data-view]").forEach((item) => {
    const active = (item.dataset.view === state.view || (state.view === "wishlist" && item.dataset.view === "wishlist")) && (state.view !== "role" || item.dataset.role === state.activeRole);
    item.classList.toggle("is-active", active);
    if (item.matches(".side-link, .mobile-nav-link")) item.setAttribute("aria-current", active ? "page" : "false");
  });
  roleData.forEach((role) => { document.querySelector(`[data-nav-progress="${role.id}"]`).textContent = `${getRoleProgress(role.id).percent}%`; });
  document.getElementById("heroCount").textContent = String(heroes.length);
  document.getElementById("navWishCount").textContent = String(state.wishlist.length);
  renderDashboard();
  renderRole();
  renderProgress();
  renderNotes();
  document.getElementById("rankSelect").value = state.progress.rank;
  document.getElementById("rankDisplay").textContent = state.progress.rank || "Belum dipilih";
  const overall = getOverallProgress();
  document.getElementById("rankProgressPercent").textContent = `${overall.percent}%`;
  document.getElementById("rankProgressCount").textContent = `${overall.done} / ${overall.total} checklist`;
  document.getElementById("rankProgressBar").style.width = `${overall.percent}%`;
  renderWatchlist();
  if (state.view === "heroes" || state.view === "wishlist") renderHeroes();
}

function renderHeroes() {
  const visibleHeroes = getVisibleHeroes();
  heroGrid.innerHTML = visibleHeroes.map(createCard).join("");
  heroGrid.hidden = visibleHeroes.length === 0;
  emptyState.hidden = visibleHeroes.length !== 0;
  emptyState.querySelector("h3").textContent = state.view === "wishlist" && state.wishlist.length === 0 ? "HERO POOL MASIH KOSONG" : "HERO BELUM DITEMUKAN";
  emptyState.querySelector("p").textContent = state.view === "wishlist" && state.wishlist.length === 0 ? "Simpan hero pilihanmu untuk menyusun rencana latihan." : "Coba kata kunci atau filter lain.";
  resultSummary.textContent = state.view === "wishlist" ? `${visibleHeroes.length} dari ${state.wishlist.length} hero di wishlist` : state.role === "Semua" ? `Menampilkan ${visibleHeroes.length} dari ${heroes.length} hero` : `${visibleHeroes.length} hero ${state.role}`;
  clearFilters.classList.toggle("is-visible", state.role !== "Semua" || state.query !== "" || state.view === "wishlist");
}

function navigate(view, roleId) {
  state.view = view;
  if (roleId && roleById[roleId]) state.activeRole = roleId;
  render();
  sidebar.classList.remove("is-open");
  menuToggle.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function completeTask(taskId, isChecked) {
  if (isChecked && !state.progress.completed.includes(taskId)) state.progress.completed.push(taskId);
  if (!isChecked) state.progress.completed = state.progress.completed.filter((id) => id !== taskId);
  if (isChecked) {
    const today = new Date().toLocaleDateString("sv-SE");
    if (!state.progress.activeDays.includes(today)) state.progress.activeDays.push(today);
    const activeDays = new Set(state.progress.activeDays);
    let streak = 0;
    const activeDate = new Date(`${today}T00:00:00`);
    while (activeDays.has(activeDate.toLocaleDateString("sv-SE"))) {
      streak += 1;
      activeDate.setDate(activeDate.getDate() - 1);
    }
    state.progress.streak = streak;
    state.progress.lastActiveDate = today;
  }
  saveProgress();
  render();
  if (isChecked) showToast("Skill ditandai selesai. Progress diperbarui.");
}

function completeHeroTask(taskId, isChecked) {
  if (!heroTasks.some((task) => task.id === taskId)) return;
  if (isChecked && !state.progress.heroCompleted.includes(taskId)) state.progress.heroCompleted.push(taskId);
  if (!isChecked) state.progress.heroCompleted = state.progress.heroCompleted.filter((id) => id !== taskId);
  saveProgress();
  render();
  if (state.selectedCandidate) renderCandidateStudy(state.selectedCandidate);
}

function escapeHTML(value) {
  return String(value).replace(/[&<>"']/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;"
  })[character]);
}

function getVisibleHeroes() {
  let visible = heroes.filter((hero) => {
    const matchesView = state.view !== "wishlist" || state.wishlist.includes(hero.id);
    const matchesRole = state.role === "Semua" || hero.role === state.role;
    const searchableText = [hero.name, hero.role, hero.lane, hero.description, ...hero.skills.map((skill) => skill[1])].join(" ").toLocaleLowerCase("id");
    return matchesView && matchesRole && searchableText.includes(state.query.toLocaleLowerCase("id"));
  });

  if (heroSort.value === "name") visible = [...visible].sort((a, b) => a.name.localeCompare(b.name, "id"));
  if (heroSort.value === "role") visible = [...visible].sort((a, b) => a.role.localeCompare(b.role, "id") || a.name.localeCompare(b.name, "id"));
  return visible;
}

function createCard(hero, index) {
  const saved = state.wishlist.includes(hero.id);
  const initials = hero.name === "Yu Zhong" ? "YZ" : hero.name.slice(0, 2).toUpperCase();
  const filledDots = Array.from({ length: 5 }, (_, dot) => `<i class="${dot < hero.difficulty ? "is-filled" : ""}"></i>`).join("");
  const previewSkills = hero.skills.slice(0, 3).map((skill) => `<span class="skill-chip">${escapeHTML(skill[1])}</span>`).join("");

  return `<article class="hero-card" style="animation-delay:${Math.min(index * 35, 280)}ms">
    <div class="card-art" data-tone="${hero.tone}">
      <span class="card-code">HERO FILE / ${String(heroes.indexOf(hero) + 1).padStart(2, "0")}</span>
      <span class="card-role">${escapeHTML(hero.role.toUpperCase())}</span>
      <span class="hero-monogram" aria-hidden="true">${initials}</span>
      <span class="card-index">NOXX127 · ${String(index + 1).padStart(2, "0")}</span>
    </div>
    <div class="card-body">
      <div class="card-heading">
        <div><h3 class="hero-name">${escapeHTML(hero.name)}</h3><p class="hero-lane">${escapeHTML(hero.lane)}</p></div>
        <button class="wish-toggle ${saved ? "is-saved" : ""}" type="button" data-toggle="${hero.id}" aria-label="${saved ? "Hapus" : "Tambah"} ${escapeHTML(hero.name)} ${saved ? "dari" : "ke"} wishlist" aria-pressed="${saved}">${saved ? "♥" : "♡"}</button>
      </div>
      <div class="skill-preview" aria-label="Skill unggulan">${previewSkills}</div>
      <div class="card-footer">
        <span class="difficulty"><span class="difficulty-dots" aria-label="Kesulitan ${hero.difficulty} dari 5">${filledDots}</span> ${hero.difficulty}/5</span>
        <button class="detail-button" type="button" data-open="${hero.id}">DETAIL SKILL <span aria-hidden="true">↗</span></button>
      </div>
    </div>
  </article>`;
}

function toggleWishlist(heroId) {
  const hero = heroes.find((item) => item.id === heroId);
  if (!hero) return;
  const isSaved = state.wishlist.includes(heroId);
  state.wishlist = isSaved ? state.wishlist.filter((id) => id !== heroId) : [...state.wishlist, heroId];
  saveWishlist();
  renderHeroes();
  showToast(isSaved ? `${hero.name} dihapus dari wishlist.` : `${hero.name} ditambahkan ke wishlist.`);
  if (state.selectedHero?.id === heroId) updateDialogWishButton(hero);
}

function updateDialogWishButton(hero) {
  const saved = state.wishlist.includes(hero.id);
  const button = document.getElementById("dialogWish");
  button.classList.toggle("is-saved", saved);
  button.innerHTML = `<span aria-hidden="true">${saved ? "♥" : "♡"}</span> ${saved ? "HAPUS DARI WISHLIST" : "TAMBAH KE WISHLIST"}`;
  button.setAttribute("aria-pressed", String(saved));
}

function openHero(heroId) {
  const hero = heroes.find((item) => item.id === heroId);
  if (!hero) return;
  state.selectedCandidate = null;
  state.selectedHero = hero;
  candidateStudy.hidden = true;
  skillHeading.hidden = false;
  skillList.hidden = false;
  balanceNote.hidden = false;
  document.getElementById("dialogWish").hidden = false;
  document.getElementById("dialogPortrait").dataset.tone = hero.tone;
  document.getElementById("dialogInitials").textContent = hero.name === "Yu Zhong" ? "YZ" : hero.name.slice(0, 2).toUpperCase();
  document.getElementById("dialogRole").innerHTML = `<span class="eyebrow-line"></span> ${escapeHTML(hero.role.toUpperCase())} / ${escapeHTML(hero.lane.toUpperCase())}`;
  document.getElementById("dialogName").textContent = hero.name;
  document.getElementById("dialogLane").textContent = `ROLE ${hero.role} · LANE ${hero.lane}`;
  document.getElementById("dialogDescription").textContent = hero.description;
  document.getElementById("skillList").innerHTML = hero.skills.map(([key, name, description]) => `<li><span class="skill-key">${escapeHTML(key === "Passive" ? "P" : key)}</span><span class="skill-copy"><b>${escapeHTML(name)}</b><span>${escapeHTML(description)}</span></span></li>`).join("");
  updateDialogWishButton(hero);
  heroDialog.showModal();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

document.addEventListener("click", (event) => {
  const route = event.target.closest("[data-view]");
  if (route) {
    event.preventDefault();
    navigate(route.dataset.view, route.dataset.role);
  }
});

checklistGroups.addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-task]");
  if (checkbox) completeTask(checkbox.dataset.task, checkbox.checked);
});

document.getElementById("candidateStudyList").addEventListener("change", (event) => {
  const checkbox = event.target.closest("[data-hero-task]");
  if (checkbox) completeHeroTask(checkbox.dataset.heroTask, checkbox.checked);
});

watchlistGroups.addEventListener("click", (event) => {
  const button = event.target.closest("[data-study]");
  if (button) openCandidateHero(button.dataset.study, button.dataset.candidateRole);
});

skillSearch.addEventListener("input", renderRole);
metaSearch.addEventListener("input", renderWatchlist);
metaRoleFilter.addEventListener("change", () => {
  state.metaRole = metaRoleFilter.value;
  renderWatchlist();
});

document.querySelector(".priority-filters").addEventListener("click", (event) => {
  const button = event.target.closest("[data-meta-priority]");
  if (!button) return;
  state.metaPriority = button.dataset.metaPriority;
  document.querySelectorAll("[data-meta-priority]").forEach((filter) => {
    const active = filter === button;
    filter.classList.toggle("is-active", active);
    filter.setAttribute("aria-pressed", String(active));
  });
  renderWatchlist();
});

document.getElementById("focusSelect").addEventListener("change", () => {
  state.progress.focus = document.getElementById("focusSelect").value;
  saveProgress();
  render();
});

document.getElementById("dashboardFocusSelect").addEventListener("change", () => {
  state.progress.focus = document.getElementById("dashboardFocusSelect").value;
  saveProgress();
  render();
});

document.getElementById("rankSelect").addEventListener("change", () => {
  state.progress.rank = document.getElementById("rankSelect").value;
  saveProgress();
  render();
  showToast(state.progress.rank ? `Target rank ${state.progress.rank} tersimpan.` : "Target rank dihapus.");
});

document.getElementById("notesGrid").addEventListener("input", (event) => {
  const field = event.target.closest("[data-note]");
  if (!field) return;
  state.progress.notes[field.dataset.note] = field.value;
  saveProgress();
  const indicator = document.getElementById("savedIndicator");
  indicator.textContent = "MENYIMPAN";
  window.clearTimeout(indicator.timer);
  indicator.timer = window.setTimeout(() => { indicator.textContent = "TERSIMPAN"; }, 350);
});

heroSearch.addEventListener("input", () => { state.query = heroSearch.value.trim(); renderHeroes(); });
heroSort.addEventListener("change", renderHeroes);
mobileRole.addEventListener("change", () => { state.role = mobileRole.value; renderHeroes(); });

heroGrid.addEventListener("click", (event) => {
  const toggle = event.target.closest("[data-toggle]");
  if (toggle) {
    toggleWishlist(toggle.dataset.toggle);
    return;
  }
  const detail = event.target.closest("[data-open]");
  if (detail) openHero(detail.dataset.open);
});

document.getElementById("clearFilters").addEventListener("click", () => {
  state.role = "Semua";
  state.query = "";
  state.view = "heroes";
  heroSearch.value = "";
  heroSort.value = "featured";
  renderHeroes();
});

document.getElementById("emptyReset").addEventListener("click", () => {
  state.role = "Semua";
  state.query = "";
  state.view = "heroes";
  heroSearch.value = "";
  renderHeroes();
  heroSearch.focus();
});

document.getElementById("dialogClose").addEventListener("click", () => heroDialog.close());
document.getElementById("dialogWish").addEventListener("click", () => {
  if (state.selectedHero) toggleWishlist(state.selectedHero.id);
});
heroDialog.addEventListener("click", (event) => {
  if (event.target === heroDialog) heroDialog.close();
});

menuToggle.addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.getElementById("mobileMenuButton").addEventListener("click", () => {
  const isOpen = sidebar.classList.toggle("is-open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;
  if (sidebar.classList.contains("is-open")) {
    sidebar.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.focus();
  }
});

document.getElementById("resetProgress").addEventListener("click", () => {
  if (!window.confirm("Reset seluruh checklist, streak, target rank, dan catatan latihan? Tindakan ini tidak dapat dibatalkan.")) return;
  state.progress = { ...defaultProgress, completed: [], heroCompleted: [], notes: {}, activeDays: [] };
  saveProgress();
  render();
  showToast("Semua progress wishlist berhasil direset.");
});

document.addEventListener("click", (event) => {
  if (!window.matchMedia("(max-width: 760px)").matches || !sidebar.classList.contains("is-open")) return;
  if (!sidebar.contains(event.target) && !menuToggle.contains(event.target) && !document.getElementById("mobileMenuButton").contains(event.target)) {
    sidebar.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !heroDialog.open && document.activeElement !== heroSearch && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    navigate("heroes");
    heroSearch.focus();
  }
  if (event.key === "Escape" && sidebar.classList.contains("is-open")) {
    sidebar.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.focus();
  }
});

render();
if (storageWarning) showToast("Data progress tersimpan rusak dan dimuat ulang dengan aman.");
