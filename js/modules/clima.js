// Clima via Open-Meteo (gratuito, sem chave) + céu animado conforme o tempo.
const WMO = {
  0: "Céu limpo", 1: "Quase limpo", 2: "Parcialmente nublado", 3: "Nublado",
  45: "Neblina", 48: "Neblina", 51: "Garoa leve", 53: "Garoa", 55: "Garoa forte",
  56: "Garoa gelada", 57: "Garoa gelada", 61: "Chuva fraca", 63: "Chuva", 65: "Chuva forte",
  66: "Chuva gelada", 67: "Chuva gelada", 80: "Pancadas leves", 81: "Pancadas", 82: "Pancadas fortes",
  95: "Tempestade", 96: "Tempestade com granizo", 99: "Tempestade com granizo"
};

// Código do tempo -> estado visual do card
function estadoDoCeu(c) {
  if (c === 0) return "limpo";
  if (c <= 2) return "poucas-nuvens";
  if (c === 3) return "nublado";
  if (c === 45 || c === 48) return "neblina";
  if (c >= 51 && c <= 57) return "garoa";
  if ((c >= 61 && c <= 67) || (c >= 80 && c <= 82)) return "chuva";
  if (c >= 95) return "tempestade";
  return "nublado";
}

Painel.registrar({
  nome: "clima",
  cidadeAtual: null,
  iniciar() {
    this.card = document.getElementById("clima-card");
    this.elTemp = document.getElementById("clima-temp");
    this.elDesc = document.getElementById("clima-desc");
    this.elMinMax = document.getElementById("clima-minmax");
    this.cidadeAtual = Painel.config.cidade;
    // Teste no navegador: index.html?clima=chuva&turno=noite
    if (new URLSearchParams(location.search).get("clima")) this.aplicarCeu("nublado", true);
    this.atualizar();
    setInterval(() => this.atualizar(), 15 * 60 * 1000);
  },
  config(cfg) {
    if (cfg.cidade !== this.cidadeAtual) {
      this.cidadeAtual = cfg.cidade;
      this.atualizar();
    }
  },
  aplicarCeu(estado, dia) {
    const q = new URLSearchParams(location.search);
    this.card.dataset.clima = q.get("clima") || estado;
    this.card.dataset.turno = q.get("turno") || (dia ? "dia" : "noite");
  },
  async geo(cidade) {
    try {
      const salvo = JSON.parse(localStorage.getItem("painel.geo") || "null");
      if (salvo && salvo.cidade === cidade) return salvo;
    } catch (e) {}
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cidade)}&count=1&language=pt&countryCode=BR`;
    const r = await (await fetch(url)).json();
    if (!r.results || !r.results.length) throw new Error("Cidade não encontrada");
    const g = { cidade, lat: r.results[0].latitude, lon: r.results[0].longitude };
    try { localStorage.setItem("painel.geo", JSON.stringify(g)); } catch (e) {}
    return g;
  },
  async atualizar() {
    const cidade = (this.cidadeAtual || "").trim();
    if (!cidade) return;
    try {
      const g = await this.geo(cidade);
      const url = `https://api.open-meteo.com/v1/forecast?latitude=${g.lat}&longitude=${g.lon}` +
        `&current=temperature_2m,weather_code,is_day&daily=temperature_2m_max,temperature_2m_min&timezone=auto&forecast_days=1`;
      const d = await (await fetch(url)).json();
      const cod = d.current.weather_code;
      this.elTemp.textContent = `${Math.round(d.current.temperature_2m)}°`;
      this.elDesc.textContent = WMO[cod] || "—";
      this.elMinMax.textContent =
        `${Math.round(d.daily.temperature_2m_min[0])}° / ${Math.round(d.daily.temperature_2m_max[0])}°`;
      this.aplicarCeu(estadoDoCeu(cod), d.current.is_day === 1);
    } catch (e) {
      if (!this.elTemp.textContent) this.elDesc.textContent = "Clima indisponível";
    }
  }
});