const CFG = window.JC_CONFIG;
const sb = supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_KEY);
const ICONS = {
 sacs:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 8h14l-1.2 12H6.2z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
 bijoux:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M5 4c0 6 3 9 7 9s7-3 7-9"/><path d="M12 13l-2.5 3 2.5 4 2.5-4z"/></svg>',
 perruques:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 3c-5 0-7 4-7 8 0 4-1 7-2 9h5c-1-3-1-6 0-8 2 1 6 1 8 0 1 2 1 5 0 8h5c-1-2-2-5-2-9 0-4-2-8-7-8z"/></svg>',
 chaussures:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M3 18c4 0 7-1 9-5l3-5c1 3 3 6 6 7v3H3z"/><path d="M5 18v3"/></svg>',
 vetements:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M9 3l3 3 3-3 2 4-3 3 4 11H6l4-11-3-3z"/></svg>',
 beaute:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><rect x="5" y="11" width="5" height="10" rx="1"/><path d="M6 11V6l3-2v7"/><rect x="13" y="13" width="7" height="8" rx="1.5"/><path d="M14 13v-2h5v2"/></svg>',
 accessoires:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><circle cx="6.5" cy="14" r="3.5"/><circle cx="17.5" cy="14" r="3.5"/><path d="M10 14h4M3 13l1-5M21 13l-1-5"/></svg>'
};
const UI = {
 home:'<path d="M4 10l1-6h14l1 6M5 11v9h14v-9M4 10a2.7 2.7 0 0 0 5.300 0 2.700 2.700 0 0 0 5.400 0 2.700 2.700 0 0 0 5.300 0"/>',
 search:'<circle cx="11" cy="11" r="7"/><path d="M21 21l-4.500-4.500"/>',
 bag:'<path d="M5 8h14l-1.200 12H6.200z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
 pin:'<path d="M12 21s7-6.500 7-12a7 7 0 1 0-14 0c0 5.500 7 12 7 12z"/><circle cx="12" cy="9" r="2.500"/>',
 wa:'<path d="M12 3a9 9 0 0 0-7.800 13.500L3 21l4.600-1.200A9 9 0 1 0 12 3z"/><path d="M9 8.500c-.6 3 3.500 7 6.500 6.500l.7-1.700-2.200-1-1 .8c-1-.5-1.600-1.200-2-2l.8-1-1-2.200z"/>',
 phone:'<path d="M6 3h3l2 5-2.500 1.500a12 12 0 0 0 6 6L16 13l5 2v3a3 3 0 0 1-3 3A15 15 0 0 1 3 6a3 3 0 0 1 3-3z"/>',
 orders:'<path d="M6 3h12v18l-3-2-3 2-3-2-3 2z"/><path d="M9 8h6M9 12h6"/>',
 box:'<path d="M3 8l9-5 9 5v8l-9 5-9-5z"/><path d="M3 8l9 5 9-5M12 13v8"/>',
 truck:'<path d="M2 6h12v10H2zM14 10h4l4 3v3h-8z"/><circle cx="7" cy="18" r="2"/><circle cx="18" cy="18" r="2"/>',
 camera:'<path d="M4 7h4l2-3h4l2 3h4v13H4z"/><circle cx="12" cy="13" r="4"/>',
 check:'<path d="M5 13l4 4L19 7"/>'
};
const ic = n => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${UI[n]}</svg>`;
document.querySelectorAll("[data-ic]").forEach(el => el.insertAdjacentHTML("afterbegin", ic(el.dataset.ic)));
const CATS = [["tout","Tout"],["sacs","Sacs"],["bijoux","Bijoux"],["perruques","Perruques"],["chaussures","Chaussures"],["vetements","Vêtements"],["beaute","Beauté"],["accessoires","Accessoires"]];
const catName = k => (CATS.find(c => c[0] === k) || [, "Autre"])[1];
const PAYS = [["wave","Wave","Le plus rapide"],["om","Orange Money","Code ou Max It"],["livraison","Paiement à la livraison","Espèces ou Wave"]];
const PAYC = { wave: "wave", om: "om", livraison: "ok" };
const payName = k => (PAYS.find(p => p[0] === k) || [, k])[1];
const STATUTS = [["nouvelle","Nouvelle"],["confirmee","Confirmée"],["expediee","En livraison"],["livree","Livrée"],["annulee","Annulée"]];
const PAIEMENTS = [["en_attente","En attente"],["paye","Payée"],["echec","Échec"],["rembourse","Remboursée"]];
const fmt = n => (Number(n) || 0).toLocaleString("fr-FR").replace(/ | /g, " ") + " FCFA";
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const $ = id => document.getElementById(id);
const imgUrl = path => path ? `${CFG.SUPABASE_URL}/storage/v1/object/public/produits/${path}` : "";
const cleanTel = t => String(t || "").replace(/\D/g, "").replace(/^221/, "");
const telOk = t => /^(7[05678])\d{7}$/.test(t);
function toast(t) { const el = $("toast"); el.textContent = t; el.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => el.hidden = true, 2200); }
async function callFn(name, body) {
  const r = await fetch(`${CFG.SUPABASE_URL}/functions/v1/${name}`, { method: "POST", headers: { "Content-Type": "application/json", apikey: CFG.SUPABASE_KEY }, body: JSON.stringify(body) });
  const j = await r.json().catch(() => ({}));
  if (!r.ok) throw new Error(j.error || "Le service ne répond pas. Réessayez dans un instant.");
  return j;
}
