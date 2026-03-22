import { useState } from "react";

// ─── PERSONAS ────────────────────────────────────────────────────────────────
const PERSONAS = [
  {
    id: "coach",
    emoji: "🌿",
    label: "Coach & Thérapeute",
    subtitle: "Coaching, bien-être, développement personnel",
    color: "#6dbf8b",
    accent: "#a8e6bf",
    formats: [
      {
        id: "offre",
        icon: "✨",
        label: "Présenter mon offre",
        placeholder: "Ex: accompagnement burnout en 8 semaines",
        prompt: (topic, tone, extra) =>
          `Tu es un expert en copywriting pour coachs et thérapeutes. Rédige une présentation d'offre authentique et persuasive pour : "${topic}". Ton : ${tone}. Détails : ${extra || "aucun"}.
La présentation doit : parler directement à la douleur du client idéal, expliquer la transformation (avant/après), donner confiance sans être vendeur agressif, rester humaine et sincère. Format : accroche émotionnelle, description de la transformation, ce que contient l'offre (bullet points courts), phrase de clôture invitante. 200-250 mots.`,
      },
      {
        id: "instagram",
        icon: "📸",
        label: "Post Instagram / Reel caption",
        placeholder: "Ex: l'importance de poser ses limites au travail",
        prompt: (topic, tone, extra) =>
          `Tu es un expert en contenu Instagram pour coachs bien-être. Écris une caption Instagram engageante sur : "${topic}". Ton : ${tone}. Infos : ${extra || "aucune"}.
Structure : 1 phrase d'accroche qui arrête le scroll, développement en 3-4 lignes courtes, question pour générer des commentaires, 5 hashtags pertinents bien-être/coaching FR. Style : authentique, incarné, pas corporate. Max 150 mots + hashtags.`,
      },
      {
        id: "newsletter",
        icon: "💌",
        label: "Email / Newsletter",
        placeholder: "Ex: comment retrouver de l'énergie le matin",
        prompt: (topic, tone, extra) =>
          `Tu es un expert en email marketing pour indépendants bien-être. Rédige un email de newsletter sur : "${topic}". Ton : ${tone}. Détails : ${extra || "aucun"}.
L'email doit : commencer par une histoire personnelle ou une observation concrète, apporter 1 conseil vraiment actionnable, se terminer par une invitation douce (pas un pitch agressif). Objet : accrocheur et personnel. Corps : 180-220 mots, très lisible, paragraphes courts.`,
      },
      {
        id: "temoignage",
        icon: "💬",
        label: "Mise en valeur d'un témoignage",
        placeholder: "Ex: cliente a retrouvé confiance en elle après 3 mois",
        prompt: (topic, tone, extra) =>
          `Tu es un expert en social proof et storytelling. Transforme ce résultat client en contenu percutant : "${topic}". Ton : ${tone}. Contexte : ${extra || "aucun"}.
Crée : 1 post LinkedIn/Instagram qui raconte la transformation de façon humaine (sans divulguer d'infos privées), en montrant le chemin parcouru. Inclure : la situation de départ, le tournant, le résultat, une phrase inspirante. 120-150 mots.`,
      },
      {
        id: "linkedin_coach",
        icon: "💼",
        label: "Post LinkedIn expert",
        placeholder: "Ex: pourquoi 80% des burnouts sont évitables",
        prompt: (topic, tone, extra) =>
          `Tu es un expert LinkedIn pour coachs et thérapeutes. Rédige un post LinkedIn à forte valeur ajoutée sur : "${topic}". Ton : ${tone}. Infos : ${extra || "aucune"}.
Format : accroche choc en 1-2 lignes, développement structuré avec retours à la ligne fréquents, 1 insight actionnable, CTA pour engager la conversation. Emojis sobres. 180-220 mots.`,
      },
    ],
  },
  {
    id: "ecom",
    emoji: "🛍️",
    label: "E-commerçant indépendant",
    subtitle: "Boutique en ligne, produits physiques ou digitaux",
    color: "#e8956d",
    accent: "#f5c4a8",
    formats: [
      {
        id: "fiche",
        icon: "🏷️",
        label: "Fiche produit",
        placeholder: "Ex: bougie artisanale lavande & bois de cèdre",
        prompt: (topic, tone, extra) =>
          `Tu es un expert en copywriting e-commerce. Rédige une fiche produit convaincante pour : "${topic}". Ton : ${tone}. Détails : ${extra || "aucun"}.
Structure : titre SEO accrocheur, accroche sensorielle ou émotionnelle (2 lignes), 4-5 bénéfices clés en bullet points (bénéfice > caractéristique), description d'usage concret, phrase de clôture qui donne envie d'acheter maintenant. 180-220 mots.`,
      },
      {
        id: "pub",
        icon: "🎯",
        label: "Pub Facebook / Instagram",
        placeholder: "Ex: carnet de gratitude illustré fait main",
        prompt: (topic, tone, extra) =>
          `Tu es un expert en publicité Facebook/Instagram pour e-commerçants. Crée 3 variantes d'annonces publicitaires pour : "${topic}". Ton : ${tone}. Infos : ${extra || "aucun"}.
Variante 1 : accroche problème/solution. Variante 2 : accroche émotionnelle/aspirationnelle. Variante 3 : accroche preuve sociale/urgence. Chaque variante : 1 titre (max 40 car.), 1 texte principal (max 90 mots), 1 CTA.`,
      },
      {
        id: "email_promo",
        icon: "📣",
        label: "Email promotionnel",
        placeholder: "Ex: soldes de printemps -20% sur toute la collection",
        prompt: (topic, tone, extra) =>
          `Tu es un expert en email marketing e-commerce. Rédige un email promotionnel pour : "${topic}". Ton : ${tone}. Contexte : ${extra || "aucun"}.
L'email doit créer de l'urgence sans paraître désespéré, mettre en avant la valeur plutôt que la réduction seule, raconter pourquoi cette promo existe (histoire courte). Objet + préheader accrocheurs. Corps : 150-180 mots. CTA fort et visible.`,
      },
      {
        id: "about_ecom",
        icon: "🌟",
        label: "Page À propos / Histoire de marque",
        placeholder: "Ex: créatrice de bijoux minimalistes en argent recyclé",
        prompt: (topic, tone, extra) =>
          `Tu es un expert en brand storytelling pour créateurs indépendants. Rédige une page À propos authentique pour : "${topic}". Ton : ${tone}. Détails : ${extra || "aucun"}.
Structure : accroche identitaire forte, histoire de la création (le pourquoi, pas le quoi), valeurs incarnées (2-3 max), vision/mission en 1 phrase, invitation à rejoindre l'aventure. 200-240 mots. Style : chaleureux, sincère, différenciant.`,
      },
      {
        id: "review",
        icon: "⭐",
        label: "Réponse à un avis client",
        placeholder: "Ex: avis 5 étoiles sur la qualité des matériaux",
        prompt: (topic, tone, extra) =>
          `Tu es un expert en community management e-commerce. Rédige une réponse à cet avis client : "${topic}". Ton : ${tone}. Contexte : ${extra || "aucun"}.
La réponse doit : remercier sincèrement (sans être robotique), personnaliser selon le contenu de l'avis, renforcer un élément de la promesse de marque, inviter à revenir. Max 80 mots. Chaleureux et humain.`,
      },
    ],
  },
];

const TONES = [
  { id: "authentique", label: "Authentique", emoji: "🤍" },
  { id: "inspirant", label: "Inspirant", emoji: "✨" },
  { id: "chaleureux", label: "Chaleureux", emoji: "🌸" },
  { id: "persuasif", label: "Persuasif", emoji: "🎯" },
  { id: "professionnel", label: "Professionnel", emoji: "💼" },
  { id: "energique", label: "Énergique", emoji: "⚡" },
];

export default function FlowCopy() {
  const [persona, setPersona] = useState(null);
  const [format, setFormat] = useState(null);
  const [tone, setTone] = useState("authentique");
  const [topic, setTopic] = useState("");
  const [extra, setExtra] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [step, setStep] = useState(1); // 1: persona, 2: format+input, 3: result

  const selectedPersona = PERSONAS.find(p => p.id === persona);
  const selectedFormat = selectedPersona?.formats.find(f => f.id === format);
  const selectedTone = TONES.find(t => t.id === tone);

  const handlePersonaSelect = (id) => {
    setPersona(id);
    setFormat(null);
    setResult("");
    setTopic("");
    setExtra("");
    setStep(2);
  };

  const generate = async () => {
    if (!topic.trim() || !selectedFormat) return;
    setLoading(true);
    setResult("");
    setError("");
    setStep(3);
    try {
      const res = await fetch("/api/generate", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    messages: [{ role: "user", content: selectedFormat.prompt(topic, selectedTone?.label || tone, extra) }],
  }),
});
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
    "anthropic-version": "2023-06-01",
    "anthropic-dangerous-direct-browser-access": "true"
  },
  body: JSON.stringify({
    model: "claude-sonnet-4-6",
    max_tokens: 1000,
    messages: [{ role: "user", content: selectedFormat.prompt(topic, selectedTone?.label || tone, extra) }],
  }),
});
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      setResult(text);
    } catch {
      setError("Erreur de connexion. Réessaie.");
      setStep(2);
    } finally {
      setLoading(false);
    }
  };

  const copy = () => {
    navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const reset = () => {
    setStep(1);
    setPersona(null);
    setFormat(null);
    setResult("");
    setTopic("");
    setExtra("");
    setError("");
  };

  const c = selectedPersona?.color || "#6dbf8b";
  const a = selectedPersona?.accent || "#a8e6bf";

  return (
    <div style={{
      minHeight: "100vh",
      background: "#f7f4ef",
      fontFamily: "'Lora', Georgia, serif",
      color: "#2d2a25",
      position: "relative",
    }}>
      <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,600;1,400&family=Epilogue:wght@400;500;700;900&display=swap" rel="stylesheet" />

      {/* Texture overlay */}
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.4,
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.15'/%3E%3C/svg%3E")`,
      }} />

      <div style={{ position: "relative", zIndex: 1, maxWidth: 780, margin: "0 auto", padding: "48px 24px" }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 16,
            background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)",
            border: "1px solid rgba(0,0,0,0.08)", borderRadius: 40,
            padding: "6px 18px 6px 10px",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%",
              background: "linear-gradient(135deg, #6dbf8b, #e8956d)",
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14
            }}>✍</div>
            <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 13, fontWeight: 700, letterSpacing: 0.5 }}>FlowCopy</span>
          </div>
          <h1 style={{
            fontFamily: "'Epilogue', sans-serif", fontSize: 38, fontWeight: 900,
            lineHeight: 1.15, margin: "0 0 12px", color: "#1a1814",
            letterSpacing: -1
          }}>
            Le copywriting qui<br />
            <em style={{ fontFamily: "'Lora', serif", fontWeight: 400, color: "#6dbf8b" }}>te ressemble.</em>
          </h1>
          <p style={{ color: "#888", fontSize: 16, fontFamily: "'Lora', serif", fontStyle: "italic", margin: 0 }}>
            Conçu pour les coachs, thérapeutes et e-commerçants indépendants
          </p>
        </div>

        {/* Step 1 — Persona */}
        <div style={{
          opacity: step >= 1 ? 1 : 0.4,
          transition: "opacity 0.3s",
          marginBottom: 32
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
            <div style={{
              width: 28, height: 28, borderRadius: "50%", background: step >= 1 ? "#1a1814" : "#ccc",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Epilogue', sans-serif", fontSize: 12, fontWeight: 700, color: "#fff"
            }}>1</div>
            <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 0.3 }}>
              Qui es-tu ?
            </span>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            {PERSONAS.map(p => (
              <button key={p.id} onClick={() => handlePersonaSelect(p.id)} style={{
                background: persona === p.id
                  ? `linear-gradient(135deg, ${p.color}22, ${p.accent}33)`
                  : "rgba(255,255,255,0.8)",
                border: `2px solid ${persona === p.id ? p.color : "rgba(0,0,0,0.08)"}`,
                borderRadius: 18, padding: "22px 20px", cursor: "pointer",
                textAlign: "left", transition: "all 0.25s",
                boxShadow: persona === p.id ? `0 4px 20px ${p.color}30` : "0 2px 8px rgba(0,0,0,0.04)",
                transform: persona === p.id ? "translateY(-2px)" : "none",
              }}>
                <div style={{ fontSize: 28, marginBottom: 10 }}>{p.emoji}</div>
                <div style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 16, fontWeight: 700, color: "#1a1814", marginBottom: 4 }}>{p.label}</div>
                <div style={{ fontSize: 13, color: "#999", fontFamily: "'Lora', serif", fontStyle: "italic" }}>{p.subtitle}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Step 2 — Format + Input */}
        {persona && (
          <div style={{ animation: "slideUp 0.35s ease", marginBottom: 32 }}>

            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", background: "#1a1814",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Epilogue', sans-serif", fontSize: 12, fontWeight: 700, color: "#fff"
              }}>2</div>
              <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 0.3 }}>
                Quel contenu veux-tu créer ?
              </span>
            </div>

            {/* Format grid */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 28 }}>
              {selectedPersona.formats.map(f => (
                <button key={f.id} onClick={() => setFormat(f.id)} style={{
                  background: format === f.id ? `${c}18` : "rgba(255,255,255,0.7)",
                  border: `1.5px solid ${format === f.id ? c : "rgba(0,0,0,0.08)"}`,
                  borderRadius: 14, padding: "14px 12px", cursor: "pointer",
                  textAlign: "center", transition: "all 0.2s",
                  transform: format === f.id ? "translateY(-1px)" : "none",
                }}>
                  <div style={{ fontSize: 20, marginBottom: 6 }}>{f.icon}</div>
                  <div style={{
                    fontFamily: "'Epilogue', sans-serif", fontSize: 12, fontWeight: 600,
                    color: format === f.id ? c : "#555", lineHeight: 1.3
                  }}>{f.label}</div>
                </button>
              ))}
            </div>

            {/* Tone */}
            <div style={{ marginBottom: 20 }}>
              <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 12, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 10 }}>Ton</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {TONES.map(t => (
                  <button key={t.id} onClick={() => setTone(t.id)} style={{
                    background: tone === t.id ? `${c}20` : "rgba(255,255,255,0.7)",
                    border: `1.5px solid ${tone === t.id ? c : "rgba(0,0,0,0.08)"}`,
                    borderRadius: 30, padding: "6px 14px", cursor: "pointer",
                    fontFamily: "'Epilogue', sans-serif", fontSize: 12, fontWeight: 600,
                    color: tone === t.id ? c : "#888", transition: "all 0.2s"
                  }}>{t.emoji} {t.label}</button>
                ))}
              </div>
            </div>

            {/* Topic input */}
            <div style={{ marginBottom: 16 }}>
              <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 12, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 10 }}>
                Ton sujet *
              </p>
              <textarea
                value={topic}
                onChange={e => setTopic(e.target.value)}
                placeholder={selectedFormat?.placeholder || "Décris ton sujet, produit ou thème…"}
                rows={2}
                style={{
                  width: "100%", background: "rgba(255,255,255,0.85)",
                  border: `1.5px solid ${topic ? c : "rgba(0,0,0,0.1)"}`,
                  borderRadius: 14, padding: "14px 16px",
                  fontFamily: "'Lora', serif", fontSize: 15, color: "#2d2a25",
                  lineHeight: 1.6, resize: "none", outline: "none", boxSizing: "border-box",
                  transition: "border-color 0.2s"
                }}
              />
            </div>

            <div style={{ marginBottom: 24 }}>
              <p style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 12, fontWeight: 700, color: "#aaa", textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 10 }}>
                Détails utiles <span style={{ fontWeight: 400, textTransform: "none", letterSpacing: 0 }}>(optionnel)</span>
              </p>
              <input
                value={extra}
                onChange={e => setExtra(e.target.value)}
                placeholder="Cible, prix, durée, points clés à mentionner…"
                style={{
                  width: "100%", background: "rgba(255,255,255,0.7)",
                  border: "1.5px solid rgba(0,0,0,0.08)",
                  borderRadius: 14, padding: "12px 16px",
                  fontFamily: "'Lora', serif", fontSize: 14, color: "#2d2a25",
                  outline: "none", boxSizing: "border-box"
                }}
              />
            </div>

            <button onClick={generate} disabled={!topic.trim() || !format || loading} style={{
              width: "100%", padding: "16px",
              background: topic.trim() && format && !loading
                ? `linear-gradient(135deg, ${c}, ${a === "#f5c4a8" ? "#e8956d" : "#50a870"})`
                : "rgba(0,0,0,0.06)",
              border: "none", borderRadius: 16, cursor: topic.trim() && format && !loading ? "pointer" : "not-allowed",
              fontFamily: "'Epilogue', sans-serif", fontSize: 15, fontWeight: 700,
              color: topic.trim() && format && !loading ? "#fff" : "#bbb",
              letterSpacing: 0.3, transition: "all 0.25s",
              boxShadow: topic.trim() && format && !loading ? `0 6px 24px ${c}40` : "none",
            }}>
              {loading ? "Génération en cours…" : `✨ Générer mon contenu`}
            </button>
          </div>
        )}

        {/* Step 3 — Result */}
        {(result || loading) && (
          <div style={{ animation: "slideUp 0.4s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 28, height: 28, borderRadius: "50%", background: "#1a1814",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'Epilogue', sans-serif", fontSize: 12, fontWeight: 700, color: "#fff"
              }}>3</div>
              <span style={{ fontFamily: "'Epilogue', sans-serif", fontSize: 14, fontWeight: 700, letterSpacing: 0.3 }}>
                Ton contenu
              </span>
            </div>

            <div style={{
              background: "rgba(255,255,255,0.9)", border: `1.5px solid ${c}50`,
              borderRadius: 20, padding: 28,
              boxShadow: `0 8px 32px ${c}20`
            }}>
              {loading ? (
                <div style={{ display: "flex", alignItems: "center", gap: 12, color: "#aaa", fontStyle: "italic" }}>
                  <div style={{
                    width: 18, height: 18, border: `2px solid ${c}40`, borderTopColor: c,
                    borderRadius: "50%", animation: "spin 0.8s linear infinite"
                  }} />
                  L'IA rédige ton contenu…
                </div>
              ) : (
                <>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                    <div style={{ display: "flex", gap: 8 }}>
                      <span style={{
                        background: `${c}20`, color: c, borderRadius: 20,
                        padding: "3px 12px", fontSize: 12,
                        fontFamily: "'Epilogue', sans-serif", fontWeight: 600
                      }}>{selectedFormat?.icon} {selectedFormat?.label}</span>
                      <span style={{
                        background: "rgba(0,0,0,0.05)", color: "#888", borderRadius: 20,
                        padding: "3px 12px", fontSize: 12,
                        fontFamily: "'Epilogue', sans-serif"
                      }}>{selectedTone?.emoji} {selectedTone?.label}</span>
                    </div>
                    <button onClick={copy} style={{
                      background: copied ? "#50a87020" : "rgba(0,0,0,0.04)",
                      border: `1px solid ${copied ? "#50a870" : "rgba(0,0,0,0.08)"}`,
                      borderRadius: 10, padding: "6px 16px",
                      fontFamily: "'Epilogue', sans-serif", fontSize: 12, fontWeight: 600,
                      color: copied ? "#50a870" : "#888", cursor: "pointer", transition: "all 0.2s"
                    }}>{copied ? "✓ Copié !" : "Copier"}</button>
                  </div>
                  <div style={{
                    fontFamily: "'Lora', serif", fontSize: 15, lineHeight: 1.85,
                    color: "#2d2a25", whiteSpace: "pre-wrap",
                    borderTop: "1px solid rgba(0,0,0,0.06)", paddingTop: 20
                  }}>
                    {result}
                  </div>
                  <div style={{ marginTop: 24, display: "flex", gap: 10 }}>
                    <button onClick={generate} style={{
                      flex: 1, padding: "12px",
                      background: `${c}15`, border: `1.5px solid ${c}40`,
                      borderRadius: 12, cursor: "pointer",
                      fontFamily: "'Epilogue', sans-serif", fontSize: 13, fontWeight: 700, color: c
                    }}>↺ Regénérer</button>
                    <button onClick={reset} style={{
                      flex: 1, padding: "12px",
                      background: "rgba(0,0,0,0.04)", border: "1.5px solid rgba(0,0,0,0.08)",
                      borderRadius: 12, cursor: "pointer",
                      fontFamily: "'Epilogue', sans-serif", fontSize: 13, fontWeight: 700, color: "#888"
                    }}>+ Nouveau contenu</button>
                  </div>
                </>
              )}
            </div>
          </div>
        )}

        {error && (
          <div style={{ background: "#fff0f0", border: "1px solid #ffccc7", borderRadius: 12, padding: "12px 16px", color: "#cf4444", fontSize: 13, fontFamily: "'Epilogue', sans-serif" }}>
            ⚠️ {error}
          </div>
        )}

        {/* Footer */}
        <div style={{ marginTop: 56, textAlign: "center" }}>
          <p style={{ fontSize: 13, color: "#ccc", fontFamily: "'Lora', serif", fontStyle: "italic" }}>
            FlowCopy · Pour les indépendants qui ont quelque chose à dire 🌿
          </p>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes slideUp { from { opacity: 0; transform: translateY(16px); } to { opacity: 1; transform: translateY(0); } }
        * { box-sizing: border-box; }
        textarea:focus { outline: none; }
        input:focus { outline: none; }
        button { font-family: inherit; }
      `}</style>
    </div>
  );
}