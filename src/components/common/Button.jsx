import React from 'react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  className = '',
  onClick,
  disabled = false,
  ariaLabel,
  title,
  type = 'button',
  fullWidth = false,
  ...props
}) => {
  const baseStyles = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontWeight: '700',
    borderRadius: 'var(--radius-md)',
    transition: 'var(--transition-smooth)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.55 : 1,
    gap: '10px',
    lineHeight: 1.2,
    border: '2px solid transparent',
    userSelect: 'none',
    width: fullWidth ? '100%' : 'auto',
    textAlign: 'center',
    flexShrink: 0,
  };

  // Section 13 & 22: Minimum touch target 44–48px for motor accessibility
  const sizeStyles = {
    sm: { minHeight: '40px', padding: '8px 16px', fontSize: '0.9rem' },
    md: { minHeight: '48px', padding: '12px 22px', fontSize: '1rem' },
    lg: { minHeight: '54px', padding: '14px 28px', fontSize: '1.1rem', borderRadius: 'var(--radius-lg)' },
  };

  const variantStyles = {
    // PRIMARY: e.g. "Lanjut", "Simpan"
    primary: {
      backgroundColor: 'var(--primary)',
      color: '#FFFFFF',
      boxShadow: 'var(--shadow-sm)',
    },
    // SECONDARY: e.g. "Kembali"
    secondary: {
      backgroundColor: 'var(--bg-subtle)',
      borderColor: 'var(--border-light)',
      color: 'var(--text-main)',
    },
    // TERTIARY: e.g. "Pelajari", "Lihat Detail"
    tertiary: {
      backgroundColor: 'var(--primary-light)',
      borderColor: 'rgba(91, 95, 239, 0.25)',
      color: 'var(--primary)',
    },
    accent: {
      backgroundColor: 'var(--accent)',
      color: '#382200',
      boxShadow: 'var(--shadow-sm)',
    },
    outline: {
      backgroundColor: 'transparent',
      borderColor: 'var(--border-light)',
      color: 'var(--text-main)',
    },
    danger: {
      backgroundColor: 'var(--danger-light)',
      color: 'var(--danger)',
      borderColor: 'rgba(239, 71, 111, 0.3)',
    },
  };

  const style = {
    ...baseStyles,
    ...(sizeStyles[size] || sizeStyles.md),
    ...(variantStyles[variant] || variantStyles.primary),
  };

  return (
    <button
      type={type}
      style={style}
      className={`aksara-btn aksara-btn-${variant} ${className}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel || (typeof children === 'string' ? children : undefined)}
      title={title}
      {...props}
    >
      {Icon && iconPosition === 'left' && <Icon size={size === 'sm' ? 18 : 20} strokeWidth={2.2} />}
      <span>{children}</span>
      {Icon && iconPosition === 'right' && <Icon size={size === 'sm' ? 18 : 20} strokeWidth={2.2} />}
    </button>
  );
};
