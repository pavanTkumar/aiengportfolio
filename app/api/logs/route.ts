import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

// Store active connections
const connections = new Set<ReadableStreamDefaultController>();

// Log buffer to store recent logs
const logBuffer: string[] = [];
const MAX_LOGS = 50;

// Function to add log to buffer and broadcast to all connections
function addLog(message: string) {
  const timestamp = new Date().toLocaleString();
  const logEntry = `[${timestamp}] ${message}`;
  
  logBuffer.push(logEntry);
  
  // Keep only recent logs
  if (logBuffer.length > MAX_LOGS) {
    logBuffer.shift();
  }
  
  // Broadcast to all active connections
  const data = JSON.stringify({ type: 'log', message: logEntry });
  connections.forEach(controller => {
    try {
      controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
    } catch (error) {
      // Connection closed, remove it
      connections.delete(controller);
    }
  });
}

// Simulate system logs based on Next.js dev server activity
function simulateSystemLogs() {
  const systemMessages = [
    'System initialized successfully',
    'Neural networks loaded',
    'Vector databases connected', 
    'RAG pipeline operational',
    'All systems nominal',
    'WebSocket connections established',
    'Real-time logging active',
    'Portfolio systems online',
    'Cyberpunk interface loaded',
    'Terminal emulation ready'
  ];
  
  const errorMessages = [
    'Warning: High memory usage detected',
    'Info: Cache optimization in progress',
    'Debug: Component re-render detected',
    'Info: API endpoint responding normally',
    'Debug: WebSocket connection established',
    'Info: Static assets loaded',
    'Debug: Route compilation complete'
  ];
  
  // Send initial system status
  setTimeout(() => {
    systemMessages.forEach((msg, index) => {
      setTimeout(() => addLog(msg), index * 500);
    });
  }, 1000);
  
  // Send periodic status updates
  setInterval(() => {
    const randomMessage = errorMessages[Math.floor(Math.random() * errorMessages.length)];
    addLog(randomMessage);
  }, 10000 + Math.random() * 5000); // Random interval between 10-15 seconds
}

// Start simulating logs
simulateSystemLogs();

export async function GET(request: NextRequest) {
  let currentController: ReadableStreamDefaultController | null = null;
  
  const stream = new ReadableStream({
    start(controller) {
      currentController = controller;
      // Add connection to active connections
      connections.add(controller);
      
      // Send initial logs from buffer
      logBuffer.forEach(log => {
        const data = JSON.stringify({ type: 'log', message: log });
        controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
      });
      
      // Send connection established message
      const connectMsg = JSON.stringify({ 
        type: 'status', 
        message: 'Terminal connection established',
        timestamp: new Date().toISOString()
      });
      controller.enqueue(new TextEncoder().encode(`data: ${connectMsg}\n\n`));
    },
    
    cancel() {
      // Remove connection when client disconnects
      if (currentController) {
        connections.delete(currentController);
      }
    }
  });

  return new Response(stream, {
    headers: {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Cache-Control',
    },
  });
}
