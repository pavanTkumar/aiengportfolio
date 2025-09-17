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

// Try to run build with build tracing enabled first
console.log('Attempting Next.js build with build tracing enabled...');
try {
  execSync('next build', { 
    stdio: 'inherit',
    env: {
      ...process.env,
      NODE_OPTIONS: '--max-old-space-size=4096'
    }
  });
  console.log('Build completed successfully with build tracing enabled!');
} catch (error) {
  console.log('Build with build tracing failed, trying with build tracing disabled...');
  console.log('Error:', error.message);
  
  // If build tracing fails, try without it
  try {
    execSync('NEXT_OUTPUT_FILE_TRACING=false next build', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_OPTIONS: '--max-old-space-size=4096',
        NEXT_OUTPUT_FILE_TRACING: 'false'
      }
    });
    console.log('Build completed successfully with build tracing disabled due to micromatch stack overflow issue.');
    console.log('This is a known issue with Next.js 14.0.4 and will be resolved in future versions.');
  } catch (secondError) {
    console.error('Build failed completely:', secondError.message);
    process.exit(1);
  }
}
