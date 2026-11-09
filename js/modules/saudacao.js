// Saudação que muda conforme o horário, com uma frase que troca a cada dia.
const PERIODOS = {
  madrugada: { saudacao: "Boa madrugada", frases: [
    "O silêncio também trabalha.", "Hora de descansar a mente.", "A cidade dorme, você está de pé." ] },
  manha: { saudacao: "Bom dia", frases: [
    "Um passo de cada vez.", "Hoje é um bom dia para começar.", "Café e foco." ] },
  tarde: { saudacao: "Boa tarde", frases: [
    "Metade do dia já foi, siga firme.", "Respire e continue.", "Ainda dá tempo de fazer bem feito." ] },
  noite: { saudacao: "Boa noite", frases: [
    "Hora de desacelerar.", "Você fez o que deu hoje.", "Amanhã é outro dia." ] }
};

function periodoAtual(h) {
  if (h < 5) return "madrugada";
  if (h < 12) return "manha";
  if (h < 18) return "tarde";
  return "noite";
}

Painel.registrar({
  nome: "saudacao",
  iniciar() {
    this.el = document.getElementById("saudacao");
    this.atualizar();
    setInterval(() => this.atualizar(), 60000);
  },
  config() { this.atualizar(); },
  atualizar() {
    const d = new Date();
    const p = PERIODOS[periodoAtual(d.getHours())];
    const diaDoAno = Math.floor((d - new Date(d.getFullYear(), 0, 0)) / 86400000);
    const frase = p.frases[diaDoAno % p.frases.length];
    const nome = (Painel.config.nome || "").trim();
    this.el.textContent = `${p.saudacao}${nome ? ", " + nome : ""}. ${frase}`;
  }
});