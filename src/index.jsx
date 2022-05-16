import { render } from 'react-dom'
import { App } from 'components/App/App'
import { GlobalStyles } from 'styles/global'
import { Normalize } from 'styles/normalize'
import { theme } from 'styles/theme'
import { ThemeProvider } from 'styled-components'
import { Provider as StoreProvider } from 'react-redux'
import { store } from 'store'
import { BrowserRouter } from 'react-router-dom'

render(
  <BrowserRouter>
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <Normalize />
        <GlobalStyles />
        <App />
      </ThemeProvider>
    </StoreProvider>
  </BrowserRouter>,
  document.getElementById('root')
)
