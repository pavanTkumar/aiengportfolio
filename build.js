#!/usr/bin/env node

// Custom build script to handle micromatch stack overflow
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set Node.js options to prevent stack overflow
process.env.NODE_OPTIONS = '--max-old-space-size=4096';

// Clean up any problematic cache files
const nextCacheDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextCacheDir)) {
  console.log('Cleaning up .next cache...');
  try {
    execSync('rm -rf .next/cache', { stdio: 'inherit' });
  } catch (error) {
    console.log('Cache cleanup completed');
  }
}

// Run the build
console.log('Starting Next.js build with optimized settings...');
try {
  execSync('next build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=4096'
    }
  });
  console.log('Build completed successfully!');
} catch (error) {
  console.error('Build failed:', error.message);
  process.exit(1);
}
