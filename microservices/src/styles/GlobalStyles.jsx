import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: Arial, sans-serif;
        background-color: #f5f5f5;
      }
      a {
        text-decoration: none;
        color: inherit;
      }
    `}
  />
);

export default GlobalStyles;
