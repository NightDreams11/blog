import styled from 'styled-components'

export const Wrapper = styled.div`
  // background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`

export const Title = styled.h1`
  color: ${({ theme }) => theme.colors.white1};
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
    Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 120px;
`
