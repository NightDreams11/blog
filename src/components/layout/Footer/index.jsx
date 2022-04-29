import {
  ContainerWrapper,
  TypographyItem,
  Wrapper,
  WrapperInner,
} from 'components/layout/Footer/styled'
import React from 'react'

export const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Wrapper>
      <WrapperInner>
        <ContainerWrapper>
          <TypographyItem variant="body1" component="div">
            {currentYear}
          </TypographyItem>
        </ContainerWrapper>
      </WrapperInner>
    </Wrapper>
  )
}
