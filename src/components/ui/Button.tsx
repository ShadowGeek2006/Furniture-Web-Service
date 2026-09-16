import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "accent" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      leftIcon,
      rightIcon,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] select-none";

    const variants = {
      primary:
        "bg-espresso-800 text-linen-100 hover:bg-espresso-900 focus:ring-espresso-800 border border-transparent shadow-subtle",
      secondary:
        "bg-transparent text-espresso-800 border border-sand-300 hover:bg-linen-200/80 focus:ring-espresso-800",
      accent:
        "bg-brass-500 text-linen-100 hover:bg-brass-600 focus:ring-brass-500 border border-transparent shadow-subtle",
      ghost:
        "bg-transparent text-espresso-700 hover:bg-linen-200/60 focus:ring-espresso-700 border-transparent",
      danger:
        "bg-terracotta-500 text-white hover:bg-terracotta-700 focus:ring-terracotta-500 border border-transparent",
    };

    const sizes = {
      sm: "text-xs px-3 py-1.5 rounded-sm gap-1.5",
      md: "text-sm px-5 py-2.5 rounded-sm gap-2 tracking-wide",
      lg: "text-base px-7 py-3.5 rounded-sm gap-2.5 tracking-wide",
    };

    return (
      <button
        ref={ref}
        disabled={disabled || isLoading}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        {...props}
      >
        {isLoading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4 text-current"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
        )}
        {!isLoading && leftIcon}
        <span>{children}</span>
        {!isLoading && rightIcon}
      </button>
    );
  }
);

Button.displayName = "Button";
