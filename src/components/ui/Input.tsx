import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, leftElement, rightElement, id, ...props }, ref) => {
    const inputId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={inputId} className="block text-xs font-semibold uppercase tracking-wider text-espresso-700 mb-1.5">
            {label} {props.required && <span className="text-terracotta-500">*</span>}
          </label>
        )}
        <div className="relative flex items-center">
          {leftElement && <div className="absolute left-3.5 pointer-events-none text-sand-500">{leftElement}</div>}
          <input
            id={inputId}
            ref={ref}
            className={cn(
              "w-full bg-white border border-sand-300 text-espresso-900 text-sm rounded-sm px-3.5 py-2.5 transition-colors placeholder:text-sand-400 focus:outline-none focus:border-brass-500 focus:ring-2 focus:ring-brass-500/20 disabled:bg-linen-200 disabled:cursor-not-allowed",
              leftElement && "pl-10",
              rightElement && "pr-10",
              error && "border-terracotta-500 focus:border-terracotta-500 focus:ring-terracotta-500/20",
              className
            )}
            {...props}
          />
          {rightElement && <div className="absolute right-3.5 pointer-events-none text-sand-500">{rightElement}</div>}
        </div>
        {error && <p className="mt-1 text-xs text-terracotta-500">{error}</p>}
        {helperText && !error && <p className="mt-1 text-xs text-sand-500">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
