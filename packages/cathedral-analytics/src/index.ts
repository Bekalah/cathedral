/**
 * index
 * 
 * @package @cathedral/cathedral-analytics
 */
/**
 * Cathedral Analytics - Privacy-respecting analytics
 * 
 * Features:
 * - Local-only tracking (no external services)
 * - Performance metrics
 * - Usage statistics
 * - System health monitoring
 * - No personal data collection
 */

export interface AnalyticsEvent {
  type: string;
  timestamp: number;
  data?: Record<string, any>;
}

export interface PerformanceMetrics {
  loadTime: number;
  renderTime: number;
  interactionTime: number;
  memoryUsage?: number;
}

export class CathedralAnalytics {
  private events: AnalyticsEvent[] = [];
  private maxEvents: number = 1000;
  private performanceMetrics: PerformanceMetrics[] = [];

  constructor() {
    // Initialize performance monitoring
    if (typeof window !== 'undefined' && 'performance' in window) {
      this.trackPerformance();
    }
  }

  /**
   * Track an event
   */
  track(eventType: string, data?: Record<string, any>): void {
    const event: AnalyticsEvent = {
      type: eventType,
      timestamp: Date.now(),
      data
    };

    this.events.push(event);

    // Keep only last maxEvents
    if (this.events.length > this.maxEvents) {
      this.events.shift();
    }

    // Store locally (localStorage)
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      try {
        const stored = localStorage.getItem('cathedral_analytics');
        const events = stored ? JSON.parse(stored) : [];
        events.push(event);
        // Keep only last 100 events in localStorage
        const recent = events.slice(-100);
        localStorage.setItem('cathedral_analytics', JSON.stringify(recent));
      } catch (e) {
        // Silently fail if localStorage is unavailable
      }
    }
  }

  /**
   * Track performance metrics
   */
  private trackPerformance(): void {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return;
    }

    window.addEventListener('load', () => {
      const perfData = window.performance.timing;
      const metrics: PerformanceMetrics = {
        loadTime: perfData.loadEventEnd - perfData.navigationStart,
        renderTime: perfData.domContentLoadedEventEnd - perfData.navigationStart,
        interactionTime: perfData.domInteractive - perfData.navigationStart
      };

      this.performanceMetrics.push(metrics);
      this.track('performance', metrics);
    });
  }

  /**
   * Get analytics summary
   */
  getSummary(): {
    totalEvents: number;
    eventTypes: Record<string, number>;
    performance: PerformanceMetrics | null;
  } {
    const eventTypes: Record<string, number> = {};
    
    this.events.forEach(event => {
      eventTypes[event.type] = (eventTypes[event.type] || 0) + 1;
    });

    const avgPerformance = this.performanceMetrics.length > 0
      ? this.performanceMetrics.reduce((acc, m) => ({
          loadTime: acc.loadTime + m.loadTime,
          renderTime: acc.renderTime + m.renderTime,
          interactionTime: acc.interactionTime + m.interactionTime
        }), { loadTime: 0, renderTime: 0, interactionTime: 0 })
      : null;

    if (avgPerformance && this.performanceMetrics.length > 0) {
      const count = this.performanceMetrics.length;
      avgPerformance.loadTime /= count;
      avgPerformance.renderTime /= count;
      avgPerformance.interactionTime /= count;
    }

    return {
      totalEvents: this.events.length,
      eventTypes,
      performance: avgPerformance as PerformanceMetrics | null
    };
  }

  /**
   * Clear all analytics data
   */
  clear(): void {
    this.events = [];
    this.performanceMetrics = [];
    
    if (typeof window !== 'undefined' && 'localStorage' in window) {
      try {
        localStorage.removeItem('cathedral_analytics');
      } catch (e) {
        // Silently fail
      }
    }
  }

  /**
   * Export analytics data (for user's own use)
   */
  export(): string {
    return JSON.stringify({
      events: this.events,
      performance: this.performanceMetrics,
      summary: this.getSummary()
    }, null, 2);
  }
}

// Singleton instance
export const analytics = new CathedralAnalytics();
