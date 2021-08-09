import { IFormFieldOptions } from "../interface";
import { validationMethods } from "../validation";
import TextField from "./TextField";
import CheckboxField from "./CheckBoxField";
import SelectField from "./SelectField";

export const mapFormFields = (formField: IFormFieldOptions) => {
	const fieldProps = {
		key: formField.id,
		id: formField.id,
		label: formField.label,
		onChange: formField.onChange,
		defaultValue: formField.value || formField.defaultValue,
		error: {
			isError: validationMethods.validator.required(formField.value) || false,
			errorMessage: validationMethods.validation.required(formField.label) || ""
		},
		options: formField?.options || []
	};

	return {
		text: { component: <TextField {...fieldProps} /> },
		checkbox: { component: <CheckboxField {...fieldProps} /> },
		select: { component: <SelectField {...fieldProps} /> }
	}[formField.type];
};
