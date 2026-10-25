import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';

describe('Production Build Checks', () => {
  it('should have generated the dist directory', () => {
    const distPath = path.join(__dirname, '../dist');
    expect(fs.existsSync(distPath)).toBe(true);
  });

  it('should have generated the sitemap', () => {
    const sitemapPath = path.join(__dirname, '../dist/sitemap-index.xml');
    expect(fs.existsSync(sitemapPath)).toBe(true);
  });

  it('should have generated all required HTML pages', () => {
    const pages = ['index.html', 'about/index.html', 'loans/index.html', 'contact/index.html'];
    pages.forEach(page => {
      const pagePath = path.join(__dirname, '../dist', page);
      expect(fs.existsSync(pagePath)).toBe(true);
    });
  });
});