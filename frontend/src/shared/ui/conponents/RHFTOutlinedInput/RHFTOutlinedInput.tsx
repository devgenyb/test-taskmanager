import { OutlinedInput, OutlinedInputProps } from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";

type PropsType = {
	name: string;
	control: any;
	label: string;
	placeholder?: string;
} & OutlinedInputProps;

const RHFOutlinedInput: FC<PropsType> = ({ name, control, label, placeholder, ...props }) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => {
				const { onChange, value, ref } = field;
				return (
					<OutlinedInput
                        {...props}
						error={!!error}
						value={value}
						ref={ref}
						onChange={(e) => onChange(e.target.value)}
						label={label}
						placeholder={placeholder ?? ""}
						fullWidth
					/>
				);
			}}
		/>
	);
};

export default RHFOutlinedInput;
