import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import DrawerHeader from "@/shared/ui/conponents/DrawerHeader";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/app/store";
import Header from "@/widgets/Header";

interface IProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: IProps) => {
	const navigate = useNavigate();

	const location = useLocation();

	const { user } = useAppSelector(state => state.user)

	useEffect(() => {
		if(!user) {
			navigate('/login');
		}
	}, [user])

	if (location.pathname === "/login") {
		return children;
	}

	return (
		<CssBaseline>
			<Box sx={{height: '100vh'}}>
				<Header/>
				<Box sx={{ display: "flex", height: '100%'}}>

					<Box component={"main"} sx={{ flexGrow: 1, p: 3 }}>
						<DrawerHeader />
						{children}
					</Box>
				</Box>
			</Box>
		</CssBaseline>
	);
};
