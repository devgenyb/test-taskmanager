import { PaletteMode } from "@mui/material";

export const themeMode: PaletteMode = "light";


export let mainTheme = {
	palette: {
        mode: themeMode,
		
		primary: {
			main: "#0052cc",
		},
		secondary: {
			main: "#edf2ff",
		},
	},
};


export const getDesignTokens = (mode: PaletteMode) => ({
	palette: {
	  mode,
	  ...(mode === 'light'
		? {
			
		  }
		: {
			// palette values for dark mode

		  }),
	},
  })