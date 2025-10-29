import React from 'react';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input: React.FC<InputProps> = ({ label, error, className, id, ...props }) => {
  const autoId = React.useId();
  const inputId = id ?? autoId;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={inputId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={[
          'block w-full rounded-lg border px-3 py-2 text-sm outline-none',
          'border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/30',
          error ? 'border-error focus:border-error focus:ring-error/20' : '',
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
};

export default Input;


