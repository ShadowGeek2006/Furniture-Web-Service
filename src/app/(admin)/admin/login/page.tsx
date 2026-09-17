"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const from = searchParams.get("from") || "/admin/orders";

  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Login failed.");
        return;
      }
      router.push(from);
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-sand-100/60 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm bg-white p-8 rounded-sm border border-sand-200 shadow-subtle space-y-5"
      >
        <div className="text-center space-y-1">
          <span className="font-serif text-xl font-bold tracking-wider text-espresso-900">
            [CLIENT_NAME]
          </span>
          <p className="text-[11px] uppercase tracking-widest text-brass-600 font-semibold">
            Staff Portal Sign In
          </p>
        </div>

        <div>
          <label htmlFor="password" className="block text-xs font-semibold text-sand-500 mb-1.5">
            Admin Password
          </label>
          <input
            id="password"
            type="password"
            autoFocus
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-sand-300 rounded-sm px-3 py-2.5 text-sm text-espresso-900 focus:outline-none focus:border-brass-500 focus:ring-2 focus:ring-brass-500/20"
          />
        </div>

        {error && (
          <div className="p-2.5 bg-terracotta-50 border border-terracotta-500/20 text-terracotta-700 text-xs rounded-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-espresso-900 hover:bg-espresso-800 disabled:opacity-60 text-linen-100 text-sm font-semibold py-2.5 rounded-sm transition-colors"
        >
          {isSubmitting ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    // useSearchParams requires a Suspense boundary in the App Router.
    <React.Suspense fallback={null}>
      <LoginForm />
    </React.Suspense>
  );
}
