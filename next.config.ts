import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Netlify deployment: fully static site written to `out/` (see netlify.toml).
  output: "export",
  // Emit `cars/index.html` rather than `cars.html` so nested routes like /cars/toyota-etios/ resolve on static hosting.
  trailingSlash: true,
  images: { unoptimized: true },
  env: {
    // Netlify sets URL to the site's primary address during builds; used for canonical URLs and structured data.
    SITE_URL: process.env.URL ?? "https://sekhon-tour-and-travel.netlify.app",
  },
};

export default nextConfig;
