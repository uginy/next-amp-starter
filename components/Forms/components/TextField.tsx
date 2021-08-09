import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import {
	FilledInput,
	FormControl,
	FormHelperText,
	InputLabel

} from "@material-ui/core";

type TextProps = {
	id: string;
	defaultValue?: string | number;
	value?: string | number;
	onChange?: (key: string) => void;
	label?: string;
	error?: { isError?: boolean; errorMessage?: string };
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			"& > *": {
				margin: theme.spacing(1)
			}
		}
	})
);

const TextField = ({ defaultValue, id, onChange, label, error }: TextProps) => {
	const classes = useStyles();
	const [val, setVal] = useState("");

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		onChange(event.target.value);
		setVal(event.target.value);
	};

	return (
		<FormControl variant="filled" error={error.isError} className={classes.root}>
			<InputLabel htmlFor={id}>{label || "Label"}</InputLabel>
			<FilledInput id={id} value={val !== "" ? val : defaultValue} onChange={handleChange} />
			{error.isError && <FormHelperText id={`${id}-error`}>{error.errorMessage}</FormHelperText>}
		</FormControl>
	);
};

export default TextField;
