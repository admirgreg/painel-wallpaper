# Painel (Wallpaper Engine)

Abra esta pasta no VSCode. Para testar no navegador: `index.html?demo` (simula o pop-up de mídia).
No Wallpaper Engine: Editor de Wallpaper > Abrir wallpaper > selecione `project.json`.

## Estrutura
- `project.json`: metadados e propriedades (cor, 24h, segundos, pop-up, notas)
- `index.html`: estrutura da página
- `css/style.css`: visual
- `js/core.js`: registro de módulos e configurações
- `js/modules/`: um arquivo por recurso (relogio, midia, notas)
- `js/main.js`: inicialização

## Novo recurso
Crie `js/modules/xxx.js` com `Painel.registrar({ nome, iniciar(), config() })` e inclua no `index.html`.

## Telemetria de hardware (futuro)
Web wallpapers não leem CPU/GPU/temperatura. Plano: um programa auxiliar local (Python ou Node)
expõe os dados em `http://localhost:PORTA` e `js/modules/hardware.js` os consulta com `fetch`.
