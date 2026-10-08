(function () {
  "use strict";

  const hero = (name, role, tier, winRate, banRate) => ({
    hero: name,
    role,
    tier: `${tier}-TIER`,
    winRate,
    pickRate: null,
    banRate,
    recommendation: `Prioritaskan ${role} dan sesuaikan pilihan dengan komposisi tim.`
  });

  window.NOXX127_VERIFIED_SNAPSHOTS = {
    meta: {
      status: "verified-snapshot",
      updatedAt: "2026-10-08",
      fetchedAt: null,
      season: "Season 42",
      patch: "2.2.16",
      heroCount: 133,
      source: { name: "MLBBHub", url: "https://mlbbhub.com/tier-list" },
      roles: {
        jungle: [
          hero("Aulus", "Jungle", "S", 59.67, 23.73),
          hero("Hirara", "Jungle", "S", 53.38, 67.03),
          hero("Popol and Kupa", "Jungle", "A", 54.28, null),
          hero("Ling", "Jungle", "A", 52.38, null)
        ],
        roam: [
          hero("Rafaela", "Roam", "S", 59.32, 17.21),
          hero("Marcel", "Roam", "S", 58.04, 32.97),
          hero("Minotaur", "Roam", "S", 54.99, null),
          hero("Khufra", "Roam", "S", 54.58, null),
          hero("Floryn", "Roam", "S", 54.15, null),
          hero("Carmilla", "Roam", "S", 53.73, null),
          hero("Gloo", "Roam", "S", 53.93, 38.97),
          hero("Lolita", "Roam", "A", 53.96, null),
          hero("Diggie", "Roam", "A", 53.35, null),
          hero("Estes", "Roam", "A", 52.94, 38.87),
          hero("Belerick", "Roam", "A", 52.26, 56.34),
          hero("Atlas", "Roam", "A", 51.81, null)
        ],
        exp: [
          hero("Masha", "EXP Lane", "S", 59.34, 29.5),
          hero("Argus", "EXP Lane", "S", 55.67, null),
          hero("Lukas", "EXP Lane", "A", 52.89, 31.66),
          hero("Edith", "EXP Lane", "A", 52.72, null),
          hero("Benedetta", "EXP Lane", "A", 52.39, null),
          hero("Sun", "EXP Lane", "A", 52.28, 20.34),
          hero("Barats", "EXP Lane", "A", 51.93, null),
          hero("Guinevere", "EXP Lane", "A", 51.37, null)
        ],
        gold: [
          hero("Obsidia", "Gold Lane", "S", 53.54, null),
          hero("Bruno", "Gold Lane", "A", 53.02, null),
          hero("Irithel", "Gold Lane", "A", 52.3, null),
          hero("Hanabi", "Gold Lane", "A", 52.01, null)
        ],
        mid: [
          hero("Valir", "Mid Lane", "A", 53.51, null),
          hero("Gord", "Mid Lane", "A", 52.88, null),
          hero("Zhask", "Mid Lane", "A", 52.19, null),
          hero("Kagura", "Mid Lane", "A", 51.95, null),
          hero("Kadita", "Mid Lane", "A", 51.54, null),
          hero("Eudora", "Mid Lane", "A", 51.27, 58.97)
        ]
      }
    },
    tournament: {
      status: "verified-snapshot",
      updatedAt: "2026-10-08T17:46:21.841Z",
      fetchedAt: "2026-10-08T17:46:21.841Z",
      source: { name: "MPL Indonesia", url: "https://id-mpl.com/" },
      tournament: "MPL Indonesia",
      season: "Season 18",
      competitionStatus: "Regular Season",
      standings: [
        { rank: 1, team: "NAVI", matchW: 10, matchL: 3, gameW: 21, gameL: 9, points: 10 },
        { rank: 2, team: "TLID", matchW: 10, matchL: 4, gameW: 22, gameL: 11, points: 10 },
        { rank: 3, team: "AE", matchW: 9, matchL: 5, gameW: 20, gameL: 11, points: 9 },
        { rank: 4, team: "BTR", matchW: 7, matchL: 6, gameW: 15, gameL: 17, points: 7 },
        { rank: 5, team: "EVOS", matchW: 6, matchL: 6, gameW: 14, gameL: 15, points: 6 },
        { rank: 6, team: "ONIC", matchW: 5, matchL: 7, gameW: 14, gameL: 15, points: 5 },
        { rank: 7, team: "DEWA", matchW: 5, matchL: 8, gameW: 13, gameL: 19, points: 5 },
        { rank: 8, team: "RRQ", matchW: 3, matchL: 9, gameW: 10, gameL: 20, points: 3 },
        { rank: 9, team: "GEEK", matchW: 3, matchL: 10, gameW: 10, gameL: 22, points: 3 }
      ],
      matches: [
        { teamA: "EVOS", teamB: "ONIC", status: "UPCOMING", date: "9 Oktober 2026", time: "14:00 WIB" },
        { teamA: "RRQ", teamB: "TLID", status: "UPCOMING", date: "9 Oktober 2026", time: "17:00 WIB" },
        { teamA: "DEWA", teamB: "NAVI", status: "UPCOMING", date: "9 Oktober 2026", time: "20:00 WIB" },
        { teamA: "EVOS", teamB: "GEEK", status: "UPCOMING", date: "11 Oktober 2026", time: "14:00 WIB" },
        { teamA: "RRQ", teamB: "ONIC", status: "UPCOMING", date: "11 Oktober 2026", time: "17:00 WIB" },
        { teamA: "DEWA", teamB: "BTR", status: "UPCOMING", date: "11 Oktober 2026", time: "20:00 WIB" }
      ],
      completedMatches: [
        { teamA: "NAVI", teamB: "TLID", status: "COMPLETED", date: "8 Oktober 2026", time: "20:00 WIB", scoreA: 2, scoreB: 0 },
        { teamA: "AE", teamB: "BTR", status: "COMPLETED", date: "8 Oktober 2026", time: "17:00 WIB", scoreA: 2, scoreB: 0 },
        { teamA: "EVOS", teamB: "DEWA", status: "COMPLETED", date: "8 Oktober 2026", time: "14:00 WIB", scoreA: 2, scoreB: 1 },
        { teamA: "ONIC", teamB: "NAVI", status: "COMPLETED", date: "4 Oktober 2026", time: "20:00 WIB", scoreA: 2, scoreB: 1 },
        { teamA: "RRQ", teamB: "EVOS", status: "COMPLETED", date: "4 Oktober 2026", time: "17:00 WIB", scoreA: 2, scoreB: 1 },
        { teamA: "AE", teamB: "TLID", status: "COMPLETED", date: "4 Oktober 2026", time: "14:00 WIB", scoreA: 0, scoreB: 2 },
        { teamA: "GEEK", teamB: "DEWA", status: "COMPLETED", date: "3 Oktober 2026", time: "20:00 WIB", scoreA: 2, scoreB: 1 },
        { teamA: "BTR", teamB: "RRQ", status: "COMPLETED", date: "3 Oktober 2026", time: "17:00 WIB", scoreA: 2, scoreB: 1 },
        { teamA: "AE", teamB: "NAVI", status: "COMPLETED", date: "3 Oktober 2026", time: "14:00 WIB", scoreA: 1, scoreB: 2 },
        { teamA: "DEWA", teamB: "TLID", status: "COMPLETED", date: "2 Oktober 2026", time: "18:00 WIB", scoreA: 2, scoreB: 1 }
      ],
      completedStatus: "verified-snapshot",
      completedWarning: "",
      playoff: null,
      stats: null
    }
  };
})();
