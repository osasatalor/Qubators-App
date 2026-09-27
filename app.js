/* Scent Atlas MVP — vanilla SPA. No dependencies. */
(function () {
  const view = document.getElementById("view");
  const savedCountEl = document.getElementById("savedCount");
  const compareCountEl = document.getElementById("compareCount");
  const LS_SAVED = "scentAtlas.saved.v1";
  const LS_COMPARE = "scentAtlas.compare.v1";

  const state = {
    saved: new Set(load(LS_SAVED, [])),
    compare: load(LS_COMPARE, []),
    search: { q: "", notes: [], family: [], season: [], time_of_day: [], occasion: [], mood: [], style: [], gender: [], sort: "best" },
  };

  function load(k, fallback) {
    try { return JSON.parse(localStorage.getItem(k)) ?? fallback; } catch { return fallback; }
  }
  function persist() {
    localStorage.setItem(LS_SAVED, JSON.stringify([...state.saved]));
    localStorage.setItem(LS_COMPARE, JSON.stringify(state.compare));
    updateBadges();
  }
  function updateBadges() {
    savedCountEl.hidden = state.saved.size === 0;
    savedCountEl.textContent = state.saved.size;
    compareCountEl.hidden = state.compare.length === 0;
    compareCountEl.textContent = state.compare.length;
    document.querySelectorAll("[data-nav]").forEach(a => {
      a.classList.toggle("active", ("#/" + a.dataset.nav) === location.hash.split("?")[0] || (a.dataset.nav === "discover" && (location.hash === "" || location.hash === "#/")));
    });
  }

  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const byId = id => FRAGRANCES.find(f => f.id === id);
  const initials = f => f.name.split(/[\s']+/).map(w => w[0]).slice(0, 2).join("").toUpperCase();
  const art = (f, cls = "") => `<div class="art ${cls}" style="background:linear-gradient(135deg,hsl(${f.hue} 30% 22%),hsl(${f.hue} 45% 45%))" aria-hidden="true">${esc(initials(f))}</div>`;
  const allNotes = f => [...f.top_notes, ...f.heart_notes, ...f.base_notes];
  const uniq = arr => [...new Set(arr)].sort((a, b) => a.localeCompare(b));
  const POPULAR_NOTES = ["Vanilla", "Musk", "Sandalwood", "Rose", "Jasmine", "Bergamot", "Oud", "Amber", "Patchouli", "Citrus", "Pear", "Coffee", "Lavender", "Cedar"];
  const FAMILIES = ["Floral", "Woody", "Oriental/Amber", "Fresh", "Gourmand", "Chypre", "Fougère"];

  function facet(field) { return uniq(FRAGRANCES.flatMap(f => f[field] || [])); }

  function toggleSave(id) {
    state.saved.has(id) ? state.saved.delete(id) : state.saved.add(id);
    persist(); rerender();
  }
  function toggleCompare(id) {
    const i = state.compare.indexOf(id);
    if (i >= 0) state.compare.splice(i, 1);
    else {
      if (state.compare.length >= 4) { alert("Compare up to 4 fragrances. Remove one first."); return; }
      state.compare.push(id);
    }
    persist(); rerender();
  }

  // ---- Search & scoring (PRD §10): strict filters + ranked note/text match ----
  function searchFragrances(s) {
    const terms = s.q.toLowerCase().split(/\s+/).filter(Boolean);
    const groups = ["family", "season", "time_of_day", "occasion", "mood", "style", "gender"];
    const results = [];
    for (const f of FRAGRANCES) {
      // strict AND-across-groups filtering
      let pass = true;
      for (const g of groups) {
        const sel = s[g] || [];
        if (!sel.length) continue;
        const vals = g === "family" || g === "gender" ? [f[g]] : (f[g] || []);
        if (!sel.some(v => vals.includes(v))) { pass = false; break; }
      }
      if (!pass) continue;
      const notes = allNotes(f).map(n => n.toLowerCase());
      const noteHits = (s.notes || []).filter(n => notes.some(x => x.includes(n.toLowerCase()) || n.toLowerCase().includes(x)));
      if ((s.notes || []).length && noteHits.length === 0) continue;

      let score = noteHits.length * 10;
      let reasons = noteHits.map(n => n);
      // text query scoring
      const hay = { name: f.name.toLowerCase(), brand: f.brand.toLowerCase(), notes: notes.join(" "), accords: (f.accords || []).join(" ").toLowerCase(), ctx: [...(f.mood || []), ...(f.occasion || []), ...(f.style || []), f.family].join(" ").toLowerCase() };
      for (const t of terms) {
        if (hay.name.includes(t)) { score += 8; reasons.push(`matches “${t}”`); }
        else if (hay.brand.includes(t)) { score += 5; reasons.push(`by ${f.brand}`); }
        else if (hay.notes.includes(t)) { score += 4; reasons.push(t); }
        else if (hay.accords.includes(t) || hay.ctx.includes(t)) { score += 3; reasons.push(t); }
        else { score -= 2; }
      }
      if (terms.length && score <= 0 && noteHits.length === 0) continue;
      // context bonus for active filters
      for (const g of groups) for (const v of (s[g] || [])) { score += 2; reasons.push(v); }
      results.push({ f, score, noteHits, reasons: [...new Set(reasons)].slice(0, 4) });
    }
    const sort = s.sort || "best";
    results.sort((a, b) =>
      sort === "name" ? a.f.name.localeCompare(b.f.name) :
      sort === "newest" ? b.f.release_year - a.f.release_year :
      (b.score - a.score) || (b.noteHits.length - a.noteHits.length) || a.f.name.localeCompare(b.f.name));
    return results;
  }

  function similarTo(f, n = 3) {
    const notes = new Set(allNotes(f).map(x => x.toLowerCase()));
    return FRAGRANCES.filter(x => x.id !== f.id).map(x => {
      let s = 0;
      if (x.family === f.family) s += 3;
      if (x.brand === f.brand) s += 2;
      s += allNotes(x).filter(nn => [...notes].some(q => q.includes(nn.toLowerCase()) || nn.toLowerCase().includes(q))).length * 2;
      s += (x.mood || []).filter(m => (f.mood || []).includes(m)).length;
      s += (x.occasion || []).filter(m => (f.occasion || []).includes(m)).length;
      return { f: x, score: s };
    }).sort((a, b) => b.score - a.score).slice(0, n);
  }

  // ---- Shared card ----
  function card(r) {
    const f = r.f || r;
    const reasons = r.reasons && r.reasons.length ? `<div class="match-reason">${esc(r.reasons.join(" · "))}</div>` : "";
    const inC = state.compare.includes(f.id);
    return `<article class="card">${art(f)}
      <div class="card-body">
        <h3><a href="#/fragrance/${f.id}">${esc(f.name)}</a></h3>
        <div class="meta">${esc(f.brand)} · ${f.release_year} · ${esc(f.family)}</div>
        ${reasons}
        <div class="tags">${allNotes(f).slice(0, 3).map(n => `<span class="tag">${esc(n)}</span>`).join("")}</div>
        <div class="card-actions">
          <button class="btn small ${state.saved.has(f.id) ? "primary" : ""}" data-act="save" data-id="${f.id}">${state.saved.has(f.id) ? "Saved ✓" : "Save"}</button>
          <button class="btn small" data-act="compare" data-id="${f.id}">${inC ? "In compare ✓" : "Compare"}</button>
        </div>
      </div></article>`;
  }

  // ---- Views ----
  function renderDiscover() {
    const featured = FRAGRANCES.filter(f => f.featured);
    const recent = [...FRAGRANCES].sort((a, b) => a.added_rank - b.added_rank).slice(0, 4);
    const autumn = FRAGRANCES.filter(f => (f.season || []).includes("Autumn")).slice(0, 4);
    const prompts = [
      { label: "Explore Vanilla", link: "#/search?notes=" + encodeURIComponent("Vanilla") },
      { label: "Find a Summer Fragrance", link: "#/search?season=" + encodeURIComponent("Summer") },
      { label: "Discover Woody Scents", link: "#/search?family=" + encodeURIComponent("Woody") },
      { label: "Date Night", link: "#/search?occasion=" + encodeURIComponent("Date Night") },
      { label: "Fresh & Clean", link: "#/search?mood=" + encodeURIComponent("Fresh & Clean") },
      { label: "Warm & Cozy", link: "#/search?mood=" + encodeURIComponent("Warm & Cozy") },
    ];
    view.innerHTML = `
      <section class="hero">
        <h1>Don't just search for a perfume. Explore the world of fragrance.</h1>
        <p>Search by notes, family, mood, season, occasion or style — compare side by side and save what you love.</p>
        <div class="hero-actions">
          <a href="#/search"><button class="btn primary">Search fragrances</button></a>
          <a href="#/explore"><button class="btn ghost">Browse the atlas</button></a>
        </div>
      </section>
      <section class="section"><div class="section-head"><h2>Try a discovery prompt</h2></div>
        <div class="chips">${prompts.map(p => `<a href="${esc(p.link)}"><button class="chip">${esc(p.label)}</button></a>`).join("")}</div>
      </section>
      <section class="section"><div class="section-head"><h2>Featured</h2><a href="#/search">View all →</a></div>
        <div class="grid">${featured.map(f => card({ f })).join("")}</div></section>
      <section class="section"><div class="section-head"><h2>Recently added</h2></div>
        <div class="grid">${recent.map(f => card({ f })).join("")}</div></section>
      <section class="section"><div class="section-head"><h2>Seasonal: Autumn picks</h2><a href="#/search?season=Autumn">More autumn →</a></div>
        <div class="grid">${autumn.map(f => card({ f })).join("")}</div></section>`;
  }

  function chipGroup(title, options, key, selected) {
    return `<div class="filter-group"><h4>${esc(title)}</h4><div class="chips">
      ${options.map(o => `<button class="chip ${selected.includes(o) ? "on" : ""}" data-filter="${key}" data-value="${esc(o)}">${esc(o)}</button>`).join("")}
    </div></div>`;
  }

  function renderSearch() {
    const s = state.search;
    const res = searchFragrances(s);
    view.innerHTML = `
      <h1>Search</h1>
      <p class="meta">Combine notes + context. Example: <em>Vanilla + Sandalwood + Musk</em>, or <em>Woody + Evening + Elegant</em>.</p>
      <input id="q" class="search-input" placeholder="Search name, brand, note, mood… e.g. vanilla evening" value="${esc(s.q)}" />
      <div class="section"><div class="section-head"><h2>Notes (${s.notes.length} selected)</h2>${s.notes.length ? `<button class="btn small" data-act="clear-notes">Clear</button>` : ""}</div>
        <div class="chips">${POPULAR_NOTES.map(n => `<button class="chip ${s.notes.includes(n) ? "on" : ""}" data-notes="${esc(n)}">${esc(n)}</button>`).join("")}</div>
      </div>
      <div class="filters">
        ${chipGroup("Family", FAMILIES, "family", s.family)}
        ${chipGroup("Season", facet("season"), "season", s.season)}
        ${chipGroup("Time of day", facet("time_of_day"), "time_of_day", s.time_of_day)}
        ${chipGroup("Occasion", facet("occasion"), "occasion", s.occasion)}
        ${chipGroup("Mood", facet("mood").slice(0, 12), "mood", s.mood)}
        ${chipGroup("Style", facet("style").slice(0, 12), "style", s.style)}
      </div>
      <div class="toolbar">
        <label class="meta">Sort <select id="sort">
          <option value="best" ${s.sort === "best" ? "selected" : ""}>Best match</option>
          <option value="newest" ${s.sort === "newest" ? "selected" : ""}>Newest</option>
          <option value="name" ${s.sort === "name" ? "selected" : ""}>Name A–Z</option>
        </select></label>
        <span class="meta" id="resCount">${res.length} result${res.length === 1 ? "" : "s"}</span>
        <button class="btn small" data-act="clear-all">Clear all filters</button>
      </div>
      <div class="section"><div class="grid">${res.length ? res.map(card).join("") : `<div class="empty">No matches. Try fewer notes or clearing a filter.</div>`}</div></div>`;

    document.getElementById("q").addEventListener("input", e => { s.q = e.target.value; renderSearchResultsOnly(); });
    document.getElementById("sort").addEventListener("change", e => { s.sort = e.target.value; rerender(); });
  }

  function renderSearchResultsOnly() {
    // lightweight: re-run without losing input focus
    const pos = document.getElementById("q");
    const val = pos.value, start = pos.selectionStart;
    const s = state.search;
    const res = searchFragrances(s);
    const grid = view.querySelector(".grid");
    const count = document.getElementById("resCount");
    if (grid) grid.innerHTML = res.length ? res.map(card).join("") : `<div class="empty">No matches. Try fewer notes or clearing a filter.</div>`;
    if (count) count.textContent = `${res.length} result${res.length === 1 ? "" : "s"}`;
    const q = document.getElementById("q");
    q.focus(); q.setSelectionRange(start, start);
  }

  function renderExplore() {
    const tile = (title, sub, link) => `<button class="tile" data-link="${esc(link)}"><strong>${esc(title)}</strong><span>${esc(sub)}</span></button>`;
    view.innerHTML = `
      <h1>Explore</h1><p class="meta">Browse the atlas by family, note, mood, occasion, season and style.</p>
      <div class="section"><h2>Families</h2><div class="tiles">
        ${FAMILIES.map(f => tile(f, FRAGRANCES.filter(x => x.family === f).length + " fragrances", "#/search?family=" + encodeURIComponent(f))).join("")}
      </div></div>
      <div class="section"><h2>Notes</h2><div class="tiles">
        ${POPULAR_NOTES.map(n => tile(n, "note", "#/search?notes=" + encodeURIComponent(n))).join("")}
      </div></div>
      <div class="section"><h2>Moods</h2><div class="tiles">
        ${facet("mood").map(m => tile(m, "mood", "#/search?mood=" + encodeURIComponent(m))).join("")}
      </div></div>
      <div class="section"><h2>Occasions</h2><div class="tiles">
        ${facet("occasion").map(m => tile(m, "occasion", "#/search?occasion=" + encodeURIComponent(m))).join("")}
      </div></div>
      <div class="section"><h2>Seasons & time</h2><div class="tiles">
        ${facet("season").map(m => tile(m, "season", "#/search?season=" + encodeURIComponent(m))).join("")}
        ${facet("time_of_day").map(m => tile(m, "time of day", "#/search?time_of_day=" + encodeURIComponent(m))).join("")}
      </div></div>`;
  }

  function renderProfile(id) {
    const f = byId(id);
    if (!f) { view.innerHTML = `<div class="empty">Fragrance not found. <a href="#/discover">Back to Discover</a></div>`; return; }
    const sim = similarTo(f);
    const sameHouse = FRAGRANCES.filter(x => x.brand === f.brand && x.id !== f.id);
    const tagRow = arr => (arr || []).map(t => `<span class="tag">${esc(t)}</span>`).join("");
    view.innerHTML = `
      <a href="#/search">← Back to search</a>
      <div class="section profile">
        <div class="profile-art" style="background:linear-gradient(150deg,hsl(${f.hue} 30% 20%),hsl(${f.hue} 50% 48%))">${esc(initials(f))}</div>
        <div>
          <h1>${esc(f.name)}</h1>
          <p class="meta">${esc(f.brand)} · ${f.release_year} · ${esc(f.type)} · ${esc(f.gender)}</p>
          <p>${esc(f.description)}</p>
          <div class="toolbar">
            <button class="btn ${state.saved.has(f.id) ? "primary" : ""}" data-act="save" data-id="${f.id}">${state.saved.has(f.id) ? "Saved ✓" : "Save"}</button>
            <button class="btn" data-act="compare" data-id="${f.id}">${state.compare.includes(f.id) ? "In compare ✓" : "Add to compare"}</button>
            ${state.compare.length >= 2 ? `<a href="#/compare"><button class="btn primary">Compare now</button></a>` : ""}
          </div>
          <div class="panel" style="margin-top:14px"><h3>Olfactory profile</h3>
            <div class="tags" style="margin-bottom:10px"><span class="tag match">${esc(f.family)}</span>${(f.accords || []).map(a => `<span class="tag">${esc(a)}</span>`).join("")}</div>
            <div class="notes-pyramid">
              <div class="note-row"><span class="note-label">Top</span><span>${f.top_notes.map(esc).join(" · ")}</span></div>
              <div class="note-row"><span class="note-label">Heart</span><span>${f.heart_notes.map(esc).join(" · ")}</span></div>
              <div class="note-row"><span class="note-label">Base</span><span>${f.base_notes.map(esc).join(" · ")}</span></div>
            </div>
          </div>
        </div>
      </div>
      <div class="section"><div class="panel"><h3>Context</h3>
        <div class="note-row"><span class="note-label">Mood</span><span class="tags">${tagRow(f.mood)}</span></div>
        <div class="note-row"><span class="note-label">Season</span><span class="tags">${tagRow(f.season)}</span></div>
        <div class="note-row"><span class="note-label">Time</span><span class="tags">${tagRow(f.time_of_day)}</span></div>
        <div class="note-row"><span class="note-label">Occasion</span><span class="tags">${tagRow(f.occasion)}</span></div>
        <div class="note-row"><span class="note-label">Style</span><span class="tags">${tagRow(f.style)}</span></div>
      </div></div>
      <div class="section"><div class="section-head"><h2>Similar fragrances</h2></div>
        <div class="grid">${sim.map(r => card({ f: r.f, reasons: ["similar"] })).join("")}</div></div>
      ${sameHouse.length ? `<div class="section"><div class="section-head"><h2>More from ${esc(f.brand)}</h2></div><div class="grid">${sameHouse.map(x => card({ f: x })).join("")}</div></div>` : ""}`;
  }

  function renderCompare() {
    const items = state.compare.map(byId).filter(Boolean);
    if (items.length < 2) {
      view.innerHTML = `<h1>Compare</h1><div class="empty">Select at least 2 fragrances to compare.<br/><br/><a href="#/search"><button class="btn primary">Find fragrances</button></a></div>
      ${items.length === 1 ? `<div class="section grid">${card({ f: items[0] })}</div>` : ""}`;
      return;
    }
    const row = (label, fn) => {
      const vals = items.map(fn);
      const allSame = vals.every(v => JSON.stringify(v) === JSON.stringify(vals[0]));
      return `<tr><th>${label}</th>${vals.map(v => `<td class="${allSame ? "shared" : ""}">${esc(Array.isArray(v) ? v.join(", ") : v)}</td>`).join("")}</tr>`;
    };
    view.innerHTML = `<h1>Compare (${items.length})</h1>
      <p class="meta">Shared characteristics are highlighted. <button class="btn small" data-act="clear-compare">Clear</button></p>
      <div style="overflow-x:auto"><table class="compare">
        <tr><th></th>${items.map(f => `<td><strong><a href="#/fragrance/${f.id}">${esc(f.name)}</a></strong><br/><span class="meta">${esc(f.brand)} · ${f.release_year}</span><br/><button class="btn small" data-act="compare" data-id="${f.id}">Remove</button></td>`).join("")}</tr>
        ${row("Family", f => f.family)}
        ${row("Top notes", f => f.top_notes)}
        ${row("Heart notes", f => f.heart_notes)}
        ${row("Base notes", f => f.base_notes)}
        ${row("Mood", f => f.mood)}
        ${row("Season", f => f.season)}
        ${row("Occasion", f => f.occasion)}
        ${row("Time of day", f => f.time_of_day)}
        ${row("Style", f => f.style)}
      </table></div>`;
  }

  function renderSaved() {
    const items = [...state.saved].map(byId).filter(Boolean);
    view.innerHTML = `<h1>Saved (${items.length})</h1>
      ${items.length ? `<div class="grid">${items.map(f => card({ f })).join("")}</div>` : `<div class="empty">Nothing saved yet. Tap “Save” on any fragrance to keep it here — it persists between visits.</div>`}`;
  }

  // ---- Router ----
  function applyQuery(qs) {
    const q = new URLSearchParams(qs);
    if (![...q.keys()].length) return;
    for (const [k, v] of q.entries()) {
      if (k === "notes") {
        if (!state.search.notes.includes(v)) state.search.notes.push(v);
      } else if (k in state.search && Array.isArray(state.search[k])) {
        if (!state.search[k].includes(v)) state.search[k].push(v);
      }
    }
  }

  function rerender() { route(false); }
  function route(update = true) {
    const [path, qs] = location.hash.replace(/^#\/?/, "").split("?");
    if (qs !== undefined && path === "search") applyQuery(qs);
    if (path.startsWith("fragrance/")) renderProfile(path.split("/")[1]);
    else if (path === "search") renderSearch();
    else if (path === "explore") renderExplore();
    else if (path === "compare") renderCompare();
    else if (path === "saved") renderSaved();
    else renderDiscover();
    updateBadges();
    window.scrollTo(0, 0);
  }

  // ---- Events (delegated) ----
  document.addEventListener("click", e => {
    const link = e.target.closest("[data-link]");
    if (link) { location.hash = link.dataset.link; return; }
    const chip = e.target.closest("[data-filter]");
    if (chip) {
      const k = chip.dataset.filter, v = chip.dataset.value;
      const arr = state.search[k];
      const i = arr.indexOf(v);
      i >= 0 ? arr.splice(i, 1) : arr.push(v);
      rerender(); return;
    }
    const note = e.target.closest("[data-notes]");
    if (note) {
      const v = note.dataset.notes;
      const arr = state.search.notes;
      const i = arr.indexOf(v);
      i >= 0 ? arr.splice(i, 1) : arr.push(v);
      rerender(); return;
    }
    const btn = e.target.closest("[data-act]");
    if (!btn) return;
    const { act, id } = btn.dataset;
    if (act === "save") toggleSave(id);
    if (act === "compare") toggleCompare(id);
    if (act === "clear-all") { const sort = state.search.sort; state.search = { q: "", notes: [], family: [], season: [], time_of_day: [], occasion: [], mood: [], style: [], gender: [], sort }; rerender(); }
    if (act === "clear-notes") { state.search.notes = []; rerender(); }
    if (act === "clear-compare") { state.compare = []; persist(); rerender(); }
  });

  window.addEventListener("hashchange", () => route());
  if (!location.hash) location.hash = "#/discover";
  persist();
  route();
})();
