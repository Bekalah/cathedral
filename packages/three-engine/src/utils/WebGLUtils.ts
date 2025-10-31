import * as THREE from 'three';

/**
 * WebGLContextInfo - Information about WebGL context
 */
export interface WebGLContextInfo {
  renderer: string;
  vendor: string;
  version: string;
  shadingLanguageVersion: string;
  maxTextureSize: number;
  maxViewportDims: [number, number];
  extensions: string[];
}

/**
 * WebGLUtils - Utility functions for WebGL operations
 */
export class WebGLUtils {
  private static contextInfo: WebGLContextInfo | null = null;

  /**
   * Get WebGL context information
   */
  static getWebGLContextInfo(): WebGLContextInfo {
    if (this.contextInfo) {
      return this.contextInfo;
    }

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) {
      throw new Error('WebGL not supported');
    }

    const webgl = gl as WebGLRenderingContext;
    const debugInfo = webgl.getExtension('WEBGL_debug_renderer_info');
    const renderer = debugInfo ? webgl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL) : 'Unknown';
    const vendor = debugInfo ? webgl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL) : 'Unknown';

    this.contextInfo = {
      renderer,
      vendor,
      version: webgl.getParameter(webgl.VERSION),
      shadingLanguageVersion: webgl.getParameter(webgl.SHADING_LANGUAGE_VERSION),
      maxTextureSize: webgl.getParameter(webgl.MAX_TEXTURE_SIZE),
      maxViewportDims: webgl.getParameter(webgl.MAX_VIEWPORT_DIMS),
      extensions: webgl.getSupportedExtensions() || []
    };

    return this.contextInfo;
  }

  /**
   * Check if WebGL extension is supported
   */
  static isExtensionSupported(extensionName: string): boolean {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      if (!gl) return false;

      return gl.getSupportedExtensions()?.includes(extensionName) || false;
    } catch {
      return false;
    }
  }

  /**
   * Get WebGL extension
   */
  static getExtension(extensionName: string): any {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

    if (!gl) return null;

    return gl.getExtension(extensionName);
  }

  /**
   * Check WebGL capabilities
   */
  static checkCapabilities(): {
    webgl1: boolean;
    webgl2: boolean;
    extensions: {
      anisotropicFiltering: boolean;
      compressedTextures: boolean;
      floatTextures: boolean;
      halfFloatTextures: boolean;
      depthTextures: boolean;
      vertexTextures: boolean;
    };
  } {
    const canvas = document.createElement('canvas');
    const gl1 = canvas.getContext('webgl');
    const gl2 = canvas.getContext('webgl2');

    return {
      webgl1: !!gl1,
      webgl2: !!gl2,
      extensions: {
        anisotropicFiltering: this.isExtensionSupported('EXT_texture_filter_anisotropic'),
        compressedTextures: this.isExtensionSupported('WEBGL_compressed_texture_s3tc') ||
                           this.isExtensionSupported('WEBGL_compressed_texture_pvrtc') ||
                           this.isExtensionSupported('WEBGL_compressed_texture_etc1'),
        floatTextures: this.isExtensionSupported('OES_texture_float'),
        halfFloatTextures: this.isExtensionSupported('OES_texture_half_float'),
        depthTextures: this.isExtensionSupported('WEBGL_depth_texture'),
        vertexTextures: this.isExtensionSupported('OES_vertex_array_object')
      }
    };
  }

  /**
   * Create WebGL context with specific options
   */
  static createContext(options: WebGLContextAttributes = {}): WebGLRenderingContext | null {
    const canvas = document.createElement('canvas');

    const defaultOptions: WebGLContextAttributes = {
      alpha: true,
      depth: true,
      stencil: false,
      antialias: true,
      premultipliedAlpha: true,
      preserveDrawingBuffer: false,
      powerPreference: 'default',
      failIfMajorPerformanceCaveat: false,
      ...options
    };

    return canvas.getContext('webgl', defaultOptions) ||
           canvas.getContext('experimental-webgl', defaultOptions) ||
           null;
  }

  /**
   * Check if high precision is supported
   */
  static isHighPrecisionSupported(): boolean {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      if (!gl) return false;

      const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
      if (!fragmentShader) return false;

      // Try to compile a shader with high precision
      gl.shaderSource(fragmentShader, `
        precision highp float;
        void main() {
          gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
        }
      `);

      gl.compileShader(fragmentShader);
      const success = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);

      gl.deleteShader(fragmentShader);
      return success;
    } catch {
      return false;
    }
  }

  /**
   * Get maximum texture size for current context
   */
  static getMaxTextureSize(): number {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      if (!gl) return 2048;

      return gl.getParameter(gl.MAX_TEXTURE_SIZE);
    } catch {
      return 2048;
    }
  }

  /**
   * Get maximum renderbuffer size
   */
  static getMaxRenderbufferSize(): number {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      if (!gl) return 2048;

      return gl.getParameter(gl.MAX_RENDERBUFFER_SIZE);
    } catch {
      return 2048;
    }
  }

  /**
   * Get maximum viewport dimensions
   */
  static getMaxViewportDims(): [number, number] {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      if (!gl) return [2048, 2048];

      return gl.getParameter(gl.MAX_VIEWPORT_DIMS);
    } catch {
      return [2048, 2048];
    }
  }

  /**
   * Check if format is supported for textures
   */
  static isTextureFormatSupported(format: number, type: number): boolean {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

      if (!gl) return false;

      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      try {
        gl.texImage2D(gl.TEXTURE_2D, 0, format, 1, 1, 0, format, type, null);
        return true;
      } catch {
        return false;
      } finally {
        gl.deleteTexture(texture);
      }
    } catch {
      return false;
    }
  }

  /**
   * Get supported texture formats
   */
  static getSupportedTextureFormats(): {
    formats: { format: number; type: number; name: string }[];
    compressed: string[];
  } {
    const formats: { format: number; type: number; name: string }[] = [];
    const compressed: string[] = [];

    // Test common texture formats
    const testFormats = [
      { format: WebGLRenderingContext.RGBA, type: WebGLRenderingContext.UNSIGNED_BYTE, name: 'RGBA8' },
      { format: WebGLRenderingContext.RGB, type: WebGLRenderingContext.UNSIGNED_BYTE, name: 'RGB8' },
      { format: WebGLRenderingContext.LUMINANCE, type: WebGLRenderingContext.UNSIGNED_BYTE, name: 'LUMINANCE8' },
      { format: WebGLRenderingContext.RGBA, type: WebGLRenderingContext.FLOAT, name: 'RGBA32F' },
      { format: WebGLRenderingContext.RGBA, type: WebGLRenderingContext.HALF_FLOAT_OES, name: 'RGBA16F' }
    ];

    testFormats.forEach(testFormat => {
      if (this.isTextureFormatSupported(testFormat.format, testFormat.type)) {
        formats.push(testFormat);
      }
    });

    // Check compressed texture support
    const compressedExtensions = [
      'WEBGL_compressed_texture_s3tc',
      'WEBGL_compressed_texture_pvrtc',
      'WEBGL_compressed_texture_etc1',
      'WEBGL_compressed_texture_atc',
      'WEBGL_compressed_texture_astc'
    ];

    compressedExtensions.forEach(ext => {
      if (this.isExtensionSupported(ext)) {
        compressed.push(ext);
      }
    });

    return { formats, compressed };
  }

  /**
   * Create offscreen rendering context
   */
  static createOffscreenContext(width: number, height: number, options: WebGLContextAttributes = {}): {
    canvas: HTMLCanvasElement;
    gl: WebGLRenderingContext;
  } | null {
    try {
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;

      const gl = this.createContext(options);
      if (!gl) return null;

      return { canvas, gl };
    } catch {
      return null;
    }
  }

  /**
   * Read pixels from WebGL context
   */
  static readPixels(gl: WebGLRenderingContext, x: number, y: number, width: number, height: number, format: number = gl.RGBA, type: number = gl.UNSIGNED_BYTE): Uint8Array | null {
    try {
      const pixels = new Uint8Array(width * height * 4);
      gl.readPixels(x, y, width, height, format, type, pixels);
      return pixels;
    } catch {
      return null;
    }
  }

  /**
   * Create WebGL texture from image
   */
  static createTextureFromImage(gl: WebGLRenderingContext, image: HTMLImageElement, flipY: boolean = false): WebGLTexture | null {
    try {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      if (flipY) {
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      }

      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

      // Set texture parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      return texture;
    } catch {
      return null;
    }
  }

  /**
   * Create WebGL texture from data
   */
  static createTextureFromData(gl: WebGLRenderingContext, width: number, height: number, data: ArrayBufferView | null = null, format: number = gl.RGBA, type: number = gl.UNSIGNED_BYTE): WebGLTexture | null {
    try {
      const texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);

      gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, type, data);

      // Set texture parameters
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

      return texture;
    } catch {
      return null;
    }
  }

  /**
   * Create framebuffer for offscreen rendering
   */
  static createFramebuffer(gl: WebGLRenderingContext, width: number, height: number): {
    framebuffer: WebGLFramebuffer;
    texture: WebGLTexture;
    depthBuffer?: WebGLRenderbuffer;
  } | null {
    try {
      // Create framebuffer
      const framebuffer = gl.createFramebuffer();
      if (!framebuffer) return null;

      gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);

      // Create texture
      const texture = this.createTextureFromData(gl, width, height, null, gl.RGBA, gl.UNSIGNED_BYTE);
      if (!texture) {
        gl.deleteFramebuffer(framebuffer);
        return null;
      }

      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);

      // Create depth buffer if needed
      let depthBuffer: WebGLRenderbuffer | undefined;
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) === gl.FRAMEBUFFER_COMPLETE) {
        depthBuffer = gl.createRenderbuffer();
        if (depthBuffer) {
          gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
          gl.renderbufferStorage(gl.RENDERBUFFER, gl.DEPTH_COMPONENT16, width, height);
          gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
        }
      }

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.bindTexture(gl.TEXTURE_2D, null);
      gl.bindRenderbuffer(gl.RENDERBUFFER, null);

      return { framebuffer, texture, depthBuffer };
    } catch {
      return null;
    }
  }

  /**
   * Delete framebuffer and associated resources
   */
  static deleteFramebuffer(gl: WebGLRenderingContext, framebufferObj: {
    framebuffer: WebGLFramebuffer;
    texture: WebGLTexture;
    depthBuffer?: WebGLRenderbuffer;
  }): void {
    gl.deleteFramebuffer(framebufferObj.framebuffer);
    gl.deleteTexture(framebufferObj.texture);

    if (framebufferObj.depthBuffer) {
      gl.deleteRenderbuffer(framebufferObj.depthBuffer);
    }
  }

  /**
   * Check for WebGL errors
   */
  static checkGLError(gl: WebGLRenderingContext): string | null {
    const error = gl.getError();

    switch (error) {
      case gl.NO_ERROR:
        return null;
      case gl.INVALID_ENUM:
        return 'INVALID_ENUM';
      case gl.INVALID_VALUE:
        return 'INVALID_VALUE';
      case gl.INVALID_OPERATION:
        return 'INVALID_OPERATION';
      case gl.INVALID_FRAMEBUFFER_OPERATION:
        return 'INVALID_FRAMEBUFFER_OPERATION';
      case gl.OUT_OF_MEMORY:
        return 'OUT_OF_MEMORY';
      default:
        return `Unknown error: ${error}`;
    }
  }

  /**
   * Log WebGL context information
   */
  static logContextInfo(): void {
    try {
      const info = this.getWebGLContextInfo();
      console.log('WebGL Context Info:', info);

      const capabilities = this.checkCapabilities();
      console.log('WebGL Capabilities:', capabilities);

      const textureFormats = this.getSupportedTextureFormats();
      console.log('Supported Texture Formats:', textureFormats);
    } catch (error) {
      console.error('Failed to get WebGL context info:', error);
    }
  }

  /**
   * Create WebGL program from shaders
   */
  static createProgram(gl: WebGLRenderingContext, vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram | null {
    try {
      const vertexShader = this.createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
      const fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

      if (!vertexShader || !fragmentShader) return null;

      const program = gl.createProgram();
      if (!program) return null;

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Program linking failed:', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        return null;
      }

      // Clean up shaders (they're linked into the program now)
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);

      return program;
    } catch {
      return null;
    }
  }

  /**
   * Create WebGL shader
   */
  static createShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
    try {
      const shader = gl.createShader(type);
      if (!shader) return null;

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Shader compilation failed:', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    } catch {
      return null;
    }
  }

  /**
   * Set up WebGL viewport and clear color
   */
  static setupViewport(gl: WebGLRenderingContext, x: number, y: number, width: number, height: number, clearColor: [number, number, number, number] = [0, 0, 0, 1]): void {
    gl.viewport(x, y, width, height);
    gl.clearColor(clearColor[0], clearColor[1], clearColor[2], clearColor[3]);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  }

  /**
   * Enable common WebGL states
   */
  static enableCommonStates(gl: WebGLRenderingContext): void {
    gl.enable(gl.DEPTH_TEST);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.CULL_FACE);
    gl.cullFace(gl.BACK);
  }

  /**
   * Disable common WebGL states
   */
  static disableCommonStates(gl: WebGLRenderingContext): void {
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.disable(gl.CULL_FACE);
  }
}

export default WebGLUtils;
