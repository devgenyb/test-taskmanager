import { FormControl, FormHelperText, InputLabel, Select } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { Controller } from "react-hook-form";

type PropsType = {
	name: string;
	control: any;
	label: string;
} & PropsWithChildren;

const RHFSelect: FC<PropsType> = ({
	name,
	control,
	label,
	children,
	...props
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => {
				const { onChange, value, ref } = field;
				return (
					<FormControl required error={!!error} fullWidth>
						<InputLabel id={name + label}>{label}</InputLabel>
						<Select
							{...props}
							label={label}
							labelId={name + label}
							value={value}
							ref={ref}
							onChange={(e) => onChange(e.target.value)}
							fullWidth
						>
							{children}
						</Select>
						<FormHelperText>
							{error && error.message}
						</FormHelperText>
					</FormControl>
				);
			}}
		/>
	);
};

export default RHFSelect;
