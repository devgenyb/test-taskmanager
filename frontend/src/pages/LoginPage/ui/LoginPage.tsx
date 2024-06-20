import { useNavigate } from "react-router-dom";

import {
	Avatar,
	Button,
	Card,
	CardActions,
	CircularProgress,
	CssBaseline,
	Typography
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";

import Box from "@mui/material/Box";
import { emailPattern } from "@/shared/constants/common";
import { toast } from "react-toastify";
import { UserType } from "@/shared/types/userType";
import { ResponseErrorType } from "@/shared/types/responseErrors";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/store/slices/userSlice";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "@/shared/ui/conponents/RHFTextField/RHFTextField";
import RHFOutlinedPassword from "@/shared/ui/conponents/RHFTOutlinedPassword/RHFTOutlinedInput";
import { useEffect } from "react";
import { useLoginMutation } from "@/app/rtk/endpointsApi/user";

const schema = yup.object().shape({
	email: yup
		.string()
		.required("Введите электронный адрес")
		.matches(emailPattern, "Введите корректный электронный адрес"),
	password: yup
		.string()
		.required("Введите пароль")
		.min(8, "Пароль не может быть менее 8 символов")
});

type LoginType = {
	email: string;
	password: string;
};

export const LoginPage = () => {
	const [fethcLogin, { isLoading }] = useLoginMutation();
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { control, handleSubmit } = useForm<LoginType>({
		mode: "onBlur",
		resolver: yupResolver(schema) as any,
		defaultValues: {
			email: "",
			password: ""
		}
	});

	useEffect(() => {
		const eventCallback = (e: KeyboardEvent) => {
			if (e.key !== "Enter") return;
			e.preventDefault();
			handleSubmit(handleLoginNew)();
		};
		window.addEventListener("keypress", eventCallback);
		return () => window.removeEventListener("keypress", eventCallback);
	}, []);

	const handleLoginNew = async (data: LoginType) => {
		try {
			const response: UserType = await fethcLogin(data).unwrap();
			dispatch(setUser(response));
			navigate("/");
		} catch (error) {
			const responseError = error as ResponseErrorType;
			toast.error(responseError.data?.message);
		}
	};

	return (
		<>
			<CssBaseline />
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					minHeight: "100vh",
					alignItems: "center",
					justifyContent: "flex-start",
					background: "#ccc"
				}}
			>
				<Card
					sx={{
						minWidth: 300,
						marginTop: "6em",
						background: "white"
					}}
				>
					<Box
						sx={{
							margin: "1em",
							display: "flex",
							justifyContent: "center"
						}}
					>
						<Avatar sx={{ bgcolor: "secondary.main" }}>
							<LockIcon />
						</Avatar>
					</Box>
					<Box
						sx={{
							marginTop: "1em",
							display: "flex",
							justifyContent: "center"
						}}
					></Box>

					<Box sx={{ padding: "0 1em 1em 1em" }}>
						<Box sx={{ marginBottom: 3 }}>
							<RHFTextField
								required
								name="email"
								control={control}
								label="email"
								placeholder="admin@admin.com"
								type="email"
							/>
						</Box>
						<Box>
							<RHFOutlinedPassword
								name="password"
								control={control}
								label="Пароль"
								placeholder="password"
							/>
						</Box>
					</Box>

					<CardActions sx={{ padding: "0 1em 1em 1em" }}>
						<Button
							variant="contained"
							type="submit"
							color="primary"
							disabled={isLoading}
							fullWidth
							// onClick={handleLogin}
							onClick={handleSubmit(handleLoginNew)}
						>
							{isLoading && (
								<CircularProgress size={25} thickness={2} />
							)}
							{"Войти"}
						</Button>
					</CardActions>
				</Card>
				<Typography sx={{fontSize: '1.5rem', mt: 3}}>
					Админ
				</Typography>
				<Typography sx={{fontSize: '1.3rem'}}>
					admin@admin.com
				</Typography>
				<Typography sx={{fontSize: '1.5rem'}}>
					Служащие
				</Typography>
				<Typography sx={{fontSize: '1.3rem'}}>
					employer1@test.com, employer2@test.com
				</Typography>
				<Typography sx={{fontSize: '1.3rem'}}>
					пароли для всех password
				</Typography>
			</Box>
		</>
	);
};
