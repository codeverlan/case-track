import { useMemo, useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { CssBaseline, Box } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'

// Components
import Layout from './components/common/Layout'
import Dashboard from './components/cases/Dashboard'
import CaseList from './components/cases/CaseList'
import CaseDetail from './components/cases/CaseDetail'
import ContactList from './components/contacts/ContactList'
import ContactDetail from './components/contacts/ContactDetail'
import KanbanBoard from './components/kanban/KanbanBoard'
import Reports from './components/reports/Reports'

// Theme context
import { ThemeContext, PaletteMode } from './contexts/ThemeContext'

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
              paper: '#FFFFFF',
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
        textTransform: 'none' as const,
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
            textTransform: 'none' as const,
            minHeight: 44, // Accessibility: minimum touch target
            minWidth: 44,
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
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiInputBase-root': {
              minHeight: 44, // Accessibility: minimum touch target
            },
          },
        },
      },
    },
  }
}

function App() {
  const [mode, setMode] = useState<PaletteMode>('light')

  const themeContextValue = useMemo(
    () => ({
      mode,
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [mode]
  )

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode])

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <CssBaseline />
          <Router>
            <Layout>
              <Box sx={{ p: 3 }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/cases" element={<CaseList />} />
                  <Route path="/cases/:id" element={<CaseDetail />} />
                  <Route path="/cases/:id/kanban" element={<KanbanBoard />} />
                  <Route path="/contacts" element={<ContactList />} />
                  <Route path="/contacts/:id" element={<ContactDetail />} />
                  <Route path="/reports" element={<Reports />} />
                </Routes>
              </Box>
            </Layout>
          </Router>
        </LocalizationProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

export default App