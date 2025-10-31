/**
 * 🏛️ CATHEDRAL INTER-APP MESSAGE BUS
 * Enables real-time communication between all mystical applications
 */

export interface MysticalMessage {
  id: string
  type: 'energy_update' | 'fusion_attempt' | 'research_data' | 'node_activation' | 'system_sync'
  source: string
  destination?: string
  payload: any
  timestamp: number
  energy: number
  sacredSignature: string
}

export interface AppRegistration {
  id: string
  name: string
  type: 'circuitum99' | 'liber-arcanae' | 'stone-grimoire' | 'cosmogenesis-engine' | 'cathedral-hub'
  capabilities: string[]
  currentEnergy: number
  isActive: boolean
}

export class CathedralMessageBus {
  private static instance: CathedralMessageBus
  private subscribers: Map<string, Function[]> = new Map()
  private registeredApps: Map<string, AppRegistration> = new Map()
  private messageHistory: MysticalMessage[] = []
  private maxHistorySize = 1000

  private constructor() {
    this.initializeSacredChannels()
  }

  static getInstance(): CathedralMessageBus {
    if (!CathedralMessageBus.instance) {
      CathedralMessageBus.instance = new CathedralMessageBus()
    }
    return CathedralMessageBus.instance
  }

  /**
   * Initialize sacred communication channels
   */
  private initializeSacredChannels() {
    // Set up periodic energy broadcasts
    setInterval(() => {
      this.broadcastSystemEnergy()
    }, 5000)

    // Set up sacred geometry synchronization
    setInterval(() => {
      this.syncSacredGeometry()
    }, 10000)

    console.log('🔮 Sacred communication channels initialized')
  }

  /**
   * Register an application with the message bus
   */
  registerApp(registration: AppRegistration): boolean {
    try {
      this.registeredApps.set(registration.id, {
        ...registration,
        isActive: true
      })

      // Broadcast registration to all apps
      this.broadcast({
        type: 'system_sync',
        source: 'message-bus',
        payload: {
          event: 'app_registered',
          app: registration
        }
      })

      console.log(`✅ App registered: ${registration.name} (${registration.id})`)
      return true
    } catch (error) {
      console.error(`❌ Failed to register app ${registration.id}:`, error)
      return false
    }
  }

  /**
   * Subscribe to messages of a specific type
   */
  subscribe(messageType: string, callback: Function, appId?: string): string {
    const subscriptionId = `${appId || 'unknown'}-${Date.now()}-${Math.random()}`

    if (!this.subscribers.has(messageType)) {
      this.subscribers.set(messageType, [])
    }

    this.subscribers.get(messageType)!.push(callback)

    console.log(`📡 Subscription created: ${subscriptionId} for ${messageType}`)
    return subscriptionId
  }

  /**
   * Unsubscribe from messages
   */
  unsubscribe(messageType: string, subscriptionId: string): boolean {
    const callbacks = this.subscribers.get(messageType)
    if (!callbacks) return false

    const index = callbacks.findIndex(cb => cb.subscriptionId === subscriptionId)
    if (index > -1) {
      callbacks.splice(index, 1)
      console.log(`📡 Subscription removed: ${subscriptionId}`)
      return true
    }

    return false
  }

  /**
   * Send a message to a specific app or broadcast to all
   */
  send(message: Omit<MysticalMessage, 'id' | 'timestamp' | 'sacredSignature'>): boolean {
    const fullMessage: MysticalMessage = {
      ...message,
      id: this.generateMessageId(),
      timestamp: Date.now(),
      sacredSignature: this.generateSacredSignature(message)
    }

    try {
      // Store in history
      this.messageHistory.push(fullMessage)
      if (this.messageHistory.length > this.maxHistorySize) {
        this.messageHistory.shift()
      }

      // Route to specific destination or broadcast
      if (message.destination) {
        this.routeToApp(fullMessage, message.destination)
      } else {
        this.broadcast(fullMessage)
      }

      console.log(`📤 Message sent: ${message.type} from ${message.source}`)
      return true
    } catch (error) {
      console.error('❌ Failed to send message:', error)
      return false
    }
  }

  /**
   * Broadcast message to all subscribers
   */
  private broadcast(message: MysticalMessage) {
    const subscribers = this.subscribers.get(message.type) || []
    subscribers.forEach(callback => {
      try {
        callback(message)
      } catch (error) {
        console.error('❌ Error in message callback:', error)
      }
    })

    // Also broadcast to wildcard subscribers
    const wildcardSubscribers = this.subscribers.get('*') || []
    wildcardSubscribers.forEach(callback => {
      try {
        callback(message)
      } catch (error) {
        console.error('❌ Error in wildcard callback:', error)
      }
    })
  }

  /**
   * Route message to specific app
   */
  private routeToApp(message: MysticalMessage, destination: string) {
    // In a real implementation, this would use WebSockets, WebRTC, or other transport
    console.log(`📨 Routing to ${destination}: ${message.type}`)

    // For now, just broadcast - in production this would be more sophisticated
    this.broadcast(message)
  }

  /**
   * Broadcast current energy levels across all apps
   */
  private broadcastSystemEnergy() {
    const totalEnergy = Array.from(this.registeredApps.values())
      .reduce((sum, app) => sum + app.currentEnergy, 0)

    this.broadcast({
      type: 'energy_update',
      source: 'message-bus',
      payload: {
        totalEnergy,
        appCount: this.registeredApps.size,
        timestamp: Date.now()
      }
    })
  }

  /**
   * Synchronize sacred geometry across all apps
   */
  private syncSacredGeometry() {
    const sacredGeometry = {
      treeOfLife: {
        sephiroth: 10,
        paths: 22,
        sacredRatio: 144/99
      },
      elementalQuadrants: {
        fire: 'South',
        water: 'West',
        air: 'East',
        earth: 'North'
      },
      fibonacciSequence: [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]
    }

    this.broadcast({
      type: 'system_sync',
      source: 'message-bus',
      payload: {
        event: 'sacred_geometry_sync',
        geometry: sacredGeometry
      }
    })
  }

  /**
   * Generate unique message ID using sacred mathematics
   */
  private generateMessageId(): string {
    const timestamp = Date.now()
    const random = Math.floor(Math.random() * 999)
    return `MSG-${timestamp}-${random}`
  }

  /**
   * Generate sacred signature for message authenticity
   */
  private generateSacredSignature(message: any): string {
    // Simple hash for demonstration - in production use proper cryptographic signing
    const content = JSON.stringify(message)
    let hash = 0
    for (let i = 0; i < content.length; i++) {
      const char = content.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash // Convert to 32-bit integer
    }

    // Convert to sacred geometry representation
    const sacred = Math.abs(hash) % 144 // 144:99 sacred ratio
    return `SIG-${sacred}`
  }

  /**
   * Get all registered applications
   */
  getRegisteredApps(): AppRegistration[] {
    return Array.from(this.registeredApps.values())
  }

  /**
   * Get message history
   */
  getMessageHistory(limit?: number): MysticalMessage[] {
    const history = [...this.messageHistory]
    return limit ? history.slice(-limit) : history
  }

  /**
   * Get system health status
   */
  getSystemHealth() {
    return {
      totalApps: this.registeredApps.size,
      activeApps: Array.from(this.registeredApps.values()).filter(app => app.isActive).length,
      totalMessages: this.messageHistory.length,
      recentActivity: this.messageHistory.filter(msg =>
        Date.now() - msg.timestamp < 60000 // Last minute
      ).length,
      energyFlow: this.calculateEnergyFlow()
    }
  }

  /**
   * Calculate current energy flow across the system
   */
  private calculateEnergyFlow(): number {
    const recentMessages = this.messageHistory.filter(msg =>
      Date.now() - msg.timestamp < 300000 // Last 5 minutes
    )

    return recentMessages.reduce((sum, msg) => sum + (msg.energy || 0), 0)
  }
}

// Export singleton instance
export const messageBus = CathedralMessageBus.getInstance()
