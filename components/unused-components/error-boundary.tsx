'use client';

import React from 'react';

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

interface ErrorBoundaryProps {
  children: React.ReactNode;
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

export class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  resetError = () => {
    this.setState({ hasError: false, error: undefined });
  };

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback;
      return <FallbackComponent error={this.state.error} resetError={this.resetError} />;
    }

    return this.props.children;
  }
}

function DefaultErrorFallback({ error, resetError }: { error?: Error; resetError: () => void }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-neural-900">
      <div className="text-center p-8 glass rounded-lg max-w-md">
        <div className="text-6xl mb-4">⚠️</div>
        <h2 className="text-2xl font-bold text-cyberpunk-pink mb-4">
          Something went wrong
        </h2>
        <p className="text-neural-300 mb-6">
          An unexpected error occurred. Please try refreshing the page.
        </p>
        {error && (
          <details className="text-left mb-6">
            <summary className="text-cyberpunk-neon cursor-pointer mb-2">
              Error Details
            </summary>
            <pre className="text-xs text-neural-400 bg-neural-800 p-3 rounded overflow-auto">
              {error.message}
            </pre>
          </details>
        )}
        <div className="space-y-3">
          <button
            onClick={resetError}
            className="w-full px-6 py-3 bg-cyberpunk-neon text-neural-900 rounded-lg font-medium hover:bg-cyberpunk-neon/80 transition-colors"
          >
            Try Again
          </button>
          <button
            onClick={() => window.location.reload()}
            className="w-full px-6 py-3 glass text-cyberpunk-neon rounded-lg font-medium hover:bg-neural-800/50 transition-colors"
          >
            Refresh Page
          </button>
        </div>
      </div>
    </div>
  );
}
