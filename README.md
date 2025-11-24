# [sarathsnair.me](http://sarathsnair.me/)

Modern portfolio website showcasing an elegant brutalist design with asymmetric elements, built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Tech Stack

- **Framework**: Next.js 15.5.6 (with App Router & Static Export)
- **Language**: TypeScript 5.7
- **Styling**: Tailwind CSS 3.4
- **Animations**: Framer Motion 12
- **3D Graphics**: Three.js, React Three Fiber, Drei
- **Icons**: Lucide React
- **Package Manager**: pnpm
- **Deployment**: GitHub Pages via GitHub Actions

## 🎨 Design Features

- **Elegant Brutalism**: Bold typography, thick borders, offset colored shadows
- **Asymmetric Elements**: Dynamic corner accents, varied shapes (triangles, L-brackets, diamonds)
- **Animated Gradients**: Flowing color transitions on headings
- **Parallax Effects**: Cards move at different speeds for depth
- **Counter Animations**: Numbers count up on scroll
- **Noise Texture**: Film grain overlay for premium feel
- **Smooth Scrolling**: Momentum-based scroll with proximity snap
- **Micro-interactions**: Hover effects with rotations, scales, and translations
- **3D Tilt Effects**: Mouse-responsive card interactions
- **Staggered Reveals**: Dramatic entrance animations

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with SEO metadata
│   ├── page.tsx           # Homepage with lazy-loaded sections
│   └── globals.css        # Global styles, animations, utilities
├── components/            # React components
│   ├── Header.tsx         # Navigation with color palette switcher
│   ├── Hero.tsx           # Hero section with counter animations
│   ├── Experience.tsx     # Work experience cards
│   ├── Skills.tsx         # Technical skills grid
│   ├── Testimonials.tsx   # Colleague recommendations
│   ├── Projects.tsx       # Portfolio projects
│   ├── Education.tsx      # Academic background
│   ├── Achievements.tsx   # Awards and certifications
│   ├── Card.tsx           # Reusable card with parallax & accents
│   ├── Badge.tsx          # Reusable badge components
│   ├── SectionHeader.tsx  # Reusable section headers
│   ├── PageLoader.tsx     # Brutalist loading screen
│   ├── ThreeBackground.tsx # 3D particle background
│   └── Footer.tsx         # Footer with contact info
├── data/                  # JSON data files (content-driven)
│   ├── profile.json       # Personal info & social links
│   ├── experience.json    # Work history
│   ├── skills.json        # Technical skills by category
│   ├── testimonials.json  # Colleague recommendations
│   ├── projects.json      # Portfolio projects
│   ├── education.json     # Academic background
│   └── achievements.json  # Awards & certifications
├── lib/                   # Utility functions & hooks
│   ├── data.ts            # Data loading & type definitions
│   ├── styles.ts          # Reusable style utilities
│   ├── animations.ts      # Animation constants & presets
│   ├── hooks.ts           # Custom React hooks
│   ├── useCountUp.ts      # Counter animation hook
│   └── use3DTilt.ts       # 3D tilt effect hook
└── public/                # Static assets
    ├── images/            # Images (logos, profile pic)
    └── assets/files/      # Downloadable files (resume)
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

All content is managed through JSON files in the `/data` directory:

- **Profile Info**: `data/profile.json` - Name, title, bio, contact, social links
- **Experience**: `data/experience.json` - Work history and responsibilities
- **Skills**: `data/skills.json` - Technical skills by category
- **Testimonials**: `data/testimonials.json` - Colleague recommendations
- **Projects**: `data/projects.json` - Portfolio projects
- **Education**: `data/education.json` - Academic background
- **Achievements**: `data/achievements.json` - Awards and certifications

After updating, commit and push to trigger automatic deployment.

## 🚀 Deployment

The site automatically deploys to GitHub Pages when you push to the `modern-nextjs` branch.

### Deployment Process:
1. GitHub Actions workflow triggers on push
2. Installs dependencies with pnpm
3. Builds Next.js static export
4. Copies CNAME file for custom domain
5. Deploys to GitHub Pages (`gh-pages` branch)

### Workflow File
`.github/workflows/deploy.yml`

## 🎨 Visual Enhancements

### Animations
- **Number Counter**: Stats count up from 0 on scroll
- **Parallax Depth**: Cards move at different speeds
- **Enhanced Reveals**: Scale, rotation, and bounce effects
- **Gradient Flow**: Animated color transitions on headings
- **3D Rotations**: Cards tilt on entrance animations

### Interactive Elements
- **Card Hover**: Asymmetric corner accents appear
- **Button Hover**: Icons rotate and scale
- **Badge Hover**: Lift effect with color transitions
- **Link Hover**: Arrows rotate 45°
- **Magnetic Effects**: Buttons react to cursor proximity

### Textures & Effects
- **Noise Overlay**: Subtle film grain throughout
- **Grid Patterns**: Background grids in sections
- **Asymmetric Shadows**: Colored offset shadows
- **Smooth Scroll**: Momentum scrolling with snap points

## 📝 Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production (static export)
- `pnpm start` - Preview production build
- `pnpm lint` - Run ESLint

## 🌈 Color Palettes

The site includes a dynamic color palette switcher with multiple themes:
- Blue Ocean (default)
- Purple Sunset
- Green Forest
- Orange Fire
- Pink Blossom
- Teal Wave

Colors are managed via CSS custom properties (`--primary`, `--secondary`, `--accent`).

## 📄 License

All Rights Reserved © Sarath S Nair
