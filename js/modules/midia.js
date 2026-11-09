// Card de música fixo: usa a integração de mídia do Wallpaper Engine
// (Spotify, players, vídeos no navegador etc.).
const mmss = s => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

Painel.registrar({
  nome: "midia",
  pos: 0, dur: 0, tocando: false,
  iniciar() {
    const $ = id => document.getElementById(id);
    this.el = { card: $("musica-card"), capa: $("capa"), titulo: $("titulo"), artista: $("artista"),
                fill: $("barra-fill"), pos: $("t-pos"), dur: $("t-dur") };

    if (window.wallpaperRegisterMediaPlaybackListener) {
      wallpaperRegisterMediaPlaybackListener(e => {
        this.tocando = e.state === window.wallpaperMediaIntegration.playback.PLAYING;
        this.render();
      });
      wallpaperRegisterMediaPropertiesListener(e => {
        this.el.titulo.textContent = e.title || "Nada tocando";
        this.el.artista.textContent = e.artist || "";
      });
      wallpaperRegisterMediaThumbnailListener(e => {
        this.el.capa.src = e.thumbnail || "";
        if (e.primaryColor) this.el.card.style.setProperty("--musica-cor", e.primaryColor);
      });
      wallpaperRegisterMediaTimelineListener(e => {
        this.pos = e.position; this.dur = e.duration;
        this.render();
      });
    } else if (location.search.includes("demo")) {
      // Teste no navegador: abra index.html?demo
      this.el.titulo.textContent = "Música de teste";
      this.el.artista.textContent = "Artista";
      this.dur = 215;
      setInterval(() => { this.pos = (this.pos + 1) % this.dur; this.render(); }, 1000);
    }
    this.render();
  },
  config() { this.render(); },
  render() {
    this.el.card.classList.toggle("oculto", !Painel.config.popup);
    const pct = this.dur > 0 ? Math.min(100, (this.pos / this.dur) * 100) : 0;
    this.el.fill.style.width = pct + "%";
    this.el.pos.textContent = mmss(this.pos || 0);
    this.el.dur.textContent = mmss(this.dur || 0);
  }
});