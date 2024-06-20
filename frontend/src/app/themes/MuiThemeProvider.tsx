import { FC, PropsWithChildren, createContext, useMemo } from "react";
import { getDesignTokens } from ".";
import { ThemeProvider, createTheme } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../store";
import { toggleMode } from "../store/slices/themeModeSlice";

export const ColorModeContext = createContext({ toggleColorMode: () => {} });

const MuiThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	const dispatch = useAppDispatch();
	const mode = useAppSelector((state) => state.themeMode.mode);

	const colorMode = useMemo(
		() => ({
			toggleColorMode: () => {
				dispatch(toggleMode());
			},
		}),
		[]
	);

	const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

	return (
		<ColorModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>{children}</ThemeProvider>
		</ColorModeContext.Provider>
	);
};

export default MuiThemeProvider;
