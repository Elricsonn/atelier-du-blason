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
  hermine: { nom:"Hermine (fourrure)", hex:"#e9eaee", type:"fourrure", lum:"Pureté virginale sous aspect totémique : la force vivante de l'animal au pelage immaculé ; même sens que l'argent (état marial, l'Œuvre au Blanc), mais incarné. « Plutôt la mort que la souillure » (Anne de Bretagne : « À ma vie », jeu sur amavi, « j'ai aimé »). La moucheture porte un aspect trinitaire.", dechu:"pureté affichée puis reniée ; la souillure consentie.", page:56 },
  vair:    { nom:"Vair (fourrure)",    hex:"#9fb6d4", type:"fourrure", lum:"Argent et azur conjugués : la pureté du cœur (argent) et l'élévation par l'Esprit (azur) unies et potentialisées ; la fourrure du « petit-gris ».", dechu:"", page:57 },
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
  "ecartele-sautoir": { nom:"Écartelé en sautoir (croix de St-André)", regions:2, lum:"Division en X : l'élan vital et spirituel, l'âme ardente ; le X (chi) du Christ, signe de la Résurrection ; l'allègement du moi, l'esprit d'enfance.", dechu:"dispersion, éclatement, le saut de prédateur sur les sensations.", page:87 },
  "gironne":  { nom:"Gironné (huit girons)", regions:2, lum:"Huit girons rayonnant du centre : le tournoiement missionnaire, la Parole irradiant du cœur immobile vers les directions de l'espace.", dechu:"rotation à vide, le vent contraire au Souffle de l'Esprit.", page:88 },
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

// ---------- Pièces honorables (ordinaires brochant sur le champ) ----------
const PIECES = {
  "":        { nom:"— aucune —", lum:"", dechu:"", page:null, bl:"", draw:"" },
  "chef":    { nom:"Chef", bl:"au chef", page:null,
               lum:"La part haute de l'écu : le Ciel, la tête, l'autorité reçue d'en haut ; marque d'honneur et de commandement.", dechu:"orgueil du rang, autorité usurpée.",
               draw:'<rect x="0" y="0" width="200" height="60"/>' },
  "champagne":{ nom:"Champagne", bl:"à la champagne", page:null,
               lum:"La bande basse : la terre ferme, le socle ; l'humilité qui porte tout l'édifice.", dechu:"pesanteur, enlisement.",
               draw:'<rect x="0" y="180" width="200" height="60"/>' },
  "fasce":   { nom:"Fasce", bl:"à la fasce", page:81,
               lum:"La ceinture, le lien horizontal ; l'horizon, la juste mesure, la fidélité qui tient.", dechu:"barrage entre le Ciel et la terre.",
               draw:'<rect x="0" y="90" width="200" height="60"/>' },
  "pal":     { nom:"Pal", bl:"au pal", page:79,
               lum:"Le pieu planté, l'axe droit, les défenses avancées ; la rectitude qui se tient debout.", dechu:"raideur, orgueil du pieu.",
               draw:'<rect x="70" y="0" width="60" height="240"/>' },
  "bande":   { nom:"Bande", bl:"à la bande", page:83,
               lum:"Le baudrier du chevalier : l'élan qui monte vers le chef dextre, la diagonale de l'effort vers la lumière.", dechu:"",
               draw:'<polygon points="-17.7,14.7 17.7,-14.7 217.7,225.3 182.3,254.7"/>' },
  "barre":   { nom:"Barre", bl:"à la barre", page:83,
               lum:"Reflet de la bande, descendante.", dechu:"souvent brisure — marque de cadet ou de bâtardise.",
               draw:'<polygon points="182.3,-14.7 217.7,14.7 17.7,254.7 -17.7,225.3"/>' },
  "chevron": { nom:"Chevron", bl:"au chevron", page:null,
               lum:"Les deux versants du toit, les branches du compas ; la protection du foyer, l'élévation appuyée sur deux jambes fermes.", dechu:"",
               draw:'<polygon points="100,48 200,140 165,140 100,92 35,140 0,140"/>' },
  "croix":   { nom:"Croix (pièce)", bl:"à la croix", page:85,
               lum:"La Croix qui traverse tout l'écu : l'axe du monde, le don de soi, le Christ au centre de l'être.", dechu:"",
               draw:'<rect x="70" y="0" width="60" height="240"/><rect x="0" y="90" width="200" height="60"/>' },
  "sautoir": { nom:"Sautoir", bl:"au sautoir", page:87,
               lum:"La croix de saint André, en X : le carrefour, l'épreuve traversée, le lien des quatre directions.", dechu:"",
               draw:'<polygon points="-17.7,14.7 17.7,-14.7 217.7,225.3 182.3,254.7"/><polygon points="182.3,-14.7 217.7,14.7 17.7,254.7 -17.7,225.3"/>' },
  "bordure": { nom:"Bordure", bl:"à la bordure", page:null,
               lum:"L'enceinte qui ceint et garde l'écu : la muraille de la Cité, la vigilance qui protège le dedans.", dechu:"enfermement, repli sur soi.",
               draw:"BORDURE" },
  "pairle":  { nom:"Pairle", bl:"au pairle", page:99,
               lum:"Le Y de l'orant (bras levés vers le Ciel), le pallium de l'évêque, la croix du bon larron ; un calice ouvert qui reçoit la Lumière.", dechu:"accaparement, avarice spirituelle (le gousset-bourse).",
               draw:'<path d="M86,116 L0,0 L42,0 L100,80 L158,0 L200,0 L114,116 L114,240 L86,240 Z"/>' },
  "franc-quartier": { nom:"Franc-quartier", bl:"au franc-quartier", page:101,
               lum:"Le carré en chef-dextre : l'oculus, la fenêtre par où descend la lumière de grâce ; le « regard » céleste, marque d'honneur.", dechu:"la fenêtre murée, le refus de la lumière.",
               draw:'<rect x="0" y="0" width="100" height="100"/>' },
  "pile":    { nom:"Pile", bl:"à la pile", page:102,
               lum:"Le long triangle descendant du chef : la langue de feu pentecôtique, la comète (étoile du Berger) qui ensemence l'âme de Lumière ; l'Espérance.", dechu:"la chute qui s'accélère, le précipice sans fond.",
               draw:'<polygon points="67,0 133,0 100,230"/>' },
  "ecusson": { nom:"Écusson — le cœur (sur-le-tout)", bl:"à l'écusson", page:96,
               lum:"Le petit écu posé au cœur même de l'écu : le centre, le tabernacle, la « fine pointe de l'âme » ; le grain de sénevé dont la condition est l'humilité — la cible où l'on touche le cœur de Dieu.", dechu:"le cœur gonflé d'orgueil, pétrifié ; la fracture qui déséquilibre l'être.",
               draw:'<path d="M72,72 L128,72 L128,104 Q128,128 100,140 Q72,128 72,104 Z"/>' },
};

// ---------- État ----------
// État de départ : exemple GÉNÉRIQUE (aucune donnée personnelle).
// charges : liste de figures, chacune {k: meuble, t: teinture, p: position}
const S = { forme:"demi-amande", partition:"parti", A:"gueules", B:"argent", piece:"", pieceTinct:"or", charges:[{k:"lys",t:"or",p:"coeur"}], cimier:"etoile", cimierTinct:"argent", devise:"" };

// ---------- Positions des figures dans l'écu (coordonnées du champ + échelle + phrase de blason) ----------
// dextre = côté du porteur = NOTRE gauche (x < 100). senestre = notre droite (x > 100).
const POSITIONS = {
  "coeur":           { nom:"Cœur (centre)",                 x:100, y:110, s:2.4,  bl:"" },
  "chef":            { nom:"En chef (haut, centre)",        x:100, y:44,  s:1.5,  bl:"en chef" },
  "pointe":          { nom:"En pointe (bas, centre)",       x:100, y:184, s:1.4,  bl:"en pointe" },
  "chef-dextre":     { nom:"Quartier 1 — chef dextre",      x:58,  y:56,  s:1.55, bl:"au canton dextre du chef" },
  "chef-senestre":   { nom:"Quartier 2 — chef senestre",    x:142, y:56,  s:1.55, bl:"au canton senestre du chef" },
  "pointe-dextre":   { nom:"Quartier 3 — pointe dextre",    x:70,  y:162, s:1.4,  bl:"au canton dextre de la pointe" },
  "pointe-senestre": { nom:"Quartier 4 — pointe senestre",  x:130, y:162, s:1.4,  bl:"au canton senestre de la pointe" },
};

// ---------- Rendu de l'écu ----------
let HATCH=false;                       // mode hachures héraldiques (noir & blanc, convention Petra Sancta)
function paint(k){
  if(TINCTURES[k].type==="fourrure") return `url(#f-${k})`;   // fourrure = motif, en couleur ET en hachures
  return HATCH ? `url(#h-${k})` : TINCTURES[k].hex;
}
const FOURRURES = `
<pattern id="f-hermine" width="36" height="36" patternUnits="userSpaceOnUse"><rect width="36" height="36" fill="#e9eaee"/><g fill="#1c1c20"><g transform="translate(9,13)"><path d="M0,-3 C-2.6,-0.5 -3.2,3.6 0,6.6 C3.2,3.6 2.6,-0.5 0,-3 Z"/><circle cx="-2.4" cy="-4.3" r=".95"/><circle cx="0" cy="-5.7" r=".95"/><circle cx="2.4" cy="-4.3" r=".95"/></g><g transform="translate(27,31)"><path d="M0,-3 C-2.6,-0.5 -3.2,3.6 0,6.6 C3.2,3.6 2.6,-0.5 0,-3 Z"/><circle cx="-2.4" cy="-4.3" r=".95"/><circle cx="0" cy="-5.7" r=".95"/><circle cx="2.4" cy="-4.3" r=".95"/></g></g></pattern>
<pattern id="f-vair" width="40" height="32" patternUnits="userSpaceOnUse"><rect width="40" height="32" fill="#e9eaee"/><g fill="#23508f"><path d="M0,0 H20 C18,11 12,16 10,16 C8,16 2,11 0,0 Z"/><path d="M20,0 H40 C38,11 32,16 30,16 C28,16 22,11 20,0 Z"/><path d="M-10,16 H10 C8,27 2,32 0,32 C-2,32 -8,27 -10,16 Z"/><path d="M10,16 H30 C28,27 22,32 20,32 C18,32 12,27 10,16 Z"/><path d="M30,16 H50 C48,27 42,32 40,32 C38,32 32,27 30,16 Z"/></g></pattern>`;
const HATCHES = `
<pattern id="h-or" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#fff"/><circle cx="2.5" cy="2.5" r="0.55" fill="#111"/></pattern>
<pattern id="h-argent" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#fff"/></pattern>
<pattern id="h-gueules" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#fff"/><line x1="0" y1="0" x2="0" y2="5" stroke="#111" stroke-width="0.7"/></pattern>
<pattern id="h-azur" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#fff"/><line x1="0" y1="0" x2="5" y2="0" stroke="#111" stroke-width="0.7"/></pattern>
<pattern id="h-sable" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#fff"/><line x1="0" y1="0" x2="0" y2="5" stroke="#111" stroke-width="0.7"/><line x1="0" y1="0" x2="5" y2="0" stroke="#111" stroke-width="0.7"/></pattern>
<pattern id="h-sinople" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#fff"/><line x1="0" y1="0" x2="5" y2="5" stroke="#111" stroke-width="0.7"/></pattern>
<pattern id="h-pourpre" width="5" height="5" patternUnits="userSpaceOnUse"><rect width="5" height="5" fill="#fff"/><line x1="5" y1="0" x2="0" y2="5" stroke="#111" stroke-width="0.7"/></pattern>`;
function pieceSVG(){
  const p=PIECES[S.piece]; if(!S.piece||!p||!p.draw) return "";
  const fill=paint(S.pieceTinct);
  if(S.piece==="bordure")
    return `<path d="${SHIELD[S.forme]}" fill="none" stroke="${fill}" stroke-width="20"/><path d="${SHIELD[S.forme]}" fill="none" stroke="rgba(0,0,0,.3)" stroke-width="1"/>`;
  return `<g fill="${fill}" stroke="rgba(0,0,0,.35)" stroke-width="1">${p.draw}</g>`;
}
function fieldRegions(){
  const A=paint(S.A), B=paint(S.B);
  switch(S.partition){
    case "plein": return `<rect x="0" y="0" width="200" height="240" fill="${A}"/>`;
    case "parti": return `<rect x="0" y="0" width="100" height="240" fill="${A}"/><rect x="100" y="0" width="100" height="240" fill="${B}"/>`;
    case "coupe": return `<rect x="0" y="0" width="200" height="120" fill="${A}"/><rect x="0" y="120" width="200" height="120" fill="${B}"/>`;
    case "ecartele": return `<rect x="0" y="0" width="100" height="120" fill="${A}"/><rect x="100" y="0" width="100" height="120" fill="${B}"/><rect x="0" y="120" width="100" height="120" fill="${B}"/><rect x="100" y="120" width="100" height="120" fill="${A}"/>`;
    case "tranche": return `<polygon points="0,0 200,0 200,240" fill="${A}"/><polygon points="0,0 200,240 0,240" fill="${B}"/>`;
    case "taille": return `<polygon points="0,0 200,0 0,240" fill="${A}"/><polygon points="200,0 200,240 0,240" fill="${B}"/>`;
    case "ecartele-sautoir": return `<polygon points="0,0 200,0 100,120" fill="${A}"/><polygon points="0,240 200,240 100,120" fill="${A}"/><polygon points="0,0 0,240 100,120" fill="${B}"/><polygon points="200,0 200,240 100,120" fill="${B}"/>`;
    case "gironne": { const P=[[100,0],[200,0],[200,120],[200,240],[100,240],[0,240],[0,120],[0,0]]; let g=""; for(let i=0;i<8;i++){const a=P[i],b=P[(i+1)%8]; g+=`<polygon points="100,120 ${a[0]},${a[1]} ${b[0]},${b[1]}" fill="${i%2?B:A}"/>`;} return g; }
  }
}
function placedCharge(key, tinctKey, x, y, scale, idns){
  const m=MEUBLES[key]; if(!key||!m) return "";
  const tinct = HATCH ? "#ffffff" : TINCTURES[tinctKey].hex;   // en hachures : meuble en trait (blanc + contour)
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
  const border = HATCH ? "#1a1a1a" : "#caa24a";
  const cimier = S.cimier ? placedCharge(S.cimier, S.cimierTinct, 100, -24, 0.9, "c") : "";
  const dev = S.devise ? `<g><path d="M18,250 Q100,234 182,250 Q100,268 18,250 Z" fill="#f3ead4" stroke="#caa12e"/><text x="100" y="254" text-anchor="middle" font-size="12" fill="#5a4a1e" font-style="italic">${escapeXML(S.devise)}</text></g>` : "";
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -56 200 328">
    <defs>${HATCHES}${FOURRURES}<clipPath id="sh"><path d="${path}"/></clipPath></defs>
    ${cimier}
    <g clip-path="url(#sh)">${fieldRegions()}${pieceSVG()}${S.charges.map((c,i)=>{const P=POSITIONS[c.p]||POSITIONS.coeur; return placedCharge(c.k, c.t, P.x, P.y, P.s, "m"+i);}).join("")}</g>
    <path d="${path}" fill="none" stroke="${border}" stroke-width="3.5"/>
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
  const de=n=>/^[aeiouyhàâäéèêëîïôöûü]/i.test(n)?`d'${n}`:`de ${n}`;   // élision (h muet : d'hermine)
  const art=k=>MEUBLES_MASC.has(k)?"un":"une";                        // genre
  const Cap=s=>s.charAt(0).toUpperCase()+s.slice(1);
  let f = FORMES[S.forme].nom.toLowerCase();
  let champ;
  if(S.partition==="plein") champ=Cap(de(t(S.A)));
  else if(S.partition==="coupe") champ=`Coupé : au chef ${de(t(S.A))}, en pointe ${de(t(S.B))}`;
  else if(S.partition==="parti") champ=`Parti : à dextre ${de(t(S.A))}, à senestre ${de(t(S.B))}`;
  else if(S.partition==="ecartele") champ=`Écartelé ${de(t(S.A))} et ${de(t(S.B))}`;
  else if(S.partition==="tranche") champ=`Tranché ${de(t(S.A))} et ${de(t(S.B))}`;
  else if(S.partition==="ecartele-sautoir") champ=`Écartelé en sautoir ${de(t(S.A))} et ${de(t(S.B))}`;
  else if(S.partition==="gironne") champ=`Gironné ${de(t(S.A))} et ${de(t(S.B))}`;
  else champ=`Taillé ${de(t(S.A))} et ${de(t(S.B))}`;
  let parts=[champ];
  if(S.piece) parts.push(`${PIECES[S.piece].bl} ${de(t(S.pieceTinct))}`);
  const chs = S.charges.filter(c=>c.k);
  if(chs.length){
    const liste = chs.map(c=>{ const P=POSITIONS[c.p]; return `${art(c.k)} ${MEUBLES[c.k].nom.toLowerCase()} ${de(t(c.t))}${P&&P.bl?` ${P.bl}`:""}`; }).join(" et ");
    parts.push(`brochant ${liste}`);
  }
  let str = parts.join(" ; ") + ".";
  if(S.cimier) str += ` Cimier : ${art(S.cimier)} ${MEUBLES[S.cimier].nom.toLowerCase()} ${de(t(S.cimierTinct))}.`;
  if(S.devise) str += ` Devise : « ${S.devise} ».`;
  return `(${f}) ${str}`;
}

// ---------- Lecture spirituelle ----------
function senses(){
  const item=(label,o,cls="")=> o&&o.lum ? `<div class="item${cls?" "+cls:""}"><b>${label} :</b> <span class="lum">✦ ${o.lum}</span>${o.dechu?`<span class="dechu">⟂ ${o.dechu}</span>`:""}${o.page?`<span class="pg">— p. ${o.page}</span>`:""}</div>` : "";
  const T=k=>TINCTURES[k];
  let h="";
  h+=item("Forme — "+FORMES[S.forme].nom, FORMES[S.forme]);
  h+=item("Champ — "+PARTITIONS[S.partition].nom, PARTITIONS[S.partition]);
  h+=item("Émail A — "+T(S.A).nom, T(S.A));
  if(PARTITIONS[S.partition].regions>1) h+=item("Émail B — "+T(S.B).nom, T(S.B));
  if(S.piece){ h+=item("Pièce — "+PIECES[S.piece].nom, PIECES[S.piece]); h+=item("↳ "+T(S.pieceTinct).nom, T(S.pieceTinct), "sub"); }
  S.charges.filter(c=>c.k).forEach(c=>{ const pos=POSITIONS[c.p]&&POSITIONS[c.p].bl; h+=item("Meuble — "+MEUBLES[c.k].nom+(pos?` (${pos})`:""), MEUBLES[c.k]); h+=item("↳ "+T(c.t).nom, T(c.t), "sub"); });
  if(S.cimier){ h+=item("Cimier — "+MEUBLES[S.cimier].nom, MEUBLES[S.cimier]); h+=item("↳ "+T(S.cimierTinct).nom, T(S.cimierTinct), "sub"); }
  return h;
}

// ---------- Garde-fou règle de tincture ----------
function tinctureWarn(){
  const w=[]; const P=PARTITIONS[S.partition];
  if(P.regions>1){
    const a=TINCTURES[S.A].type, b=TINCTURES[S.B].type;
    if(a===b && a!=="amphibie" && a!=="fourrure") w.push(`Champ : ${TINCTURES[S.A].nom} et ${TINCTURES[S.B].nom} sont tous deux ${a==="métal"?"des métaux":"des émaux"} — la règle veut « ni métal sur métal, ni émail sur émail ».`);
  }
  // figures vs fond qu'elles touchent (approx : sur partition, elles touchent les 2 régions)
  S.charges.filter(c=>c.k && MEUBLES[c.k].rendu).forEach(c=>{
    const mt=TINCTURES[c.t].type;
    const fonds = P.regions>1 ? [TINCTURES[S.A].type, TINCTURES[S.B].type] : [TINCTURES[S.A].type];
    if(mt!=="amphibie" && mt!=="fourrure" && fonds.every(f=>f===mt && f!=="amphibie" && f!=="fourrure")) w.push(`La figure ${MEUBLES[c.k].nom} (${TINCTURES[c.t].nom}) est de même nature que son fond — ${mt==="métal"?"métal sur métal":"émail sur émail"}. (Sur une partition métal+couleur, une figure brochant peut être tolérée, ou « de l'un en l'autre ».)`);
  });
  // pièce honorable vs champ
  if(S.piece){
    const pt=TINCTURES[S.pieceTinct].type;
    const fonds = P.regions>1 ? [TINCTURES[S.A].type, TINCTURES[S.B].type] : [TINCTURES[S.A].type];
    if(pt!=="amphibie" && pt!=="fourrure" && fonds.every(f=>f===pt && f!=="amphibie" && f!=="fourrure")) w.push(`La pièce honorable (${TINCTURES[S.pieceTinct].nom}) est de même nature que le champ — ${pt==="métal"?"métal sur métal":"émail sur émail"}.`);
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
  const tinctOptsPlain = sel => Object.entries(TINCTURES).filter(([,o])=>o.type!=="fourrure").map(([k,o])=>opt(k,o.nom,sel)).join("");
  document.getElementById("tinctureA").innerHTML = tinctOpts(S.A);
  document.getElementById("tinctureB").innerHTML = tinctOpts(S.B);
  document.getElementById("piece").innerHTML = Object.entries(PIECES).map(([k,o])=>opt(k,o.nom,S.piece)).join("");
  document.getElementById("pieceTinct").innerHTML = tinctOpts(S.pieceTinct);
  document.getElementById("cimierTinct").innerHTML = tinctOptsPlain(S.cimierTinct);
  const meubleOpts = sel => Object.entries(MEUBLES).map(([k,o])=>opt(k,o.nom + (o.rendu===null&&k?" (figure à venir)":""),sel)).join("");
  document.getElementById("cimier").innerHTML = meubleOpts(S.cimier);
  document.getElementById("devise").value = S.devise;
  renderCharges();
}
// Liste dynamique des figures (meuble · teinture · position), un par ligne, ajout/retrait libres.
function renderCharges(){
  const list=document.getElementById("charges-list"); if(!list) return;
  const meubleOpts = sel => Object.entries(MEUBLES).map(([k,o])=>opt(k,o.nom + (o.rendu===null&&k?" (figure à venir)":""),sel)).join("");
  const tinctPlain = sel => Object.entries(TINCTURES).filter(([,o])=>o.type!=="fourrure").map(([k,o])=>opt(k,o.nom,sel)).join("");
  const posOpts = sel => Object.entries(POSITIONS).map(([k,o])=>opt(k,o.nom,sel)).join("");
  list.innerHTML = S.charges.map((c,i)=>`
    <div class="charge-row" data-i="${i}">
      <select class="ch-k">${meubleOpts(c.k)}</select>
      <div class="row"><label>Teinture</label><select class="ch-t tinct">${tinctPlain(c.t)}</select></div>
      <div class="row"><label>Position</label><select class="ch-p tinct">${posOpts(c.p)}</select></div>
      ${S.charges.length>1?`<button type="button" class="ch-del">✕ retirer cette figure</button>`:""}
    </div>`).join("");
  list.querySelectorAll(".charge-row").forEach(row=>{
    const i=+row.dataset.i;
    row.querySelector(".ch-k").addEventListener("change",e=>{S.charges[i].k=e.target.value; update();});
    row.querySelector(".ch-t").addEventListener("change",e=>{S.charges[i].t=e.target.value; update();});
    row.querySelector(".ch-p").addEventListener("change",e=>{S.charges[i].p=e.target.value; update();});
    const del=row.querySelector(".ch-del"); if(del) del.addEventListener("click",()=>{S.charges.splice(i,1); renderCharges(); update();});
  });
}
function bind(){
  const set=(id,key)=>document.getElementById(id).addEventListener("change",e=>{S[key]=e.target.value; update();});
  set("forme","forme"); set("partition","partition"); set("tinctureA","A"); set("tinctureB","B");
  set("piece","piece"); set("pieceTinct","pieceTinct");
  set("cimier","cimier"); set("cimierTinct","cimierTinct");
  document.getElementById("add-charge").addEventListener("click",()=>{ S.charges.push({k:"",t:"or",p:"coeur"}); renderCharges(); update(); });
  document.getElementById("devise").addEventListener("input",e=>{S.devise=e.target.value; update();});
  document.getElementById("toggle-hatch").addEventListener("click",()=>{
    HATCH=!HATCH;
    const b=document.getElementById("toggle-hatch");
    b.classList.toggle("active",HATCH);
    b.textContent = HATCH ? "🎨 Couleurs" : "▦ Hachures (N&B)";
    render();
  });
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

// ---------- Mode introspection v2 (examen de conscience héraldique, 7 temps) ----------
// Fondé sur la synthèse intégrale de Gambirasio (cf. 03.05.05.03/04 - Synthèse…).
// Chaque option porte un `apply` (état partiel) + `why` (lecture) ; la dernière question
// porte aussi une `ombre` (le sens déchu à veiller). Le champ B et la tincture de la garde
// sont dérivés dans composeFromAnswers.
const METALS = new Set(["or","argent"]);
const FOURR  = new Set(["hermine","vair"]);
const INTRO = [
  { q:"Que suis-je devant Dieu ?", sub:"La forme même de ton âme (la table d'attente).", options:[
    {label:"Un chevalier en marche vers la Cité", hint:"demi-amande — la mandorle, le Graal", apply:{forme:"demi-amande"},
     why:"Tu es un <b>chevalier en marche</b> : la <b>demi-amande</b>, mandorle du Christ et de la Vierge, portail ouvert sur le Ciel, Cœur et Graal."},
    {label:"Un être accompli, rendu à sa seigneurie", hint:"bannière — Jérusalem céleste", apply:{forme:"banniere"},
     why:"Tu te tiens <b>accompli</b> : l'écu en <b>bannière</b>, stabilité et perfection, la Jérusalem céleste."},
    {label:"Une âme féconde, qui s'enfante sous l'Esprit", hint:"ovale — parturition", apply:{forme:"ovale"},
     why:"Tu es <b>âme féconde</b> : l'écu <b>ovale</b>, fécondité et parturition spirituelle."},
    {label:"Un élan fragile, une vie offerte", hint:"losange — le fuseau", apply:{forme:"losange"},
     why:"Tu es <b>élan offert</b> : le <b>losange</b>, fragilité et élan de la vie."},
  ]},
  { q:"Vers quelle Lumière mon âme tend-elle ?", sub:"Ce qui te couronne et te guide (le rapport à la Source).", options:[
    {label:"La Lumière incréée, le Christ-Roi", hint:"soleil d'or", apply:{cimier:"soleil",cimierTinct:"or"},
     why:"Tu tends vers la <b>Lumière incréée</b> — un <b>soleil d'or</b> te couronne (<i>Sol Justitiæ</i>, christophore)."},
    {label:"Un guide dans la nuit (l'Étoile du Matin)", hint:"étoile d'or", apply:{cimier:"etoile",cimierTinct:"or"},
     why:"Tu tends vers <b>un guide dans la nuit</b> — l'<b>Étoile du Matin, d'or</b> (étoile du Berger, <i>Stella Maris</i>, promise au vainqueur)."},
    {label:"La paix, le miroir (Notre-Dame)", hint:"lune d'argent", apply:{cimier:"lune",cimierTinct:"argent"},
     why:"Tu tends vers <b>la paix, le miroir</b> — une <b>lune d'argent</b> (Miroir de Justice)."},
    {label:"L'amour en odeur de sainteté", hint:"rose d'or", apply:{cimier:"rose",cimierTinct:"or"},
     why:"Tu tends vers <b>l'amour</b> — une <b>rose d'or</b> (Amour spirituel & Connaissance)."},
    {label:"La royauté du cœur offert", hint:"lys d'or", apply:{cimier:"lys",cimierTinct:"or"},
     why:"Tu tends vers <b>la royauté du cœur offert</b> — un <b>lys d'or</b> (Foi + Sapience + Prouesse → la Paix)."},
    {label:"Le don de soi, la Croix", hint:"croix d'or", apply:{cimier:"croix",cimierTinct:"or"},
     why:"Tu tends vers <b>le don de soi</b> — une <b>croix d'or</b> (le Verbe, le Signe au-dessus de tout signe)."},
  ]},
  { q:"Quelle vertu me colore ?", sub:"Elle teinte le champ de ton être.", options:[
    {label:"La Foi, la perfection", hint:"or", apply:{A:"or"}, why:"La <b>Foi</b> te colore : ton champ d'<b>or</b>, perfection et Lumière (Œuvre au Rouge)."},
    {label:"L'Espérance, la jeunesse de l'âme", hint:"sinople", apply:{A:"sinople"}, why:"L'<b>Espérance</b> te colore : <b>sinople</b>, vert de la jeunesse de l'âme."},
    {label:"La Charité ardente, la Force", hint:"gueules", apply:{A:"gueules"}, why:"La <b>Charité & la Force</b> te colorent : <b>gueules</b>, l'amour ardent, la lampe, le sang."},
    {label:"L'élévation par l'Esprit", hint:"azur", apply:{A:"azur"}, why:"L'<b>élévation par l'Esprit</b> te colore : <b>azur</b>, couleur de la Vierge."},
    {label:"La royauté, la transmutation", hint:"pourpre", apply:{A:"pourpre"}, why:"La <b>royauté/transmutation</b> te colore : <b>pourpre</b>, déification de l'être."},
    {label:"L'humilité, le renoncement", hint:"sable", apply:{A:"sable"}, why:"L'<b>humilité</b> te colore : <b>sable</b>, l'humus des vertus (Œuvre au Noir)."},
    {label:"La pureté, la réceptivité mariale", hint:"argent", apply:{A:"argent"}, why:"La <b>pureté réceptive</b> te colore : <b>argent</b>, état marial (Œuvre au Blanc)."},
    {label:"La pureté gardée jusqu'à la mort", hint:"hermine (fourrure)", apply:{A:"hermine"}, why:"Ta pureté est <b>gardée jusqu'à la mort</b> : l'<b>hermine</b> — « plutôt mourir que se souiller »."},
    {label:"La pureté du cœur ET l'élévation", hint:"vair (fourrure)", apply:{A:"vair"}, why:"Pureté <b>et</b> élévation conjuguées : le <b>vair</b> (argent + azur, le petit-gris)."},
  ]},
  { q:"Quelle est ma vocation parmi les hommes ?", sub:"Elle prend une figure au cœur de l'écu.", options:[
    {label:"Veiller et garder", hint:"la tour", apply:{meuble:"tour"}, why:"Ta vocation : <b>veiller et garder</b> — la <b>tour</b> (ascension + garde, tour d'ivoire, four ardent)."},
    {label:"Relier deux mondes (du moi au soi)", hint:"le pont", apply:{meuble:"pont"}, why:"Ta vocation : <b>relier</b> — le <b>pont</b>, du moi au soi, franchi par la prouesse, soutenu par la Foi."},
    {label:"Éclairer, tenir la lampe dans la nuit", hint:"la lampe", apply:{meuble:"lampe"}, why:"Ta vocation : <b>éclairer</b> — la <b>lampe</b> des vierges sages, tenue dans la nuit."},
    {label:"Combattre pour la Foi et les faibles", hint:"le lion", apply:{meuble:"lion"}, why:"Ta vocation : <b>combattre pour les faibles</b> — le <b>lion</b>, Miles Christi, Lion de Juda."},
    {label:"Garder le seuil, discerner", hint:"le léopard", apply:{meuble:"leopard"}, why:"Ta vocation : <b>garder le seuil</b> — le <b>léopard</b> (leo-pardès), vigilance, passeur d'âmes."},
    {label:"Monter vers l'Esprit, fixer le Soleil", hint:"l'aigle", apply:{meuble:"aigle"}, why:"Ta vocation : <b>monter vers l'Esprit</b> — l'<b>aigle</b>, l'âme volatile qui regarde le Soleil."},
    {label:"Régner sur soi, le cœur offert", hint:"le lys", apply:{meuble:"lys"}, why:"Ta vocation : la <b>royauté du dedans</b> — le <b>lys</b> (Foi + Sapience + Prouesse)."},
    {label:"Aimer et connaître", hint:"la rose", apply:{meuble:"rose"}, why:"Ta vocation : <b>aimer et connaître</b> — la <b>rose</b> (5 Plaies, « en odeur de sainteté »)."},
    {label:"Tenir l'Espérance dans la tempête", hint:"l'ancre", apply:{meuble:"ancre"}, why:"Ta vocation : <b>tenir l'Espérance</b> — l'<b>ancre</b> de l'âme (He 6,19)."},
    {label:"Porter la Croix", hint:"la croix", apply:{meuble:"croix"}, why:"Ta vocation : <b>porter la Croix</b> — l'axe du don de soi, le Verbe."},
  ]},
  { q:"De quelle lumière brille ta figure ?", sub:"« Tour d'or n'est pas tour de gueules » — l'émail change le sens.", options:[
    {label:"D'or — Foi, Lumière incréée", hint:"or", apply:{meubleTinct:"or"}, why:"Ta figure est <b>d'or</b> : Foi et Lumière incréée."},
    {label:"De gueules — Force & Charité ardentes", hint:"gueules", apply:{meubleTinct:"gueules"}, why:"Ta figure est <b>de gueules</b> : Force et Charité, le feu ardent de l'Esprit."},
    {label:"D'argent — pureté mariale", hint:"argent", apply:{meubleTinct:"argent"}, why:"Ta figure est <b>d'argent</b> : pureté, état marial (l'albedo)."},
    {label:"D'azur — élévation par l'Esprit", hint:"azur", apply:{meubleTinct:"azur"}, why:"Ta figure est <b>d'azur</b> : élévation par l'Esprit."},
    {label:"De sable — enracinée dans la nuit", hint:"sable", apply:{meubleTinct:"sable"}, why:"Ta figure est <b>de sable</b> : enracinée dans l'humilité, la nuit d'où l'on monte."},
    {label:"De sinople — Espérance vivante", hint:"sinople", apply:{meubleTinct:"sinople"}, why:"Ta figure est <b>de sinople</b> : l'Espérance, la jeunesse de l'âme."},
  ]},
  { q:"Comment suis-je ordonné ?", sub:"La structure profonde de ton être.", options:[
    {label:"D'un seul tenant — l'unité de l'être", hint:"plein", apply:{partition:"plein"}, why:"Tu es <b>un</b> : champ <b>plein</b>, l'unité et la simplicité de l'être (le « vide plein »)."},
    {label:"Tendu entre le Ciel et la terre", hint:"coupé", apply:{partition:"coupe"}, why:"Tu es <b>tendu entre Ciel et terre</b> : le <b>coupé</b>, hiérogamie qui « enfante l'être dans l'Esprit »."},
    {label:"Deux forces à unir par l'Amour", hint:"parti", apply:{partition:"parti"}, why:"Tu unis <b>deux forces</b> : le <b>parti</b>, dont la ligne est l'<b>Agapè</b>."},
    {label:"La Croix aux quatre directions", hint:"écartelé", apply:{partition:"ecartele"}, why:"La <b>Croix</b> te structure : l'<b>écartelé</b>, fermeté dans la Foi, la Parole aux quatre directions."},
    {label:"L'élan, l'éclair vers la lumière", hint:"tranché", apply:{partition:"tranche"}, why:"Tu es <b>élan</b> : le <b>tranché</b>, l'éclair qui fuse de l'angle dextre (l'écharpe du Miles Christi)."},
  ]},
  { q:"Que dois-je garder — et contre quelle ombre veiller ?", sub:"La garde du cœur, et la passion qui te guette.", options:[
    {label:"La veille des vierges sages", hint:"bordure — contre la tiédeur", apply:{piece:"bordure"},
     why:"Tu gardes ton cœur par la <b>veille</b> : une <b>bordure</b>, l'enceinte qui veille comme les vierges sages.",
     ombre:"la <b>tiédeur, l'endormissement</b> — « parce que tu es tiède, je vais te vomir » (Apoc 3,16)."},
    {label:"L'humilité qui porte tout", hint:"champagne — contre l'orgueil", apply:{piece:"champagne"},
     why:"Tu gardes ton cœur par l'<b>humilité</b> : une <b>champagne</b>, le socle, l'humus des vertus.",
     ombre:"l'<b>orgueil</b> — l'astre infernal, le chef changé en chape de plomb."},
    {label:"La rectitude, l'axe vers le Ciel", hint:"pal — contre la dispersion", apply:{piece:"pal"},
     why:"Tu gardes ton cœur par la <b>rectitude</b> : un <b>pal</b>, l'axe pointe→cœur→chef (la lance).",
     ombre:"la <b>dispersion</b> — le royaume divisé contre lui-même (Caïn)."},
    {label:"Le Verbe, l'épée", hint:"croix — contre le mensonge", apply:{piece:"croix"},
     why:"Tu gardes ton cœur par le <b>Verbe</b> : une <b>croix</b>, l'épée qui disperse le Malin.",
     ombre:"le <b>mensonge, le faux prophète</b> — l'étoile renversée, pointe en bas."},
    {label:"Aucune garde — l'écu nu (le dépouillement)", hint:"rien ajouté", apply:{piece:""},
     why:"Tu choisis l'<b>écu nu</b> : la sobriété du « vide plein », sans rempart ajouté.", ombre:""},
  ]},
];
let introAns = Array(INTRO.length).fill(null);

function _contrastT(a){ return (METALS.has(a)||FOURR.has(a)) ? "gueules" : "or"; }  // garde lisible sur le champ
function composeFromAnswers(ans){
  const s = { forme:"demi-amande", partition:"plein", A:"argent", B:"argent",
              piece:"", pieceTinct:"or", meuble:"", meubleTinct:"or", cimier:"", cimierTinct:"or", devise:"" };
  ans.forEach(a=>{ if(a&&a.apply) Object.assign(s,a.apply); });
  const A=s.A, light=(METALS.has(A)||FOURR.has(A));
  // champ B dérivé selon la partition (A = la vertu / le champ)
  if(s.partition==="coupe")        s.B = light ? "sable" : "argent";            // chef / terre — toujours métal+émail (règle de tincture)
  else if(s.partition==="parti")   s.B = light ? "azur" : "argent";             // deux torons
  else if(s.partition==="ecartele")s.B = light ? "gueules" : "or";
  else if(s.partition==="tranche"||s.partition==="taille") s.B = light ? "azur" : "argent";
  else                             s.B = A;
  // tincture de la garde (pièce honorable)
  if(s.piece==="champagne") s.pieceTinct="sable";
  else if(s.piece)          s.pieceTinct=_contrastT(A);
  // conversion meuble unique → liste de figures
  s.charges = s.meuble ? [{k:s.meuble, t:s.meubleTinct||"or", p:"coeur"}] : [];
  delete s.meuble; delete s.meubleTinct;
  return s;
}
function renderIntroStep(i){
  const Q=INTRO[i];
  document.getElementById("intro-dots").innerHTML =
    INTRO.map((_,k)=>`<span class="dot${k<i?' done':''}${k===i?' cur':''}">✦</span>`).join("");
  const opts=Q.options.map((o,oi)=>
    `<button class="intro-opt" type="button" data-oi="${oi}"><span class="opt-l">${o.label}</span><span class="opt-h">${o.hint}</span></button>`).join("");
  document.getElementById("intro-body").innerHTML =
    `<p class="intro-step">Question ${i+1} / ${INTRO.length}</p><h2 class="intro-h">${Q.q}</h2><p class="intro-sub">${Q.sub}</p><div class="intro-opts">${opts}</div>`;
  document.querySelectorAll(".intro-opt").forEach(b=>b.addEventListener("click",()=>{
    introAns[i]=Q.options[+b.dataset.oi];
    if(i<INTRO.length-1) renderIntroStep(i+1); else showIntroResult();
  }));
}
function showIntroResult(){
  Object.assign(S, composeFromAnswers(introAns)); fillSelects(); update();
  const ecu=document.getElementById("ecu").innerHTML;
  const ombre = introAns[INTRO.length-1] && introAns[INTRO.length-1].ombre;
  document.getElementById("intro-dots").innerHTML="";
  document.getElementById("intro-body").innerHTML =
    `<div class="intro-orn">✦</div>
     <h2 class="intro-h">Voici tes armes</h2>
     <div class="intro-ecu">${ecu}</div>
     <p class="intro-bl">${blason()}</p>
     <div class="intro-why">${introAns.map(a=>`<p>✦ ${a.why}</p>`).join("")}${ombre?`<p class="intro-ombre">⟂ <b>Ton ombre à veiller :</b> ${ombre}</p>`:""}</div>
     <p class="intro-depouille">« Édifier, c'est <b>dépouiller</b>. » Regarde ton écu : qu'est-ce qui n'est pas ton <b>point cardiaque</b> ? Entre dans l'atelier et retranche jusqu'à l'essentiel — le « vide plein ».</p>
     <div class="intro-actions">
       <button id="intro-enter" type="button">Entrer dans l'atelier</button>
       <button id="intro-again" type="button" class="ghost">Recommencer</button>
     </div>`;
  document.getElementById("intro-enter").addEventListener("click", closeIntro);
  document.getElementById("intro-again").addEventListener("click", ()=>{ introAns=Array(INTRO.length).fill(null); renderIntroStep(0); });
}
function openIntro(){ introAns=Array(INTRO.length).fill(null); document.getElementById("intro").hidden=false; renderIntroStep(0); }
function closeIntro(){ document.getElementById("intro").hidden=true; }
document.getElementById("open-intro").addEventListener("click", openIntro);
document.getElementById("intro-close").addEventListener("click", closeIntro);
document.getElementById("intro").addEventListener("click", e=>{ if(e.target.id==="intro") closeIntro(); });
