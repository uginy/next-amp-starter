import * as _ from "lodash";
import { IFormFieldOptions, IFormsProps } from "./interface";
import { useStyles } from "./styles";
import { mapFormFields } from "./components";

const UniForms = ({ fields, model, layout, onModelChange }: IFormsProps) => {
  console.log(model);
  const classes = useStyles();
  const onChangeHandler = (el, val) => {
    _.set(model, el.id, val);
    onModelChange(model);
  };

  const findElement = (element) => fields.find((f) => f.id === element.id);

  const FormLayout = ({ layout }) => {
    return layout.map((it) => {
      return (
        <div className={classes.row}>
          {it.items.map((element) => {
            const el = findElement(element);
            return (
              <span style={{ width: `${100 / it.items.length}%` }}>
                {
                  mapFormFields({
                    id: el?.id,
                    label: el?.label,
                    type: el?.type,
                    defaultValue: el?.defaultValue || "",
                    value:
                      _.get(model, el?.id) ?? model[el.id] ?? el.defaultValue,
                    validator: el?.validator,
                    validation: el?.validation,
                    options: el?.options,
                    onChange: (val) => onChangeHandler(el, val),
                  }).component
                }
              </span>
            );
          })}
        </div>
      );
    });
  };
  return (
    fields.length && (
      <form className={classes.root} noValidate autoComplete="off">
        {/*<FormLayout layout={layout} />*/}
        {fields.map((el: IFormFieldOptions) => {
          return mapFormFields({
            id: el?.id,
            label: el?.label,
            type: el?.type,
            defaultValue: el?.defaultValue || "",
            value: _.get(model, el?.id) ?? el.defaultValue,
            validator: el?.validator,
            validation: el?.validation,
            options: el?.options,
            onChange: (val) => onChangeHandler(el, val),
          }).component;
        })}
      </form>
    )
  );
};

export default UniForms;
