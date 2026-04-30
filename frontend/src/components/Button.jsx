'use client';

import { theme } from '@/styles/theme';

const base = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
  padding: '0.62rem 1.1rem',
  fontSize: '0.875rem',
  fontWeight: 600,
  borderRadius: '0.5rem',
  border: '1px solid transparent',
  cursor: 'pointer',
  fontFamily: 'inherit',
};

export default function Button({
  children,
  variant = 'primary',
  disabled = false,
  type = 'button',
  onClick,
  title,
  ...rest
}) {
  const v = variants[variant] || variants.primary;
  return (
    <button
      type={type}
      title={title}
      disabled={disabled}
      onClick={onClick}
      style={{
        ...base,
        ...v,
        opacity: disabled ? 0.5 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        boxShadow: disabled ? 'none' : v.boxShadow,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}

const variants = {
  primary: {
    background: `linear-gradient(180deg, ${theme.accent} 0%, #06b6d4 100%)`,
    color: '#042f2e',
    borderColor: 'rgba(34, 211, 238, 0.5)',
    boxShadow: '0 0 20px rgba(34, 211, 238, 0.25)',
  },
  danger: {
    background: theme.dangerSoft,
    color: theme.danger,
    borderColor: 'rgba(248, 113, 113, 0.35)',
    boxShadow: 'none',
  },
  ghost: {
    background: theme.accentSoft,
    color: theme.accentText,
    borderColor: theme.border,
    boxShadow: 'none',
  },
};