import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean;
}

export const Card: React.FC<CardProps> = ({ className, hoverable = false, children, ...props }) => {
  return (
    <div
      className={cn(
        "bg-white border border-sand-200 rounded-sm overflow-hidden transition-all duration-300",
        hoverable && "hover:shadow-card hover:-translate-y-0.5 hover:border-sand-300",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};
