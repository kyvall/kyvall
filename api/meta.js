"use strict";

const sourceUrl = "https://mlbbhub.com/tier-list";
const laneNames = { jungle: "Jungle", roam: "Roam", exp: "EXP Lane", gold: "Gold Lane", mid: "Mid Lane" };
const tierNames = [
  ["S", /S Must Ban\/Pick/i],
  ["A", /A Strong Picks/i],
  ["B", /B Solid Choices/i],
  ["C", /C Situational/i],
  ["D", /D Underperforming/i]
];

function decodeEntities(value) {
  return value
    .replace(/&amp;/g, "&")
    .replace(/&#x27;|&#39;|&apos;/gi, "'")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&nbsp;/g, " ");
}

function textContent(value) {
  return decodeEntities(value.replace(/<!--[\s\S]*?-->/g, " ").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim());
}

function percent(text, label) {
  const match = text.match(new RegExp(`${label}\\s*([0-9]+(?:\\.[0-9]+)?)\\s*%`, "i"));
  return match ? Number(match[1]) : null;
}

function handleError(response, error) {
  response.status(502).json({ error: error.message || "MLBBHub data could not be fetched." });
}

module.exports = async function handler(request, response) {
  if (request.method !== "GET") {
    response.setHeader("Allow", "GET");
    response.status(405).json({ error: "Method not allowed." });
    return;
  }

  try {
    const upstream = await fetch(sourceUrl, {
      headers: { "User-Agent": "NOXX127 Meta Data Proxy/1.0", Accept: "text/html" },
      signal: AbortSignal.timeout(15000),
      cache: "no-store"
    });
    if (!upstream.ok) throw new Error(`MLBBHub returned HTTP ${upstream.status}.`);
    const html = await upstream.text();
    if (!/Season 42/i.test(html) || !/Patch 2\.2\.16/i.test(html)) {
      throw new Error("MLBBHub no longer identifies this page as Season 42 / Patch 2.2.16.");
    }

    const meta = textContent((html.match(/<main\b[\s\S]*?<\/main>/i) || [html])[0]);
    const freshness = meta.match(/Updated\s+(October\s+\d{1,2},\s+2026)/i);
    const heroTotal = meta.match(/\b(133)\s+heroes\b/i);
    if (!freshness || !heroTotal) throw new Error("MLBBHub season, hero count, or update date could not be verified.");

    const roles = { jungle: [], roam: [], exp: [], gold: [], mid: [] };
    const seen = new Set();
    const tierSections = html.match(/<section\b[^>]*md:flex-row[^>]*>[\s\S]*?<\/section>/gi) || [];
    for (const section of tierSections) {
      const sectionText = textContent(section);
      const tier = tierNames.find(([, pattern]) => pattern.test(sectionText))?.[0];
      if (!tier) continue;

      const cards = section.match(/<a\b(?=[^>]*href="\/heroes\/)[^>]*>[\s\S]*?<\/a>/gi) || [];
      for (const card of cards) {
        const nameMatch = card.match(/<span\b[^>]*text-center[^>]*>([\s\S]*?)<\/span>/i);
        const laneMatch = card.match(/lane-icon-(jungle|roam|exp|gold|mid)\b/i);
        if (!nameMatch || !laneMatch) continue;
        const heroName = textContent(nameMatch[1]);
        const role = laneMatch[1].toLowerCase();
        const key = `${heroName.toLowerCase()}-${role}`;
        if (seen.has(key)) continue;
        seen.add(key);
        const cardText = textContent(card);
        roles[role].push({
          hero: heroName,
          role: laneNames[role],
          tier: `${tier}-TIER`,
          winRate: percent(cardText, "win rate"),
          pickRate: null,
          banRate: percent(cardText, "ban rate"),
          recommendation: `Prioritaskan ${laneNames[role]} dan sesuaikan pilihan dengan komposisi tim.`
        });
      }
    }
    if (seen.size < 120 || seen.size > Number(heroTotal[1])) {
      throw new Error(`MLBBHub returned an unexpected number of hero records (${seen.size}).`);
    }

    response.setHeader("Cache-Control", "no-store");
    response.status(200).json({
      status: "source-fetched",
      updatedAt: new Date(freshness[1]).toISOString().slice(0, 10),
      fetchedAt: new Date().toISOString(),
      season: "Season 42",
      patch: "2.2.16",
      heroCount: Number(heroTotal[1]),
      source: { name: "MLBBHub", url: sourceUrl },
      roles
    });
  } catch (error) {
    handleError(response, error);
  }
};
