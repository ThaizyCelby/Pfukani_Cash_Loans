#!/usr/bin/env node
/**
 * Static site checks for Pfukani Cash Loans.
 * Run: node tests/static-checks.mjs
 */

import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const site = join(root, 'site');

const CANONICAL    = 'https://pfukani.co.za';   // correct: pfukani (K)
const WRONG_DOMAIN = 'pfakuni.co.za';           // typo:    pfakuni (A)

// Safety guard — catch the constant mix-up before anything else
if (CANONICAL.includes(WRONG_DOMAIN)) {
  console.error('TEST BUG: WRONG_DOMAIN overlaps with CANONICAL. They must differ.');
  console.error(`  CANONICAL    = ${CANONICAL}`);
  console.error(`  WRONG_DOMAIN = ${WRONG_DOMAIN}`);
  process.exit(2);
}

const requiredPages = [
  'index.html',
  'about/index.html',
  'loans/index.html',
  'how-it-works/index.html',
  'documents/index.html',
  'faqs/index.html',
  'contact/index.html',
  'responsible-lending/index.html',
  'privacy-policy/index.html',
  'terms-and-conditions/index.html',
  '404.html'
];

let failures = 0;
const fail = (msg) => { console.error('FAIL: ' + msg); failures++; };
const pass = (msg) => { console.log('PASS: ' + msg); };

// 1. Required pages exist
for (const page of requiredPages) {
  if (!existsSync(join(site, page))) fail(`missing page site/${page}`);
}
if (failures === 0) pass('all required pages exist');

// 2. robots.txt
const robotsPath = join(site, 'robots.txt');
if (!existsSync(robotsPath)) {
  fail('missing site/robots.txt');
} else {
  const robots = readFileSync(robotsPath, 'utf8');
  if (!robots.includes(`Sitemap: ${CANONICAL}/sitemap.xml`)) {
    fail('robots.txt sitemap declaration wrong');
  } else {
    pass('robots.txt sitemap declaration correct');
  }
}

// 3. sitemap.xml
const sitemapPath = join(site, 'sitemap.xml');
if (!existsSync(sitemapPath)) {
  fail('missing site/sitemap.xml');
} else {
  const sitemap = readFileSync(sitemapPath, 'utf8');
  if (sitemap.includes(WRONG_DOMAIN)) fail(`sitemap.xml contains wrong domain ${WRONG_DOMAIN}`);
  if (!sitemap.includes(CANONICAL))    fail(`sitemap.xml missing canonical ${CANONICAL}`);
  if (!sitemap.includes('/about/'))    fail('sitemap.xml missing /about/');
  else pass('sitemap.xml contains all pages and correct domain');
}

// 4. HTML canonical + wrong-domain check
for (const page of requiredPages) {
  const p = join(site, page);
  if (!existsSync(p)) continue;
  const html = readFileSync(p, 'utf8');
  if (html.includes(WRONG_DOMAIN)) fail(`${page} contains wrong domain ${WRONG_DOMAIN}`);
  const match = html.match(/<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i);
  if (!match) {
    fail(`${page} missing <link rel="canonical">`);
  } else if (!match[1].startsWith(CANONICAL)) {
    fail(`${page} canonical URL not on ${CANONICAL} (found: ${match[1]})`);
  }
}

// 5. JS unsafe-pattern check
const jsFiles = [
  'assets/js/main.js',
  'assets/js/navigation.js',
  'assets/js/loan-calculator.js',
  'assets/js/faq.js'
];
for (const jf of jsFiles) {
  const p = join(site, jf);
  if (!existsSync(p)) { fail(`missing ${jf}`); continue; }
  const src = readFileSync(p, 'utf8');
  if (/\bdocument\.write\b/.test(src)) fail(`${jf} uses document.write`);
  if (/\beval\s*\(/.test(src))         fail(`${jf} uses eval()`);
  if (/new\s+Function\s*\(/.test(src)) fail(`${jf} uses new Function()`);
}
pass('JS files scanned for unsafe patterns');

// 6. No legacy paths
for (const page of requiredPages) {
  const p = join(site, page);
  if (!existsSync(p)) continue;
  const html = readFileSync(p, 'utf8');
  for (const l of ['dist/', 'sitemap-index.xml']) {
    if (html.includes(l)) fail(`${page} still references ${l}`);
  }
}

console.log('');
if (failures > 0) {
  console.error(`${failures} check(s) failed.`);
  process.exit(1);
}
console.log('All static checks passed.');
