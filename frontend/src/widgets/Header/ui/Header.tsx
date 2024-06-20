import {
	Box,
	Toolbar,
	Typography,
	styled,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { FC } from "react";
import { mainDrawerWidth } from "@/shared/constants/layouts";
import ChangeThemeButton from "@/features/ChangeThemeButton";
import UserMenu from "@/features/UserMenu";

interface AppBarProps extends MuiAppBarProps {
	open?: boolean;
}

const AppBar = styled(MuiAppBar, {
	shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(["width", "margin"], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen,
	}),
	...(open && {
		marginLeft: mainDrawerWidth,
		width: `calc(100% - ${mainDrawerWidth}px)`,
		transition: theme.transitions.create(["width", "margin"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen,
		}),
	}),
}));

type PropsType = {

};

export const Header: FC<PropsType> = () => {


	return (
		<AppBar position="fixed">
			<Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
				<Box sx={{ display: "flex", alignItems: "center" }}>
					<Typography variant="h6" noWrap component="div">
						Тестовый таск менеджер
					</Typography>
				</Box>
				<Box>
					<ChangeThemeButton />
					<UserMenu />
				</Box>
			</Toolbar>
		</AppBar>
	);
};
