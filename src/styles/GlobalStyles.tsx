"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    * {
    margin: 0;
    padding: 0;
    }

    body {
        margin: 0;
        padding: 0;
        font-family: 'Roboto', sans-serif;
        background-color: ${({ theme }) => theme.bg};
        color: ${({ theme }) => theme.fontColor};
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    ul, li {
        list-style: none;
    }

    button {
        outline: none;
        border-style: solid;
        border-width: 1px;
        border-radius: 6px;
        cursor: pointer;
    }

`;

export default GlobalStyles;
