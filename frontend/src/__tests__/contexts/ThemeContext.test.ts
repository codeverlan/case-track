import { describe, it, expect } from 'vitest';
import { PaletteMode } from '../../contexts/ThemeContext';

describe('ThemeContext Types', () => {
  describe('PaletteMode type', () => {
    it('should accept light mode', () => {
      const mode: PaletteMode = 'light';
      expect(mode).toBe('light');
    });

    it('should accept dark mode', () => {
      const mode: PaletteMode = 'dark';
      expect(mode).toBe('dark');
    });

    it('should allow comparison with string literals', () => {
      const lightMode: PaletteMode = 'light';
      const darkMode: PaletteMode = 'dark';
      
      expect(lightMode === 'light').toBe(true);
      expect(darkMode === 'dark').toBe(true);
      expect(lightMode === 'dark').toBe(false);
      expect(darkMode === 'light').toBe(false);
    });

    it('should toggle between modes', () => {
      let mode: PaletteMode = 'light';
      
      // Simulate toggle
      mode = mode === 'light' ? 'dark' : 'light';
      expect(mode).toBe('dark');
      
      // Toggle again
      mode = mode === 'light' ? 'dark' : 'light';
      expect(mode).toBe('light');
    });
  });
});
