import { ThemeProvider } from 'styled-components'
import { Outlet } from 'react-router-dom'

import { defaultTheme } from './styles/themes/default'
import { GlobalStyle } from './styles/global'
import { CartContextProvider } from './contexts/CartContextProvider'

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyle />
      <CartContextProvider>
        <Outlet />
      </CartContextProvider>
    </ThemeProvider>
  )
}
