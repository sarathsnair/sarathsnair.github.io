/**
 * Reusable style utilities and class name constants
 */

export const colorStyles = {
  primaryBg: { backgroundColor: 'var(--primary)' } as const,
  primaryText: { color: 'var(--primary)' } as const,
  primaryBorder: { borderColor: 'var(--primary)' } as const,
  secondaryBg: { backgroundColor: 'var(--secondary)' } as const,
  secondaryText: { color: 'var(--secondary)' } as const,
  accentBg: { backgroundColor: 'var(--accent)' } as const,
  accentText: { color: 'var(--accent)' } as const,
} as const;

export const cardStyles = {
  // Base card with border
  base: 'relative bg-white border-4 border-black',

  // Card shadow (offset)
  shadow: 'absolute inset-0 translate-x-2 translate-y-2 -z-10 transition-transform',
  shadowHover: 'group-hover:translate-x-3 group-hover:translate-y-3',

  // Card padding variations
  paddingSm: 'p-4 md:p-6',
  paddingMd: 'p-6 md:p-8',
  paddingLg: 'p-8 md:p-10',
} as const;

export const badgeStyles = {
  // Primary badge (black background)
  primary: 'px-2 py-1 md:px-3 bg-black text-white text-xs font-mono uppercase tracking-wider',

  // Outlined badge
  outline: 'px-2 py-1 md:px-3 bg-white border-2 border-black text-xs font-mono uppercase tracking-wider hover:bg-black hover:text-white transition-colors',

  // Small badge
  sm: 'px-2 py-0.5 md:px-3 md:py-1 bg-black text-white text-xs font-mono uppercase tracking-wider',

  // Interactive badge
  interactive: 'cursor-pointer hover:bg-black hover:text-white transition-colors',
} as const;

export const sectionStyles = {
  // Section container
  container: 'py-20 md:py-32 bg-white relative overflow-hidden',

  // Section inner container
  innerContainer: 'container mx-auto px-6 relative z-10',

  // Background grid pattern
  bgPattern: 'absolute inset-0 opacity-5',
  bgGrid: 'absolute inset-0 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]',
} as const;

export const textStyles = {
  // Heading styles
  h1: 'text-5xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter leading-none text-black',
  h2: 'text-4xl md:text-6xl lg:text-7xl font-black uppercase tracking-tighter leading-none text-black',
  h3: 'text-2xl md:text-3xl font-black uppercase tracking-tight text-black',
  h4: 'text-xl md:text-2xl font-black uppercase tracking-tight text-black',

  // Body text
  body: 'text-base md:text-lg leading-[1.7] text-black',
  bodyLarge: 'text-lg md:text-xl leading-[1.7] text-black',

  // Labels
  label: 'text-sm font-black uppercase tracking-wider text-black',
  labelMono: 'text-sm font-mono uppercase tracking-widest',
} as const;

export const buttonStyles = {
  // Primary button
  primary: 'relative inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 bg-white border-4 border-black font-black uppercase text-base tracking-wider text-black hover:bg-black hover:text-white transition-colors',

  // Secondary button
  secondary: 'relative inline-flex items-center gap-3 px-6 py-3 md:px-8 md:py-4 border-4 border-black font-black uppercase text-base tracking-wider transition-colors',
} as const;

/**
 * Helper to combine class names
 */
export function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}
