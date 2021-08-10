import { IFormFieldOptions, IValidation } from "./interface";

export const validationMethods: IValidation[] = [
  {
    title: "required",
    expression: (field: IFormFieldOptions) => !!!field.value,
    message: (field: IFormFieldOptions) => `${field.label} is required`,
  },
  {
    title: "minLength",
    expression: (field: IFormFieldOptions) =>
      field.value.length < field?.properties?.minLength,
    message: (field: IFormFieldOptions) =>
      `${field.label} is lower than ${field?.properties?.minLength}`,
  },
  {
    title: "maxLength",
    expression: (field: IFormFieldOptions) =>
      field.value.length > field?.properties?.minLength,
    message: (field: IFormFieldOptions) =>
      `${field.label} is more than ${field?.properties?.minLength}`,
  },
];

export const checkProperty = (title: string) =>
  validationMethods.find((el: IValidation) => el.title === title) || null;
