import { FormControlLabel, Switch, SwitchProps } from "@mui/material";
import { FC } from "react";
import { Controller } from "react-hook-form";

type PropsType = {
	name: string;
	control: any;
	label: string;
} & SwitchProps;


const RHFSwitcher: FC<PropsType> = ({ name, control, label, ...props }) => {

    return (
        <Controller
        control={control}
        name={name}
        render={({ field }) => {
            const { onChange, value, ref } = field;
            return <FormControlLabel
                sx={{ margin: "10px 0"}}
                control={
                    <Switch
                        {...props}
                        inputRef={ref}
                        checked={!!value}
                        onChange={(e) =>
                            onChange(e.target.checked)
                        }
                    />
                }
                label={label}
            />
        }}
    />
    )
}

export default RHFSwitcher;