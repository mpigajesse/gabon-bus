import type { NextConfig } from "next";
import path from "node:path";

const LOADER = path.resolve(__dirname, 'src/visual-edits/component-tagger-loader.js');

// EXPORT_STATIQUE=1 publie l'application en fichiers statiques (dossier out/).
// Elle n'a aucun code serveur : en site statique sur Render, elle ne s'endort
// jamais et ne consomme aucune des 750 h gratuites de l'espace. Sans la
// variable, le build reste celui du service Node (next start).
const exportStatique = process.env.EXPORT_STATIQUE === '1';

const nextConfig: NextConfig = {
  ...(exportStatique ? { output: 'export' as const, trailingSlash: true } : {}),
  images: {
    unoptimized: exportStatique,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  outputFileTracingRoot: path.resolve(__dirname, '../../'),
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  turbopack: {
    rules: {
      "*.{jsx,tsx}": {
        loaders: [LOADER]
      }
    }
  }
};

export default nextConfig;
