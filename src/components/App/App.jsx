import { Footer } from 'components/layout/Footer/Footer'
import { ResponsiveAppBar } from 'components/layout/Header/Header'
import { SimpleSnackbar } from 'components/layout/Snackbar/Snackbar'
import { RoutesComponent } from 'components/RoutesComponent/RoutesComponent'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { getUser } from 'store/auth'
import { Wrapper } from './styled'

export const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getUser())
  }, [dispatch])

  return (
    <Wrapper>
      <ResponsiveAppBar />
      <RoutesComponent />
      <Footer />
      <SimpleSnackbar />
    </Wrapper>
  )
}
