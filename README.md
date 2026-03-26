# MAItink — Site Institucional

Site institucional da Maitink, agência de marketing digital com IA.

## Tech Stack
- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod

## Como rodar localmente

```bash
git clone https://github.com/Erivaldo-Neto/MaiTink---Landing-Page.git
cd MaiTink---Landing-Page
npm install
cp .env.example .env.local
# Preencha as variáveis no .env.local se necessário
npm run dev
```

## Build de produção

```bash
npm run build
npm run start
```

## Otimizações implementadas
- Imagens em formato WebP com lazy loading.
- Dynamic imports para as seções abaixo do fold.
- Fontes otimizadas via Next.js Google Fonts.
- Cabeçalhos de segurança (CSP, HSTS, X-Frame-Options, etc).
- SEO completo com Metadata API, sitemap.xml e robots.txt.

## Licença
Privado — Todos os direitos reservados.
