import React from 'react';

export const Card = ({
  children,
  className = '',
  interactive = false,
  padded = true,
  variant = 'default',
  onClick,
  style = {},
  ...props
}) => {
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
        return {
          backgroundColor: 'var(--primary-light)',
          borderColor: 'var(--primary)',
        };
      case 'secondary':
        return {
          backgroundColor: 'var(--secondary-light)',
          borderColor: 'var(--secondary)',
        };
      case 'accent':
        return {
          backgroundColor: 'var(--accent-light)',
          borderColor: 'var(--accent)',
        };
      case 'focus':
        return {
          backgroundColor: 'var(--bg-surface-elevated)',
          border: '2px solid var(--accent)',
          boxShadow: 'var(--shadow-lg)',
        };
      default:
        return {
          backgroundColor: 'var(--bg-surface)',
          borderColor: 'var(--border-light)',
        };
    }
  };

  const cardStyle = {
    borderRadius: 'var(--radius-lg)',
    border: '1.5px solid',
    padding: padded ? '24px' : '0',
    boxShadow: 'var(--shadow-sm)',
    transition: 'var(--transition-smooth)',
    cursor: interactive ? 'pointer' : 'default',
    ...getVariantStyles(),
    ...style,
  };

  return (
    <div
      style={cardStyle}
      className={`aksara-card ${interactive ? 'card-interactive focus-dim-target' : ''} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </div>
  );
};
