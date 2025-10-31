# Cathedral Experience

A unified React application that brings together all cathedral systems into a cohesive, safe, and engaging learning experience.

## Overview

The Cathedral Experience is the main user interface for the Unified Cathedral Engine, providing:

- **Mystical Fusion Interface**: Drag-and-drop fusion mechanics with real-time 3D visualization
- **Sacred Learning Dashboard**: Interactive learning modules with progression tracking
- **Safety Preferences**: Comprehensive safety settings and trauma-informed features
- **Real-time Engine Status**: Live monitoring of all integrated systems

## Architecture

### Core Integration

The application integrates four main engines:

1. **Synthesis Engine** (`@cathedral/synthesis-engine`)
   - Fusion mechanics and mystical pattern generation
   - Quality-based progression system
   - Harmonic ratio calculations (144:99)

2. **Safety Framework** (`@cathedral/safety-framework`)
   - Trauma-informed content processing
   - User safety profiles and boundary management
   - Real-time content validation and filtering

3. **Three.js Engine** (`@cathedral/three-engine`)
   - Sacred geometry rendering
   - Mystical lighting and materials
   - Particle systems and fractal generation

4. **Learning Engine** (`@cathedral/learning-engine`)
   - Adaptive learning progression
   - Module-based curriculum
   - Achievement and streak tracking

### Unified Cathedral Engine

The `UnifiedCathedralEngine` serves as the main orchestrator:

```typescript
import { getUnifiedCathedralEngine } from '@cathedral/cathedral-engine';

const engine = getUnifiedCathedralEngine({
  enableThreeJs: true,
  enableLearning: true,
  enableSafety: true,
  defaultRenderQuality: 'high',
  enableEventLogging: true,
  autoSaveInterval: 30000,
});

await engine.initialize(userProfile);
```

## Features

### Fusion Interface

- **Drag-and-Drop Elements**: Intuitive element selection and fusion zone
- **Real-time Validation**: Safety framework validates all fusion requests
- **3D Visualization**: Live Three.js rendering of mystical combinations
- **Quality Tiers**: Common to Mythical rarity progression

### Learning Dashboard

- **Module Progression**: Structured learning paths with prerequisites
- **Study Timer**: Built-in study sessions with progress tracking
- **Achievement System**: Unlock achievements and maintain streaks
- **3D Learning Aids**: Interactive sacred geometry visualizations

### Safety System

- **Content Intensity Control**: Adjustable intensity levels (very mild to extreme)
- **Trigger Management**: Comprehensive trigger category selection
- **Emergency Features**: Safe words and emergency stop functionality
- **Trauma-Informed Design**: Built-in grounding and aftercare protocols

## Development

### Prerequisites

- Node.js 18+
- pnpm 8+
- Modern browser with WebGL support

### Installation

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev:cathedral

# Build for production
pnpm run build:cathedral
```

### Project Structure

```
apps/cathedral-experience/
├── src/
│   ├── components/
│   │   ├── FusionInterface.tsx      # Main fusion mechanics
│   │   ├── LearningDashboard.tsx    # Learning progression
│   │   ├── SafetyPreferences.tsx   # Safety settings
│   │   ├── ErrorBoundary.tsx       # Error handling
│   │   ├── LoadingSpinner.tsx      # Loading states
│   │   └── EngineStatus.tsx        # System monitoring
│   ├── App.tsx                     # Main application
│   ├── App.css                     # Styling
│   └── main.tsx                    # Entry point
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## Configuration

### Engine Configuration

```typescript
interface UnifiedCathedralConfig {
  synthesis?: SynthesisEngineConfig;
  enableThreeJs?: boolean;
  enableLearning?: boolean;
  enableSafety?: boolean;
  maxConcurrentOperations?: number;
  defaultRenderQuality?: 'low' | 'medium' | 'high' | 'ultra';
  enableEventLogging?: boolean;
  autoSaveInterval?: number;
}
```

### Safety Configuration

```typescript
interface UserSafetyProfile {
  contentPreferences: {
    maxIntensity: ContentIntensity;
    blockedCategories: TriggerCategory[];
    enableTraumaInformed: boolean;
    enableGrounding: boolean;
    enableAftercare: boolean;
  };
  boundaries: {
    safeWord: string;
    sessionTimeout: number;
    emergencyContact: string;
  };
  accessibility: {
    enableAccessibility: boolean;
    culturalSensitivity: boolean;
    ageVerification: boolean;
  };
}
```

## Deployment

### Build Process

```bash
# Build all packages first
pnpm run turbo:build

# Build the experience app
pnpm run build:cathedral
```

### Deployment Targets

- **Static Hosting**: Deploy `dist/` folder to any static host
- **Docker**: Use included Dockerfile for containerized deployment
- **Cloudflare Pages**: Optimized for edge deployment
- **Vercel**: Zero-config deployment with Turborepo support

## Browser Support

- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **WebGL Required**: Hardware-accelerated 3D graphics
- **Web Audio**: For mystical sound effects (optional)

## Performance

### Optimization Features

- **Code Splitting**: Automatic route-based and component-based splitting
- **Lazy Loading**: Components and 3D assets loaded on demand
- **Caching**: Aggressive caching of mystical computations
- **Web Workers**: Heavy computations moved off main thread

### Quality Settings

- **Low**: Reduced particle effects, lower geometry detail
- **Medium**: Balanced quality and performance (default)
- **High**: Enhanced effects and geometry detail
- **Ultra**: Maximum quality for high-end systems

## Safety & Ethics

### Trauma-Informed Design

All content is processed through multiple safety layers:

1. **Pre-generation Validation**: Content checked before creation
2. **Real-time Filtering**: Active monitoring during user interaction
3. **Post-generation Review**: Final safety validation
4. **User Feedback Loop**: Continuous safety improvement

### Accessibility

- **Screen Reader Support**: Full ARIA implementation
- **Keyboard Navigation**: Complete keyboard accessibility
- **Visual Customization**: High contrast and color options
- **Motion Sensitivity**: Respects prefers-reduced-motion

## Contributing

### Development Guidelines

1. **Safety First**: All changes must pass safety validation
2. **TypeScript**: Strict typing required for all new code
3. **Testing**: Unit tests required for core functionality
4. **Documentation**: Update docs for API changes

### Code Style

- **ESLint**: Configured with React and TypeScript rules
- **Prettier**: Code formatting enforced
- **Conventional Commits**: Commit message format required

## License

MIT License - see LICENSE file for details.

## Support

- **Documentation**: [Cathedral Wiki](https://github.com/cathedral-research/cathedral/wiki)
- **Issues**: [GitHub Issues](https://github.com/cathedral-research/cathedral/issues)
- **Discussions**: [GitHub Discussions](https://github.com/cathedral-research/cathedral/discussions)

---

**Built with ❤️ by Cathedral Research**

*Experience the fusion of ancient wisdom and modern technology*