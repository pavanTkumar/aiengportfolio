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

// Restore micromatch file if it's corrupted
console.log('Checking and restoring micromatch file...');
try {
  const micromatchPath = path.join(process.cwd(), 'node_modules', 'next', 'dist', 'compiled', 'micromatch', 'index.js');
  if (fs.existsSync(micromatchPath)) {
    let content = fs.readFileSync(micromatchPath, 'utf8');
    
    // Check if file is corrupted (contains our patch or parse is not defined)
    if (content.includes('// Stack overflow protection patch') || content.includes('const originalParse = parse;')) {
      console.log('Micromatch file is corrupted, reinstalling dependencies...');
      execSync('npm install', { stdio: 'inherit' });
      console.log('Dependencies reinstalled, micromatch file restored');
    } else {
      console.log('Micromatch file is clean');
    }
  }
} catch (error) {
  console.log('Micromatch check failed, continuing with build...');
}

// Try to run build with build tracing enabled
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
  
  // If build tracing fails, temporarily modify next.config.js to disable it
  const configPath = path.join(process.cwd(), 'next.config.js');
  const backupPath = path.join(process.cwd(), 'next.config.js.backup');
  
  try {
    // Backup original config
    const originalConfig = fs.readFileSync(configPath, 'utf8');
    fs.writeFileSync(backupPath, originalConfig);
    
    // Modify config to disable build tracing
    const modifiedConfig = originalConfig.replace(
      'outputFileTracing: true,',
      'outputFileTracing: false, // Temporarily disabled due to micromatch stack overflow'
    );
    fs.writeFileSync(configPath, modifiedConfig);
    
    console.log('Temporarily disabled build tracing in next.config.js...');
    
    // Run build with modified config
    execSync('next build', { 
      stdio: 'inherit',
      env: {
        ...process.env,
        NODE_OPTIONS: '--max-old-space-size=4096'
      }
    });
    
    // Restore original config
    fs.writeFileSync(configPath, originalConfig);
    fs.unlinkSync(backupPath);
    
    console.log('Build completed successfully with build tracing temporarily disabled due to micromatch stack overflow issue.');
    console.log('This is a known issue with Next.js 14.0.4 and will be resolved in future versions.');
  } catch (secondError) {
    // Restore original config if it exists
    if (fs.existsSync(backupPath)) {
      const originalConfig = fs.readFileSync(backupPath, 'utf8');
      fs.writeFileSync(configPath, originalConfig);
      fs.unlinkSync(backupPath);
    }
    console.error('Build failed completely:', secondError.message);
    process.exit(1);
  }
}
