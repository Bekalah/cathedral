import { Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Home, BookOpen, Palette, Cpu, Settings, Menu, X } from 'lucide-react'

// Component imports (will be created as we build)
// import Navigation from './components/Navigation'
// import Dashboard from './pages/Dashboard'
// import SacredGeometryLab from './pages/SacredGeometryLab'
// import StoneGrimoire from './pages/StoneGrimoire'
// import HallOfAteliers from './pages/HallOfAteliers'
// import Cosmogenesis from './pages/Cosmogenesis'
// import Settings from './pages/Settings'

// Layout component for the main application
function AppLayout({ children }: { children: React.ReactNode }) {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false)
  const [currentPage, setCurrentPage] = useState('dashboard')

  // Navigation items with trauma-safe icons and descriptions
  const navigationItems = [
    {
      id: 'dashboard',
      name: 'Cathedral Overview',
      icon: Home,
      description: 'Main cathedral interface and system status',
      path: '/',
    },
    {
      id: 'sacred-geometry',
      name: 'Sacred Geometry Lab',
      icon: Palette,
      description: 'Interactive mathematical demonstrations and visualizations',
      path: '/sacred-geometry',
    },
    {
      id: 'stone-grimoire',
      name: 'Stone Grimoire',
      icon: BookOpen,
      description: 'Room catalog and space navigation system',
      path: '/stone-grimoire',
    },
    {
      id: 'hall-of-ateliers',
      name: 'Hall of Ateliers',
      icon: Cpu,
      description: 'Creative tools and workspace demonstrations',
      path: '/hall-of-ateliers',
    },
    {
      id: 'cosmogenesis',
      name: 'Cosmogenesis',
      icon: Cpu,
      description: '3D cosmos topology and sacred geometry visualization',
      path: '/cosmogenesis',
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: Settings,
      description: 'User preferences and system configuration',
      path: '/settings',
    },
  ]

  return (
    <div className="min-h-screen bg-cathedral-stone text-cathedral-ink">
      {/* Skip link for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link"
        onFocus={(e) => e.currentTarget.classList.remove('-translate-y-full')}
        onBlur={(e) => e.currentTarget.classList.add('-translate-y-full')}
      >
        Skip to main content
      </a>

      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-cathedral-stone">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and title */}
            <div className="flex items-center space-x-4">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-10 h-10 bg-gradient-to-br from-cathedral-primary to-cathedral-deep rounded-lg flex items-center justify-center"
              >
                <div className="w-6 h-6 bg-white rounded-sm opacity-90" />
              </motion.div>
              <div>
                <h1 className="text-xl font-sacred font-medium text-cathedral-ink">
                  Cathedral Real
                </h1>
                <p className="text-sm text-cathedral-ink/70">
                  Creative Cosmos Builder
                </p>
              </div>
            </div>

            {/* Desktop navigation */}
            <nav className="hidden lg:flex cathedral-nav">
              {navigationItems.map((item) => (
                <a
                  key={item.id}
                  href={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200 ${
                    currentPage === item.id
                      ? 'bg-cathedral-primary text-white'
                      : 'hover:bg-cathedral-stone'
                  }`}
                  onClick={() => setCurrentPage(item.id)}
                  aria-label={`${item.name}: ${item.description}`}
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-sm font-medium">{item.name}</span>
                </a>
              ))}
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-lg hover:bg-cathedral-stone transition-colors"
              onClick={() => setIsNavigationOpen(!isNavigationOpen)}
              aria-label="Toggle navigation menu"
            >
              {isNavigationOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isNavigationOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white/95 backdrop-blur-md border-t border-cathedral-stone"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-2">
                {navigationItems.map((item) => (
                  <a
                    key={item.id}
                    href={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                      currentPage === item.id
                        ? 'bg-cathedral-primary text-white'
                        : 'hover:bg-cathedral-stone'
                    }`}
                    onClick={() => {
                      setCurrentPage(item.id)
                      setIsNavigationOpen(false)
                    }}
                  >
                    <item.icon className="w-5 h-5" />
                    <div>
                      <div className="font-medium">{item.name}</div>
                      <div className="text-sm opacity-70">{item.description}</div>
                    </div>
                  </a>
                ))}
              </nav>
            </div>
          </motion.div>
        )}
      </header>

      {/* Main content */}
      <main id="main-content" className="flex-1">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Welcome message for initial setup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center py-12"
          >
            <div className="max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-6xl font-sacred font-medium text-cathedral-ink mb-6">
                Welcome to Cathedral Real
              </h1>
              <p className="text-xl text-cathedral-ink/70 mb-8 max-w-2xl mx-auto">
                A creative cosmos builder featuring sacred geometry, 3D visualization, 
                and trauma-safe interactive experiences.
              </p>
              
              {/* Feature grid */}
              <div className="cathedral-grid max-w-5xl mx-auto mt-12">
                <div className="sacred-card">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-cathedral-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Palette className="w-6 h-6 text-cathedral-primary" />
                    </div>
                    <h3 className="text-lg font-sacred font-medium mb-2">
                      Sacred Geometry Lab
                    </h3>
                    <p className="text-sm text-cathedral-ink/70">
                      Interactive mathematical demonstrations and golden ratio visualizations
                    </p>
                  </div>
                </div>

                <div className="sacred-card">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-cathedral-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <BookOpen className="w-6 h-6 text-cathedral-secondary" />
                    </div>
                    <h3 className="text-lg font-sacred font-medium mb-2">
                      Stone Grimoire
                    </h3>
                    <p className="text-sm text-cathedral-ink/70">
                      Room catalog and space navigation with 3D room visualization
                    </p>
                  </div>
                </div>

                <div className="sacred-card">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-cathedral-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Cpu className="w-6 h-6 text-cathedral-accent" />
                    </div>
                    <h3 className="text-lg font-sacred font-medium mb-2">
                      Hall of Ateliers
                    </h3>
                    <p className="text-sm text-cathedral-ink/70">
                      Creative tools and interactive workspace demonstrations
                    </p>
                  </div>
                </div>

                <div className="sacred-card">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-cathedral-deep/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Cpu className="w-6 h-6 text-cathedral-deep" />
                    </div>
                    <h3 className="text-lg font-sacred font-medium mb-2">
                      Cosmogenesis
                    </h3>
                    <p className="text-sm text-cathedral-ink/70">
                      3D cosmos topology with sacred geometry visualization
                    </p>
                  </div>
                </div>
              </div>

              {/* System status */}
              <div className="mt-12 p-6 bg-white/50 rounded-xl border border-cathedral-stone">
                <h3 className="text-lg font-sacred font-medium mb-4">System Status</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center justify-between">
                    <span>Three.js Integration</span>
                    <span className="text-cathedral-secondary font-medium">✓ Ready</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>React Three Fiber</span>
                    <span className="text-cathedral-secondary font-medium">✓ Ready</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Design System</span>
                    <span className="text-cathedral-secondary font-medium">✓ Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Page content */}
          {children}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white/50 border-t border-cathedral-stone mt-auto">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-sm text-cathedral-ink/70 mb-4 md:mb-0">
              © 2025 Cathedral Real. A creative cosmos builder for the modern era.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a href="#" className="text-cathedral-ink/70 hover:text-cathedral-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="text-cathedral-ink/70 hover:text-cathedral-primary transition-colors">
                Terms
              </a>
              <a href="#" className="text-cathedral-ink/70 hover:text-cathedral-primary transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Main App component
function App() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate initialization
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-cathedral-stone flex items-center justify-center">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.1, 1]
          }}
          transition={{ 
            rotate: { duration: 2, repeat: Infinity, ease: "linear" },
            scale: { duration: 1, repeat: Infinity, ease: "easeInOut" }
          }}
          className="w-12 h-12 bg-gradient-to-br from-cathedral-primary to-cathedral-deep rounded-lg flex items-center justify-center"
        >
          <div className="w-6 h-6 bg-white rounded-sm opacity-90" />
        </motion.div>
      </div>
    )
  }

  return (
    <AppLayout>
      <Routes>
        {/* Routes will be added as we build each page */}
        <Route path="/" element={<div />} />
        <Route path="/sacred-geometry" element={<div />} />
        <Route path="/stone-grimoire" element={<div />} />
        <Route path="/hall-of-ateliers" element={<div />} />
        <Route path="/cosmogenesis" element={<div />} />
        <Route path="/settings" element={<div />} />
      </Routes>
    </AppLayout>
  )
}

export default App