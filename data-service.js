(function () {
  "use strict";

  // Deployments can provide public snapshot endpoint URLs through NOXX127_DATA_SOURCES before this script loads.
  const cacheStorageKey = "noxx127-live-data-v1";
  const calculatorStorageKey = "noxx127-wr-calculator-v1";
  const metaRoles = ["jungle", "roam", "exp", "gold", "mid"];
  const snapshots = window.NOXX127_VERIFIED_SNAPSHOTS || { meta: null, tournament: null };
  const cache = {
    meta: snapshots.meta ? normalizeMeta(snapshots.meta) : null,
    tournament: snapshots.tournament ? normalizeTournament(snapshots.tournament) : null,
    lastUpdated: {
      meta: snapshots.meta?.updatedAt || null,
      tournament: snapshots.tournament?.updatedAt || null
    },
    warning: ""
  };

  function readCache() {
    try {
      const saved = JSON.parse(localStorage.getItem(cacheStorageKey) || "{}");
      for (const type of ["meta", "tournament"]) {
        if (!saved[type] || !saved[type].data) continue;
        const data = type === "meta" ? normalizeMeta(saved[type].data) : normalizeTournament(saved[type].data);
        if (data) {
          cache[type] = data;
          cache.lastUpdated[type] = validUpdatedAt(saved.lastUpdated?.[type]) ? saved.lastUpdated[type] : data.updatedAt;
        }
      }
    } catch (error) {
      cache.warning = `Cache lokal tidak dapat dibaca: ${error.message}`;
    }
  }

  function validSource(source) {
    if (!source || typeof source.name !== "string" || !source.name.trim()) return false;
    if (source.url === undefined || source.url === null || source.url === "") return true;
    try {
      return new URL(source.url).protocol === "https:";
    } catch {
      return false;
    }
  }

  function validUpdatedAt(value) {
    return typeof value === "string" && Number.isFinite(Date.parse(value));
  }

  function normalizePercent(value) {
    return typeof value === "number" && Number.isFinite(value) && value >= 0 && value <= 100 ? value : null;
  }

  function normalizeMeta(data) {
    if (!data || typeof data !== "object" || !validSource(data.source) || !validUpdatedAt(data.updatedAt) || !data.roles || typeof data.roles !== "object") return null;
    const roles = {};
    for (const role of metaRoles) {
      if (!Array.isArray(data.roles[role])) return null;
      roles[role] = data.roles[role].filter((hero) => hero && typeof hero.hero === "string" && hero.hero.trim() && typeof hero.tier === "string" && hero.tier.trim()).map((hero) => ({
        hero: hero.hero.trim(),
        role: optionalText(hero.role),
        tier: ["S", "A", "B"].includes(hero.tier.trim().toUpperCase()) ? `${hero.tier.trim().toUpperCase()}-TIER` : hero.tier.trim().toUpperCase(),
        winRate: normalizePercent(hero.winRate),
        pickRate: normalizePercent(hero.pickRate),
        banRate: normalizePercent(hero.banRate),
        recommendation: optionalText(hero.recommendation)
      }));
    }
    return {
      status: data.status === "source-fetched" ? "source-fetched" : "verified-snapshot",
      updatedAt: data.updatedAt,
      fetchedAt: validUpdatedAt(data.fetchedAt) ? data.fetchedAt : null,
      season: optionalText(data.season),
      patch: optionalText(data.patch),
      heroCount: safeCount(data.heroCount),
      source: { name: data.source.name.trim(), url: data.source.url || null },
      roles
    };
  }

  function optionalText(value) {
    return typeof value === "string" && value.trim() ? value.trim() : null;
  }

  function safeCount(value) {
    return Number.isSafeInteger(value) && value >= 0 ? value : null;
  }

  function normalizeTournament(data) {
    if (!data || typeof data !== "object" || !validSource(data.source) || !validUpdatedAt(data.updatedAt) || typeof data.tournament !== "string" || !data.tournament.trim() || !Array.isArray(data.standings) || !Array.isArray(data.matches)) return null;
    const standings = data.standings.filter((row) => row && typeof row.team === "string" && row.team.trim()).map((row) => ({
      rank: safeCount(row.rank),
      team: row.team.trim(),
      matchW: safeCount(row.matchW),
      matchL: safeCount(row.matchL),
      gameW: safeCount(row.gameW),
      gameL: safeCount(row.gameL),
      points: typeof row.points === "number" && Number.isFinite(row.points) ? row.points : null
    }));
    const normalizeMatch = (match) => match && typeof match.teamA === "string" && match.teamA.trim() && typeof match.teamB === "string" && match.teamB.trim() && ["UPCOMING", "COMPLETED"].includes(match.status) ? ({
      teamA: match.teamA.trim(),
      teamB: match.teamB.trim(),
      status: match.status,
      date: optionalText(match.date),
      time: optionalText(match.time),
      scoreA: safeCount(match.scoreA),
      scoreB: safeCount(match.scoreB)
    }) : null;
    const matches = data.matches.map(normalizeMatch).filter(Boolean);
    const completedMatches = Array.isArray(data.completedMatches) ? data.completedMatches.map(normalizeMatch).filter(Boolean) : matches.filter((match) => match.status === "COMPLETED");
    return {
      status: data.status === "source-fetched" ? "source-fetched" : "verified-snapshot",
      updatedAt: data.updatedAt,
      fetchedAt: validUpdatedAt(data.fetchedAt) ? data.fetchedAt : null,
      source: { name: data.source.name.trim(), url: data.source.url || null },
      tournament: data.tournament.trim(),
      season: optionalText(data.season),
      competitionStatus: optionalText(data.competitionStatus),
      standings,
      matches,
      completedMatches,
      completedStatus: data.completedStatus === "source-fetched" ? "source-fetched" : (data.completedStatus === "unavailable" ? "unavailable" : "verified-snapshot"),
      completedWarning: optionalText(data.completedWarning),
      playoff: optionalText(data.playoff),
      stats: data.stats && typeof data.stats === "object" && !Array.isArray(data.stats) ? data.stats : null
    };
  }

  function persistCache() {
    try {
      localStorage.setItem(cacheStorageKey, JSON.stringify({
        meta: cache.meta ? { data: cache.meta, lastUpdated: cache.lastUpdated.meta } : null,
        tournament: cache.tournament ? { data: cache.tournament, lastUpdated: cache.lastUpdated.tournament } : null,
        lastUpdated: cache.lastUpdated
      }));
      return true;
    } catch (error) {
      cache.warning = `Cache lokal tidak dapat disimpan: ${error.message}`;
      return false;
    }
  }

  function configuredEndpoint(type) {
    const sources = window.NOXX127_DATA_SOURCES;
    const endpoint = sources && sources[type] || `/api/${type}`;
    const url = new URL(endpoint, window.location.href);
    if (!["https:", "http:"].includes(url.protocol) || (window.location.protocol === "https:" && url.protocol !== "https:")) {
      throw new Error("Endpoint data harus menggunakan HTTPS.");
    }
    return url.href;
  }

  async function requestSnapshot(type) {
    const endpoint = configuredEndpoint(type);
    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 12000);
    try {
      const response = await fetch(endpoint, {
        headers: { Accept: "application/json" },
        credentials: "omit",
        cache: "no-store",
        signal: controller.signal
      });
      if (!response.ok) throw new Error(`Sumber data merespons HTTP ${response.status}.`);
      const payload = await response.json();
      const normalized = type === "meta" ? normalizeMeta(payload) : normalizeTournament(payload);
      if (!normalized) throw new Error("Format snapshot atau metadata sumber tidak valid.");
      cache[type] = normalized;
      cache.lastUpdated[type] = normalized.updatedAt;
      const saved = persistCache();
      return { data: normalized, saved, warning: cache.warning };
    } finally {
      window.clearTimeout(timeout);
    }
  }

  function formatWR(matches, wins) {
    if (!Number.isSafeInteger(matches) || !Number.isSafeInteger(wins) || matches < 0 || wins < 0 || wins > matches) return "N/A";
    return matches === 0 ? "N/A" : `${(wins / matches * 100).toFixed(2)}%`;
  }

  function calculateWR(matchCount, winCount, targetPercent) {
    const matches = Number(matchCount);
    const wins = Number(winCount);
    const target = Number(targetPercent);
    if (!Number.isSafeInteger(matches) || !Number.isSafeInteger(wins) || !Number.isFinite(target) || matches < 0 || wins < 0 || wins > matches || target < 0 || target > 100) {
      return { valid: false, current: null, target, gap: null, required: null, achieved: false, message: "Input tidak valid. Match dan win harus bilangan bulat aman, Win tidak boleh melebihi Match, dan Target harus 0–100%." };
    }

    const current = matches === 0 ? null : wins / matches * 100;
    const achieved = current !== null && current >= target;
    const gap = current === null ? null : Math.max(0, target - current);
    if (achieved) return { valid: true, current, target, gap, required: 0, achieved: true, message: "🟢 TARGET TERCAPAI — Target WR kamu sudah tercapai." };

    if (matches === 0) {
      const required = target === 0 ? 0 : 1;
      return { valid: true, current: null, target, gap: null, required, achieved: false, message: `WR Saat Ini: N/A. ${required === 0 ? "Target 0% tidak memerlukan kemenangan tambahan." : `Perlu ${required} kemenangan${required === 1 ? "" : " berturut-turut"} untuk mencapai target ${target}%.`}` };
    }
    if (target === 100) {
      return { valid: true, current, target, gap, required: null, achieved: false, message: "Target 100% tidak dapat dicapai setelah tercatat kekalahan." };
    }

    let required = Math.max(0, Math.ceil((target * matches - 100 * wins) / (100 - target)));
    while (required < Number.MAX_SAFE_INTEGER && (wins + required) / (matches + required) * 100 < target) required += 1;
    while (required > 0 && (wins + required - 1) / (matches + required - 1) * 100 >= target) required -= 1;
    if (!Number.isSafeInteger(required) || !Number.isSafeInteger(matches + required) || !Number.isSafeInteger(wins + required)) {
      return { valid: true, current, target, gap, required: null, achieved: false, message: "Jumlah match terlalu besar untuk dihitung dengan aman." };
    }
    return { valid: true, current, target, gap, required, achieved: false, message: `Perlu ${required} kemenangan berturut-turut untuk mencapai ${target}%.` };
  }

  function loadCalculator() {
    try {
      const saved = JSON.parse(localStorage.getItem(calculatorStorageKey) || "{}");
      const matches = saved.currentMatch ?? saved.totalMatch ?? 0;
      const wins = saved.currentWin ?? saved.totalWin ?? 0;
      const target = saved.targetWR ?? 65;
      const result = calculateWR(matches, wins, target);
      return result.valid ? { currentMatch: Number(matches), currentWin: Number(wins), targetWR: Number(target) } : { currentMatch: 0, currentWin: 0, targetWR: 65 };
    } catch (error) {
      return { currentMatch: 0, currentWin: 0, targetWR: 65, warning: `Data WR lokal tidak dapat dibaca: ${error.message}` };
    }
  }

  function saveCalculator(currentMatch, currentWin, targetWR) {
    try {
      localStorage.setItem(calculatorStorageKey, JSON.stringify({ currentMatch, currentWin, targetWR }));
      return { saved: true };
    } catch (error) {
      return { saved: false, error: `Data WR tidak dapat disimpan: ${error.message}` };
    }
  }

  readCache();
  if (cache.meta || cache.tournament) persistCache();
  window.NoxxDataService = {
    cache,
    getCached: (type) => cache[type],
    getLastUpdated: (type) => cache.lastUpdated[type],
    fetchMetaData: () => requestSnapshot("meta"),
    fetchTournamentData: () => requestSnapshot("tournament"),
    formatWR,
    calculateWR,
    loadCalculator,
    saveCalculator
  };
})();
