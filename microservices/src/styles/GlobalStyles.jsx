import { Global, css } from "@emotion/react";

const GlobalStyles = () => (
  <Global
    styles={css`
      @import url("https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&display=swap");
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      body {
        font-family: "Roboto";
        background-color: #eaeaf1;
      }
      a {
        text-decoration: none;
        color: inherit;
      }
      &::-webkit-scrollbar {
        width: 3px;
      }

      &::-webkit-scrollbar-track {
        background: transparent;
      }

      &::-webkit-scrollbar-thumb {
        background-color: #888;
        border-radius: 10px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background-color: #555;
      }
    `}
  />
);

export default GlobalStyles;
