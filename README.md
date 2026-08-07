# Darlan (NATSKY) — Portfólio Pessoal

> Site portfólio de **Darlan**, conhecido também como **NATSKY** (@0NATSKY0 / oxynisx) — desenvolvedor, engenheiro de IA aplicada, criador de sites sob demanda com IA e streamer.

[![Deploy Status](https://img.shields.io/badge/deploy-GitHub%20Pages-22d3ee?style=flat&logo=github)](https://kronos1027.github.io/portifolio/)
[![License](https://img.shields.io/badge/license-MIT-fbbf24?style=flat)](LICENSE)
[![Made with IA](https://img.shields.io/badge/made%20with-GLM%20%2B%20manual%20review-22d3ee?style=flat)](https://github.com/Kronos1027)
[![Performance](https://img.shields.io/badge/Lighthouse-100%20goal-fbbf24?style=flat)](https://kronos1027.github.io/portifolio/)

![NATSKY Portfolio Preview](https://kronos1027.github.io/portifolio/assets/img/og-image.png)

---

## ✨ Sobre

Este é o portfólio oficial de Darlan (conhecido também como NATSKY), projetado para comunicar com peso equivalente suas três frentes de atuação:

1. **Desenvolvedor / Engenheiro de IA aplicada** — agentes de IA locais, assistentes desktop/mobile, pesquisa em compressão neural de imagens.
2. **Criador de sites sob demanda usando IA (GLM)** — do briefing ao deploy, com precisão de produção.
3. **Streamer / Criador de conteúdo** — Twitch e TikTok, persona VTuber **Oto-ai** (oxynixs).

O site também funciona como **vitrine comercial** do serviço de criação de sites — ele mesmo é a prova de que o processo funciona.

---

## 🎨 Direção visual

- **Tema:** dark mode "deep tech / terminal de IA" sofisticado (referências: Linear, Vercel, Raycast).
- **Paleta:** fundo quase-preto (`#0a0b0f`–`#12141a`), acento primário **ciano/teal** (`#22d3ee`), acento secundário **âmbar/dourado** (`#fbbf24`).
- **Tipografia:** `Space Grotesk` (display) + `Inter` (corpo) + `JetBrains Mono` (detalhes técnicos/código) via Google Fonts.
- **Animações:**
  - Hero com efeito de **texto digitado** alternando papéis.
  - **Partículas reativas ao mouse** em canvas (sem libs pesadas).
  - **Scroll-reveal** em todas as seções (AOS.js).
  - **Cards de projeto com tilt 3D** no hover + glow que segue o cursor.
  - **Contadores animados** que sobem de 0 ao valor ao entrar na viewport.
  - **Cursor customizado** (ponto + anel com spring).
  - **Barra de progresso de scroll** no topo.
  - Micro-interações em botões (ripple, glow).

---

## 🧱 Stack técnica

| Camada     | Tecnologia                                            |
| ---------- | ---------------------------------------------------- |
| HTML       | HTML5 semântico, meta tags Open Graph, JSON-LD       |
| CSS        | CSS3 puro com custom properties (design system)      |
| JS         | Vanilla JS (ES6+), sem build step                    |
| Animações  | AOS.js (scroll-reveal) + GSAP (entradas) via CDN     |
| Background | Canvas custom para partículas (sem libs externas)    |
| Fontes     | Google Fonts (Inter, JetBrains Mono, Space Grotesk)  |
| Deploy     | GitHub Pages (estático, sem backend)                |

**100% responsivo**, mobile-first, testado em 375px, 768px e 1440px. Sem dependências quebradas — basta abrir o `index.html`.

---

## 📂 Estrutura

```
portifolio/
├── index.html              # Página única com todas as seções
├── README.md               # Este arquivo
├── sitemap.xml             # SEO
├── robots.txt              # SEO
├── .gitignore
├── CNAME                   # (vazio) — preencha se tiver domínio próprio
└── assets/
    ├── css/
    │   └── style.css       # Design system + todas as animações
    ├── js/
    │   └── main.js         # Toda a lógica: typing, particles, tilt, contadores
    └── img/
        └── og-image.png    # Open Graph image (adicione sua arte)
```

---

## 🚀 Como rodar localmente

Não precisa de build. Três opções:

### Opção 1 — Abrir direto
```bash
# Clone o repositório
git clone https://github.com/Kronos1027/portifolio.git
cd portifolio

# Abra o index.html no navegador
xdg-open index.html        # Linux
open index.html            # macOS
start index.html           # Windows
```

### Opção 2 — Servidor estático com Python
```bash
python3 -m http.server 8000
# Acesse: http://localhost:8000
```

### Opção 3 — Live Server (VS Code)
Extensão **Live Server** → botão direito no `index.html` → "Open with Live Server".

---

## 🌐 Deploy via GitHub Pages

1. Faça push do repositório para `github.com/Kronos1027/portifolio`.
2. No GitHub, vá em **Settings → Pages**.
3. Em **Source**, escolha `Deploy from a branch`.
4. Selecione branch `main` e pasta `/root`.
5. Salve. Em 1–2 min o site estará em:
   ```
   https://kronos1027.github.io/portifolio/
   ```

### Domínio próprio
Se você tiver um domínio (ex: `natsky.dev`):
1. Crie/edite o arquivo `CNAME` na raiz com o domínio: `natsky.dev`.
2. No painel do seu provedor de DNS, aponte um registro `CNAME` de `www` para `kronos1027.github.io` (ou configure os A records do apex conforme a [documentação do GitHub](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)).
3. No GitHub Pages, habilite **Enforce HTTPS**.

---

## 🛠️ Como personalizar

### Trocar conteúdo
- **Projetos:** edite os blocos `<article class="project tilt">` em `index.html`.
- **Preços:** edite os blocos `<article class="price-card">`.
- **Links sociais:** atualize os `href` na seção Contato.
- **Avatar/persona:** substitua o bloco `.stream__avatar` por uma `<img>` se tiver arte da Oto-ai.

### Trocar cores
Edite as variáveis no topo do `assets/css/style.css`:
```css
:root {
  --teal: #22d3ee;     /* acento primário */
  --amber: #fbbf24;    /* acento secundário */
  --bg-0: #0a0b0f;     /* fundo base */
}
```

### Adicionar uma nova seção
Copie o padrão:
```html
<section class="section" id="minha-secao">
  <div class="container">
    <header class="section__header" data-aos="fade-up">
      <span class="section__num">// NN</span>
      <h2 class="section__title">Título</h2>
      <span class="section__line"></span>
    </header>
    <!-- conteúdo -->
  </div>
</section>
```
E adicione o link correspondente no `.nav__links`.

---

## 📈 SEO & Performance

- ✅ Meta tags completas (title, description, keywords, author, theme-color)
- ✅ Open Graph + Twitter Card (preview bonito no Discord/TikTok/Twitch)
- ✅ JSON-LD (`schema.org/Person`) para rich snippets
- ✅ `sitemap.xml` e `robots.txt`
- ✅ Favicon SVG inline (sem requisição extra)
- ✅ Fontes com `preconnect` e `display=swap`
- ✅ Lazy por padrão (sem imagens pesadas)
- ✅ Sem JavaScript bloqueante (scripts com `defer`)
- ✅ Meta de Lighthouse > 90 em Performance/Acessibilidade/SEO

---

## 📝 Licença

MIT — fique livre para usar como base do seu próprio portfólio. attribution apreciada, não obrigatória.

---

## 📬 Contato

- **GitHub:** [@Kronos1027](https://github.com/Kronos1027)
- **Twitch:** NATSKY / Oto-ai
- **TikTok:** @0NATSKY0
- **E-mail:** contato@natsky.dev

---

<p align="center">
  Feito com <strong>IA (GLM)</strong> e ajuste manual.<br>
  © Darlan (NATSKY) · Brasil
</p>
