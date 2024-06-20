import {
	FormControl,
	FormHelperText,
	IconButton,
	InputAdornment,
	InputLabel,
	OutlinedInput,
	OutlinedInputProps
} from "@mui/material";
import { FC, useState } from "react";
import { Controller } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";

type PropsType = {
	name: string;
	control: any;
	label: string;
	placeholder?: string;
} & OutlinedInputProps;

const RHFOutlinedPassword: FC<PropsType> = ({
	name,
	control,
	label,
	placeholder,
	...props
}) => {
	const [showPassword, setShowPassword] = useState(false);

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => {
				const { onChange, value, ref } = field;
				return (
					<FormControl
						required
						variant="outlined"
						sx={{ width: "100%" }}
						error={!!error}
					>
						<InputLabel htmlFor={label}>{label}</InputLabel>
						<OutlinedInput
							{...props}
							id={label}
							error={!!error}
							value={value}
							ref={ref}
							onChange={(e) => onChange(e.target.value)}
							label={label}
							type={showPassword ? "text" : "password"}
							endAdornment={
								<InputAdornment position="end">
									<IconButton
										aria-label="toggle password visibility"
										onClick={handleClickShowPassword}
										onMouseDown={handleMouseDownPassword}
										edge="end"
									>
										{showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							}
						/>
						<FormHelperText>{error?.message}</FormHelperText>
					</FormControl>
				);
			}}
		/>
	);
};

export default RHFOutlinedPassword;
