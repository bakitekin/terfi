import React from 'react';

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label?: string;
  error?: string;
  options: Array<{ label: string; value: string | number }>
};

export const Select: React.FC<SelectProps> = ({ label, error, className, id, options, ...props }) => {
  const autoId = React.useId();
  const selectId = id ?? autoId;
  return (
    <div className="w-full">
      {label && (
        <label htmlFor={selectId} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
      )}
      <select
        id={selectId}
        className={[
          'block w-full rounded-lg border px-3 py-2 text-sm outline-none bg-white',
          'border-gray-300 focus:border-secondary focus:ring-2 focus:ring-secondary/30',
          error ? 'border-error focus:border-error focus:ring-error/20' : '',
          className,
        ].filter(Boolean).join(' ')}
        {...props}
      >
        {options.map(opt => (
          <option key={String(opt.value)} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </div>
  );
};

export default Select;


