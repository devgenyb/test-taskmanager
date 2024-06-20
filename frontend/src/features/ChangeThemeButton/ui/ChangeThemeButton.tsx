import { IconButton } from "@mui/material"
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from "@emotion/react";
import { useContext } from "react";
import { ColorModeContext } from "@/app/themes/MuiThemeProvider";

export const ChangeThemeButton = () => {

    const theme: any = useTheme();
	const colorMode = useContext(ColorModeContext);

    return (
        <IconButton
        sx={{ ml: 1 }}
        onClick={colorMode.toggleColorMode}
        color="inherit"
    >
        {theme.palette.mode === "dark" ? (
            <Brightness7Icon />
        ) : (
            <Brightness4Icon />
        )}
    </IconButton>
    )
}