"use client";

import React, { useEffect } from "react";
import { cn } from "@/lib/utils";

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  position?: "right" | "left";
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  position = "right",
  children,
  footer,
  maxWidth = "max-w-md",
}) => {
  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-espresso-950/40 backdrop-blur-sm transition-opacity duration-300 animate-fadeIn"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer Container */}
      <div
        className={cn(
          "fixed inset-y-0 flex max-w-full",
          position === "right" ? "right-0" : "left-0"
        )}
      >
        <aside
          className={cn(
            "w-screen bg-linen-100 shadow-drawer flex flex-col border-sand-200",
            position === "right" ? "border-l" : "border-r",
            maxWidth
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="drawer-title"
        >
          {/* Header */}
          <div className="px-6 py-5 border-b border-sand-200 flex items-center justify-between bg-white">
            <div>
              <h2 id="drawer-title" className="font-serif text-xl font-medium text-espresso-900">
                {title}
              </h2>
              {subtitle && <p className="text-xs text-sand-500 mt-0.5">{subtitle}</p>}
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-sm text-sand-500 hover:text-espresso-900 hover:bg-linen-200 transition-colors"
              aria-label="Close panel"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>

          {/* Optional Footer */}
          {footer && (
            <div className="px-6 py-4 border-t border-sand-200 bg-white/80 backdrop-blur-sm">
              {footer}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};
