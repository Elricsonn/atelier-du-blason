/* L'Atelier du Blason — MVP. Base de connaissance d'après "La Voie du Blason"
   (Gambirasio d'Asseux). Meubles géométriques dessinés maison ; animaux à
   intégrer depuis des sources libres (Wikimedia/DrawShield/Armoria) plus tard. */

"use strict";

// ---------- Base de connaissance ----------
const TINCTURES = {
  or:      { nom:"Or (jaune)",     hex:"#caa12e", type:"métal", lum:"Foi (théologale), perfection spirituelle & vision béatifique ; Soleil de Justice, le Verbe — l'Œuvre au Rouge. Celui qui s'y identifie devient Christophoros.", dechu:"orgueil, mépris.", page:54 },
  argent:  { nom:"Argent (blanc)", hex:"#e9eaee", type:"métal", lum:"Réceptivité virginale (état marial), miroir qui se laisse traverser par la Lumière du Christ — l'Œuvre au Blanc.", dechu:"pureté stérile ; déchéance d'autant plus grave.", page:52 },
  sable:   { nom:"Sable (noir)",   hex:"#1c1c20", type:"émail", lum:"Humilité, renoncement à soi, terreau (humus) des vertus ; la lumière secrète au tabernacle du cœur — l'Œuvre au Noir.", dechu:"noirceur de l'âme, félonie, foi mentie.", page:45 },
  gueules: { nom:"Gueules (rouge)",hex:"#9b1c1c", type:"émail", lum:"Force (cardinale) & Charité (théologale) ; vaillance, sacrifice ; la lampe des Vierges sages.", dechu:"force brutale, colère, sensualité déréglée.", page:48 },
  azur:    { nom:"Azur (bleu)",    hex:"#23508f", type:"émail", lum:"Élévation par l'Esprit, couleur de la Vierge, seigneurie intérieure.", dechu:"fausse pureté, tyrannie.", page:49 },
  sinople: { nom:"Sinople (vert)", hex:"#1f6e3b", type:"émail", lum:"Espérance (théologale), virilité spirituelle, jeunesse de l'âme, courtoisie.", dechu:"venin, corruption, l'ophidien.", page:46 },
  pourpre: { nom:"Pourpre",        hex:"#6b2a5b", type:"amphibie", lum:"Royauté ; transmutation / déification de l'être, le Verbe ; la Pierre de fondation.", dechu:"vanité des gloires, pouvoir sans Dieu.", page:51 },
};

const FORMES = {
  "demi-amande": { nom:"Écu en demi-amande", lum:"Mandorle du Christ / de la Vierge en majesté ; forme ogivale des cathédrales ; la Cité Sainte tracée par l'étoile du Berger ; contour en Cœur / Graal.", reserve:"le chevalier", page:69 },
  "banniere":    { nom:"Écu en bannière (carré)", lum:"Stabilité, achèvement, perfection ; Jérusalem céleste ; l'homme ayant recouvré la seigneurie de lui-même.", reserve:"chevalier banneret", page:69 },
  "ovale":       { nom:"Écu ovale", lum:"Fécondité, parturition spirituelle de l'âme.", reserve:"les Dames", page:69 },
  "losange":     { nom:"Losange", lum:"Élan & fragilité de la vie (le fuseau de la fileuse).", reserve:"les jeunes filles", page:69 },
};

const PARTITIONS = {
  "plein":    { nom:"Plein (un seul tenant)", regions:1, lum:"Champ d'un seul tenant : l'unité et la simplicité de l'être.", dechu:"", page:61 },
  "parti":    { nom:"Parti (vertical)", regions:2, lum:"Union de deux forces complémentaires ; la ligne de partage est l'Amour (Agapè) ; le pal = le pieu planté.", dechu:"mur, fracture — le royaume divisé (Caïn).", page:79 },
  "coupe":    { nom:"Coupé (horizontal)", regions:2, lum:"Le Ciel (chef) et la terre (pointe), l'esprit et le corps ; la ligne = l'horizon ; la fasce = la ceinture, le lien.", dechu:"séparation, barrage entre Ciel et terre.", page:81 },
  "ecartele": { nom:"Écartelé", regions:2, lum:"Parti + coupé : la Croix au cœur de l'être ; le rassemblement de plusieurs héritages.", dechu:"écartèlement, fractures intérieures.", page:85 },
  "tranche":  { nom:"Tranché (diagonale)", regions:2, lum:"La bande (montée à dextre) = l'élan, le baudrier du chevalier.", dechu:"", page:83 },
  "taille":   { nom:"Taillé (diagonale inverse)", regions:2, lum:"La barre — reflet du tranché.", dechu:"souvent brisure / ligne de bâtardise.", page:83 },
};

// rendu: clé SVG dessinée, ou null (à intégrer depuis une source libre plus tard)
const MEUBLES = {
  "":         { nom:"— aucun —", lum:"", dechu:"", page:null, rendu:null },
  "etoile":   { nom:"Étoile", lum:"L'étoile qui guide (du Berger ; Stella Maris, Marie) ; ses 5 branches = les 5 Plaies ; appelle à la marche intérieure.", dechu:"pointe en bas : le faux prophète.", page:108, rendu:"etoile" },
  "soleil":   { nom:"Soleil", lum:"Lumière Incréée, Cœur du Christ-Roi (Sol Justitiæ) ; le porteur s'efface pour ne manifester que le Seigneur.", dechu:"astre infernal, orgueil, chute d'Icare.", page:106, rendu:"soleil" },
  "lune":     { nom:"Lune", lum:"Reflet du soleil, Miroir de Justice (Notre-Dame) ; force germinatrice de l'âme.", dechu:"âme en déséquilibre, inconstance.", page:107, rendu:"lune" },
  "tour":     { nom:"Tour", lum:"Ascension & garde de l'être ; virginité inexpugnable (Tour d'ivoire), four ardent de l'Esprit.", dechu:"cachot, enfermement sur soi (Caïn).", page:117, rendu:"tour" },
  "pont":     { nom:"Pont", lum:"Relie deux rives / deux mondes (Ciel & Terre) ; soutenu par la Foi ; ne se franchit que par la prouesse.", dechu:"cohue, submersion, effondrement.", page:119, rendu:"pont" },
  "lampe":    { nom:"Lampe", lum:"La lampe des Vierges sages (Mt 25), tenue allumée dans la nuit ; la parole prophétique (2 P 1,19).", dechu:"la lampe éteinte des Vierges folles.", page:48, rendu:"lampe" },
  "ancre":    { nom:"Ancre", lum:"L'Espérance, « ancre de l'âme » (He 6,19) ; ce qui tient ferme dans la tempête.", dechu:"poids mort, attache au fond.", page:null, rendu:"ancre" },
  "croix":    { nom:"Croix", lum:"La Croix au centre de l'être ; le don de soi, l'axe du monde.", dechu:"", page:85, rendu:"croix" },
  "lys":      { nom:"Lys", lum:"Royauté spirituelle du cœur offert à Dieu ; fleur du Christ et de la Vierge ; Foi + Sapience + Prouesse.", dechu:"vanité, soif de pouvoir.", page:114, rendu:"lys" },
  "coeur":    { nom:"Cœur", lum:"Le Sacré-Cœur offert ; le centre, le tabernacle intérieur.", dechu:"", page:null, rendu:"coeur" },
  "rose":     { nom:"Rose", lum:"Amour spirituel & Connaissance ; 5 pétales = 5 Plaies ; « en odeur de sainteté ».", dechu:"masque trompeur, cœur fade.", page:116, rendu:"rose" },
  "lion":     { nom:"Lion", lum:"L'animal-roi : courage, noblesse, le Miles Christi ; Lion de Juda.", dechu:"tyrannie de l'ego, le roi fait serf.", page:110, rendu:"lion" },
  "leopard":  { nom:"Léopard", lum:"Le gardien du seuil (leo-pardès), vigilance & discernement à l'image de saint Michel.", dechu:"violence jalouse, garde de trésors mondains.", page:111, rendu:"leopard" },
  "aigle":    { nom:"Aigle", lum:"Majesté & autorité ; l'âme qui monte vers l'Esprit, regarde le soleil en face.", dechu:"rapace hautain, vol brisé.", page:113, rendu:"aigle" },
};

// ---------- Meubles dessinés (centrés en 0,0, ~ -16..16) ----------
function chargeSVG(key, color){
  const s = `fill="${color}" stroke="rgba(120,120,120,.55)" stroke-width=".6"`;
  switch(key){
    case "etoile": { // étoile à 5 branches
      let pts=[]; for(let i=0;i<5;i++){const a=-Math.PI/2+i*2*Math.PI/5; pts.push([16*Math.cos(a),16*Math.sin(a)]); const b=a+Math.PI/5; pts.push([6.4*Math.cos(b),6.4*Math.sin(b)]);}
      return `<polygon ${s} points="${pts.map(p=>p.map(n=>n.toFixed(1)).join(",")).join(" ")}"/>`;
    }
    case "soleil": {
      let rays=""; for(let i=0;i<12;i++){const a=i*Math.PI/6; rays+=`<line x1="${(11*Math.cos(a)).toFixed(1)}" y1="${(11*Math.sin(a)).toFixed(1)}" x2="${(17*Math.cos(a)).toFixed(1)}" y2="${(17*Math.sin(a)).toFixed(1)}" stroke="${color}" stroke-width="1.6"/>`;}
      return `${rays}<circle ${s} cx="0" cy="0" r="9"/>`;
    }
    case "lune": return `<path ${s} d="M6,-13 A14,14 0 1 0 6,13 A11,11 0 1 1 6,-13 Z"/>`;
    case "tour": return `<g ${s}><rect x="-11" y="-6" width="22" height="20"/><rect x="-11" y="-12" width="5" height="7"/><rect x="-2.5" y="-12" width="5" height="7"/><rect x="6" y="-12" width="5" height="7"/><rect x="-3.5" y="2" width="7" height="12" fill="rgba(0,0,0,.35)"/></g>`;
    case "pont": return `<g ${s}><path d="M-16,8 H16 V13 H-16 Z"/><path d="M-12,8 A8,8 0 0 1 -2,8 Z" fill="rgba(0,0,0,.3)"/><path d="M2,8 A8,8 0 0 1 12,8 Z" fill="rgba(0,0,0,.3)"/></g>`;
    case "lampe": return `<g ${s}><path d="M-12,4 Q0,-4 12,4 Q12,9 0,9 Q-12,9 -12,4 Z"/><path d="M9,2 q7,-1 6,-6" fill="none" stroke="${color}" stroke-width="2"/><path d="M-2,-4 q2,-7 2,-12 q3,5 1,9 q-1,2 -3,3 Z" fill="${color}"/></g>`;
    case "ancre": return `<g ${s} fill="none" stroke="${color}" stroke-width="2.4"><circle cx="0" cy="-12" r="3"/><line x1="0" y1="-9" x2="0" y2="13"/><line x1="-8" y1="-4" x2="8" y2="-4"/><path d="M-12,6 Q-12,15 0,15 Q12,15 12,6"/></g>`;
    case "croix": return `<g ${s}><rect x="-3" y="-15" width="6" height="30"/><rect x="-13" y="-3" width="26" height="6"/></g>`;
    case "lys": return `<path ${s} d="M0,-16 C3,-9 9,-9 6,-2 C12,-6 11,3 4,3 L7,9 H-7 L-4,3 C-11,3 -12,-6 -6,-2 C-9,-9 -3,-9 0,-16 Z M-9,7 H9 V11 H-9 Z"/>`;
    case "coeur": return `<path ${s} d="M0,13 C-16,2 -12,-13 0,-5 C12,-13 16,2 0,13 Z"/>`;
    case "rose": { let p=""; for(let i=0;i<5;i++){const a=-Math.PI/2+i*2*Math.PI/5; p+=`<circle ${s} cx="${(9*Math.cos(a)).toFixed(1)}" cy="${(9*Math.sin(a)).toFixed(1)}" r="6"/>`;} return p+`<circle ${s} cx="0" cy="0" r="5"/>`; }
    default: return ""; // animal non rendu en MVP
  }
}

// ---------- Formes (chemin de l'écu, viewBox 0 0 200 240) ----------
const SHIELD = {
  "demi-amande":"M22,16 H178 V94 C178,168 128,208 100,226 C72,208 22,168 22,94 Z",
  "banniere":"M26,16 H174 V212 H26 Z",
  "ovale":"M100,14 C44,14 30,72 30,120 C30,182 70,226 100,226 C130,226 170,182 170,120 C170,72 156,14 100,14 Z",
  "losange":"M100,10 L186,120 L100,230 L14,120 Z",
};

// ---------- État ----------
// État de départ : exemple GÉNÉRIQUE (aucune donnée personnelle).
const S = { forme:"demi-amande", partition:"parti", A:"gueules", B:"argent", meuble:"lys", meubleTinct:"or", cimier:"etoile", cimierTinct:"argent", devise:"" };

// ---------- Rendu de l'écu ----------
function fieldRegions(){
  const A=TINCTURES[S.A].hex, B=TINCTURES[S.B].hex;
  switch(S.partition){
    case "plein": return `<rect x="0" y="0" width="200" height="240" fill="${A}"/>`;
    case "parti": return `<rect x="0" y="0" width="100" height="240" fill="${A}"/><rect x="100" y="0" width="100" height="240" fill="${B}"/>`;
    case "coupe": return `<rect x="0" y="0" width="200" height="120" fill="${A}"/><rect x="0" y="120" width="200" height="120" fill="${B}"/>`;
    case "ecartele": return `<rect x="0" y="0" width="100" height="120" fill="${A}"/><rect x="100" y="0" width="100" height="120" fill="${B}"/><rect x="0" y="120" width="100" height="120" fill="${B}"/><rect x="100" y="120" width="100" height="120" fill="${A}"/>`;
    case "tranche": return `<polygon points="0,0 200,0 200,240" fill="${A}"/><polygon points="0,0 200,240 0,240" fill="${B}"/>`;
    case "taille": return `<polygon points="0,0 200,0 0,240" fill="${A}"/><polygon points="200,0 200,240 0,240" fill="${B}"/>`;
  }
}
function placedCharge(key, tinctKey, x, y, scale, idns){
  const m=MEUBLES[key]; if(!key||!m) return "";
  const tinct = TINCTURES[tinctKey].hex;
  // 1) figure héraldique libre embarquée (Wikimedia) — teintée via currentColor
  const fig = (typeof MEUBLE_SVG!=="undefined") && MEUBLE_SVG[key];
  if(fig){
    const [mx,my,w,h]=fig.vb;
    const target = scale*58;                  // 2.4 → ~140 u (meuble central) ; 0.9 → ~52 u (cimier)
    const k = target/Math.max(w,h);
    const tx=(-(mx+w/2)).toFixed(1), ty=(-(my+h/2)).toFixed(1);
    let inner=fig.inner;                       // namespacing des id (anti-collision meuble/cimier)
    if(idns) inner=inner.replace(/id="/g,`id="${idns}-`).replace(/href="#/g,`href="#${idns}-`).replace(/url\(#/g,`url(#${idns}-`);
    return `<g transform="translate(${x},${y}) scale(${k.toFixed(4)}) translate(${tx},${ty})" style="color:${tinct}" fill="currentColor">${inner}</g>`;
  }
  // 2) meuble géométrique dessiné maison (calibré ~±16 u → ×1.8 pour s'accorder à la taille des figures SVG)
  if(m.rendu) return `<g transform="translate(${x},${y}) scale(${(scale*1.8).toFixed(3)})">${chargeSVG(m.rendu, tinct)}</g>`;
  // 3) garde-fou (ne devrait plus arriver)
  return "";
}
function render(){
  const path=SHIELD[S.forme];
  const cimier = S.cimier ? placedCharge(S.cimier, S.cimierTinct, 100, -24, 0.9, "c") : "";
  const dev = S.devise ? `<g><path d="M18,250 Q100,234 182,250 Q100,268 18,250 Z" fill="#f3ead4" stroke="#caa12e"/><text x="100" y="254" text-anchor="middle" font-size="12" fill="#5a4a1e" font-style="italic">${escapeXML(S.devise)}</text></g>` : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -56 200 328">
    <defs><clipPath id="sh"><path d="${path}"/></clipPath></defs>
    ${cimier}
    <g clip-path="url(#sh)">${fieldRegions()}${placedCharge(S.meuble, S.meubleTinct, 100, 114, 2.4, "m")}</g>
    <path d="${path}" fill="none" stroke="#caa24a" stroke-width="3.5"/>
    <path d="${path}" fill="none" stroke="rgba(0,0,0,.35)" stroke-width="1" transform="translate(0,1)"/>
    ${dev}
  </svg>`;
  document.getElementById("ecu").innerHTML = svg;
}
function escapeXML(s){ return s.replace(/[<>&"']/g,c=>({"<":"&lt;",">":"&gt;","&":"&amp;","\"":"&quot;","'":"&#39;"}[c])); }

// ---------- Blasonnement ----------
// genre des meubles (pour l'article) — féminin par défaut, masculin listés
const MEUBLES_MASC = new Set(["lion","leopard","pont","coeur","soleil","lys"]);
function blason(){
  const t=k=>TINCTURES[k].nom.split(" ")[0].toLowerCase();
  const de=n=>/^[aeiouyàâäéèêëîïôöûü]/i.test(n)?`d'${n}`:`de ${n}`;   // élision
  const art=k=>MEUBLES_MASC.has(k)?"un":"une";                        // genre
  const Cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
  let f = FORMES[S.forme].nom.toLowerCase();
  let champ;
  if(S.partition==="plein") champ=Cap(de(t(S.A)));
  else if(S.partition==="coupe") champ=`Coupé : au chef ${de(t(S.A))}, en pointe ${de(t(S.B))}`;
  else if(S.partition==="parti") champ=`Parti : à dextre ${de(t(S.A))}, à senestre ${de(t(S.B))}`;
  else if(S.partition==="ecartele") champ=`Écartelé ${de(t(S.A))} et ${de(t(S.B))}`;
  else if(S.partition==="tranche") champ=`Tranché ${de(t(S.A))} et ${de(t(S.B))}`;
  else champ=`Taillé ${de(t(S.A))} et ${de(t(S.B))}`;
  let parts=[champ];
  if(S.meuble) parts.push(`brochant ${art(S.meuble)} ${MEUBLES[S.meuble].nom.toLowerCase()} ${de(t(S.meubleTinct))}`);
  let str = parts.join(" ; ") + ".";
  if(S.cimier) str += ` Cimier : ${art(S.cimier)} ${MEUBLES[S.cimier].nom.toLowerCase()} ${de(t(S.cimierTinct))}.`;
  if(S.devise) str += ` Devise : « ${S.devise} ».`;
  return `(${f}) ${str}`;
}

// ---------- Lecture spirituelle ----------
function senses(){
  const item=(label,o)=> o&&o.lum ? `<div class="item"><b>${label} :</b> <span class="lum">✦ ${o.lum}</span>${o.dechu?`<span class="dechu">⟂ ${o.dechu}</span>`:""}${o.page?`<span class="pg">— p. ${o.page}</span>`:""}</div>` : "";
  let h="";
  h+=item("Forme — "+FORMES[S.forme].nom, FORMES[S.forme]);
  h+=item("Champ — "+PARTITIONS[S.partition].nom, PARTITIONS[S.partition]);
  h+=item("Émail A — "+TINCTURES[S.A].nom, TINCTURES[S.A]);
  if(PARTITIONS[S.partition].regions>1) h+=item("Émail B — "+TINCTURES[S.B].nom, TINCTURES[S.B]);
  if(S.meuble) h+=item("Meuble — "+MEUBLES[S.meuble].nom, MEUBLES[S.meuble]);
  if(S.cimier) h+=item("Cimier — "+MEUBLES[S.cimier].nom, MEUBLES[S.cimier]);
  return h;
}

// ---------- Garde-fou règle de tincture ----------
function tinctureWarn(){
  const w=[]; const P=PARTITIONS[S.partition];
  if(P.regions>1){
    const a=TINCTURES[S.A].type, b=TINCTURES[S.B].type;
    if(a===b && a!=="amphibie") w.push(`Champ : ${TINCTURES[S.A].nom} et ${TINCTURES[S.B].nom} sont tous deux ${a==="métal"?"des métaux":"des émaux"} — la règle veut « ni métal sur métal, ni émail sur émail ».`);
  }
  // meuble central vs fond qu'il touche (approx : sur partition, il touche les 2 régions)
  if(S.meuble && MEUBLES[S.meuble].rendu){
    const mt=TINCTURES[S.meubleTinct].type;
    const fonds = P.regions>1 ? [TINCTURES[S.A].type, TINCTURES[S.B].type] : [TINCTURES[S.A].type];
    if(mt!=="amphibie" && fonds.every(f=>f===mt && f!=="amphibie")) w.push(`Le meuble (${TINCTURES[S.meubleTinct].nom}) est de même nature que son fond — ${mt==="métal"?"métal sur métal":"émail sur émail"}. (Sur une partition métal+couleur, une pièce brochant peut être tolérée, ou « de l'un en l'autre ».)`);
  }
  const el=document.getElementById("tincture-warning");
  if(w.length){ el.hidden=false; el.innerHTML="⚠︎ "+w.join("<br>⚠︎ "); } else el.hidden=true;
}

// ---------- UI ----------
function opt(v,label,sel){ return `<option value="${v}"${v===sel?" selected":""}>${label}</option>`; }
function fillSelects(){
  document.getElementById("forme").innerHTML = Object.entries(FORMES).map(([k,o])=>opt(k,o.nom,S.forme)).join("");
  document.getElementById("partition").innerHTML = Object.entries(PARTITIONS).map(([k,o])=>opt(k,o.nom,S.partition)).join("");
  const tinctOpts = sel => Object.entries(TINCTURES).map(([k,o])=>opt(k,o.nom,sel)).join("");
  document.getElementById("tinctureA").innerHTML = tinctOpts(S.A);
  document.getElementById("tinctureB").innerHTML = tinctOpts(S.B);
  document.getElementById("meubleTinct").innerHTML = tinctOpts(S.meubleTinct);
  document.getElementById("cimierTinct").innerHTML = tinctOpts(S.cimierTinct);
  const meubleOpts = sel => Object.entries(MEUBLES).map(([k,o])=>opt(k,o.nom + (o.rendu===null&&k?" (figure à venir)":""),sel)).join("");
  document.getElementById("meuble").innerHTML = meubleOpts(S.meuble);
  document.getElementById("cimier").innerHTML = meubleOpts(S.cimier);
  document.getElementById("devise").value = S.devise;
}
function bind(){
  const set=(id,key)=>document.getElementById(id).addEventListener("change",e=>{S[key]=e.target.value; update();});
  set("forme","forme"); set("partition","partition"); set("tinctureA","A"); set("tinctureB","B");
  set("meuble","meuble"); set("meubleTinct","meubleTinct"); set("cimier","cimier"); set("cimierTinct","cimierTinct");
  document.getElementById("devise").addEventListener("input",e=>{S.devise=e.target.value; update();});
  document.getElementById("dl-svg").addEventListener("click",()=>{
    const blob=new Blob([document.getElementById("ecu").innerHTML],{type:"image/svg+xml"});
    const a=document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="blason.svg"; a.click();
  });
  document.getElementById("copy-txt").addEventListener("click",()=>{
    const txt = blason()+"\n\nLecture spirituelle :\n"+document.getElementById("senses").innerText;
    navigator.clipboard.writeText(txt).then(()=>{ const b=document.getElementById("copy-txt"); const o=b.textContent; b.textContent="✓ Copié"; setTimeout(()=>b.textContent=o,1400); });
  });
}
function update(){
  const multi = PARTITIONS[S.partition].regions>1;
  document.getElementById("rowB").style.display = multi?"flex":"none";
  document.getElementById("labA").textContent = multi?"":"(tout l'écu)";
  render(); document.getElementById("blason").textContent=blason();
  document.getElementById("senses").innerHTML=senses(); tinctureWarn();
}
fillSelects(); bind(); update();

// ---------- Mode introspection (guidé : 4 questions → un écu suggéré) ----------
const INTRO = [
  { q:"Vers quoi ton âme tend-elle ?", sub:"Ce qui te couronne et te guide.",
    options:[
      {label:"La Lumière, la vérité", hint:"Sol Justitiæ — un soleil d'or", cimier:"soleil", cimierTinct:"or",
       why:"la <b>Lumière et la vérité</b> — un <b>soleil d'or</b> te couronne (le <i>Sol Justitiæ</i>, Cœur du Christ-Roi)."},
      {label:"Un guide dans la nuit", hint:"Stella Maris — une étoile d'argent", cimier:"etoile", cimierTinct:"argent",
       why:"un <b>guide dans la nuit</b> — une <b>étoile d'argent</b> te couronne (la <i>Stella Maris</i>, l'Étoile du Berger)."},
      {label:"La paix, le silence intérieur", hint:"Miroir de Justice — une lune d'argent", cimier:"lune", cimierTinct:"argent",
       why:"la <b>paix et le silence</b> — une <b>lune d'argent</b> te couronne (le Miroir de Justice)."},
      {label:"L'amour qui s'offre", hint:"« en odeur de sainteté » — une rose d'or", cimier:"rose", cimierTinct:"or",
       why:"l'<b>amour qui s'offre</b> — une <b>rose d'or</b> te couronne (« en odeur de sainteté »)."},
    ]},
  { q:"Quelle vertu te tient debout ?", sub:"Elle donnera sa couleur à ton champ.",
    options:[
      {label:"La Foi", hint:"l'or", email:"or", why:"La <b>Foi</b> te tient debout : elle donne à ton champ l'<b>or</b>, perfection et lumière."},
      {label:"L'Espérance", hint:"le sinople", email:"sinople", why:"L'<b>Espérance</b> te tient debout : elle donne à ton champ le <b>sinople</b>, vert de la jeunesse de l'âme."},
      {label:"La Charité", hint:"le gueules", email:"gueules", why:"La <b>Charité</b> te tient debout : elle donne à ton champ le <b>gueules</b>, rouge de l'amour ardent."},
      {label:"L'humilité, le renoncement", hint:"le sable", email:"sable", why:"L'<b>humilité</b> te tient debout : elle donne à ton champ le <b>sable</b>, l'humus où germent les vertus."},
    ]},
  { q:"Quelle est ta place parmi les autres ?", sub:"Ta vocation prendra une figure.",
    options:[
      {label:"Veiller, garder", hint:"la tour", meuble:"tour", why:"Ta place est de <b>veiller et garder</b> : ta figure est la <b>tour</b>, ascension et garde inexpugnable de l'être."},
      {label:"Relier, réconcilier", hint:"le pont", meuble:"pont", why:"Ta place est de <b>relier</b> : ta figure est le <b>pont</b>, qui joint les deux rives, le Ciel et la terre."},
      {label:"Éclairer, éveiller", hint:"la lampe", meuble:"lampe", why:"Ta place est d'<b>éclairer</b> : ta figure est la <b>lampe</b>, celle des Vierges sages tenue allumée dans la nuit."},
      {label:"Protéger, combattre pour les faibles", hint:"le lion", meuble:"lion", why:"Ta place est de <b>protéger</b> : ta figure est le <b>lion</b>, le <i>Miles Christi</i>, courage au service des faibles."},
    ]},
  { q:"Comment te tiens-tu ?", sub:"La structure de ton écu.",
    options:[
      {label:"D'un seul tenant, unifié", hint:"plein", partition:"plein", why:"Tu te tiens <b>d'un seul tenant</b> : ton champ est <b>plein</b>, l'unité et la simplicité de l'être."},
      {label:"Tendu entre le Ciel et la terre", hint:"coupé", partition:"coupe", why:"Tu te tiens <b>tendu entre le Ciel et la terre</b> : ton champ est <b>coupé</b> — l'or du Ciel en chef, le sable de la terre en pointe — et ta vertu colore la figure qui broche entre les deux."},
      {label:"Entre deux forces à unir", hint:"parti", partition:"parti", why:"Tu te tiens <b>entre deux forces à unir</b> : ton champ est <b>parti</b>, et la ligne qui les joint est l'Agapè, la Charité."},
    ]},
];
const METALS = new Set(["or","argent"]);
let introAns = [null,null,null,null];

function composeFromAnswers(a){
  const virtue=a[1].email, partition=a[3].partition;
  let A,B,meubleTinct;
  if(partition==="plein"){ A=virtue; B=virtue; meubleTinct = METALS.has(A)?"gueules":"or"; }
  else if(partition==="coupe"){ A="or"; B="sable"; meubleTinct = (virtue==="or"||virtue==="sable")?"argent":virtue; }
  else { A=virtue; B=METALS.has(virtue)?"azur":"argent"; meubleTinct = (A!=="or"&&B!=="or")?"or":"argent"; }
  return { forme:"demi-amande", partition, A, B, meuble:a[2].meuble, meubleTinct, cimier:a[0].cimier, cimierTinct:a[0].cimierTinct, devise:"" };
}
function renderIntroStep(i){
  const Q=INTRO[i];
  document.getElementById("intro-dots").innerHTML =
    INTRO.map((_,k)=>`<span class="dot${k<i?' done':''}${k===i?' cur':''}">✦</span>`).join("");
  const opts=Q.options.map((o,oi)=>
    `<button class="intro-opt" type="button" data-oi="${oi}"><span class="opt-l">${o.label}</span><span class="opt-h">${o.hint}</span></button>`).join("");
  document.getElementById("intro-body").innerHTML =
    `<p class="intro-step">Question ${i+1} / 4</p><h2 class="intro-h">${Q.q}</h2><p class="intro-sub">${Q.sub}</p><div class="intro-opts">${opts}</div>`;
  document.querySelectorAll(".intro-opt").forEach(b=>b.addEventListener("click",()=>{
    introAns[i]=Q.options[+b.dataset.oi];
    if(i<INTRO.length-1) renderIntroStep(i+1); else showIntroResult();
  }));
}
function showIntroResult(){
  Object.assign(S, composeFromAnswers(introAns)); fillSelects(); update();
  const ecu=document.getElementById("ecu").innerHTML;
  document.getElementById("intro-dots").innerHTML="";
  document.getElementById("intro-body").innerHTML =
    `<h2 class="intro-h">Voici tes armes</h2>
     <div class="intro-ecu">${ecu}</div>
     <p class="intro-bl">${blason()}</p>
     <div class="intro-why">${introAns.map(a=>`<p>✦ ${a.why}</p>`).join("")}</div>
     <div class="intro-actions">
       <button id="intro-enter" type="button">Entrer dans l'atelier</button>
       <button id="intro-again" type="button" class="ghost">Recommencer</button>
     </div>`;
  document.getElementById("intro-enter").addEventListener("click", closeIntro);
  document.getElementById("intro-again").addEventListener("click", ()=>{ introAns=[null,null,null,null]; renderIntroStep(0); });
}
function openIntro(){ introAns=[null,null,null,null]; document.getElementById("intro").hidden=false; renderIntroStep(0); }
function closeIntro(){ document.getElementById("intro").hidden=true; }
document.getElementById("open-intro").addEventListener("click", openIntro);
document.getElementById("intro-close").addEventListener("click", closeIntro);
document.getElementById("intro").addEventListener("click", e=>{ if(e.target.id==="intro") closeIntro(); });
