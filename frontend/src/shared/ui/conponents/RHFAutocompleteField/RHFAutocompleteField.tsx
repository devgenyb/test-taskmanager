import {
	Autocomplete,
	AutocompleteChangeReason,
	InputProps,
	TextField
} from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";

type PropsType = {
	name: string;
	control: any;
	options: Array<any>;
	label: string;
	helper?: string;
	inputProps?: InputProps;
	getOptionLabel?: (value: any) => any;
	onChangeHandler?: (value: any, reason: AutocompleteChangeReason) => void;
	onInputChangeHandler?: (event: React.SyntheticEvent<Element, Event>) => void;
	filterOptions?: (otions: any) => any;
	setOptionValue?: (otion: any) => any;
};

const RHFAutocompleteField: FC<PropsType> = ({
	name,
	control,
	label,
	getOptionLabel,
	options,
	onChangeHandler,
	helper,
	inputProps,
	onInputChangeHandler,
	filterOptions,
	setOptionValue,
	...props
}) => {
	return (
		<Controller
			name={name}
			control={control}
			render={({ field, fieldState: { error } }) => {
				const { onChange, value, ref } = field;

				return (
					<Autocomplete
						{...props}
						filterOptions={filterOptions ? filterOptions : undefined}
						disablePortal
						onInputChange={(e) => onInputChangeHandler && onInputChangeHandler(e)}
						fullWidth
						getOptionLabel={
							getOptionLabel
								? (value) => getOptionLabel(value)
								: (value) => value.label
						}
						options={options}
						value={value}
						onChange={(
							_: unknown,
							value: any | null,
							reason: AutocompleteChangeReason
						) => {
							onChangeHandler && onChangeHandler(value, reason);
							onChange(
								reason === "selectOption" && value
									? (setOptionValue ? setOptionValue(value) : value)
									: null
							);
						}}
						isOptionEqualToValue={(option: any, value: any) =>
							option.id === value.id
						}
						renderInput={(params) => (
							<TextField
								{...params}
								InputProps={{
									...params.InputProps,
									...inputProps,
								}}
								inputRef={ref}
								error={!!error}
								required
								label={label}
								helperText={error ? error.message : helper}
							/>
						)}
					/>
				);
			}}
		/>
	);
};

export default RHFAutocompleteField;
