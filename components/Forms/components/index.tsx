import { IFormFieldOptions, IValidation } from "../interface";
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
      isError:
        formField?.validation?.findIndex((el: IValidation) =>
          el.expression(formField)
        ) > -1,
      errorMessage:
        formField?.validation
          ?.find((el: IValidation) => el.expression(formField))
          ?.message(formField) || "",
    },
    options: formField?.options || [],
  };

  return {
    text: { component: <TextField {...fieldProps} /> },
    checkbox: { component: <CheckboxField {...fieldProps} /> },
    select: { component: <SelectField {...fieldProps} /> },
  }[formField.type];
};
