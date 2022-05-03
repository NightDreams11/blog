import { Container, Typography } from '@mui/material'
import { styled } from '@mui/system'
import style from 'styled-components'

// export const BoxWrapper = styled(Box, {
//   // Here we can add some discription of component. It will be added to className
// })({
//   backgroundColor: 'silver',
//   color: '#fff',
//   borderTop: 1,
// })

// export const BoxWrapper = styled(Box, {
//   // Here we can add some discription of component. It will be added to className
// })`
//   background-color: transperent;
//   color: #fff;
//   border-top: 2px solid silver;
//   height: 20px;
//   // margin: 0 20px;
// `

export const Wrapper = style.div`
  border-top: 2px solid #000;
  margin-top: auto;
`

export const ContainerWrapper = styled(
  Container,
  {}
)({
  backgroundColor: 'transparent',
  color: '#fff',
  height: 30,
  width: '100vw',
})

export const TypographyItem = styled(
  Typography,
  {}
)({
  color: '#000',
  textAlign: 'center',
})
