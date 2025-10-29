import React from 'react';

type AlertVariant = 'info' | 'success' | 'warning' | 'error';

type AlertProps = {
  variant?: AlertVariant;
  title?: string;
  children?: React.ReactNode;
  className?: string;
};

const styles: Record<AlertVariant, string> = {
  info: 'bg-secondary/10 text-secondary border-secondary/30',
  success: 'bg-success/10 text-success border-success/30',
  warning: 'bg-warning/10 text-warning border-warning/30',
  error: 'bg-error/10 text-error border-error/30',
};

export const Alert: React.FC<AlertProps> = ({ variant = 'info', title, children, className }) => {
  return (
    <div className={["rounded-lg border p-4", styles[variant], className].filter(Boolean).join(' ')}>
      {title && <div className="font-medium mb-1">{title}</div>}
      {children && <div className="text-sm">{children}</div>}
    </div>
  );
};

export default Alert;


