export interface IFormFieldOptions {
  type?: string;
  subType?: string;
  label: string;
  id: string;
  defaultValue?: any;
  value?: any;
  properties?: { [key: string]: any };
  onChange?: (key?: string) => void;
  error?: string;
  validation?: IValidation[];
  options?: { key: string; value: string; selected?: boolean }[];
  checked?: boolean;
  fieldGroup?: IFormFieldOptions[];
}

export interface IFormsProps {
  fields: IFormFieldOptions[];
  model: { [key: string]: any };
  layout: IFormLayout[];
  onModelChange: (modelKeys: any) => void;
}

export interface IFormLayout {
  title?: string;
  className?: string;
  items: { id: string; className?: string }[];
}

export interface IValidation {
  title: string;
  expression: (field: IFormFieldOptions) => boolean;
  message: (field: IFormFieldOptions) => string;
}
