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

const storageKey = "noxx127-mlbb-skill-wishlist-v1";
const heroGrid = document.getElementById("heroGrid");
const heroSearch = document.getElementById("heroSearch");
const heroSort = document.getElementById("heroSort");
const roleNav = document.getElementById("roleNav");
const mobileRole = document.getElementById("mobileRole");
const resultSummary = document.getElementById("resultSummary");
const emptyState = document.getElementById("emptyState");
const clearFilters = document.getElementById("clearFilters");
const heroDialog = document.getElementById("heroDialog");
const toast = document.getElementById("toast");
const sidebar = document.getElementById("sideNav");
const menuToggle = document.getElementById("menuToggle");

const state = {
  role: "Semua",
  view: "roster",
  query: "",
  wishlist: loadWishlist(),
  selectedHero: null
};

function loadWishlist() {
  try {
    const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
    return Array.isArray(saved) ? saved.filter((id) => heroes.some((hero) => hero.id === id)) : [];
  } catch {
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

function updateNavigation() {
  document.querySelectorAll(".side-link").forEach((link) => {
    const active = link.dataset.view === state.view;
    link.classList.toggle("is-active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  document.querySelectorAll(".role-link").forEach((button) => {
    const active = button.dataset.role === state.role;
    button.classList.toggle("is-active", active);
    button.setAttribute("aria-pressed", String(active));
  });
  document.getElementById("navWishCount").textContent = String(state.wishlist.length);
  document.getElementById("heroCount").textContent = String(heroes.length);
  mobileRole.value = state.role;
}

function render() {
  const visibleHeroes = getVisibleHeroes();
  heroGrid.innerHTML = visibleHeroes.map(createCard).join("");
  heroGrid.hidden = visibleHeroes.length === 0;
  emptyState.hidden = visibleHeroes.length !== 0;
  emptyState.querySelector("h3").textContent = state.view === "wishlist" && state.wishlist.length === 0 ? "WISHLIST MASIH KOSONG" : "HERO BELUM DITEMUKAN";
  emptyState.querySelector("p").textContent = state.view === "wishlist" && state.wishlist.length === 0 ? "Simpan hero pilihanmu untuk menyusun rencana latihan." : "Coba kata kunci atau filter lain.";

  if (state.view === "wishlist") {
    resultSummary.textContent = `${visibleHeroes.length} dari ${state.wishlist.length} hero di wishlist`;
  } else {
    resultSummary.textContent = state.role === "Semua"
      ? `Menampilkan ${visibleHeroes.length} dari ${heroes.length} hero`
      : `${visibleHeroes.length} hero ${state.role}`;
  }
  clearFilters.classList.toggle("is-visible", state.role !== "Semua" || state.query !== "" || state.view !== "roster");
  updateNavigation();
}

function setRole(role) {
  state.role = role;
  render();
}

function toggleWishlist(heroId) {
  const hero = heroes.find((item) => item.id === heroId);
  if (!hero) return;
  const isSaved = state.wishlist.includes(heroId);
  state.wishlist = isSaved ? state.wishlist.filter((id) => id !== heroId) : [...state.wishlist, heroId];
  saveWishlist();
  render();
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
  state.selectedHero = hero;
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

let toastTimer;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2400);
}

heroSearch.addEventListener("input", () => {
  state.query = heroSearch.value.trim();
  render();
});

heroSort.addEventListener("change", render);
roleNav.addEventListener("click", (event) => {
  const button = event.target.closest("[data-role]");
  if (button) setRole(button.dataset.role);
});
mobileRole.addEventListener("change", () => setRole(mobileRole.value));

heroGrid.addEventListener("click", (event) => {
  const toggle = event.target.closest("[data-toggle]");
  if (toggle) {
    toggleWishlist(toggle.dataset.toggle);
    return;
  }
  const detail = event.target.closest("[data-open]");
  if (detail) openHero(detail.dataset.open);
});

document.querySelector(".side-nav").addEventListener("click", (event) => {
  const link = event.target.closest("[data-view]");
  if (!link) return;
  event.preventDefault();
  state.view = link.dataset.view;
  render();
  if (window.matchMedia("(max-width: 760px)").matches) {
    sidebar.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
  document.getElementById("roster").scrollIntoView({ behavior: "smooth", block: "start" });
});

document.getElementById("clearFilters").addEventListener("click", () => {
  state.role = "Semua";
  state.query = "";
  state.view = "roster";
  heroSearch.value = "";
  heroSort.value = "featured";
  render();
});

document.getElementById("emptyReset").addEventListener("click", () => {
  state.role = "Semua";
  state.query = "";
  state.view = "roster";
  heroSearch.value = "";
  render();
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

document.addEventListener("click", (event) => {
  if (!window.matchMedia("(max-width: 760px)").matches || !sidebar.classList.contains("is-open")) return;
  if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
    sidebar.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !heroDialog.open && document.activeElement !== heroSearch && !["INPUT", "TEXTAREA", "SELECT"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    heroSearch.focus();
  }
  if (event.key === "Escape" && sidebar.classList.contains("is-open")) {
    sidebar.classList.remove("is-open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.focus();
  }
});

render();
