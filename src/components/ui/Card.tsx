import React from 'react';

type CardProps = {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
};

export const Card: React.FC<CardProps> = ({ title, subtitle, children, className }) => {
  return (
    <section className={["rounded-2xl border border-gray-200/60 bg-white/90 backdrop-blur-sm shadow-lg shadow-gray-200/50 hover:shadow-xl hover:shadow-gray-300/50 transition-all duration-300 p-6", className].filter(Boolean).join(' ')}>
      {(title || subtitle) && (
        <div className="mb-5 pb-4 border-b border-gray-100">
          {title && <h2 className="text-lg font-semibold text-gray-900">{title}</h2>}
          {subtitle && <p className="text-sm text-gray-500 mt-1">{subtitle}</p>}
        </div>
      )}
      {children}
    </section>
  );
};

export default Card;


