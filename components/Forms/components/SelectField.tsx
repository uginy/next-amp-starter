import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import { FormControl, InputLabel, MenuItem, Select } from "@material-ui/core";

type Props = {
  id: string;
  defaultValue?: string | number;
  value?: string | number;
  onChange?: (key: string) => void;
  label?: string;
  error?: { isError?: boolean; errorMessage?: string };
  options?: { key: string; value: string; selected?: boolean }[];
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      "& > *": {
        margin: theme.spacing(0),
      },
    },
    formControl: {
      padding: theme.spacing(1),
      margin: theme.spacing(0),
      "& label": {
        padding: theme.spacing(1),
      },
    },
    selectEmpty: {
      marginTop: theme.spacing(1),
    },
  })
);

const SelectField = ({ defaultValue, id, onChange, label, options }: Props) => {
  const classes = useStyles();
  const [val, setVal] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.value);
    setVal(event.target.value);
  };

  return (
    <FormControl variant="filled" className={classes.formControl}>
      <InputLabel id={id}>{label}</InputLabel>
      <Select
        labelId={id + "-label"}
        id={id}
        value={val !== "" ? val : defaultValue}
        onChange={handleChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options?.map((el) => (
          <MenuItem key={el.key} value={el.value}>
            {el.key}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectField;
