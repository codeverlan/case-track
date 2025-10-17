import React, { useState } from 'react'
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  Cases as CasesIcon,
  People as PeopleIcon,
  ViewKanban as KanbanIcon,
  Assessment as ReportsIcon,
  AccountCircle,
  Brightness4,
  Brightness7,
} from '@mui/icons-material'
import { useNavigate, useLocation } from 'react-router-dom'
import { useThemeMode } from '../../App'
import { SPACING } from '../../utils/spacing'

const drawerWidth = 240

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/' },
  { text: 'Cases', icon: <CasesIcon />, path: '/cases' },
  { text: 'Contacts', icon: <PeopleIcon />, path: '/contacts' },
  { text: 'Kanban', icon: <KanbanIcon />, path: '/kanban' },
  { text: 'Reports', icon: <ReportsIcon />, path: '/reports' },
]

interface LayoutProps {
  children: React.ReactNode
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const navigate = useNavigate()
  const location = useLocation()
  const { mode, toggleColorMode } = useThemeMode()

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleProfileMenuClose = () => {
    setAnchorEl(null)
  }

  const handleNavigation = (path: string) => {
    navigate(path)
    setMobileOpen(false)
  }

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Case Track
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            <ListItemButton
              selected={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  )

  return (
    <Box sx={{ display: 'flex' }}>
      {/* Skip to main content link for accessibility */}
      <Box
        component="a"
        href="#main-content"
        sx={{
          position: 'absolute',
          left: '-999px',
          width: '1px',
          height: '1px',
          top: 'auto',
          '&:focus': {
            position: 'fixed',
            top: 0,
            left: 0,
            width: 'auto',
            height: 'auto',
            padding: SPACING.md,
            backgroundColor: 'primary.main',
            color: 'primary.contrastText',
            zIndex: 9999,
            textDecoration: 'none',
          },
        }}
      >
        Skip to main content
      </Box>

      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: SPACING.md, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Mental Health Case Management
          </Typography>
          <Tooltip title={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}>
            <IconButton
              onClick={toggleColorMode}
              color="inherit"
              aria-label={`Switch to ${mode === 'light' ? 'dark' : 'light'} mode`}
            >
              {mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleProfileMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Settings</MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        id="main-content"
        sx={{
          flexGrow: 1,
          p: SPACING.lg,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
        role="main"
        aria-label="Main content"
      >
        <Toolbar />
        {children}
      </Box>
    </Box>
  )
}

export default Layout