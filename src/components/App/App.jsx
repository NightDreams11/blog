import { Footer } from 'components/layout/Footer/Footer'
import { ResponsiveAppBar } from 'components/layout/Header/Header'
import { SimpleSnackbar } from 'components/layout/Snackbar/Snackbar'
import { RoutesComponent } from 'components/RoutesComponent/RoutesComponent'
import { Wrapper } from './styled'

export const App = () => {
  return (
    <Wrapper>
      <ResponsiveAppBar />
      <RoutesComponent />
      <Footer />
      <SimpleSnackbar />
    </Wrapper>
  )
}
