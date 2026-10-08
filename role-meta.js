(function () {
  "use strict";

  const roleMeta = Object.freeze({
    Tank: Object.freeze({
      label: "Tank",
      accessibleLabel: "Tank role",
      icon: '<path d="M12 2.8 20 5.7v5.7c0 4.5-3.1 8-8 10.1-4.9-2.1-8-5.6-8-10.1V5.7l8-2.9Z"/><path d="M8 10.2h8M9.2 13.4h5.6"/>'
    }),
    Fighter: Object.freeze({
      label: "Fighter",
      accessibleLabel: "Fighter role",
      icon: '<path d="m4 3 7.2 7.2m-4.9-7L4 6l3.1 2.3m-.8-.8L4 10.1m16-7-7.2 7.2m4.9-7L20 6l-3.1 2.3m.8-.8 2.3 2.6M8.2 12.8l3 3m4.6-3-3 3M4.8 20l5.1-5.1m9.3 5.1-5.1-5.1"/>'
    }),
    Assassin: Object.freeze({
      label: "Assassin",
      accessibleLabel: "Assassin role",
      icon: '<path d="M12 3c-4.2 0-7.2 3-7.2 7.2 0 4.3 2.8 8.1 7.2 10.8 4.4-2.7 7.2-6.5 7.2-10.8C19.2 6 16.2 3 12 3Z"/><path d="M7.4 10.8h3.3m2.6 0h3.3M10.7 10.8l1.3 1.4 1.3-1.4M9 15.2h6"/>'
    }),
    Mage: Object.freeze({
      label: "Mage",
      accessibleLabel: "Mage role",
      icon: '<path d="M12 2.8 14 8l5.2 2-5.2 2-2 5.2-2-5.2-5.2-2L10 8l2-5.2Z"/><path d="M12 17.2v4m-2 0h4M4 4l1.4 1.4M20 4l-1.4 1.4"/>'
    }),
    Marksman: Object.freeze({
      label: "Marksman",
      accessibleLabel: "Marksman role",
      icon: '<path d="M5 3.5c8 3 8 14 0 17M5 3.5v17M7 12h14m-4-4 4 4-4 4M7 12l-2-2m2 2-2 2"/>'
    }),
    Support: Object.freeze({
      label: "Support",
      accessibleLabel: "Support role",
      icon: '<path d="M3.2 13.2c2.4-.6 4.1-.1 5.4 1.1l2.1 2h4.8c1.2 0 2.1-.9 2.1-2.1v-.4h1.1c1.2 0 2.1.9 2.1 2.1v1.2l-5.1 3.1H9.5l-5-3.1c-1-.6-1.4-1.7-1.3-3.9Z"/><path d="M12 3.1v6m-3-3h6"/>'
    })
  });
  const positionIcon = '<path d="M12 21s7-6.2 7-12a7 7 0 1 0-14 0c0 5.8 7 12 7 12Z"/><circle cx="12" cy="9" r="2.3"/>';

  function escapeHTML(value) {
    return String(value).replace(/[&<>"']/g, (character) => ({
      "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
    })[character]);
  }

  function normalize(label) {
    if (typeof label !== "string") return null;
    const key = label.trim().toLocaleLowerCase("en");
    return Object.values(roleMeta).find((role) => role.label.toLocaleLowerCase("en") === key) || null;
  }

  function forHero(heroName, fallbackLabel) {
    const roles = window.NOXX127_HERO_ROLE_BY_NAME || {};
    const heroRole = typeof heroName === "string" ? roles[heroName.trim().toLocaleLowerCase("en")] : null;
    return normalize(heroRole) || normalize(fallbackLabel);
  }

  function renderIcon(role, heroName) {
    const meta = forHero(heroName, role);
    const path = meta ? meta.icon : positionIcon;
    const key = meta ? meta.label.toLocaleLowerCase("en") : "position";
    return `<svg class="role-icon" data-role-icon="${key}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${path}</svg>`;
  }

  function renderIdentity(label, heroName, className = "") {
    const meta = forHero(heroName, label);
    const explicitRole = normalize(label);
    const identity = meta && !explicitRole && label ? `${meta.label} · ${label}` : (label || meta?.label || "Role belum tersedia");
    const roleLabel = meta
      ? `${meta.accessibleLabel}${!explicitRole && label ? `; sumber mencantumkan ${label}` : ""}`
      : `Role atau posisi: ${identity}`;
    const classes = ["role-identity", className].filter(Boolean).map(escapeHTML).join(" ");
    return `<span class="${classes}" aria-label="${escapeHTML(roleLabel)}">${renderIcon(label, heroName)}<span>${escapeHTML(identity)}</span></span>`;
  }

  window.NoxxRoleMeta = Object.freeze({
    entries: Object.freeze(Object.values(roleMeta)),
    get: normalize,
    forHero,
    renderIcon,
    renderIdentity
  });
})();
