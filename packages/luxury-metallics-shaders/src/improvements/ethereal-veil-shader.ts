/**
 * Ethereal Veil Shader
 * 
 * Created from doubt: "The shaders aren't beautiful enough"
 * Improvement: Add luminous, ethereal effects with depth
 * 
 * This is how visionary art is created - from doubt comes beauty.
 * 
 * @package @cathedral/luxury-metallics-shaders
 */

export const EtherealVeilShader = {
  name: 'Ethereal Veil',
  vertex: `
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    
    void main() {
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  
  fragment: `
    uniform float time;
    uniform vec3 color;
    uniform float intensity;
    uniform float speed;
    
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    
    // Golden ratio for beauty
    const float PHI = 1.618033988749895;
    
    void main() {
      vec3 normal = normalize(vNormal);
      
      // Fresnel effect for ethereal glow
      vec3 viewDirection = normalize(cameraPosition - vWorldPosition);
      float fresnel = pow(1.0 - dot(normal, viewDirection), 2.0);
      
      // Animated wave pattern
      float wave = sin(vWorldPosition.x * 0.1 + time * speed) * 
                   cos(vWorldPosition.y * 0.1 + time * speed) * 0.5 + 0.5;
      
      // Combine with golden ratio harmony
      vec3 baseColor = color;
      vec3 glowColor = baseColor * (fresnel * intensity + wave * 0.3);
      
      // Add depth with subtle noise
      float noise = fract(sin(dot(vWorldPosition.xy, vec2(12.9898, 78.233))) * 43758.5453);
      glowColor += noise * 0.1;
      
      gl_FragColor = vec4(glowColor, 1.0);
    }
  `,
  
  uniforms: {
    time: { value: 0.0 },
    color: { value: { r: 0.5, g: 0.7, b: 1.0 } },
    intensity: { value: 1.5 },
    speed: { value: 0.5 }
  },
  
  beauty: 'Creates a luminous, ethereal veil effect with depth and movement',
  wisdom: 'Beauty comes from combining mathematical precision (golden ratio) with organic movement (waves)'
};

