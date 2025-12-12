import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast'
import App from './App.tsx'
import './index.css'

// Create QueryClient for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      gcTime: 10 * 60 * 1000, // 10 minutes
      retry: (failureCount, error) => {
        // Don't retry on 404s or auth errors
        if (error && typeof error === 'object' && 'status' in error) {
          const status = (error as any).status;
          if (status === 404 || status === 401 || status === 403) {
            return false;
          }
        }
        return failureCount < 3;
      },
    },
  },
})

// Trauma-safe theme preferences
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;

// Apply theme immediately to prevent flash
document.documentElement.classList.toggle('dark', prefersDarkMode);
document.documentElement.style.setProperty('--motion-reduced', prefersReducedMotion ? '1' : '0');

// Set initial theme
document.documentElement.setAttribute('data-theme', prefersDarkMode ? 'dark' : 'light');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <App />
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: prefersDarkMode ? '#2d2d2d' : '#ffffff',
              color: prefersDarkMode ? '#ffffff' : '#1a1a1a',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'Inter, system-ui, sans-serif',
            },
            success: {
              iconTheme: {
                primary: '#7ED321',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#FF6B6B',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  </StrictMode>,
)