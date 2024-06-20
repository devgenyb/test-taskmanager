import { IconButton, Menu, MenuItem } from "@mui/material";
import { MouseEvent, useState } from "react";
import { AccountCircle } from "@mui/icons-material";
import { useAppDispatch } from "@/app/store";
import { resetUser } from "@/app/store/slices/userSlice";
import { useLogoutMutation } from "@/app/rtk/endpointsApi/user";


export const UserMenu = () => {
	const dispatch = useAppDispatch();
	const [fetchLogout] = useLogoutMutation();

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);


	const handleMenu = (event: MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleLogout = () => {
		setAnchorEl(null);
		fetchLogout()
		dispatch(resetUser());
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleMenu}
				color="inherit"
			>
				<AccountCircle />
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				keepMounted
				transformOrigin={{
					vertical: "top",
					horizontal: "right",
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem onClick={handleLogout}>Выйти</MenuItem>
			</Menu>
		</>
	);
};
