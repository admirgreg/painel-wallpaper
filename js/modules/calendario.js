// Calendário do mês atual (semana começa no domingo). Destaca o dia de hoje.
const MESES = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho",
               "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];
const SEMANA = ["D", "S", "T", "Q", "Q", "S", "S"];

Painel.registrar({
  nome: "calendario",
  chaveAtual: "",
  iniciar() {
    this.elTitulo = document.getElementById("cal-titulo");
    this.elGrade = document.getElementById("cal-grade");
    this.desenhar();
    setInterval(() => this.desenhar(), 60000); // vira o dia sozinho
  },
  desenhar() {
    const hoje = new Date();
    const chave = `${hoje.getFullYear()}-${hoje.getMonth()}-${hoje.getDate()}`;
    if (chave === this.chaveAtual) return;
    this.chaveAtual = chave;

    const ano = hoje.getFullYear(), mes = hoje.getMonth();
    this.elTitulo.textContent = `${MESES[mes]} ${ano}`;

    const primeiroDia = new Date(ano, mes, 1).getDay();
    const diasNoMes = new Date(ano, mes + 1, 0).getDate();
    const diasMesAnterior = new Date(ano, mes, 0).getDate();

    let html = SEMANA.map(s => `<div class="sem">${s}</div>`).join("");
    const total = Math.ceil((primeiroDia + diasNoMes) / 7) * 7;
    for (let i = 0; i < total; i++) {
      const n = i - primeiroDia + 1;
      if (n < 1) html += `<div class="dia fora">${diasMesAnterior + n}</div>`;
      else if (n > diasNoMes) html += `<div class="dia fora">${n - diasNoMes}</div>`;
      else html += `<div class="dia${n === hoje.getDate() ? " hoje" : ""}">${n}</div>`;
    }
    this.elGrade.innerHTML = html;
  }
});
