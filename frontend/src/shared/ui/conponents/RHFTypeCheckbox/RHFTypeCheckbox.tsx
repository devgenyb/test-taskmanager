import {
	Checkbox,
	CheckboxProps,
	FormControlLabel,
	Tooltip,
	Typography
} from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";

type PropsType = {
	name: string;
	control: any;
	label: string;
	item_id: number;
	is_active: boolean;
	tooltip_text: string;
} & CheckboxProps;

const RHFTypeCheckbox: FC<PropsType> = ({
	name,
	control,
	label,
	item_id,
	is_active,
	tooltip_text,
	...props
}) => {
	const DisactiveLabel = (
		<Tooltip title={tooltip_text} placement="right-start">
		<Typography sx={{ color: "#c0c0c0" }}>
			{label}
		</Typography>
		</Tooltip>
	);

	return (
		<Controller
			name={name}
			control={control}
			render={({ field }) => {
				const { onChange, value } = field;
				return (
					<FormControlLabel
						control={
							<Checkbox
								{...props}
								checked={value.includes(item_id)}
								onChange={(e) =>
									onChange(
										e.target.checked
											? [...value, item_id]
											: value.filter(
													(id: number) =>
														id !== item_id
											  )
									)
								}
							/>
						}
						label={
							is_active ? label : DisactiveLabel
						}
					/>
				);
			}}
		/>
	);
};

export default RHFTypeCheckbox;
