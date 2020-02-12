import Header from "./Header";
import styled, { ThemeProvider, injectGlobal } from "styled-components";

const theme = {
  darkRed: "#bf322d",
  red: "#e74c3c",
  lightBlue: "#96d5d0",
  offWhite: "#fff2d9",
  white: "#ffffff",
  black: "#393939",
  maxWidth: "1200px"
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

injectGlobal`
    @font-face {
        font-family: 'radnika_next';
        src: url('/static/radnikanext-medium-webfont.woff2')
        format('woff2');
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
        font-family: 'radnika_next';
    }
    a {
        color: ${theme.black};
        text-decoration: none;
    }
`;

const Page = props => (
  <ThemeProvider theme={theme}>
    <StyledPage>
      <Header />
      <Inner>{props.children}</Inner>
    </StyledPage>
  </ThemeProvider>
);

export default Page;
