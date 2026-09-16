import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    const textareaId = id || (label ? label.toLowerCase().replace(/\s+/g, "-") : undefined);

    return (
      <div className="w-full">
        {label && (
          <label htmlFor={textareaId} className="block text-xs font-semibold uppercase tracking-wider text-espresso-700 mb-1.5">
            {label} {props.required && <span className="text-terracotta-500">*</span>}
          </label>
        )}
        <textarea
          id={textareaId}
          ref={ref}
          className={cn(
            "w-full bg-white border border-sand-300 text-espresso-900 text-sm rounded-sm px-3.5 py-2.5 transition-colors placeholder:text-sand-400 focus:outline-none focus:border-brass-500 focus:ring-2 focus:ring-brass-500/20 disabled:bg-linen-200 disabled:cursor-not-allowed resize-y min-h-[90px]",
            error && "border-terracotta-500 focus:border-terracotta-500 focus:ring-terracotta-500/20",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-xs text-terracotta-500">{error}</p>}
        {helperText && !error && <p className="mt-1 text-xs text-sand-500">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
