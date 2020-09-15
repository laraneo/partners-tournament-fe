import React, { FunctionComponent } from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";

const email = {
  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  message: "Correo invalido"
}

const numbers = {
  value: new RegExp('^[0-9.]+$'),
  message: "Solo numeros"
}

const rifCi = {
  value: new RegExp(/[ABCDFGHIJKLMNOPQRSTUVWXYZ][0-9]./),
  message: "Formato: V10065168"
}

function getPattern(type: string) {
  switch (type) {
    case 'email':
      return email;
    case 'number':
      return numbers;
    case 'rif-ci':
      return rifCi;
    default:
      return {};
  }
}

type CustomTextFieldProps = {
  placeholder: string;
  field: string;
  required?: boolean;
  register: Function;
  errorsField?: any;
  errorsMessageField?: any;
  type?: string;
  disable?: boolean;
  maxLength?: number;
  inputType?: string;
  Icon?: React.ReactType;
  multiline?: boolean;
  autoFocus?: boolean;
  label?: string;
};

const CustomTextField: FunctionComponent<CustomTextFieldProps> = ({
  placeholder,
  field,
  required = false,
  register,
  errorsField,
  errorsMessageField,
  type = 'text',
  disable = false,
  maxLength = 150,
  inputType,
  Icon,
  multiline = false,
  autoFocus = false,
  label
}) => (
    <TextField
      rows={multiline ? "4" : ""}
      multiline={multiline}
      label={label ? label : placeholder}
      disabled={disable}
      size="small"
      margin="dense"
      fullWidth
      autoFocus={autoFocus}
      placeholder={multiline ? '' : placeholder}
      name={field}
      type={type}
      inputProps={{
        maxLength
      }}
      inputRef={register({
        required: required ? "Required" : false,
        pattern: inputType ? getPattern(inputType) : null
      })}
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        startAdornment: Icon ? (
          <InputAdornment position="start">
            <Icon />
          </InputAdornment>
        ) : null
      }}
      required={errorsField ? true : false}
      error={errorsField ? true : false}
      helperText={errorsField && errorsMessageField}
    />
  );


export default CustomTextField;