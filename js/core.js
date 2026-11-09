// Núcleo: registro de módulos + configurações compartilhadas.
window.Painel = {
  modulos: [],
  config: {
    cor: "#73bfff", formato24h: true, segundos: false, popup: true, notas: null,
    nome: "", cidade: "Votorantim", tema: "grafite", fonte: "moderno", layout: "centro"
  },

  registrar(modulo) { this.modulos.push(modulo); },
  iniciar() { this.modulos.forEach(m => m.iniciar && m.iniciar()); },

  // Wallpaper Engine envia cores como "r g b" entre 0 e 1.
  corParaCss(v) {
    const [r, g, b] = v.split(" ").map(n => Math.round(parseFloat(n) * 255));
    return `rgb(${r}, ${g}, ${b})`;
  },

  aplicarConfig(props) {
    const c = this.config;
    if (props.cor) {
      c.cor = this.corParaCss(props.cor.value);
      document.documentElement.style.setProperty("--cor", c.cor);
    }
    for (const k of ["formato24h", "segundos", "popup", "notas", "nome", "cidade", "tema", "fonte", "layout"]) {
      if (props[k]) c[k] = props[k].value;
    }
    document.body.dataset.tema = c.tema;
    document.body.dataset.fonte = c.fonte;
    document.body.dataset.layout = c.layout;
    this.modulos.forEach(m => m.config && m.config(c));
  }
};

window.wallpaperPropertyListener = {
  applyUserProperties: props => window.Painel.aplicarConfig(props)
};