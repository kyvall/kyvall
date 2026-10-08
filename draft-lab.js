(function () {
  "use strict";

  const historyStorageKey = "noxx127-draft-history-v1";
  const roleLabels = { jungle: "Jungle", roam: "Roam", exp: "EXP", gold: "Gold", mid: "Mid" };
  const requiredRoles = ["jungle", "roam", "mid", "exp", "gold"];
  const state = {
    mode: "ranked",
    firstPick: "blue",
    rankedBans: 5,
    practiceBans: 5,
    analysisSide: "blue",
    bans: { blue: Array(5).fill(""), red: Array(5).fill("") },
    picks: { blue: Array(5).fill(""), red: Array(5).fill("") },
    assistantChoice: "",
    history: [],
    storageMessage: ""
  };

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function getMeta() {
    return window.NoxxDataService?.getCached("meta") || null;
  }

  function renderRoleIdentity(label, heroName, className) {
    return window.NoxxRoleMeta.renderIdentity(label, heroName, className);
  }

  function getHeroes() {
    const meta = getMeta();
    if (!meta) return [];
    return Object.entries(meta.roles).flatMap(([role, heroes]) => heroes.map((hero) => ({
      ...hero,
      roleId: role,
      id: `${role}:${hero.hero}`
    })));
  }

  function getHero(id) {
    return getHeroes().find((hero) => hero.id === id) || null;
  }

  function activeBanCount() {
    if (state.mode === "tournament") return 5;
    return Number(state.mode === "ranked" ? state.rankedBans : state.practiceBans);
  }

  function allSelectedIds() {
    return [...state.bans.blue, ...state.bans.red, ...state.picks.blue, ...state.picks.red].filter(Boolean);
  }

  function renderHeroOptions(selectedId, excludedIds) {
    const heroes = getHeroes();
    const selectable = heroes.filter((hero) => hero.id === selectedId || !excludedIds.includes(hero.id));
    return `<option value="">${heroes.length ? "Pilih hero — Season 42" : "Data Season 42 belum dapat diverifikasi."}</option>${selectable.map((hero) =>
      `<option value="${escapeHTML(hero.id)}" ${hero.id === selectedId ? "selected" : ""}>${escapeHTML(hero.hero)} · ${escapeHTML(hero.role || roleLabels[hero.roleId])}</option>`
    ).join("")}`;
  }

  function renderSlots() {
    const heroes = getHeroes();
    const banCount = activeBanCount();
    document.querySelectorAll("[data-draft-slots]").forEach((container) => {
      const [, side, kind, phase] = container.dataset.draftSlots.match(/^(blue|red)-(bans|picks)-(early|late)$/) || [];
      if (!side || !kind || !phase) return;
      const isBan = kind === "bans";
      const indexes = phase === "early" ? [0, 1, 2] : (isBan ? [3, 4] : [3, 4]);
      const visible = !isBan || phase === "early" || banCount === 5;
      container.closest(".draft-round").hidden = !visible;
      if (!visible) return;
      container.innerHTML = indexes.map((index) => {
        const slotName = `${isBan ? "BAN" : "PICK"} ${index + 1}`;
        const id = `${side}-${kind}-${index + 1}`;
        const value = state[kind][side][index];
        const chosenHero = getHero(value);
        const excluded = allSelectedIds().filter((selectedId) => selectedId !== value);
        const firstPick = !isBan && index === 0 && state.firstPick === side;
        return `<label class="draft-slot ${isBan ? "ban-slot" : "pick-slot"} ${value ? "has-selection" : ""}" for="${id}">
          <span class="draft-slot-label">${slotName}${firstPick ? '<span class="first-pick-mark">FIRST PICK</span>' : ""}</span>
          <select id="${id}" data-draft-side="${side}" data-draft-kind="${kind}" data-draft-index="${index}" aria-label="${side === "blue" ? "Blue" : "Red"} ${slotName.toLowerCase()}" ${heroes.length ? "" : "disabled"}>
            ${renderHeroOptions(value, excluded)}
          </select>
          ${chosenHero ? `<span class="draft-slot-meta">${renderRoleIdentity(chosenHero.role || roleLabels[chosenHero.roleId], chosenHero.hero)} · ${escapeHTML(chosenHero.tier)}</span>` : '<span class="draft-slot-meta">Belum dipilih</span>'}
        </label>`;
      }).join("");
    });
    document.getElementById("draftBoardStatus").textContent = heroes.length
      ? `Pilihan hero berasal dari ${getMeta().source.name} · ${getMeta().season || "Season 42"}${getMeta().patch ? ` · Patch ${getMeta().patch}` : ""}. Hero dan role mengikuti snapshot terverifikasi yang tersedia.`
      : "Data Season 42 belum dapat diverifikasi. Draft board tetap tersedia, tetapi pilihan hero memerlukan data terverifikasi.";
  }

  function tierValue(hero) {
    const match = hero?.tier?.match(/\b([SABCD])\b/i);
    return ({ S: 5, A: 4, B: 3, C: 2, D: 1 })[match?.[1]?.toUpperCase()] || 0;
  }

  function priorityValue(hero) {
    return (hero.banRate ?? 0) * 0.5 + (hero.pickRate ?? 0) * 0.2 + (hero.winRate ?? 0) * 0.2 + tierValue(hero) * 2;
  }

  function priorityGroup(hero) {
    if (hero.banRate !== null && hero.banRate >= 50) return "SANGAT PRIORITAS";
    if (tierValue(hero) >= 4 || (hero.banRate !== null && hero.banRate >= 25) || (hero.pickRate !== null && hero.pickRate >= 20)) return "PRIORITAS TINGGI";
    return "SITUASIONAL";
  }

  function percent(value) {
    return value === null || value === undefined ? "Data belum terverifikasi" : `${value.toFixed(2)}%`;
  }

  function renderPriority() {
    const meta = getMeta();
    const heroes = getHeroes().sort((left, right) => priorityValue(right) - priorityValue(left));
    const groups = ["SANGAT PRIORITAS", "PRIORITAS TINGGI", "SITUASIONAL"];
    const list = document.getElementById("rankedPriorityList");
    document.getElementById("rankedPriorityNote").textContent = meta
      ? `Label prioritas adalah analisis latihan dari tier serta statistik Season 42 yang tersedia (${meta.source.name}, diperbarui ${meta.updatedAt}). Popularity dan counter potential tidak tersedia, sehingga tidak diasumsikan.`
      : "Data Season 42 belum dapat diverifikasi. Tidak ada statistik atau ranking hero yang dibuat sebagai pengganti.";
    list.innerHTML = heroes.length ? groups.map((group) => {
      const entries = heroes.filter((hero) => priorityGroup(hero) === group);
      return `<section class="priority-category"><h3>${group}<span>${entries.length}</span></h3>${entries.length ? entries.map((hero) => `
        <article class="priority-hero">
          <div class="priority-hero-heading"><strong>${escapeHTML(hero.hero)}</strong><span>${renderRoleIdentity(hero.role || roleLabels[hero.roleId], hero.hero)} · ${escapeHTML(hero.tier)}</span></div>
          <span class="priority-badge">${group === "SANGAT PRIORITAS" ? "BAN PRIORITY" : group}</span>
          <span class="priority-meter-label">PRIORITY INDEX · INTERNAL</span>
          <div class="priority-meter" role="img" aria-label="${escapeHTML(hero.hero)}: indikator derived, bukan statistik resmi"><span style="width:${Math.max(12, Math.min(100, hero.banRate ?? tierValue(hero) * 12))}%"></span></div>
          <div class="priority-stats"><span>Ban Rate <b>${percent(hero.banRate)}</b></span><span>Pick Rate <b>${percent(hero.pickRate)}</b></span><span>Win Rate <b>${percent(hero.winRate)}</b></span></div>
        </article>`).join("") : '<p class="draft-empty-note">Data belum terverifikasi untuk kategori ini.</p>'}</section>`;
    }).join("") : '<p class="draft-empty-note">Data Season 42 belum dapat diverifikasi.</p>';
    document.getElementById("tournamentPriorityNote").textContent =
      "Priority berdasarkan data kompetitif Season 42 yang tersedia. Data per-hero pick/ban kompetitif belum tersedia melalui data-service; tidak ada daftar prioritas MPL yang diasumsikan atau dibuat.";
  }

  function pickedHeroes(side) {
    return state.picks[side].map(getHero).filter(Boolean);
  }

  function getCurrentAssistantHero() {
    const options = pickedHeroes(state.analysisSide);
    return options.find((hero) => hero.id === state.assistantChoice) || options.at(-1) || null;
  }

  function renderAssistant() {
    const side = state.analysisSide;
    const own = pickedHeroes(side);
    const opponent = pickedHeroes(side === "blue" ? "red" : "blue");
    const select = document.getElementById("assistantPick");
    const current = getCurrentAssistantHero();
    if (current) state.assistantChoice = current.id;
    else state.assistantChoice = "";
    select.innerHTML = `<option value="">${own.length ? "Pilih hero sendiri" : "Pilih hero di draft board"}</option>${own.map((hero) =>
      `<option value="${escapeHTML(hero.id)}" ${hero.id === state.assistantChoice ? "selected" : ""}>${escapeHTML(hero.hero)} · ${escapeHTML(hero.role || roleLabels[hero.roleId])}</option>`
    ).join("")}`;
    const hero = getCurrentAssistantHero();
    document.getElementById("assistantDetails").innerHTML = hero ? `
      <div class="assistant-hero-name"><span>YOUR PICK</span><strong>${escapeHTML(hero.hero)}</strong></div>
      <div class="assistant-facts"><p><b>ROLE</b>${renderRoleIdentity(hero.role || roleLabels[hero.roleId], hero.hero)}</p>
      <p><b>✓ KELEBIHAN</b>${escapeHTML(hero.tier)} · Win Rate ${percent(hero.winRate)}</p>
      <p><b>⚠ RISIKO</b>Matchup, kit, dan risiko hero belum tersedia dalam data terverifikasi.</p>
      <p><b>🎯 COCOK DENGAN</b>Data sinergi belum tersedia.</p>
      <p><b>❌ COUNTER POTENSIAL</b>Counter data belum tersedia.</p></div>` :
      '<p class="draft-empty-note">Pilih hero sendiri di draft board untuk melihat data Season 42 yang tersedia.</p>';
    const alert = document.getElementById("counterAlert");
    alert.textContent = hero && opponent.length
      ? `⚠ COUNTER ALERT — Ada pick lawan, tetapi relasi counter belum terverifikasi. Counter data belum tersedia; matchup tidak dapat dipastikan.`
      : "⚠ COUNTER ALERT — Counter data belum tersedia.";
  }

  function roleSet(heroes) {
    return new Set(heroes.map((hero) => hero.roleId));
  }

  function compositionChecks(heroes) {
    const roles = roleSet(heroes);
    return {
      roles,
      damage: roles.has("gold") && (roles.has("mid") || roles.has("jungle")),
      frontline: roles.has("roam") || roles.has("exp"),
      objective: roles.has("jungle")
    };
  }

  function roleListMarkup(roles) {
    return requiredRoles.map((role) => `<span class="${roles.has(role) ? "check-ok" : "check-missing"}">${roles.has(role) ? "✓" : "○"} ${renderRoleIdentity(roleLabels[role])}</span>`).join("");
  }

  function teamCompositionMarkup(side) {
    const heroes = pickedHeroes(side);
    const checks = compositionChecks(heroes);
    const name = side === "blue" ? "BLUE SIDE" : "RED SIDE";
    return `<article class="composition-team"><h3>${name}</h3><div class="composition-role-list">${roleListMarkup(checks.roles)}</div>
      <ul class="composition-checks">
        <li><span>Damage <small>(heuristik role)</small></span><b class="${checks.damage ? "check-ok" : "check-missing"}">${checks.damage ? "✓" : "⚠"}</b></li>
        <li><span>Frontline <small>(heuristik role)</small></span><b class="${checks.frontline ? "check-ok" : "check-missing"}">${checks.frontline ? "✓" : "⚠"}</b></li>
        <li><span>Crowd Control</span><b class="check-unknown">Data belum terverifikasi</b></li>
        <li><span>Wave Clear</span><b class="check-unknown">Data belum terverifikasi</b></li>
        <li><span>Objective Control <small>(indikasi Jungle)</small></span><b class="${checks.objective ? "check-ok" : "check-missing"}">${checks.objective ? "✓" : "⚠"}</b></li>
      </ul></article>`;
  }

  function renderComposition() {
    document.getElementById("compositionTeams").innerHTML = teamCompositionMarkup("blue") + teamCompositionMarkup("red");
    const team = pickedHeroes(state.analysisSide);
    const checks = compositionChecks(team);
    const missingRoles = requiredRoles.filter((role) => !checks.roles.has(role)).map((role) => roleLabels[role]);
    const warnings = [];
    if (missingRoles.length) warnings.push(`Role belum terisi: ${missingRoles.join(", ")}.`);
    if (!checks.damage) warnings.push("Coverage damage berdasarkan role belum lengkap.");
    if (!checks.frontline) warnings.push("Indikasi frontline dari role masih terbatas.");
    document.getElementById("compositionWarning").textContent = warnings.length
      ? `⚠ COMPOSITION WARNING — ${warnings.join(" ")}`
      : "✓ Role terisi dan heuristik komposisi dasar terpenuhi. Fungsi hero tetap perlu ditinjau manual.";
  }

  function scoreFor(side) {
    const heroes = pickedHeroes(side);
    const checks = compositionChecks(heroes);
    const roleCoverage = checks.roles.size * 10;
    const composition = Number(Boolean(checks.damage)) * 10 + Number(Boolean(checks.frontline)) * 10;
    const objective = checks.objective ? 15 : 0;
    const hasMeta = Boolean(getMeta());
    const priority = hasMeta ? Math.min(15, heroes.reduce((total, hero) => total + Math.max(0, tierValue(hero) - 2), 0)) : null;
    const available = 50 + 20 + 15 + (hasMeta ? 15 : 0);
    const points = roleCoverage + composition + objective + (priority ?? 0);
    return { score: Math.round(points / available * 100), roleCoverage, composition, objective, priority, available };
  }

  function renderScores() {
    document.getElementById("draftScores").innerHTML = ["blue", "red"].map((side) => {
      const score = scoreFor(side);
      const label = side === "blue" ? "BLUE" : "RED";
      return `<article class="draft-team-score"><div class="draft-score-heading"><h3>${label}</h3><strong>${score.score} <small>/ 100</small></strong></div>
        <div class="score-row"><span>Role Coverage</span><b>+${score.roleCoverage} / 50</b></div>
        <div class="score-row"><span>Composition <small>(heuristik)</small></span><b>+${score.composition} / 20</b></div>
        <div class="score-row"><span>Counter Matchup</span><b class="check-unknown">Data belum terverifikasi</b></div>
        <div class="score-row"><span>Objective Control <small>(Jungle)</small></span><b>+${score.objective} / 15</b></div>
        <div class="score-row"><span>Draft Priority <small>(tier terverifikasi)</small></span><b>${score.priority === null ? "Data belum terverifikasi" : `+${score.priority} / 15`}</b></div>
        ${score.available < 100 ? '<p class="draft-score-disclaimer">Skor dinormalisasi dari komponen yang tersedia; matchup tidak dihitung.</p>' : ""}</article>`;
    }).join("");
  }

  function selectedNames() {
    return allSelectedIds().map(getHero).filter(Boolean);
  }

  function renderRecommendations() {
    const own = pickedHeroes(state.analysisSide);
    const selected = selectedNames();
    const selectedNamesSet = new Set(selected.map((hero) => hero.hero.toLocaleLowerCase("id")));
    const usedRoles = roleSet(own);
    const available = getHeroes()
      .filter((hero) => !selectedNamesSet.has(hero.hero.toLocaleLowerCase("id")))
      .sort((left, right) => {
        const leftNeeded = Number(!usedRoles.has(left.roleId));
        const rightNeeded = Number(!usedRoles.has(right.roleId));
        return rightNeeded - leftNeeded || (state.mode === "tournament" ? 0 : priorityValue(right) - priorityValue(left));
      })
      .slice(0, 3);
    const candidates = available.map((hero, index) => {
      let reason;
      if (state.mode === "tournament") {
        reason = !usedRoles.has(hero.roleId)
          ? `Opsi role ${hero.role || roleLabels[hero.roleId]} untuk melengkapi komposisi. Priority kompetitif per-hero belum tersedia.`
          : `Opsi latihan role ${hero.role || roleLabels[hero.roleId]}; data prioritas kompetitif belum tersedia.`;
      } else if (state.mode === "practice") {
        reason = !usedRoles.has(hero.roleId)
          ? `Pertimbangkan role ${hero.role || roleLabels[hero.roleId]} yang belum terwakili; sesuaikan dengan rencana tim.`
          : `Opsi role ${hero.role || roleLabels[hero.roleId]} dari snapshot Season 42 untuk dievaluasi secara bebas.`;
      } else {
        reason = !usedRoles.has(hero.roleId)
          ? `Mengisi role ${hero.role || roleLabels[hero.roleId]} yang belum terwakili; tier ${hero.tier} tersedia pada snapshot ranked.`
          : `Pilihan role ${hero.role || roleLabels[hero.roleId]} dengan tier ${hero.tier} pada snapshot ranked; evaluasi kebutuhan tim secara manual.`;
      }
      const tierInfo = state.mode === "tournament" ? "Priority kompetitif belum tersedia" : `Verified tier: ${hero.tier}`;
      return `<article class="recommended-pick"><strong><span>#${index + 1}</span> ${escapeHTML(hero.hero)}</strong><p><b>Reason:</b> ${escapeHTML(reason)}</p><small>${renderRoleIdentity(hero.role || roleLabels[hero.roleId], hero.hero)} · ${escapeHTML(tierInfo)}</small></article>`;
    });
    const recommendationNote = state.mode === "tournament"
      ? "Pilihan hero/role berasal dari snapshot ranked yang tersedia, tetapi tier ranked tidak dipakai sebagai prioritas tournament. Data counter, popularity, dan prioritas kompetitif per-hero belum tersedia."
      : state.mode === "practice"
        ? "Role kosong diprioritaskan sebagai bahan latihan; tier hanya konteks snapshot dan bukan arahan wajib. Data counter dan popularity belum tersedia."
        : "Rekomendasi mempertimbangkan role kosong serta tier ranked terverifikasi; counter dan popularity belum tersedia dan tidak diasumsikan.";
    document.getElementById("recommendedPicks").innerHTML = candidates.length
      ? `${candidates.join("")}<p class="draft-panel-note">${escapeHTML(recommendationNote)}</p>`
      : '<p class="draft-empty-note">Data hero Season 42 belum terverifikasi atau semua pilihan sudah terpakai.</p>';
  }

  function renderAnalysis() {
    renderAssistant();
    renderComposition();
    renderRecommendations();
    renderScores();
  }

  function renderModes() {
    document.querySelectorAll("[data-draft-mode]").forEach((button) => {
      const selected = button.dataset.draftMode === state.mode;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-selected", String(selected));
      button.tabIndex = selected ? 0 : -1;
    });
    document.getElementById("rankedFormatControl").hidden = state.mode !== "ranked";
    document.getElementById("practiceFormatControl").hidden = state.mode !== "practice";
    document.getElementById("rankedPrioritySection").hidden = state.mode === "tournament";
    const info = {
      ranked: "Simulasi ranked. Format dan aturan dapat berbeda menurut rank, server, atau pembaruan game.",
      tournament: "Struktur pick/ban kompetitif untuk latihan. Priority kompetitif Season 42 hanya ditampilkan jika tersedia dari sumber terverifikasi.",
      practice: "Latihan bebas. Gunakan rekomendasi sebagai bahan evaluasi, bukan arahan wajib."
    };
    document.getElementById("draftModeInfo").textContent = info[state.mode];
    document.getElementById("draftModeInfo").setAttribute("aria-labelledby", `draftMode${state.mode[0].toUpperCase()}${state.mode.slice(1)}`);
  }

  function renderFirstPick() {
    document.querySelectorAll("[data-first-pick]").forEach((button) => {
      const selected = button.dataset.firstPick === state.firstPick;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
    document.getElementById("firstPickAdvantage").textContent =
      `First Pick Advantage — ${state.firstPick === "blue" ? "Blue" : "Red"} mendapat prioritas pick pertama dalam simulasi ini; bukan klaim win-rate.`;
  }

  function loadHistory() {
    try {
      const stored = JSON.parse(localStorage.getItem(historyStorageKey) || "[]");
      if (!Array.isArray(stored)) throw new Error("Format draft history lokal tidak valid.");
      state.history = stored.filter((draft) => draft && typeof draft === "object" && typeof draft.timestamp === "string").slice(0, 10);
    } catch (error) {
      state.storageMessage = `Draft history tidak dapat dibaca: ${error.message}`;
      state.history = [];
    }
  }

  function renderHistory() {
    document.getElementById("draftStorageStatus").textContent = state.storageMessage;
    document.getElementById("draftHistoryList").innerHTML = state.history.length ? state.history.map((draft) => {
      const date = new Date(draft.timestamp);
      const when = Number.isNaN(date.getTime()) ? "Tanggal tidak valid" : new Intl.DateTimeFormat("id-ID", { dateStyle: "medium", timeStyle: "short" }).format(date);
      const list = (items) => Array.isArray(items) && items.length ? items.map(escapeHTML).join(", ") : "—";
      return `<article class="draft-history-entry"><div class="draft-history-entry-heading"><strong>${escapeHTML(String(draft.mode || "Draft").toUpperCase())} · ${escapeHTML(draft.firstPick || "—").toUpperCase()} FIRST</strong><time>${escapeHTML(when)}</time></div>
        <p><b>Ban Blue:</b> ${list(draft.banBlue)} · <b>Ban Red:</b> ${list(draft.banRed)}</p>
        <p><b>Pick Blue:</b> ${list(draft.pickBlue)} · <b>Pick Red:</b> ${list(draft.pickRed)}</p></article>`;
    }).join("") : '<p class="draft-empty-note">Belum ada draft tersimpan.</p>';
  }

  function persistHistory(history) {
    try {
      localStorage.setItem(historyStorageKey, JSON.stringify(history));
      return true;
    } catch (error) {
      state.storageMessage = `Draft tidak dapat disimpan: ${error.message}`;
      return false;
    }
  }

  function render() {
    renderModes();
    renderFirstPick();
    renderSlots();
    renderPriority();
    renderAnalysis();
    renderHistory();
  }

  function handleBoardChange(event) {
    const select = event.target.closest("[data-draft-side]");
    if (!select) return;
    const { draftSide: side, draftKind: kind, draftIndex: index } = select.dataset;
    const heroId = select.value;
    const heroName = getHero(heroId)?.hero.toLocaleLowerCase("id");
    const duplicate = heroId && ["blue", "red"].some((team) => ["bans", "picks"].some((draftKind) =>
      state[draftKind][team].some((id, slotIndex) => {
        if (draftKind === kind && team === side && slotIndex === Number(index)) return false;
        return getHero(id)?.hero.toLocaleLowerCase("id") === heroName;
      })
    ));
    if (duplicate) {
      select.value = "";
      state.storageMessage = "Hero yang sama tidak dapat dipilih lebih dari satu kali dalam draft.";
    }
    state[kind][side][Number(index)] = duplicate ? "" : heroId;
    const current = getCurrentAssistantHero();
    if (!current) state.assistantChoice = "";
    const focusId = select.id;
    renderSlots();
    document.getElementById(focusId)?.focus();
    renderAnalysis();
    renderHistory();
  }

  function saveCurrentDraft() {
    const heroNames = (items) => items.map(getHero).filter(Boolean).map((hero) => hero.hero);
    const nextHistory = [{
      mode: state.mode,
      firstPick: state.firstPick,
      banBlue: heroNames(state.bans.blue),
      banRed: heroNames(state.bans.red),
      pickBlue: heroNames(state.picks.blue),
      pickRed: heroNames(state.picks.red),
      timestamp: new Date().toISOString()
    }, ...state.history].slice(0, 10);
    if (persistHistory(nextHistory)) {
      state.history = nextHistory;
      state.storageMessage = "Draft history tersimpan lokal di browser ini.";
    }
    renderHistory();
  }

  document.querySelectorAll("[data-draft-mode]").forEach((button) => {
    button.addEventListener("click", () => {
      state.mode = button.dataset.draftMode;
      renderModes();
      renderSlots();
      renderAnalysis();
    });
    button.addEventListener("keydown", (event) => {
      if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
      event.preventDefault();
      const tabs = [...document.querySelectorAll("[data-draft-mode]")];
      const index = tabs.indexOf(button);
      const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1
        : (index + (event.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length;
      tabs[next].focus();
      tabs[next].click();
    });
  });

  document.getElementById("rankedDraftFormat").addEventListener("change", (event) => {
    state.rankedBans = Number(event.target.value);
    if (state.rankedBans === 3) {
      state.bans.blue.fill("", 3);
      state.bans.red.fill("", 3);
    }
    renderSlots();
    renderAnalysis();
  });
  document.getElementById("practiceDraftFormat").addEventListener("change", (event) => {
    state.practiceBans = Number(event.target.value);
    if (state.practiceBans === 3) {
      state.bans.blue.fill("", 3);
      state.bans.red.fill("", 3);
    }
    renderSlots();
    renderAnalysis();
  });
  document.querySelectorAll("[data-first-pick]").forEach((button) => button.addEventListener("click", () => {
    state.firstPick = button.dataset.firstPick;
    renderFirstPick();
    renderSlots();
  }));
  document.getElementById("draftBoard").addEventListener("change", handleBoardChange);
  document.getElementById("analysisSide").addEventListener("change", (event) => {
    state.analysisSide = event.target.value;
    state.assistantChoice = "";
    renderAnalysis();
  });
  document.getElementById("assistantPick").addEventListener("change", (event) => {
    state.assistantChoice = event.target.value;
    renderAssistant();
  });
  document.getElementById("resetDraft").addEventListener("click", () => {
    state.bans = { blue: Array(5).fill(""), red: Array(5).fill("") };
    state.picks = { blue: Array(5).fill(""), red: Array(5).fill("") };
    state.assistantChoice = "";
    state.storageMessage = "Draft saat ini direset. Riwayat lokal tetap tersimpan.";
    render();
  });
  document.getElementById("saveDraft").addEventListener("click", saveCurrentDraft);
  document.getElementById("clearDraftHistory").addEventListener("click", () => {
    try {
      localStorage.removeItem(historyStorageKey);
      state.history = [];
      state.storageMessage = "Draft history lokal telah dihapus.";
    } catch (error) {
      state.storageMessage = `Draft history tidak dapat dihapus: ${error.message}`;
    }
    renderHistory();
  });

  loadHistory();
  render();
  window.renderDraftLab = render;
})();
