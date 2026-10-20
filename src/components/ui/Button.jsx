import { Link } from 'react-router-dom';

const variants = {
  primary:
    'bg-ink text-white hover:bg-lavender active:bg-lavender-deep shadow-lg shadow-ink/25 hover:shadow-lavender/35 active:shadow-lavender/40',
  orange:
    'bg-orange text-white hover:bg-orange/90 shadow-lg shadow-orange/25 hover:shadow-orange/35',
  secondary:
    'bg-lavender/25 text-ink border border-lavender/50 hover:bg-lavender/40',
  outline:
    'border-2 border-white/80 text-white hover:bg-white/10 backdrop-blur-sm',
  ghost: 'text-orange hover:bg-orange/10',
  dark: 'bg-ink text-white hover:bg-ink/90 shadow-md shadow-ink/20',
  outlineDark: 'border-2 border-ink/80 text-ink hover:bg-ink hover:text-white',
  lavender: 'bg-lavender text-white hover:bg-lavender/90 shadow-md shadow-lavender/25',
};

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

const shapedVariants = new Set(['primary', 'dark', 'orange', 'lavender', 'outlineDark']);

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  to,
  external,
  ...props
}) {
  const shape = shapedVariants.has(variant)
    ? 'rounded-md font-semibold'
    : 'rounded-full font-medium';

  const classes = `inline-flex max-w-full min-w-0 items-center justify-center gap-2 text-center leading-tight transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange ${shape} ${variants[variant]} ${sizes[size]} ${className}`;

  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  if (href) {
    return (
      <a
        href={href}
        className={classes}
        target={external ? '_blank' : undefined}
        rel={external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </a>
    );
  }

  return (
    <button type="button" className={classes} {...props}>
      {children}
    </button>
  );
}
