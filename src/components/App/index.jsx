import { Footer } from 'components/layout/Footer'
import { ResponsiveAppBar } from 'components/layout/Header'
import { RoutesComponent } from 'components/RoutesComponent/RoutesComponent'
// import { Wrapper, Title } from './styled'

export const App = () => {
  return (
    <div>
      <ResponsiveAppBar />
      <RoutesComponent />
      {/* <Wrapper>
        <Title>Welcome to FicusLife!</Title>
      </Wrapper> */}
      <Footer />
    </div>
  )
}
