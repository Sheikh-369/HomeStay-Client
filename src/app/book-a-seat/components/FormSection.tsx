import React from 'react';

interface FormSectionProps {
  number: string;
  title: string;
  description: string;
  children: React.ReactNode;
  isLast?: boolean;
}

export default function FormSection({
  number,
  title,
  description,
  children,
  isLast = false,
}: FormSectionProps) {
  return (
    <fieldset
      className={`px-7 py-8 md:px-10 md:py-10 ${!isLast ? 'border-b border-primary/6' : ''}`}
    >
      {/* Section header */}
      <div className="flex items-start gap-4 mb-7">
        <span
          className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/5 flex items-center justify-center text-xs font-black text-primary/40 mt-0.5"
          aria-hidden="true"
        >
          {number}
        </span>
        <div>
          <legend className="font-display text-xl font-semibold text-primary leading-tight">
            {title}
          </legend>
          <p className="text-sm text-primary/45 mt-0.5">{description}</p>
        </div>
      </div>

      {children}
    </fieldset>
  );
}