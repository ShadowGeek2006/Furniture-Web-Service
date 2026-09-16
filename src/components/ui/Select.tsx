import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
  helperText?: string;
}

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, options, error, helperText, id, ...props }, ref) => {
    const selectId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={selectId} className="block text-xs font-semibold uppercase tracking-wider text-espresso-700 mb-1.5">
            {label} {props.required && <span className="text-terracotta-500">*</span>}
          </label>
        )}
        <div className="relative">
          <select
            id={selectId}
            ref={ref}
            className={cn(
              "w-full appearance-none bg-white border border-sand-300 text-espresso-900 text-sm rounded-sm px-3.5 py-2.5 pr-9 transition-colors focus:outline-none focus:border-brass-500 focus:ring-2 focus:ring-brass-500/20 disabled:bg-linen-200 cursor-pointer",
              error && "border-terracotta-500 focus:border-terracotta-500 focus:ring-terracotta-500/20",
              className
            )}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-sand-500">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
        {error && <p className="mt-1 text-xs text-terracotta-500">{error}</p>}
        {helperText && !error && <p className="mt-1 text-xs text-sand-500">{helperText}</p>}
      </div>
    );
  }
);

Select.displayName = "Select";
