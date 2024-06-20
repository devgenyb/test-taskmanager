import { useMemo, useState } from "react";
import { mainTheme, themeMode } from "../../app/themes";
import { createTheme } from "@mui/material";

const useAppTheme = () => {
	const [mode, setMode] = useState<"light" | "dark">(themeMode);
	const toggleThemeMode = () =>{
        
		setMode((prev) => (prev === "light" ? "dark" : "light"))
    };
	const modifielTheme = useMemo(
		() =>
			createTheme({
				...mainTheme,
				palette: {
                    ...mainTheme.palette,
					mode,
				},
			}),
		[mode]
	);

	return {
		theme: modifielTheme,
		mode,
		toggleThemeMode,
	};
};

export default useAppTheme;
