export * from './ArcanaeCard';
export * from './theme';

// Re-export specific component types if needed
export type { ArcanaeCardProps } from './ArcanaeCard';

// Export Theme
export { theme } from './theme';

// Simple Mode Hook (Placeholder for full UI component)
// In a real implementation this would use React Context from @cathedral/config
export const useMode = () => {
  const toggleMode = (mode: string) => {
    // This would connect to tesseract-bridge in a real app
    console.log(`Switching to mode: ${mode}`);
    // document.dispatchEvent(new CustomEvent('cathedral-mode-change', { detail: mode }));
  };
  return { toggleMode };
};
