import {
  ContainerWrapper,
  TypographyItem,
  Wrapper,
} from 'components/layout/Footer/styled'
import React from 'react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Wrapper>
      <ContainerWrapper>
        <TypographyItem variant="body1" component="div">
          {currentYear}
        </TypographyItem>
      </ContainerWrapper>
    </Wrapper>
  )
}
