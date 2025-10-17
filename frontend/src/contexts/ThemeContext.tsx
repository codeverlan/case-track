import { createContext, useContext } from 'react'

// Theme context for dark mode
export type PaletteMode = 'light' | 'dark'

export interface ThemeContextType {
  mode: PaletteMode
  toggleColorMode: () => void
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
})

export const useThemeMode = () => useContext(ThemeContext)
