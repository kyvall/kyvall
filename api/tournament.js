"use strict";

const sourceUrl = "https://id-mpl.com/";
const scheduleUrl = "https://id-mpl.com/schedule";
const monthNames = {
  Agt: "Agustus", Agu: "Agustus", Sep: "September", Okt: "Oktober",
  Nov: "November", Des: "Desember", Jan: "Januari", Feb: "Februari",
  Mar: "Maret", Apr: "April", Mei: "Mei", Jun: "Juni", Jul: "Juli"
};

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&apos;/gi, "'")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ");
}

function textContent(value) {
  return decodeEntities(value.replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function parseRecord(value) {
  const match = textContent(value).match(/(\d+)\s*-\s*(\d+)/);
  return match ? [Number(match[1]), Number(match[2])] : [null, null];
}

function parseStandings(html) {
  const table = html.match(/<table\b[^>]*class="[^"]*table-standings[^"]*"[^>]*>[\s\S]*?<\/table>/i);
  if (!table) throw new Error("Official MPL standings table was not found.");
  const rows = table[0].match(/<tr\b[^>]*>[\s\S]*?<\/tr>/gi) || [];
  const standings = [];
  for (const row of rows) {
    const cells = row.match(/<td\b[^>]*>[\s\S]*?<\/td>/gi) || [];
    if (cells.length < 5) continue;
    const team = cells[0].match(/<img\b[^>]*alt="([^"]+)"/i)?.[1];
    const rank = cells[0].match(/team-rank[^>]*>([\s\S]*?)<\/div>/i)?.[1];
    if (!team || !rank) continue;
    const [matchW, matchL] = parseRecord(cells[2]);
    const [gameW, gameL] = parseRecord(cells[4]);
    standings.push({
      rank: Number(textContent(rank)),
      team: decodeEntities(team),
      matchW,
      matchL,
      gameW,
      gameL,
      points: Number(textContent(cells[1]))
    });
  }
  if (standings.length < 8) throw new Error(`Official MPL standings returned only ${standings.length} teams.`);
  return standings;
}

function upcomingMatches(html) {
  const starts = [...html.matchAll(/<div\b[^>]*class="[^"]*\bouter-next-match\b[^"]*"[^>]*>/gi)];
  const matches = [];
  const now = Date.now();
  for (let index = 0; index < starts.length; index += 1) {
    const start = starts[index].index;
    const end = starts[index + 1]?.index ?? Math.min(html.length, start + 8000);
    const card = html.slice(start, end);
    const teams = [...card.matchAll(/<img\b[^>]*alt="([^"]+)"/gi)].map((match) => decodeEntities(match[1]));
    const dateMarkup = card.match(/<div\b[^>]*class="[^"]*\bdate\b[^"]*"[^>]*>([\s\S]*?)<\/div>/i)?.[1] || "";
    const dateTime = textContent(dateMarkup).match(/(\d{1,2})\s+([A-Za-z]{3})\s*[·,]?\s*(\d{1,2}:\d{2})/);
    if (teams.length < 2 || !dateTime || teams[0] === "TBD" || teams[1] === "TBD") continue;
    const [day, month, time] = dateTime.slice(1);
    const monthName = monthNames[month];
    if (!monthName) continue;
    const date = `${day} ${monthName} 2026`;
    const [hour, minute] = time.split(":").map(Number);
    const monthIndex = Object.entries(monthNames).find(([, name]) => name === monthName)?.[0];
    const monthNumber = { Januari: 1, Februari: 2, Maret: 3, April: 4, Mei: 5, Juni: 6, Juli: 7, Agustus: 8, September: 9, Oktober: 10, November: 11, Desember: 12 }[monthName];
    const startsAt = Date.UTC(2026, monthNumber - 1, Number(day), hour - 7, minute);
    if (!monthIndex || startsAt < now) continue;
    matches.push({ teamA: teams[0], teamB: teams[1], status: "UPCOMING", date, time: `${time} WIB` });
  }
  return matches;
}

function completedMatches(html) {
  const starts = [...html.matchAll(/<div\b[^>]*class="[^"]*\bmatch\b[^"]*\bposition-relative\b[^"]*"[^>]*>/gi)];
  const monthNumbers = { Jan: 1, Feb: 2, Mar: 3, Apr: 4, Mei: 5, Jun: 6, Jul: 7, Agt: 8, Agu: 8, Sep: 9, Okt: 10, Nov: 11, Des: 12 };
  const matches = new Map();
  const now = Date.now();
  for (let index = 0; index < starts.length; index += 1) {
    const start = starts[index].index;
    const end = starts[index + 1]?.index ?? Math.min(html.length, start + 8000);
    const card = html.slice(start, end);
    if (!/\bREPLAY\b/i.test(textContent(card))) continue;
    const teams = [...card.matchAll(/<img\b[^>]*alt="([^"]+)"/gi)].map((match) => decodeEntities(match[1]));
    const scoreMatches = [...card.matchAll(/<[^>]*class="[^"]*\bscore\b[^"]*"[^>]*>([\s\S]*?)<\/[^>]+>/gi)];
    const scores = scoreMatches.map((match) => Number(textContent(match[1]))).filter(Number.isSafeInteger);
    const gameDate = textContent(card).match(/VS\s*(\d{1,2})\s+([A-Za-z]{3})\s*[|·,]?\s*(\d{1,2}:\d{2})/);
    if (teams.length < 2 || scores.length < 2 || !gameDate) continue;
    const [, dayText, monthAbbr, time] = gameDate;
    const month = monthNumbers[monthAbbr];
    if (!month) continue;
    const [hour, minute] = time.split(":").map(Number);
    const startsAt = Date.UTC(2026, month - 1, Number(dayText), hour - 7, minute);
    if (startsAt > now) continue;
    const key = `${dayText}-${month}-${time}-${teams[0]}-${teams[1]}`;
    const monthName = monthNames[monthAbbr];
    matches.set(key, {
      teamA: teams[0],
      teamB: teams[1],
      status: "COMPLETED",
      date: `${dayText} ${monthName} 2026`,
      time: `${time} WIB`,
      scoreA: scores[0],
      scoreB: scores[1],
      startsAt
    });
  }
  return [...matches.values()]
    .sort((left, right) => right.startsAt - left.startsAt)
    .slice(0, 10)
    .map(({ startsAt, ...match }) => match);
}

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    const upstream = await fetch(sourceUrl, {
      headers: { "User-Agent": "NOXX127 Tournament Data Proxy/1.0", Accept: "text/html" },
      signal: AbortSignal.timeout(15000),
      cache: "no-store"
    });
    if (!upstream.ok) throw new Error(`Official MPL returned HTTP ${upstream.status}.`);
    const html = await upstream.text();
    const title = textContent((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || "");
    if (!/MPL Indonesia Season 18/i.test(title)) throw new Error("Official MPL page did not verify Season 18.");
    const standings = parseStandings(html);
    const matches = upcomingMatches(html);
    let completed = [];
    let completedStatus = "unavailable";
    let completedWarning = "Official completed match records were not available.";
    try {
      const scheduleResponse = await fetch(scheduleUrl, {
        headers: { "User-Agent": "NOXX127 Tournament Data Proxy/1.0", Accept: "text/html" },
        signal: AbortSignal.timeout(15000),
        cache: "no-store"
      });
      if (!scheduleResponse.ok) throw new Error(`Official MPL schedule returned HTTP ${scheduleResponse.status}.`);
      completed = completedMatches(await scheduleResponse.text());
      completedStatus = "source-fetched";
      completedWarning = "";
    } catch (error) {
      completedWarning = error.message || completedWarning;
    }

    response.setHeader("Cache-Control", "no-store");
    response.status(200).json({
      status: "source-fetched",
      updatedAt: new Date().toISOString(),
      fetchedAt: new Date().toISOString(),
      source: { name: "MPL Indonesia", url: sourceUrl },
      tournament: "MPL Indonesia",
      season: "Season 18",
      competitionStatus: "Regular Season",
      standings,
      matches,
      completedMatches: completed,
      completedStatus,
      completedWarning,
      playoff: null,
      stats: null
    });
  } catch (error) {
    response.status(502).json({ error: error.message || "Official MPL data could not be fetched." });
  }
};
