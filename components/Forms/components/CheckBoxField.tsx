import React, { useState } from "react";
import {
	Checkbox,
	FormControlLabel,
} from "@material-ui/core";

type TextProps = {
	id: string;
	defaultValue?: string | number | boolean;
	value?: string | number | boolean;
	onChange?: (key: any) => void;
	label?: string;
	error?: { isError?: boolean; errorMessage?: string };
}

const CheckboxField = ({ defaultValue, id, onChange, label }: TextProps) => {
	const [val, setVal] = useState(defaultValue);
	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.checked);
		setVal(event.target.checked);
	};

	return (
		<FormControlLabel
			control={
				<Checkbox
					id={id}
					checked={!!val || !!defaultValue}
					onChange={handleChange}
					name={label}
					color="primary"
				/>
			}
			label={label}
		/>
	);
};

export default CheckboxField;
