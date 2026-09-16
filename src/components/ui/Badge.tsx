import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "brass" | "espresso" | "sand" | "success" | "warning" | "outline";
  size?: "sm" | "md";
}

export const Badge: React.FC<BadgeProps> = ({
  className,
  variant = "sand",
  size = "sm",
  children,
  ...props
}) => {
  const baseStyles = "inline-flex items-center font-medium uppercase tracking-wider select-none";

  const variants = {
    brass: "bg-brass-50 text-brass-700 border border-brass-200",
    espresso: "bg-espresso-800 text-linen-100",
    sand: "bg-sand-100 text-espresso-700 border border-sand-200",
    success: "bg-forest-50 text-forest-700 border border-forest-500/20",
    warning: "bg-amber-50 text-amber-800 border border-amber-200",
    outline: "bg-transparent text-espresso-600 border border-sand-300",
  };

  const sizes = {
    sm: "text-[10px] px-2 py-0.5 rounded-sm",
    md: "text-xs px-2.5 py-1 rounded-sm",
  };

  return (
    <span className={cn(baseStyles, variants[variant], sizes[size], className)} {...props}>
      {children}
    </span>
  );
};
