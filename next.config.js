/** @type {import('next').NextConfig} */
const securityHeaders = [
  // Prevents this site from ever being framed by another origin
  // (clickjacking protection) — the admin login/order-edit pages are the
  // main thing this protects.
  { key: "X-Frame-Options", value: "DENY" },
  // Stops browsers from MIME-sniffing responses away from the declared
  // Content-Type.
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Legacy XSS filter header; harmless to keep for older browsers that still
  // honor it (modern browsers ignore it in favor of CSP).
  { key: "X-XSS-Protection", value: "1; mode=block" },
  // Don't leak the full referring URL (which could contain order IDs, admin
  // paths, etc.) to third-party sites linked from this app.
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restricts access to sensitive browser APIs this app has no use for.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
];

const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
