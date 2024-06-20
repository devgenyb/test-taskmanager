import { FC, ReactNode } from "react";
import { ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from "@mui/material";

type PropsType = {
   text: string,
   open: boolean,
   onClick: () => void,
   icon: ReactNode,
   selected: boolean;
}



const NavbarItem: FC<PropsType> = ({text, open, onClick, icon, selected=false}) => {
	const theme = useTheme();
	return (
		<ListItem onClick={onClick} disablePadding sx={{ display: "block" }}>
			<ListItemButton
				selected={selected}
				sx={{
					minHeight: 48,
					justifyContent: open ? "initial" : "center",
					px: 2.5,
					'&.Mui-selected': {
						":hover": {
							backgroundColor: theme.palette.mode === 'dark' ? '#fff' : '#1976d2'
						},
						// background: '#1976d2',
						background: theme.palette.mode === 'dark' ? '#fff' : '#1976d2',
						color: theme.palette.mode === 'dark' ? '#000' : '#fff',
					}
				}}
			>
				<ListItemIcon
					
					sx={{
						color: selected ? ( theme.palette.mode === 'dark' ? '#000' : "#fff") :(theme.palette.mode === 'dark' ? '#fff' : "#000"),
						minWidth: 0,
						mr: open ? 3 : "auto",
						justifyContent: "center",
					}}
				>
					{icon}
				</ListItemIcon>
				<ListItemText
					primary={text}
					sx={{ opacity: open ? 1 : 0 }}
				/>
			</ListItemButton>
		</ListItem>
	);
};

export default NavbarItem;