# Website Engine

> SME Website Builder — Generate, customize, and export professional websites for local businesses.

## Quick Start

### Prerequisites
- **Node.js 20+**
- **npm 9+**

### 1. Install dependencies
```bash
npm install
npx playwright install chromium
```

### 2. Configure environment
```bash
cp .env.example .env
# Edit .env → add your ANTHROPIC_API_KEY
```

### 3. Start development
```bash
# Terminal 1: API server (port 3001)
npm run dev:api

# Terminal 2: Web UI (port 3000)
npm run dev:web
```

Open **http://localhost:3000** → Create a new project.

---

## CLI Commands

### Scrape a website
```bash
npm run scrape -- https://example-restaurant.de
```
Outputs a project ID. Scrapes all pages, downloads images, extracts business info.

### Generate a website from scraped data
```bash
npm run generate -- <projectId> --preset modern_clean --lang de
```
Presets: `modern_clean`, `bold`, `elegant`
Languages: `de`, `en`

### Export a standalone Next.js project
```bash
npm run export -- --id <projectId>
```
Output: `./exports/<projectId>/` — a deployable Next.js app.

### Run an exported site
```bash
cd exports/<projectId>
npm install
npm run build
npm start
```

---

## Project Structure

```
├── apps/
│   ├── web/          → Next.js Builder UI (port 3000)
│   └── api/          → Express API server (port 3001)
├── packages/
│   └── core/         → Zod schemas, presets, section registry
├── templates/
│   └── next-export/  → Template for exported client sites
├── data/
│   └── projects/     → Runtime project data (gitignored)
└── exports/          → Exported sites (gitignored)
```

## Architecture

- **JSON is the single source of truth** — every project is a `SiteProject` JSON file
- **Builder edits JSON, never HTML** — deterministic rendering from schema
- **12 section types**: hero, benefits, services, gallery, pricing, team, testimonials, faq, contact, map, footer, cta_banner
- **3 style presets** with different section layouts: Modern Clean, Bold, Elegant
- **LLM adapter pattern**: Anthropic (primary), OpenAI (stub)
- **No database** — filesystem storage under `./data/projects/`

## Features

- URL scraping with Playwright (multi-page, auto-downloads images)
- AI-generated website content (DE/EN, conversion-optimized)
- Visual builder with drag-and-drop section reordering
- Inspector panel for editing all section properties
- Brand kit: colors, fonts, radius, spacing
- Media library with file upload + Pexels stock photo search
- AI actions: rewrite sections, generate FAQs, create new pages
- Live preview with mobile/desktop toggle
- Export as standalone Next.js project with contact form

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Yes* | Anthropic API key for content generation |
| `OPENAI_API_KEY` | No | OpenAI API key (alternative provider) |
| `LLM_PROVIDER` | No | `anthropic` (default) or `openai` |
| `PEXELS_API_KEY` | No | Pexels API key for stock photo search |
| `CREDIT_BRAND_NAME` | No | Your brand name for footer credits |
| `CREDIT_BRAND_URL` | No | Your brand URL for footer credits |
| `API_PORT` | No | API server port (default: 3001) |
| `WEB_PORT` | No | Web UI port (default: 3000) |

*Required if `LLM_PROVIDER=anthropic`

## Deploy on Ubuntu VPS

```bash
git clone <repo> website-engine && cd website-engine
npm install
npx playwright install --with-deps chromium
cp .env.example .env
# Edit .env with your API keys

# Build
npm run build

# Run with PM2
npm install -g pm2
pm2 start apps/api/dist/index.js --name api
pm2 start npm --name web -- run start --workspace=apps/web
```

## v2 Roadmap

- [ ] CMS mode — clients can edit their own content
- [ ] Team collaboration — multiple editors per project
- [ ] Customer portal — client login to manage their site
- [ ] Multi-language — auto-translate pages
- [ ] Template library — pre-built industry templates
- [ ] A/B testing sections
- [ ] Analytics dashboard
- [ ] Auto-deploy to Vercel/Netlify
