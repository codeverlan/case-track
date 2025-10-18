import { describe, it, expect } from 'vitest';
import { 
  SPACING, 
  CARD_SPACING, 
  LIST_SPACING, 
  LAYOUT_SPACING, 
  GRID_SPACING 
} from '../../utils/spacing';

describe('Spacing Utils', () => {
  describe('SPACING', () => {
    it('should have consistent spacing values', () => {
      expect(SPACING.xs).toBe(0.5);
      expect(SPACING.sm).toBe(1);
      expect(SPACING.md).toBe(2);
      expect(SPACING.lg).toBe(3);
      expect(SPACING.xl).toBe(4);
      expect(SPACING.xxl).toBe(6);
    });

    it('should follow incremental pattern', () => {
      expect(SPACING.sm).toBeGreaterThan(SPACING.xs);
      expect(SPACING.md).toBeGreaterThan(SPACING.sm);
      expect(SPACING.lg).toBeGreaterThan(SPACING.md);
      expect(SPACING.xl).toBeGreaterThan(SPACING.lg);
      expect(SPACING.xxl).toBeGreaterThan(SPACING.xl);
    });
  });

  describe('CARD_SPACING', () => {
    it('should have padding defined', () => {
      expect(CARD_SPACING.padding).toBeDefined();
      expect(CARD_SPACING.padding).toBe(SPACING.md);
    });

    it('should have margin defined', () => {
      expect(CARD_SPACING.margin).toBeDefined();
      expect(CARD_SPACING.margin).toBe(SPACING.lg);
    });

    it('should have innerSpacing defined', () => {
      expect(CARD_SPACING.innerSpacing).toBeDefined();
      expect(CARD_SPACING.innerSpacing).toBe(SPACING.md);
    });
  });

  describe('LIST_SPACING', () => {
    it('should have itemPadding defined', () => {
      expect(LIST_SPACING.itemPadding).toBeDefined();
      expect(LIST_SPACING.itemPadding).toBe(SPACING.md);
    });

    it('should have itemGap defined', () => {
      expect(LIST_SPACING.itemGap).toBeDefined();
      expect(LIST_SPACING.itemGap).toBe(SPACING.sm);
    });

    it('should have iconMargin defined', () => {
      expect(LIST_SPACING.iconMargin).toBeDefined();
      expect(LIST_SPACING.iconMargin).toBe(SPACING.md);
    });
  });

  describe('LAYOUT_SPACING', () => {
    it('should have sectionMargin defined', () => {
      expect(LAYOUT_SPACING.sectionMargin).toBeDefined();
      expect(LAYOUT_SPACING.sectionMargin).toBe(SPACING.lg);
    });

    it('should have elementMargin defined', () => {
      expect(LAYOUT_SPACING.elementMargin).toBeDefined();
      expect(LAYOUT_SPACING.elementMargin).toBe(SPACING.md);
    });

    it('should have compactMargin defined', () => {
      expect(LAYOUT_SPACING.compactMargin).toBeDefined();
      expect(LAYOUT_SPACING.compactMargin).toBe(SPACING.sm);
    });
  });

  describe('GRID_SPACING', () => {
    it('should have default spacing defined', () => {
      expect(GRID_SPACING.default).toBeDefined();
      expect(GRID_SPACING.default).toBe(SPACING.lg);
    });

    it('should have compact spacing defined', () => {
      expect(GRID_SPACING.compact).toBeDefined();
      expect(GRID_SPACING.compact).toBe(SPACING.md);
    });

    it('should have loose spacing defined', () => {
      expect(GRID_SPACING.loose).toBeDefined();
      expect(GRID_SPACING.loose).toBe(SPACING.xl);
    });

    it('should maintain spacing hierarchy', () => {
      expect(GRID_SPACING.compact).toBeLessThan(GRID_SPACING.default);
      expect(GRID_SPACING.default).toBeLessThan(GRID_SPACING.loose);
    });
  });
});
