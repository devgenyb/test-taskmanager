import { keyframes } from "@emotion/react";
import { Theme, styled } from "@mui/material";

const rotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

type PropsType = {
    theme?: Theme,
    size: number,
    borderWdth: number,
}

export const Loader = styled("div")((props: PropsType) => ({
    width: props.size,
    height: props.size,
    border: `${props.borderWdth}px solid ${props.theme!.palette.text.primary}`,
    borderBottomColor: 'transparent',
    borderRadius: '50%',
    display: 'inline-block',
    boxSizing: 'border-box',
    animation: `${rotate} 1s linear infinite`
    
}));
