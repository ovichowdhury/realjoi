import Joi from "joi";
import { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';

// validation result interface
export interface ValidationResult {
  ok: boolean;
  error: Object
}

export function useValidation(schema: Joi.Schema, state: any, options: Joi.ValidationOptions = {}): ValidationResult {
  // flag for preventing validation trigger in first render 
  const isFirst = useRef(true);
  // boolean status true for valid data false for any kind of validaiton error
  const [ok, setOk] = useState(false);

  let [error, setError] = useState("");

  // effect for validation on state change
  useEffect(() => {
    // condition check for detecting first render
    if (!isFirst.current) {
      error = ""
      // validate using joi
      const { error: joiError } = schema.validate(state, options);
      // set ok state
      if (joiError) setOk(false);
      else setOk(true);
      // add error messages by parsing joi validation error
      if (joiError) error = joiError.details[0].message;
      setError(error);

    }
    // during first render make isFirst False
    else isFirst.current = false;

  }, [state]);

  return { ok, error };

}


useValidation.propTypes = {
  schema: PropTypes.object.isRequired,
  state: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.number,
    PropTypes.bool,
    PropTypes.string,
    PropTypes.symbol
  ]),
  options: PropTypes.object.isRequired
}