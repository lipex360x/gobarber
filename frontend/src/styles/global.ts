import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus{
    outline:0;
  }

  body{
    background: #312e38;
    color: #fff;
    -webkit-font-smoothing: antialiased;
  }

  html, body, #root {
    height: 100%
  }

  body, input, button {
    font: 16px 'Roboto Slab', serif;
  }

  a{
    text-decoration: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  ol, ul {
    list-style: none;
  }

  h1, h2, h3, h4, h5, h6, strong {
    font-weight: 500;
  }

  button{
    cursor: pointer;
    background: 0;
    border: none;
  }
`
