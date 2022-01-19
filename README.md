<h1 align="center" style="color: #ffa07a">
    <img src="https://joi.dev/img/joiLogo.jpg" height="30px" width="30px" alt="logo">
    Realjoi
</h1>
<h3 align="center" style="color: #0080ff"> React hooks library for realtime form validation</h3>
  
## Features

1. Easy to use !
2. Realtime form validation with popular [Joi](https://www.npmjs.com/package/joi) schema based validation
3. Based on React Hooks
4. Typescript support

## Installation

```bash
$ npm i @nahidchowdhury/realjoi
```

```bash
$ yarn add @nahidchowdhury/realjoi
```

## Hooks
* ### useFormValidation 
    Object based form state validation hooks
    * params:
        * Schema - Joi validation schema
        * State - Object of state for form
        * Options - Joi validation options
    * returns:
        * ok - Boolean status for validation succeeded or failed
        * errors - Object of validation messages as per state keys, Default: undefined

* ### useFormValidationAsync
    Object based form state validation hooks asynchronous
    * params:
        * Schema - Joi validation schema
        * State - Object of state for form
        * Options - Joi validation options
    * returns:
        * ok - Boolean status for validation succeeded or failed
        * errors - Object of validation messages as per state keys, Default: undefined
* ### useValidation
    Single value state validation hooks
    * params:
        * Schema - Joi validation schema
        * State - single value state
        * Options - Joi validation options
    * returns:
        * ok - Boolean status for validation succeeded or failed
        * error - Error message, Default: undefined

## Code Example

```js
import { useState } from 'react'
import Joi from 'joi';
import { useFormValidationAsync, useFormValidation } from '@nahidchowdhury/realjoi';

function Test() { 
  // define state for form
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    mobile: ''
  });

  // Joi validation schema for corresponding state 
  const schema = Joi.object({
    name: Joi.string().min(3),
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
    mobile: Joi.string().min(3)
  });
  
  /*
  * passing the schema and state in validation hooks
  * use useFormValidation for sync mode 
  * Or use useFormValidationAsync for async mode (suitable for large number of attributes)
  * boolean ok state is useful for submit button activation
  * errors are joi validation messages
  */
  const {ok, errors} = useFormValidationAsync(schema, formState, {
    abortEarly: true
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if(ok) {
      // proceed forward if ok is true
      console.log(formState);
    }
  }

  const onFormChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  }

  return (
    <>
      <div>
        <form onChange={onFormChange} onSubmit={handleSubmit}>
          <div >
            <label>Name</label>
            <input type="text" name="name"></input>
            <label style={{ color: "red" }}>{errors['name']}</label>
          </div>
          <div>
            <label>Email</label>
            <input type="text" name="email"></input>
            <label style={{ color: "red" }}>{errors['email']}</label>
          </div>
          <div>
            <label>Mobile</label>
            <input type="text" name="mobile"></input>
            <label style={{ color: "red" }}>{errors['mobile']}</label>
          </div>
          <div>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Test;
```

## Stay in touch

- Author - [Nahid Chowdhury](https://bd.linkedin.com/in/nahid-chowdhury)


## License

Realjoi is [MIT licensed](LICENSE).
