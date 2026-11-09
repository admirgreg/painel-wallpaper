# Painel (Wallpaper Engine)

Wallpaper web em estilo bento, com efeito de vidro, centralizado na tela.
Feito em HTML + CSS + JavaScript puro, sem dependências, organizado em módulos para crescer com facilidade.

## O que tem

| Recurso | Descrição |
|---|---|
| Relógio | Números de vidro (estilo tela de bloqueio do iPhone), HH:MM na mesma linha. Segundos e AM/PM opcionais |
| Saudação | Muda conforme o horário (madrugada, manhã, tarde, noite), com uma frase que troca a cada dia |
| Data | Dia da semana por extenso, data `dd/mm/aaaa`, semana do ano e trimestre |
| Clima | Open-Meteo (gratuito, sem chave). Fundo animado conforme o tempo: sol, lua, nuvens, neblina, garoa, chuva e tempestade, de dia e de noite |
| Calendário | Mês atual, com o dia de hoje destacado |
| Progresso | Quanto já passou do dia, do mês e do ano, em bolinhas |
| Música | Card fixo com capa, título, artista e barra de tempo. Fundo tingido pela cor da capa |
| Notas | Bloco de notas salvo automaticamente |

## Estrutura

```
painel-wallpaper/
├── project.json          propriedades do Wallpaper Engine
├── index.html            estrutura da página (grade bento)
├── README.md
├── css/
│   └── style.css         temas, fontes, vidro, layout e céu animado
├── fonts/                arquivos .woff2 (opcionais, veja "Fontes")
└── js/
    ├── core.js           registro de módulos e configurações
    ├── main.js           inicialização
    └── modules/
        ├── saudacao.js   saudação por horário
        ├── relogio.js    hora, dia da semana, data, semana e trimestre
        ├── clima.js      clima e céu animado
        ├── calendario.js calendário do mês
        ├── progresso.js  progresso do dia, mês e ano
        ├── midia.js      card de música
        └── notas.js      bloco de notas
```

## Como usar

### No navegador (desenvolvimento)
1. Abra a pasta no VSCode.
2. Use a extensão **Live Server** (clique direito em `index.html` > *Open with Live Server*).
3. A página abre em `http://127.0.0.1:5500/index.html`.

### No Wallpaper Engine
1. Abra o **Editor de Wallpaper** > *Abrir wallpaper*.
2. Selecione o `project.json` desta pasta.
3. Ajuste as propriedades no painel lateral.

## Propriedades (Wallpaper Engine)

| Propriedade | Função |
|---|---|
| Tema | Grafite, Noite, Aurora ou Claro |
| Fonte | Moderno, Elegante, Tech ou Pixel |
| Layout | Centro ou Canto |
| Cor de destaque | Calendário, títulos e detalhes |
| Seu nome | Aparece na saudação |
| Cidade | Usada para o clima (padrão: Votorantim) |
| Relógio 24h | Alterna entre 24h e 12h com AM/PM |
| Mostrar segundos | Liga ou desliga os segundos |
| Pop-up de mídia | Mostra ou esconde o card de música |
| Notas | Campo de texto que preenche o bloco de notas |

## Testes no navegador

O navegador não tem a integração de mídia do Wallpaper Engine, então use estes atalhos na URL:

- **Música simulada:** `index.html?demo`
- **Estado do clima:** `index.html?clima=chuva&turno=noite`
  - Estados: `limpo`, `poucas-nuvens`, `nublado`, `neblina`, `garoa`, `chuva`, `tempestade`
  - Turnos: `dia`, `noite`

Para testar temas, fontes e layouts sem o painel de propriedades, edite os atributos `data-tema`, `data-fonte` e `data-layout` no `<body>` do `index.html`.

## Fontes

Os arquivos `.woff2` são opcionais. Sem eles, o painel usa a fonte do sistema e continua funcionando.
Baixe em fonts.google.com e salve em `fonts/` com estes nomes:

- `Inter.woff2`
- `Nunito.woff2` (relógio no preset Moderno)
- `CormorantGaramond.woff2` (preset Elegante)
- `SpaceGrotesk.woff2` e `JetBrainsMono.woff2` (preset Tech)
- `DotGothic16.woff2` (preset Pixel)

## Criar um novo módulo

1. Crie `js/modules/meumodulo.js`:

```js
Painel.registrar({
  nome: "meumodulo",
  iniciar() { /* roda uma vez, quando a página carrega */ },
  config(cfg) { /* roda quando uma propriedade muda */ }
});
```

2. Inclua no `index.html`, antes do `main.js`:

```html
<script src="js/modules/meumodulo.js"></script>
```

3. Se precisar de uma propriedade nova: adicione em `project.json` e inclua o nome na lista do `for` em `core.js`.

## Observações

- **Música e capa** dependem da integração de mídia do Wallpaper Engine (lê a sessão de mídia do Windows: Spotify, players, vídeos no navegador). Só funciona de verdade dentro dele.
- **Clima** precisa de internet. O resultado da busca da cidade fica guardado no `localStorage`, e o clima atualiza a cada 15 minutos.
- **Digitar direto nas notas** pode não funcionar dentro do Wallpaper Engine, que repassa pouco o teclado. O caminho confiável é o campo "Notas" nas propriedades.
- **Efeito de vidro** usa `backdrop-filter` e aparece melhor sobre fundos coloridos (os temas já trazem brilhos de cor no fundo).

## Ideias futuras

- Fotos reais de fundo no card de clima
- Relógios mundiais
- Telemetria de hardware (CPU, GPU, temperatura): web wallpapers não leem hardware, então o plano é um programa auxiliar local (Python ou Node) que expõe os dados em `localhost`, consumido por um `js/modules/hardware.js`
- Notas em formato de checklist