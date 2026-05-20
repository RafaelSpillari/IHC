import { useState, useEffect } from "react";
const speak = (text) => {
if ("speechSynthesis" in window) {
window.speechSynthesis.cancel();
const utter = new SpeechSynthesisUtterance(text);
utter.lang = "pt-BR";
utter.rate = 0.85;
utter.pitch = 1;
window.speechSynthesis.speak(utter);
}
};
const contacts = [
{ name: "Maria (Filha)", icon: " ", phone: "(11) 99999-1111", color: "#4A90D9" },
{ name: "João (Filho)", icon: " ", phone: "(11) 99999-2222", color: "#5BA85A" },
{ name: "Dr. Santos", icon: " ", phone: "(11) 3333-4444", color: "#9B6FB6" },
{ name: "Ana (Vizinha)", icon: " ", phone: "(11) 99999-3333", color: "#E8943A" },
];
const reminders = [
{ time: "08:00", label: "Pressão sanguínea", icon: " ", done: true },
{ time: "12:00", label: "Almoço com remédio", icon: " ", done: true },
{ time: "15:00", label: "Caminhada leve", icon: " ", done: false },
{ time: "20:00", label: "Remédio da noite", icon: " ", done: false },
];
export default function App() {
const [screen, setScreen] = useState("home");
const [time, setTime] = useState(new Date());
const [fontSize, setFontSize] = useState(1);
const [contrast, setContrast] = useState(false);
const [calledContact, setCalledContact] = useState(null);
const [emergencyActive, setEmergencyActive] = useState(false);
const [announcedTime, setAnnouncedTime] = useState(false);
useEffect(() => {
const t = setInterval(() => setTime(new Date()), 1000);
return () => clearInterval(t);
}, []);
const fz = (base) => `${base * fontSize}px`;
const theme = contrast

? { bg: "#000", card: "#111", text: "#FFE", sub: "#FFD700", border: "#FFE", accent: "#FFD700", soft: "#333", danger: "#FF4444", btnBg: "#FFD700", btnText: "#000" }
: { bg: "#F5F0E8", card: "#FFFDF8", text: "#2C2416", sub: "#6B5E4E", border: "#DDD5C4", accent: "#4A90D9", soft: "#EDE8DF", danger: "#C0392B", btnBg: "#4A90D9", btnText: "#fff" };
const days = ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado"];
const months = ["Janeiro","Fevereiro","Março","Abril","Maio","Junho","Julho","Agosto","Setembro","Outubro","Novembro","Dezembro"];
const dateStr = `${days[time.getDay()]}, ${time.getDate()} de ${months[time.getMonth()]} de ${time.getFullYear()}`;
const timeStr = time.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
const navItems = [
{ id: "home", icon: " ", label: "Início" },
{ id: "contacts", icon: " ", label: "Contatos" },
{ id: "reminders", icon: " ", label: "Lembretes" },
{ id: "help", icon: " ", label: "Ajuda" },
];
const styles = {
root: {
minHeight: "100vh",
background: theme.bg,
fontFamily: "'Georgia', 'Times New Roman', serif",
color: theme.text,
fontSize: fz(18),
lineHeight: 1.7,
maxWidth: 680,
margin: "0 auto",
padding: "0 0 100px 0",
position: "relative",
},
topBar: {
background: theme.card,
borderBottom: `3px solid ${theme.border}`,
padding: "14px 20px",
display: "flex",
alignItems: "center",
justifyContent: "space-between",
position: "sticky",
top: 0,
zIndex: 100,
boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
},
logoText: {
fontWeight: "bold",
fontSize: fz(20),
color: theme.accent,
letterSpacing: "-0.5px",
},
accessBar: {

display: "flex",
gap: 10,
},
accessBtn: {
background: theme.soft,
border: `2px solid ${theme.border}`,
borderRadius: 10,
padding: "8px 12px",
fontSize: fz(16),
cursor: "pointer",
color: theme.text,
fontWeight: "bold",
minWidth: 44,
minHeight: 44,
display: "flex",
alignItems: "center",
justifyContent: "center",
},
clock: {
textAlign: "center",
padding: "28px 20px 10px",
},
timeDisplay: {
fontSize: fz(64),
fontWeight: "bold",
color: theme.text,
letterSpacing: "-2px",
lineHeight: 1.1,
cursor: "pointer",
},
dateDisplay: {
fontSize: fz(20),
color: theme.sub,
marginTop: 4,
},
section: {
padding: "0 16px",
marginTop: 20,
},
sectionTitle: {
fontSize: fz(22),
fontWeight: "bold",
color: theme.text,
marginBottom: 14,
paddingLeft: 6,
borderLeft: `5px solid ${theme.accent}`,
paddingLeft: 12,

},
card: {
background: theme.card,
border: `2px solid ${theme.border}`,
borderRadius: 18,
padding: "20px",
marginBottom: 14,
boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
},
contactGrid: {
display: "grid",
gridTemplateColumns: "1fr 1fr",
gap: 14,
},
contactBtn: (color) => ({
background: theme.card,
border: `3px solid ${color}`,
borderRadius: 18,
padding: "22px 16px",
textAlign: "center",
cursor: "pointer",
transition: "transform 0.1s, box-shadow 0.1s",
minHeight: 120,
display: "flex",
flexDirection: "column",
alignItems: "center",
justifyContent: "center",
gap: 8,
}),
contactIcon: {
fontSize: fz(42),
lineHeight: 1,
},
contactName: {
fontSize: fz(18),
fontWeight: "bold",
color: theme.text,
lineHeight: 1.3,
},
contactPhone: {
fontSize: fz(14),
color: theme.sub,
},
reminderItem: (done) => ({
display: "flex",
alignItems: "center",
gap: 16,

padding: "16px",
background: done ? theme.soft : theme.card,
border: `2px solid ${done ? theme.border : theme.accent}`,
borderRadius: 14,
marginBottom: 10,
opacity: done ? 0.65 : 1,
}),
reminderIcon: {
fontSize: fz(34),
minWidth: 50,
textAlign: "center",
},
reminderTime: {
fontSize: fz(22),
fontWeight: "bold",
color: theme.accent,
minWidth: 60,
},
reminderLabel: {
fontSize: fz(19),
color: theme.text,
flex: 1,
},
reminderCheck: (done) => ({
width: 32,
height: 32,
borderRadius: 8,
border: `3px solid ${done ? "#5BA85A" : theme.border}`,
background: done ? "#5BA85A" : "transparent",
display: "flex",
alignItems: "center",
justifyContent: "center",
fontSize: 18,
color: "#fff",
cursor: "pointer",
flexShrink: 0,
}),
emergencyBtn: {
background: theme.danger,
color: "#fff",
border: "none",
borderRadius: 20,
padding: "26px 20px",
fontSize: fz(26),
fontWeight: "bold",
width: "100%",
cursor: "pointer",

display: "flex",
alignItems: "center",
justifyContent: "center",
gap: 14,
boxShadow: "0 4px 20px rgba(192,57,43,0.35)",
marginTop: 4,
minHeight: 90,
},
navBar: {
position: "fixed",
bottom: 0,
left: "50%",
transform: "translateX(-50%)",
width: "100%",
maxWidth: 680,
background: theme.card,
borderTop: `3px solid ${theme.border}`,
display: "flex",
justifyContent: "space-around",
padding: "8px 0 14px",
zIndex: 200,
},
navBtn: (active) => ({
display: "flex",
flexDirection: "column",
alignItems: "center",
gap: 4,
padding: "10px 16px",
background: active ? theme.soft : "transparent",
border: active ? `2px solid ${theme.accent}` : "2px solid transparent",
borderRadius: 14,
cursor: "pointer",
minWidth: 70,
minHeight: 62,
justifyContent: "center",
}),
navIcon: {
fontSize: fz(28),
},
navLabel: {
fontSize: fz(13),
fontWeight: "bold",
color: theme.text,
},
modalOverlay: {
position: "fixed",
inset: 0,

background: "rgba(0,0,0,0.7)",
display: "flex",
alignItems: "center",
justifyContent: "center",
zIndex: 999,
padding: 20,
},
modal: {
background: theme.card,
borderRadius: 24,
padding: 32,
width: "100%",
maxWidth: 400,
textAlign: "center",
border: `3px solid ${theme.accent}`,
},
helpItem: {
display: "flex",
alignItems: "center",
gap: 14,
padding: "18px 16px",
background: theme.soft,
borderRadius: 14,
marginBottom: 12,
border: `2px solid ${theme.border}`,
cursor: "pointer",
},
};
const handleEmergency = () => {
setEmergencyActive(true);
speak("Atenção! Você acionou o botão de emergência. Ligando para seus contatos de emergência.");
setTimeout(() => setEmergencyActive(false), 4000);
};
return (
<div style={styles.root}>
{/* TOP BAR */}
<div style={styles.topBar}>
<span style={styles.logoText}> Meu Assistente</span>
<div style={styles.accessBar}>
<button
style={styles.accessBtn}
onClick={() => { setFontSize(f => Math.min(f + 0.12, 1.5)); speak("Texto maior"); }}
title="Aumentar texto"
aria-label="Aumentar tamanho do texto"
>A+</button>

<button
style={styles.accessBtn}
onClick={() => { setFontSize(f => Math.max(f - 0.12, 0.8)); speak("Texto menor"); }}
title="Diminuir texto"
aria-label="Diminuir tamanho do texto"
>A-</button>
<button
style={{ ...styles.accessBtn, background: contrast ? "#FFD700" : theme.soft }}
onClick={() => { setContrast(c => !c); speak(contrast ? "Contraste normal" : "Alto contraste ativado"); }}
title="Alternar contraste"
aria-label="Alternar alto contraste"
>◐</button>
</div>
</div>
{/* SCREENS */}
{screen === "home" && (
<div>
{/* CLOCK */}
<div style={styles.clock}>
<div
style={styles.timeDisplay}
onClick={() => speak(`São ${timeStr} de ${dateStr}`)}
title="Clique para ouvir o horário"
role="button"
aria-label={`Hora atual: ${timeStr}. Clique para ouvir.`}
>
{timeStr}
</div>
<div style={styles.dateDisplay}>{dateStr}</div>
</div>
{/* EMERGENCY */}
<div style={styles.section}>
<button
style={styles.emergencyBtn}
onClick={handleEmergency}
aria-label="Botão de emergência - clique para pedir ajuda"
>
EMERGÊNCIA — PEDIR AJUDA
</button>
</div>
{/* QUICK CONTACTS */}
<div style={styles.section}>
<div style={styles.sectionTitle}>Ligar para alguém</div>
<div style={styles.contactGrid}>

{contacts.slice(0, 4).map((c) => (
<div
key={c.name}
style={styles.contactBtn(c.color)}
onClick={() => { setCalledContact(c); speak(`Ligando para ${c.name}`); }}
role="button"
tabIndex={0}
aria-label={`Ligar para ${c.name}`}
onKeyDown={(e) => e.key === "Enter" && setCalledContact(c)}
>
<span style={styles.contactIcon}>{c.icon}</span>
<span style={styles.contactName}>{c.name}</span>
<span style={styles.contactPhone}>{c.phone}</span>
</div>
))}
</div>
</div>
{/* TODAY REMINDERS */}
<div style={styles.section}>
<div style={styles.sectionTitle}>Hoje</div>
{reminders.map((r) => (
<div key={r.time} style={styles.reminderItem(r.done)}>
<span style={styles.reminderIcon}>{r.icon}</span>
<span style={styles.reminderTime}>{r.time}</span>
<span style={styles.reminderLabel}>{r.label}</span>
<div style={styles.reminderCheck(r.done)} aria-label={r.done ? "Concluído" : "Pendente"}>
{r.done ? "✓" : ""}
</div>
</div>
))}
</div>
</div>
)}
{screen === "contacts" && (
<div style={styles.section}>
<div style={{ ...styles.sectionTitle, marginTop: 24 }}> Seus Contatos</div>
{contacts.map((c) => (
<div
key={c.name}
style={{ ...styles.card, display: "flex", alignItems: "center", gap: 18, cursor: "pointer", borderLeft: `6px solid ${c.color}` }}
onClick={() => { setCalledContact(c); speak(`Ligando para ${c.name}`); }}
role="button"
tabIndex={0}
aria-label={`Ligar para ${c.name}, ${c.phone}`}
>

<span style={{ fontSize: fz(46) }}>{c.icon}</span>
<div style={{ flex: 1 }}>
<div style={{ fontSize: fz(22), fontWeight: "bold" }}>{c.name}</div>
<div style={{ fontSize: fz(18), color: theme.sub }}>{c.phone}</div>
</div>
<span style={{ fontSize: fz(36), color: c.color }}> </span>
</div>
))}
</div>
)}
{screen === "reminders" && (
<div style={styles.section}>
<div style={{ ...styles.sectionTitle, marginTop: 24 }}> Lembretes do Dia</div>
{reminders.map((r) => (
<div key={r.time} style={styles.reminderItem(r.done)}>
<span style={styles.reminderIcon}>{r.icon}</span>
<div style={{ flex: 1 }}>
<div style={styles.reminderTime}>{r.time}</div>
<div style={styles.reminderLabel}>{r.label}</div>
</div>
<div
style={{ ...styles.reminderCheck(r.done), width: 44, height: 44, fontSize: fz(22) }}
onClick={() => speak(r.done ? `${r.label} já foi feito` : `${r.label} ainda não foi feito`)}
role="checkbox"
aria-checked={r.done}
tabIndex={0}
>
{r.done ? "✓" : ""}
</div>
</div>
))}
</div>
)}
{screen === "help" && (
<div style={styles.section}>
<div style={{ ...styles.sectionTitle, marginTop: 24 }}> Como Usar</div>
{[
{ icon: " ", title: "Ouvir o horário", desc: "Toque nos números do relógio para ouvir as horas em voz alta." },
{ icon: "A+", title: "Aumentar o texto", desc: "Use os botões A+ e A− no topo para ajustar o tamanho das letras." },
{ icon: "◐", title: "Alto contraste", desc: "Toque no botão ◐ para ativar fundo escuro com letras amarelas — mais fácil de ler." },
{ icon: " ", title: "Ligar para alguém", desc: "Toque na foto ou nome da pessoa para iniciar uma chamada." },
{ icon: " ", title: "Emergência", desc: "O botão vermelho grande chama ajuda imediatamente e avisa seus familiares." },
].map((item) => (
<div

key={item.title}
style={styles.helpItem}
onClick={() => speak(`${item.title}. ${item.desc}`)}
role="button"
tabIndex={0}
aria-label={`${item.title}: ${item.desc}. Clique para ouvir.`}
>
<span style={{ fontSize: fz(38), minWidth: 50, textAlign: "center" }}>{item.icon}</span>
<div>
<div style={{ fontSize: fz(20), fontWeight: "bold", color: theme.text }}>{item.title} </div>
<div style={{ fontSize: fz(16), color: theme.sub, marginTop: 2 }}>{item.desc}</div>
</div>
</div>
))}
<div style={{ ...styles.card, marginTop: 10, textAlign: "center", background: "#EAF4FB", border: `2px solid #4A90D9` }}>
<div style={{ fontSize: fz(32) }}> </div>
<div style={{ fontSize: fz(19), color: "#2C5F8A", marginTop: 8, fontWeight: "bold" }}>
Ficou com dúvida?
</div>
<div style={{ fontSize: fz(17), color: theme.sub, marginTop: 6 }}>
Peça ajuda a um familiar ou ligue para nossa central: (0800) 000-0000
</div>
</div>
</div>
)}
{/* BOTTOM NAV */}
<nav style={styles.navBar} role="navigation" aria-label="Menu principal">
{navItems.map((n) => (
<button
key={n.id}
style={styles.navBtn(screen === n.id)}
onClick={() => { setScreen(n.id); speak(n.label); }}
aria-label={n.label}
aria-current={screen === n.id ? "page" : undefined}
>
<span style={styles.navIcon}>{n.icon}</span>
<span style={styles.navLabel}>{n.label}</span>
</button>
))}
</nav>
{/* CALL MODAL */}
{calledContact && (
<div style={styles.modalOverlay} role="dialog" aria-modal="true" aria-label={`Ligando para ${calledContact.name}`}>
<div style={styles.modal}>

<div style={{ fontSize: fz(64) }}>{calledContact.icon}</div>
<div style={{ fontSize: fz(26), fontWeight: "bold", marginTop: 12 }}>Ligando para...</div>
<div style={{ fontSize: fz(28), fontWeight: "bold", color: theme.accent, marginTop: 8 }}>{calledContact.name}</div>
<div style={{ fontSize: fz(22), color: theme.sub, marginTop: 4 }}>{calledContact.phone}</div>
<button
style={{ ...styles.emergencyBtn, background: "#C0392B", marginTop: 28, borderRadius: 14, fontSize: fz(20), minHeight: 60 }}
onClick={() => { setCalledContact(null); speak("Chamada encerrada"); }}
aria-label="Encerrar chamada"
>
Encerrar Chamada
</button>
</div>
</div>
)}
{/* EMERGENCY MODAL */}
{emergencyActive && (
<div style={styles.modalOverlay} role="alertdialog" aria-modal="true" aria-live="assertive">
<div style={{ ...styles.modal, borderColor: theme.danger, background: "#FFF5F5" }}>
<div style={{ fontSize: fz(64) }}> </div>
<div style={{ fontSize: fz(26), fontWeight: "bold", color: theme.danger, marginTop: 12 }}>
Enviando Pedido de Ajuda!
</div>
<div style={{ fontSize: fz(18), color: theme.sub, marginTop: 10 }}>
Seus contatos de emergência estão sendo avisados agora.
</div>
<div style={{ marginTop: 20, fontSize: fz(16), color: theme.sub }}>
Aguarde — alguém chegará em breve.
</div>
</div>
</div>
)}
</div>
);
}
