import React from 'react'
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

// Create theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
    background: {
      default: '#f5f5f5',
    },
  },
  typography: {
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
          borderRadius: 8,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 6,
        },
      },
    },
  },
})

function App() {
  return (
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
  )
}

export default App