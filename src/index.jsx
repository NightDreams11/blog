import { render } from 'react-dom'
import { App } from 'components/App'
import { GlobalStyles } from 'styles/global'
import { Normalize } from 'styles/normalize'
import { theme } from 'styles/theme'
import { ThemeProvider } from 'styled-components'
import { Provider as StoreProvider } from 'react-redux'
import { store } from 'store'
import { ResponsiveAppBar } from 'components/Header'
import { FooterPage } from 'components/Footer'

render(
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyles />
      <ResponsiveAppBar />
      <App />
      <FooterPage />
    </ThemeProvider>
  </StoreProvider>,
  document.getElementById('root')
)
