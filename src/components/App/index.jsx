import { Footer } from 'components/layout/Footer'
import { ResponsiveAppBar } from 'components/layout/Header'
import { RoutesComponent } from 'components/RoutesComponent/RoutesComponent'
import { Wrapper } from './styled'

export const App = () => {
  return (
    <Wrapper>
      <ResponsiveAppBar />
      <RoutesComponent />
      <Footer />
    </Wrapper>
  )
}
