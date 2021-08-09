import * as _ from "lodash";
import { IFormsProps } from "./interface";
import { useStyles } from "./styles";
import { mapFormFields } from "./components";

const UniForms = ({ fields, model, layout, onModelChange }: IFormsProps) => {
  const classes = useStyles();
  const onChangeHandler = (el, val) => {
    _.set(model, el.id, val);
    onModelChange(model);
  };

  const findElement = (element) => fields.find((f) => f.id === element.id);

  return (
    model && (
      <form className={classes.root} noValidate autoComplete="off">
        <pre>{JSON.stringify(model, null, 4)}</pre>
        {layout.map((it, index) => {
          return (
            <>
              {it?.title && <h4 className={classes.title}>{it.title}</h4>}
              <div className={classes.row} key={index}>
                {it.items.map((element, i) => {
                  const el = findElement(element);
                  return (
                    <span
                      key={i}
                      style={{ width: `${100 / it.items.length}%` }}
                    >
                      {
                        mapFormFields({
                          id: el?.id,
                          label: el?.label,
                          type: el?.type,
                          defaultValue: el?.defaultValue || "",
                          value: _.get(model, el?.id) ?? el?.defaultValue,
                          validator: el?.validator,
                          validation: el?.validation,
                          options: el?.options,
                          onChange: (val) => onChangeHandler(el, val),
                        })?.component
                      }
                    </span>
                  );
                })}
              </div>
            </>
          );
        })}
      </form>
    )
  );
};

export default UniForms;
