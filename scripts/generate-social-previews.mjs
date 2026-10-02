#!/usr/bin/env node

import { execFileSync } from "node:child_process";
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = resolve(root, "assets/social-previews");

const previews = [
  { repo: ".github", title: "Official SDKs", subtitle: "Typed commerce SDKs for every stack", detail: "Server, mobile, and agent-ready developer tools" },
  { repo: "inttegro-sdk-typescript", title: "TypeScript SDK", subtitle: "Typed server-side commerce APIs", detail: "Node.js · Payments · Checkout · Orders · Payouts" },
  { repo: "inttegro-sdk-python", title: "Python SDK", subtitle: "Typed sync and async commerce APIs", detail: "Payments · Checkout · Orders · Payouts" },
  { repo: "inttegro-sdk-go", title: "Go SDK", subtitle: "Typed server-side commerce APIs", detail: "Payments · Checkout · Orders · Payouts" },
  { repo: "inttegro-sdk-ruby", title: "Ruby SDK", subtitle: "Typed server-side commerce APIs", detail: "Payments · Checkout · Orders · Payouts" },
  { repo: "inttegro-sdk-php", title: "PHP SDK", subtitle: "Typed server-side commerce APIs", detail: "Payments · Checkout · Orders · Payouts" },
  { repo: "inttegro-sdk-java", title: "Java SDK", subtitle: "Typed server-side commerce APIs", detail: "Payments · Checkout · Orders · Payouts" },
  { repo: "inttegro-sdk-dotnet", title: ".NET SDK", subtitle: "Typed server-side commerce APIs", detail: "Payments · Checkout · Orders · Payouts" },
  { repo: "inttegro-sdk-rust", title: "Rust SDK", subtitle: "Typed asynchronous commerce APIs", detail: "Payments · Checkout · Orders · Payouts" },
  { repo: "inttegro-sdk-elixir", title: "Elixir SDK", subtitle: "Typed server-side commerce APIs", detail: "Payments · Checkout · Orders · Payouts" },
  { repo: "inttegro-sdk-dart", title: "Dart SDK", subtitle: "Typed server-side commerce APIs", detail: "Payments · Checkout · Orders · Payouts" },
  { repo: "inttegro-sdk-swift", title: "Swift SDK", subtitle: "Typed APIs for server-side Swift", detail: "Payments · Checkout · Orders · Payouts" },
  { repo: "inttegro-sdk-ios", title: "iOS SDK", subtitle: "Native payment sheet for secure checkout", detail: "SwiftUI · UIKit · Swift Package Manager" },
  { repo: "inttegro-sdk-react-native", title: "React Native SDK", subtitle: "Typed bridge to the native payment sheet", detail: "iOS · Android · Mobile checkout" },
  { repo: "inttegro-sdk-flutter", title: "Flutter SDK", subtitle: "Typed bridge to the native payment sheet", detail: "Preview · iOS · Android · Mobile checkout", preview: true },
];

function escapeXml(value) {
  return value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

function svgFor(item) {
  const title = escapeXml(item.title);
  const subtitle = escapeXml(item.subtitle);
  const detail = escapeXml(item.detail);
  const repository = item.repo === ".github" ? "github.com/inttegro" : `github.com/inttegro/${item.repo}`;
  const badge = item.preview
    ? `<g transform="translate(160 178)"><rect width="116" height="36" rx="18" fill="#f59e0b"/><text x="58" y="24" text-anchor="middle" fill="#11160f" font-family="Helvetica Neue, Arial, sans-serif" font-size="17" font-weight="700" letter-spacing="1">PREVIEW</text></g>`
    : "";
  const titleY = item.preview ? 306 : 276;
  const subtitleY = item.preview ? 370 : 340;
  const detailY = item.preview ? 424 : 394;

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="1280" height="640" viewBox="0 0 1280 640" role="img" aria-labelledby="title description">
  <title id="title">Inttegro ${title}</title>
  <desc id="description">${subtitle}</desc>
  <defs>
    <radialGradient id="sphere" cx="34%" cy="28%" r="74%">
      <stop offset="0" stop-color="#36d46f"/>
      <stop offset="0.58" stop-color="#16a34a"/>
      <stop offset="1" stop-color="#0b7132"/>
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0" stop-color="#22c55e" stop-opacity="0.28"/>
      <stop offset="1" stop-color="#22c55e" stop-opacity="0"/>
    </radialGradient>
    <linearGradient id="edge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#1c3525"/>
      <stop offset="1" stop-color="#0b140e"/>
    </linearGradient>
    <filter id="shadow" x="-40%" y="-40%" width="180%" height="180%">
      <feDropShadow dx="0" dy="28" stdDeviation="30" flood-color="#000000" flood-opacity="0.46"/>
    </filter>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0H0V48" fill="none" stroke="#ffffff" stroke-opacity="0.035" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="1280" height="640" fill="#07110b"/>
  <rect width="1280" height="640" fill="url(#grid)"/>
  <path d="M0 0H1280V640H0Z" fill="none" stroke="url(#edge)" stroke-width="20"/>
  <ellipse cx="1086" cy="320" rx="310" ry="310" fill="url(#glow)"/>
  <circle cx="1086" cy="320" r="176" fill="url(#sphere)" filter="url(#shadow)"/>
  <circle cx="1038" cy="258" r="62" fill="#ffffff" opacity="0.065"/>

  <g transform="translate(160 106)">
    <circle cx="10" cy="10" r="10" fill="#20c65a"/>
    <text x="38" y="18" fill="#d9fbe4" font-family="Helvetica Neue, Arial, sans-serif" font-size="23" font-weight="700" letter-spacing="4">INTTEGRO</text>
  </g>

${badge}
  <text x="160" y="${titleY}" fill="#f4fff6" font-family="Helvetica Neue, Arial, sans-serif" font-size="76" font-weight="700" letter-spacing="-2">${title}</text>
  <text x="164" y="${subtitleY}" fill="#b8c9bd" font-family="Helvetica Neue, Arial, sans-serif" font-size="29" font-weight="500">${subtitle}</text>
  <text x="164" y="${detailY}" fill="#69db8d" font-family="Helvetica Neue, Arial, sans-serif" font-size="22" font-weight="600">${detail}</text>

  <line x1="160" y1="494" x2="746" y2="494" stroke="#d7fce1" stroke-opacity="0.16"/>
  <text x="160" y="548" fill="#7f9586" font-family="SFMono-Regular, Menlo, Consolas, monospace" font-size="18">${repository}</text>
</svg>`;
}

mkdirSync(outputDir, { recursive: true });

for (const item of previews) {
  const baseName = item.repo === ".github" ? "inttegro-sdks" : item.repo;
  const svgPath = resolve(outputDir, `${baseName}.svg`);
  const pngPath = resolve(outputDir, `${baseName}.png`);
  writeFileSync(svgPath, svgFor(item));
  execFileSync("rsvg-convert", ["--width", "1280", "--height", "640", "--output", pngPath, svgPath]);
  process.stdout.write(`${pngPath}\n`);
}
