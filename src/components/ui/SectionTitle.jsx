export default function SectionTitle({
  label,
  title,
  description,
  light = false,
  accent = 'lavender',
  className = '',
}) {
  const labelClass = light
    ? accent === 'orange'
      ? 'label-accent text-orange'
      : 'label-accent-light text-lavender'
    : 'text-orange';

  return (
    <div className={`max-w-2xl ${className}`}>
      {label && (
        <span
          className={`${labelClass} font-label mb-4 inline-flex items-center`}
        >
          {label}
        </span>
      )}
      <h2
        className={`font-display text-3xl leading-tight sm:text-4xl lg:text-5xl ${
          light ? 'text-white' : 'text-ink'
        }`}
      >
        {title}
      </h2>
      {description && (
        <p className={`mt-4 text-lg leading-relaxed ${light ? 'text-white/80' : 'text-ink-muted'}`}>
          {description}
        </p>
      )}
    </div>
  );
}
