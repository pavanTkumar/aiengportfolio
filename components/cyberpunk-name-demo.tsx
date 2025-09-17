'use client';

import CyberpunkName from './cyberpunk-name';

export default function CyberpunkNameDemo() {
  return (
    <div className="min-h-screen bg-bg-dark p-8 space-y-16">
      <div className="text-center">
        <h2 className="text-3xl font-terminal text-terminal-green mb-8">
          Cyberpunk Name Component Demo
        </h2>
      </div>

      {/* Small Size - Navigation/Header */}
      <section className="text-center">
        <h3 className="text-xl text-text-light mb-4">Small Size (Navigation/Header)</h3>
        <div className="bg-gray-900/50 p-6 rounded-lg border border-terminal-green/20">
          <CyberpunkName size="small" variant="subtle" />
        </div>
      </section>

      {/* Medium Size - Page Sections */}
      <section className="text-center">
        <h3 className="text-xl text-text-light mb-4">Medium Size (Page Sections)</h3>
        <div className="bg-gray-900/50 p-6 rounded-lg border border-terminal-green/20">
          <CyberpunkName size="medium" variant="default" />
        </div>
      </section>

      {/* Large Size - Hero Section */}
      <section className="text-center">
        <h3 className="text-xl text-text-light mb-4">Large Size (Hero Section)</h3>
        <div className="bg-gray-900/50 p-6 rounded-lg border border-terminal-green/20">
          <CyberpunkName size="large" variant="intense" />
        </div>
      </section>

      {/* XL Size - Main Hero */}
      <section className="text-center">
        <h3 className="text-xl text-text-light mb-4">XL Size (Main Hero)</h3>
        <div className="bg-gray-900/50 p-6 rounded-lg border border-terminal-green/20">
          <CyberpunkName size="xl" variant="intense" />
        </div>
      </section>

      {/* Variants Comparison */}
      <section className="text-center">
        <h3 className="text-xl text-text-light mb-4">Variants Comparison</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900/50 p-6 rounded-lg border border-terminal-green/20">
            <h4 className="text-lg text-text-light mb-4">Subtle</h4>
            <CyberpunkName size="medium" variant="subtle" />
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg border border-terminal-green/20">
            <h4 className="text-lg text-text-light mb-4">Default</h4>
            <CyberpunkName size="medium" variant="default" />
          </div>
          <div className="bg-gray-900/50 p-6 rounded-lg border border-terminal-green/20">
            <h4 className="text-lg text-text-light mb-4">Intense</h4>
            <CyberpunkName size="medium" variant="intense" />
          </div>
        </div>
      </section>

      {/* Usage Examples */}
      <section className="text-center">
        <h3 className="text-xl text-text-light mb-4">Usage Examples</h3>
        <div className="bg-gray-900/50 p-6 rounded-lg border border-terminal-green/20 text-left">
          <pre className="text-sm text-text-light overflow-x-auto">
{`// Navigation Header
<CyberpunkName size="small" variant="subtle" />

// Page Section Title
<CyberpunkName size="medium" variant="default" />

// Hero Section
<CyberpunkName size="large" variant="intense" />

// Main Hero (like AI ENGINEER)
<CyberpunkName size="xl" variant="intense" />

// Custom styling
<CyberpunkName 
  size="medium" 
  variant="default" 
  className="text-center mb-4"
  showGlitch={true}
/>`}
          </pre>
        </div>
      </section>
    </div>
  );
}
