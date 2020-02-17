import Header from "./Header";
import styled, { ThemeProvider, createGlobalStyle } from "styled-components";

const theme = {
  darkRed: "#bf322d",
  red: "#e74c3c",
  lightBlue: "#96d5d0",
  darkBlue: "#2980b9",
  offWhite: "#fff2d9",
  grey: "#bdc3c7",
  darkGrey: "#7f8c8d",
  white: "#ffffff",
  black: "#393939",
  maxWidth: "1200px",
  drinkGreen: "#9ecd8c",
  foodGreen: "#8da95e",
  marketingBlue: "#88c2c9",
  waitressPurple: "#b492c3",
  pricePink: "#f7a38d"
};

const StyledPage = styled.div`
  background-color: ${props => props.theme.white};
  color: ${props => props.theme.black};
`;

const Inner = styled.div`
  max-width: ${props => props.theme.maxWidth};
  margin: 0 auto;
  padding: 2rem;
`;

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'sign_painter';
    src: url('/static/SignPainter_HouseSlant.ttf')
    format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'Roboto';
    src: url('/static/Roboto-Regular.ttf')
    format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  html {
    font-size: 10px;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
    line-height: 2;
    font-family: 'Roboto';
  }
  h1,
  .signPainter {
    font-family: 'sign_painter';
  }
`;

const Page = props => (
  <ThemeProvider theme={theme}>
    <StyledPage>
      <Header />
      <Inner>{props.children}</Inner>
    </StyledPage>
    <GlobalStyle />
  </ThemeProvider>
);

export default Page;
