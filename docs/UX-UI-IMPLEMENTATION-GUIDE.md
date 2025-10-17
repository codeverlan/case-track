# UX/UI Implementation Guide

This guide provides practical steps for implementing the UX/UI Specification defined in `UX-UI-SPECIFICATION.md`.

## Quick Start

### 1. Theme Setup (Material UI)

Update `/frontend/src/App.tsx` to implement the full theme with dark mode support:

```typescript
import React, { useMemo, useState } from 'react'
import { ThemeProvider, createTheme, PaletteMode } from '@mui/material/styles'
import { CssBaseline } from '@mui/material'

// Theme configuration based on UX-UI-SPECIFICATION.md
function getDesignTokens(mode: PaletteMode) {
  return {
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // Light mode palette
            primary: {
              main: '#1976D2',
              light: '#42A5F5',
              dark: '#1565C0',
            },
            secondary: {
              main: '#009688',
              light: '#4DB6AC',
              dark: '#00796B',
            },
            error: {
              main: '#F44336',
            },
            warning: {
              main: '#FF9800',
            },
            info: {
              main: '#2196F3',
            },
            success: {
              main: '#4CAF50',
            },
            background: {
              default: '#FAFAFA',
              paper: '#F5F5F5',
            },
            text: {
              primary: 'rgba(0, 0, 0, 0.87)',
              secondary: 'rgba(0, 0, 0, 0.60)',
              disabled: 'rgba(0, 0, 0, 0.38)',
            },
          }
        : {
            // Dark mode palette
            primary: {
              main: '#42A5F5',
              light: '#64B5F6',
              dark: '#1E88E5',
            },
            secondary: {
              main: '#4DB6AC',
              light: '#80CBC4',
              dark: '#26A69A',
            },
            error: {
              main: '#EF5350',
            },
            warning: {
              main: '#FFA726',
            },
            info: {
              main: '#42A5F5',
            },
            success: {
              main: '#66BB6A',
            },
            background: {
              default: '#121212',
              paper: '#1E1E1E',
            },
            text: {
              primary: 'rgba(255, 255, 255, 0.87)',
              secondary: 'rgba(255, 255, 255, 0.60)',
              disabled: 'rgba(255, 255, 255, 0.38)',
            },
          }),
    },
    typography: {
      fontFamily: [
        'Inter',
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        'Oxygen',
        'Ubuntu',
        'Cantarell',
        'sans-serif',
      ].join(','),
      h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.5px',
      },
      h2: {
        fontSize: '2rem',
        fontWeight: 700,
        lineHeight: 1.3,
        letterSpacing: '-0.25px',
      },
      h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
      },
      h4: {
        fontSize: '1.25rem',
        fontWeight: 600,
        lineHeight: 1.4,
        letterSpacing: '0.15px',
      },
      h5: {
        fontSize: '1.125rem',
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: '0.15px',
      },
      h6: {
        fontSize: '1rem',
        fontWeight: 600,
        lineHeight: 1.5,
        letterSpacing: '0.15px',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
        letterSpacing: '0.15px',
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.57,
        letterSpacing: '0.15px',
      },
      button: {
        fontSize: '0.875rem',
        fontWeight: 500,
        lineHeight: 1.75,
        letterSpacing: '0.4px',
        textTransform: 'none',
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.66,
        letterSpacing: '0.4px',
      },
    },
    spacing: 8, // Base spacing unit
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            textTransform: 'none',
            minHeight: 44, // Accessibility: minimum touch target
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: mode === 'light' 
              ? '0 2px 8px rgba(0,0,0,0.1)' 
              : '0 2px 8px rgba(0,0,0,0.3)',
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            minWidth: 44, // Accessibility: minimum touch target
            minHeight: 44,
          },
        },
      },
    },
  }
}

function App() {
  const [mode, setMode] = useState<PaletteMode>('light')

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* Rest of your app */}
    </ThemeProvider>
  )
}
```

### 2. Add Inter Font

Add to `/frontend/index.html` in the `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### 3. Implement Accessibility Features

#### Skip Navigation Link

Add to the top of your Layout component:

```typescript
<a 
  href="#main-content" 
  style={{
    position: 'absolute',
    left: '-9999px',
    zIndex: 999,
  }}
  onFocus={(e) => {
    e.currentTarget.style.left = '0'
  }}
  onBlur={(e) => {
    e.currentTarget.style.left = '-9999px'
  }}
>
  Skip to main content
</a>
```

#### Focus Visible Styles

Add to your global CSS or theme:

```css
*:focus-visible {
  outline: 3px solid #42A5F5;
  outline-offset: 2px;
}
```

#### Reduced Motion Support

Add to your global CSS:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### 4. Responsive Breakpoints

Material UI breakpoints are already configured. Use them like this:

```typescript
import { useTheme, useMediaQuery } from '@mui/material'

function MyComponent() {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'))
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'))

  return (
    <Box>
      {isMobile && <MobileLayout />}
      {isTablet && <TabletLayout />}
      {isDesktop && <DesktopLayout />}
    </Box>
  )
}
```

### 5. Example Component: Case Card

Here's a complete example implementing the Case Card component from the spec:

```typescript
import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  Chip,
  Box,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EventIcon from '@mui/icons-material/Event'
import PeopleIcon from '@mui/icons-material/People'

interface CaseCardProps {
  caseId: string
  caseName: string
  caseNumber: string
  status: 'ACTIVE' | 'WAITING_LIST' | 'CLOSED'
  nextCourtDate?: Date
  contactCount: number
  onViewCase: () => void
  onEditCase: () => void
  onDeleteCase: () => void
}

export function CaseCard({
  caseId,
  caseName,
  caseNumber,
  status,
  nextCourtDate,
  contactCount,
  onViewCase,
  onEditCase,
  onDeleteCase,
}: CaseCardProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return 'success'
      case 'WAITING_LIST':
        return 'warning'
      case 'CLOSED':
        return 'default'
      default:
        return 'default'
    }
  }

  const getDaysUntil = (date: Date) => {
    const today = new Date()
    const diffTime = date.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const getUrgencyColor = (daysUntil: number) => {
    if (daysUntil <= 7) return 'error'
    if (daysUntil <= 14) return 'warning'
    return 'info'
  }

  const daysUntil = nextCourtDate ? getDaysUntil(nextCourtDate) : null

  return (
    <Card
      sx={{
        cursor: 'pointer',
        transition: 'box-shadow 150ms ease-in-out',
        '&:hover': {
          boxShadow: (theme) =>
            theme.palette.mode === 'light'
              ? '0 4px 12px rgba(0,0,0,0.15)'
              : '0 4px 12px rgba(0,0,0,0.4)',
        },
      }}
      onClick={onViewCase}
      role="article"
      aria-label={`Case ${caseName}`}
    >
      <CardContent>
        <Box display="flex" justifyContent="space-between" alignItems="start" mb={2}>
          <Box flex={1}>
            <Typography variant="h5" component="h2" gutterBottom>
              {caseName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontFamily: 'monospace' }}>
              {caseNumber}
            </Typography>
          </Box>
          <Box display="flex" gap={1}>
            <Chip
              label={status.replace('_', ' ')}
              color={getStatusColor(status)}
              size="small"
              aria-label={`Status: ${status.replace('_', ' ')}`}
            />
            <IconButton
              aria-label="More options"
              onClick={(e) => {
                e.stopPropagation()
                setAnchorEl(e.currentTarget)
              }}
            >
              <MoreVertIcon />
            </IconButton>
          </Box>
        </Box>

        {nextCourtDate && daysUntil !== null && (
          <Box display="flex" alignItems="center" gap={1} mb={1}>
            <EventIcon color={getUrgencyColor(daysUntil)} fontSize="small" />
            <Typography variant="body2" color="text.secondary">
              Court date in {daysUntil} day{daysUntil !== 1 ? 's' : ''}
            </Typography>
          </Box>
        )}

        <Box display="flex" alignItems="center" gap={1}>
          <PeopleIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {contactCount} contact{contactCount !== 1 ? 's' : ''}
          </Typography>
        </Box>
      </CardContent>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem
          onClick={(e) => {
            e.stopPropagation()
            setAnchorEl(null)
            onEditCase()
          }}
        >
          Edit Case
        </MenuItem>
        <MenuItem
          onClick={(e) => {
            e.stopPropagation()
            setAnchorEl(null)
            onDeleteCase()
          }}
          sx={{ color: 'error.main' }}
        >
          Delete Case
        </MenuItem>
      </Menu>
    </Card>
  )
}
```

### 6. Dark Mode Toggle Component

Add a theme toggle to your app bar:

```typescript
import { IconButton } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import { useTheme } from '@mui/material/styles'

function ThemeToggle({ toggleColorMode }: { toggleColorMode: () => void }) {
  const theme = useTheme()

  return (
    <IconButton
      onClick={toggleColorMode}
      color="inherit"
      aria-label={`Switch to ${theme.palette.mode === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  )
}
```

### 7. Accessibility Testing Checklist

Before deploying:

- [ ] Run automated tests with axe DevTools browser extension
- [ ] Test full keyboard navigation (Tab, Shift+Tab, Enter, Escape, Arrow keys)
- [ ] Test with screen reader (NVDA on Windows, VoiceOver on macOS)
- [ ] Verify all images have alt text
- [ ] Verify all form inputs have labels
- [ ] Check color contrast ratios (use WebAIM Contrast Checker)
- [ ] Test at 200% zoom
- [ ] Test responsive behavior at 320px width
- [ ] Verify focus indicators are visible
- [ ] Test reduced motion preference

### 8. Performance Optimizations

```typescript
// Lazy load routes
const Dashboard = lazy(() => import('./components/cases/Dashboard'))
const CaseList = lazy(() => import('./components/cases/CaseList'))
const CaseDetail = lazy(() => import('./components/cases/CaseDetail'))

// Use Suspense with loading fallback
<Suspense fallback={<CircularProgress />}>
  <Routes>
    <Route path="/" element={<Dashboard />} />
    <Route path="/cases" element={<CaseList />} />
    <Route path="/cases/:id" element={<CaseDetail />} />
  </Routes>
</Suspense>
```

## Component Development Patterns

### 1. Always Use Semantic HTML

```typescript
// ✅ Good - Semantic
<nav aria-label="Main navigation">
  <button onClick={handleClick}>Submit</button>
</nav>

// ❌ Bad - Non-semantic
<div onClick={handleClick} role="button">Submit</div>
```

### 2. Provide ARIA Labels Where Needed

```typescript
// ✅ Good
<IconButton aria-label="Delete case">
  <DeleteIcon />
</IconButton>

// ❌ Bad
<IconButton>
  <DeleteIcon />
</IconButton>
```

### 3. Don't Rely on Color Alone

```typescript
// ✅ Good - Icon + color + text
<Chip
  icon={<ErrorIcon />}
  label="Urgent"
  color="error"
/>

// ❌ Bad - Color only
<Chip color="error" />
```

### 4. Maintain Focus Management

```typescript
const dialogRef = useRef<HTMLDivElement>(null)

useEffect(() => {
  if (open && dialogRef.current) {
    // Focus the dialog when it opens
    dialogRef.current.focus()
  }
}, [open])

return (
  <Dialog
    open={open}
    onClose={onClose}
    ref={dialogRef}
    aria-labelledby="dialog-title"
    aria-describedby="dialog-description"
  >
    {/* Dialog content */}
  </Dialog>
)
```

## Next Steps

1. **Start with Theme**: Implement the theme configuration first
2. **Core Components**: Build navigation, cards, and forms
3. **Test Accessibility**: Run tests after each component
4. **Dark Mode**: Ensure all components work in both modes
5. **Responsive**: Test at all breakpoints
6. **Performance**: Optimize as you go

## Resources

- **UX/UI Specification**: See `UX-UI-SPECIFICATION.md` for complete design system
- **Material UI Docs**: https://mui.com/
- **WCAG Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **Accessibility Testing**: https://www.deque.com/axe/devtools/

---

This guide is a practical companion to the comprehensive UX/UI Specification document. Refer to the specification for detailed rationale and design decisions.
