// Progresso do dia, do mês e do ano em bolinhas (12 pontos cada).
const PONTOS = 12;

Painel.registrar({
  nome: "progresso",
  iniciar() {
    this.itens = ["hoje", "mes", "ano"].map(k => {
      const c = document.getElementById("pr-" + k);
      c.innerHTML = "<i></i>".repeat(PONTOS);
      return { k, pontos: c.children, valor: document.getElementById("pr-" + k + "-v") };
    });
    this.atualizar();
    setInterval(() => this.atualizar(), 60000);
  },
  atualizar() {
    const d = new Date();
    const hoje = (d.getHours() * 60 + d.getMinutes()) / 1440;
    const diasMes = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate();
    const ini = new Date(d.getFullYear(), 0, 1);
    const fim = new Date(d.getFullYear() + 1, 0, 1);
    const diaAno = Math.floor((new Date(d.getFullYear(), d.getMonth(), d.getDate()) - ini) / 86400000);
    const p = {
      hoje,
      mes: (d.getDate() - 1 + hoje) / diasMes,
      ano: (diaAno + hoje) / Math.round((fim - ini) / 86400000)
    };
    this.itens.forEach(({ k, pontos, valor }) => {
      valor.textContent = (p[k] * 100).toFixed(1) + "%";
      const ligados = Math.floor(p[k] * PONTOS);
      for (let i = 0; i < PONTOS; i++) pontos[i].className = i < ligados ? "on" : "";
    });
  }
});