/*
  source-packs.js
  Fetches curated node packs and displays them in a modal.
  ND-safe: static markup only, no motion, works offline.
*/

let modalRenderer = null;

function ensureModal() {
  if (modalRenderer) {
    return modalRenderer;
  }
  return (html) => {
    const win = window.open("", "_blank");
    if (!win) {
      alert("Source pack:\n" + html.replace(/<[^>]+>/g, ""));
      return;
    }
    win.document.write(`<title>Source Pack</title><body>${html}</body>`);
  };
}

function escapeHTML(value) {
  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderExcerpt(excerpt) {
  const quote = escapeHTML(excerpt.quote);
  const work = escapeHTML(excerpt.work_id);
  const loc = escapeHTML(excerpt.loc || "");
  const license = escapeHTML(excerpt.license || "");
  return `<li><em>${quote}</em><br><strong>${work}</strong> <small>${loc}</small> <small>${license}</small></li>`;
}

function renderPlate(plate) {
  const symbolId = escapeHTML(plate.symbol_id);
  const caption = escapeHTML(plate.caption || "");
  const hint = escapeHTML(plate.mode_hint || "");
  const path = `../shared/corpus/symbols/${symbolId}.svg`;
  return `<figure><img src="${path}" alt="${caption}" loading="lazy"><figcaption>${caption}<br><small>${hint}</small></figcaption></figure>`;
}

function renderPack(pack) {
  const excerpts = (pack.excerpts || []).map(renderExcerpt).join("");
  const plates = (pack.plates || []).map(renderPlate).join("");
  return `
    <article class="source-pack">
      <h3>${escapeHTML(pack.title)}</h3>
      <section>
        <h4>Primary Sources</h4>
        <ul>${excerpts || "<li>No excerpts stored.</li>"}</ul>
      </section>
      <section>
        <h4>Plates &amp; Sigils</h4>
        <div class="plate-grid">${plates || "<p>No plates stored.</p>"}</div>
      </section>
    </article>
  `;
}

export function setModalRenderer(renderer) {
  modalRenderer = renderer;
}

export async function showSourcePack(nodeId, { basePath = "../shared/packs/node" } = {}) {
  const path = `${basePath}/${nodeId}.json`;
  const response = await fetch(path, { cache: "no-store" });
  if (!response.ok) {
    ensureModal()(`<p>Unable to load source pack for ${escapeHTML(nodeId)}.</p>`);
    return null;
  }
  const pack = await response.json();
  const html = renderPack(pack);
  ensureModal()(html);
  return pack;
}
