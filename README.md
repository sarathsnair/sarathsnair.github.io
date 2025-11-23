# [sarathsnair.me](http://sarathsnair.me/)

Modern portfolio website built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (with App Router)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Package Manager**: pnpm (fast, efficient, modern)
- **Deployment**: GitHub Pages via GitHub Actions

## 📁 Project Structure

```
├── app/                  # Next.js App Router pages
│   ├── layout.tsx       # Root layout with SEO metadata
│   ├── page.tsx         # Homepage
│   └── globals.css      # Global styles
├── components/          # React components
│   ├── Header.tsx       # Navigation header
│   ├── Hero.tsx         # Hero section with intro
│   ├── Experience.tsx   # Work experience
│   ├── Projects.tsx     # Portfolio projects
│   ├── Education.tsx    # Educational background
│   ├── Achievements.tsx # Awards and certifications
│   └── Footer.tsx       # Footer with contact info
├── data/                # JSON data files (content-driven)
│   ├── profile.json     # Personal info & social links
│   ├── experience.json  # Work history
│   ├── projects.json    # Project portfolio
│   ├── education.json   # Academic background
│   └── achievements.json # Awards & certifications
├── lib/                 # Utility functions
│   └── data.ts          # Data loading & formatting
└── public/              # Static assets
    ├── images/          # Images
    └── assets/files/    # Downloadable files (resume)
```

## 🔧 Development

### Prerequisites
- Node.js >= 20.0.0
- pnpm >= 9.0.0 (install with: `npm install -g pnpm`)

### Getting Started

1. **Install dependencies**
   ```bash
   pnpm install
   ```

2. **Run development server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

3. **Build for production**
   ```bash
   pnpm build
   ```

4. **Preview production build**
   ```bash
   pnpm start
   ```

## ✏️ Updating Content

All content is managed through JSON files in the `/data` directory. Simply edit these files and rebuild:

- **Profile Info**: `data/profile.json` - Name, title, bio, contact, social links
- **Experience**: `data/experience.json` - Work history and responsibilities
- **Projects**: `data/projects.json` - Portfolio projects
- **Education**: `data/education.json` - Academic background
- **Achievements**: `data/achievements.json` - Awards and certifications

After updating, commit and push to trigger automatic deployment.

## 🚀 Deployment

The site automatically deploys to GitHub Pages when you push to the `modern-nextjs` branch.

### Deployment Process:
1. GitHub Actions workflow triggers on push
2. Installs dependencies
3. Builds Next.js static export
4. Copies CNAME and other files
5. Deploys to GitHub Pages

### Workflow File
`.github/workflows/deploy.yml`

## 🎨 Features

- ✅ Modern, minimal UI design
- ✅ Fully responsive (mobile & desktop)
- ✅ Dark mode support
- ✅ SEO optimized with metadata
- ✅ Smooth animations with Framer Motion
- ✅ Content-driven architecture (JSON)
- ✅ Static site generation for fast performance
- ✅ TypeScript for type safety
- ✅ Auto-deployment via GitHub Actions

## 📝 Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 📄 License

All Rights Reserved © Sarath S Nair
