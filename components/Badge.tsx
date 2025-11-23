/**
 * Reusable Badge component for tags, labels, and metadata
 */

import { cn, badgeStyles, colorStyles } from '@/lib/styles';

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'outline' | 'sm';
  interactive?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function Badge({
  children,
  variant = 'primary',
  interactive = false,
  className,
  style
}: BadgeProps) {
  const baseClass = variant && variant in badgeStyles ? badgeStyles[variant] : badgeStyles.primary;
  const interactiveClass = interactive ? badgeStyles.interactive : '';

  return (
    <span
      className={cn(baseClass, interactiveClass, className)}
      style={style}
    >
      {children}
    </span>
  );
}

/**
 * Specialized badge for tech stack/technologies
 */
export function TechBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="outline" interactive className="whitespace-nowrap">
      {children}
    </Badge>
  );
}

/**
 * Specialized badge for dates/time periods
 */
export function DateBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge variant="sm">
      {children}
    </Badge>
  );
}

/**
 * Specialized badge with accent color
 */
export function AccentBadge({ children }: { children: React.ReactNode }) {
  return (
    <Badge
      variant="sm"
      className="text-white border-2 border-black"
      style={colorStyles.primaryBg}
    >
      {children}
    </Badge>
  );
}
