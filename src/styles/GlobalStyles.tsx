"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`

    * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    }

    html {
        font-size: 100%; 
    }

    body {
        margin: 0;
        padding: 0;
        font-family: 'Inter','Roboto','Noto Sans KR', sans-serif;
        background-color: ${({ theme }) => theme.custom.color.background};
        color: ${({ theme }) => theme.custom.color.text};
        transition: background-color 0.3s ease, color 0.3s ease;
    }

    ul, li {
        list-style: none;
    }

    button {
        outline: none;
        border-style: solid;
        border-width: 0.063rem;
        border-radius: 0.375rem;
        cursor: pointer;
        padding: 0.5rem 1.125rem;
    }

    table {
        border-spacing: 0;
    }

`;

export default GlobalStyles;
