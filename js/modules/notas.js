// Notas: salvas no localStorage; também dá para editar pelas propriedades do wallpaper.
Painel.registrar({
  nome: "notas",
  chave: "painel.notas",
  ultimaProp: null,
  iniciar() {
    this.el = document.getElementById("notas");
    try { this.el.textContent = localStorage.getItem(this.chave) || ""; } catch (e) {}
    this.el.addEventListener("input", () => {
      try { localStorage.setItem(this.chave, this.el.textContent); } catch (e) {}
    });
  },
  config(cfg) {
    // Só sobrescreve quando o campo "Notas" das propriedades realmente mudou.
    if (cfg.notas !== null && cfg.notas !== this.ultimaProp) {
      this.ultimaProp = cfg.notas;
      if (cfg.notas !== "") {
        this.el.textContent = cfg.notas;
        try { localStorage.setItem(this.chave, cfg.notas); } catch (e) {}
      }
    }
  }
});
