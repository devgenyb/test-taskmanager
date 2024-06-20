import { TextField, TextFieldProps } from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";

type PropsType = {
	name: string;
	control: any;
	label: string;
	placeholder?: string;
	helper?: string;
} & TextFieldProps;

const RHFTextField: FC<PropsType> = ({ name, control, label, placeholder, helper='', ...props }) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => {
				const { onChange, value, ref } = field;
				return (
					<TextField
                        {...props}
						error={!!error}
						value={value}
						ref={ref}
						onChange={(e) => onChange(e.target.value)}
						label={label}
						variant="outlined"
						placeholder={placeholder ?? ""}
						fullWidth
						helperText={error ? error.message : helper}
					/>
				);
			}}
		/>
	);
};

export default RHFTextField;
