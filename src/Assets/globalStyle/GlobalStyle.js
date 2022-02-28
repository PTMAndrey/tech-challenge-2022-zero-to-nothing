import { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    scrollbar-width: thin;
    scrollbar-color: rgb(185, 185, 185) transparent;
  }
  
  body {
    font-family: 'Open Sans', sans-serif;
    overflow-x: hidden;
  }


  /* Scrollbar Syling */
  *::-webkit-scrollbar {
    width: 5px;
  }
  *::-webkit-scrollbar-track {
    background: transparent;
  }
  *::-webkit-scrollbar-thumb {
    background: rgb(185, 185, 185);
    border-radius: 20px;
    border: transparent;
  }
`;
