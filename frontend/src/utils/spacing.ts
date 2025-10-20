/**
 * Spacing utility for consistent padding and margins across the application
 * Using Material-UI's spacing scale (8px base)
 * 
 * Usage:
 * - Use SPACING constants for consistent spacing values
 * - Apply to MUI components: sx={{ p: SPACING.md, mb: SPACING.lg }}
 */

export const SPACING = {
  xs: 0.5,  // 4px
  sm: 1,    // 8px
  md: 2,    // 16px
  lg: 3,    // 24px
  xl: 4,    // 32px
  xxl: 6,   // 48px
} as const;

/**
 * Card spacing guidelines
 */
export const CARD_SPACING = {
  padding: SPACING.lg,      // Increased card content padding for better spacing
  margin: SPACING.lg,       // Margin between cards
  innerSpacing: SPACING.lg, // Increased spacing between card elements
} as const;

/**
 * List spacing guidelines
 */
export const LIST_SPACING = {
  itemPadding: SPACING.lg,  // Increased padding for list items
  itemGap: SPACING.md,      // Gap between list items
  iconMargin: SPACING.lg,   // Increased margin for list item icons
} as const;

/**
 * Layout spacing guidelines
 */
export const LAYOUT_SPACING = {
  sectionMargin: SPACING.lg,   // Margin between major sections
  elementMargin: SPACING.lg,   // Increased margin between elements
  compactMargin: SPACING.md,   // Compact margin for closely related items
} as const;

/**
 * Grid spacing guidelines
 */
export const GRID_SPACING = {
  default: SPACING.lg,  // Default spacing for grid items
  compact: SPACING.md,  // Compact grid spacing
  loose: SPACING.xl,    // Loose grid spacing
} as const;
