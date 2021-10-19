import { render } from 'react-dom'
import { App } from 'components/App'
import { GlobalStyles } from 'styles/global'
import { Normalize } from 'styles/normalize'
import { theme } from 'styles/theme'
import { ThemeProvider } from 'styled-components'
import { Provider } from 'react-redux'
import { store } from 'store'

render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
)
