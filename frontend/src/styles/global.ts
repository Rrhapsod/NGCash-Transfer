import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    //Firefox
    scrollbar-width: auto;
    scrollbar-color: ${({ theme }) => theme.COLORS.PINK} transparent;
}

//Chrome, Edge e Safari
*::-webkit-scrollbar {
    width: 8px;
}
*::-webkit-scrollbar-track {
    background: transparent;
}
*::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.COLORS.PINK};
    border-radius: 20px;
}

:root{
    font-size: 62.5%;
}

body{
    font-size: 1.6rem;
    background-color: ${({ theme }) => theme.COLORS.BACKGROUND_DARK};
    color: ${({ theme }) => theme.COLORS.WHITE};
}

body, input, button {
    font-family: "Roboto Slab", sans-serif;
}

a {
    text-decoration: none;
}

button, a {
    cursor: pointer;
    transition: filter 0.2s;
} 

button:hover, a:hover {
    filter: brightness(0.9);
}
`;
