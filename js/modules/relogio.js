// Relógio + dia da semana + data + semana do ano + trimestre.
const DIAS = ["domingo", "segunda-feira", "terça-feira", "quarta-feira", "quinta-feira", "sexta-feira", "sábado"];
const dois = n => String(n).padStart(2, "0");

function semanaISO(d) {
  const t = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7));
  const ini = new Date(Date.UTC(t.getUTCFullYear(), 0, 1));
  return Math.ceil(((t - ini) / 86400000 + 1) / 7);
}

Painel.registrar({
  nome: "relogio",
  iniciar() {
    const $ = id => document.getElementById(id);
    this.el = { hh: $("hh"), mm: $("mm"), seg: $("seg"), dia: $("dia-semana"),
                data: $("data"), semana: $("semana"), tri: $("trimestre") };
    this.atualizar();
    setInterval(() => this.atualizar(), 1000);
  },
  config() { this.atualizar(); },
  atualizar() {
    const d = new Date(), e = this.el;
    let h = d.getHours(), sufixo = "";
    if (!Painel.config.formato24h) { sufixo = h >= 12 ? "PM" : "AM"; h = h % 12 || 12; }
    e.hh.textContent = dois(h);
    e.mm.textContent = dois(d.getMinutes());
    e.seg.textContent = [Painel.config.segundos ? dois(d.getSeconds()) : "", sufixo].filter(Boolean).join(" ");
    e.dia.textContent = DIAS[d.getDay()];
    e.data.textContent = `${dois(d.getDate())}/${dois(d.getMonth() + 1)}/${d.getFullYear()}`;
    e.semana.textContent = `Semana ${semanaISO(d)}`;
    e.tri.textContent = `${Math.floor(d.getMonth() / 3) + 1}º trimestre`;
  }
});