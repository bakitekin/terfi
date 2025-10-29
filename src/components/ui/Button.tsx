import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success';

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  fullWidth?: boolean;
};

const base = 'inline-flex items-center justify-center rounded-xl px-5 py-2.5 text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm hover:shadow-md';

const variantClass: Record<ButtonVariant, string> = {
  primary: 'bg-secondary text-white hover:opacity-90 focus:ring-secondary',
  secondary: 'bg-primary text-white hover:opacity-90 focus:ring-primary',
  ghost: 'bg-transparent text-gray-800 hover:bg-gray-100 focus:ring-gray-300',
  danger: 'bg-error text-white hover:opacity-90 focus:ring-error',
  success: 'bg-success text-white hover:opacity-90 focus:ring-success',
};

export const Button: React.FC<ButtonProps> = ({ variant = 'primary', fullWidth, className, ...props }) => {
  const width = fullWidth ? 'w-full' : '';
  return (
    <button className={[base, variantClass[variant], width, className].filter(Boolean).join(' ')} {...props} />
  );
};

export default Button;


