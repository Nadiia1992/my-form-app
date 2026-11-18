import React, { useState, forwardRef, useImperativeHandle } from 'react';

type Props = { value: string; };

export interface PasswordFieldHandle {
  getValue: () => string;
  getValidity: () => boolean;
}

const PasswordField = forwardRef<PasswordFieldHandle, Props>(({ value }, ref) => {

  const [state, setState] = useState({
    password: value,
    passwordConfirm: '',
    valid: false,
    error: '',
    confirmError: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const v = e.target.value;

    const password = name === 'password' ? v : state.password;
    const passwordConfirm = name === 'passwordConfirm' ? v : state.passwordConfirm;

    const passwordValid = password.length >= 3 && password.length <= 10;
    const confirmValid = password === passwordConfirm;


    setState({
      password: password,
      passwordConfirm: passwordConfirm,
      valid: passwordValid && confirmValid,
      error: passwordValid ? '' : 'Довжина пароля має бути від 3 до 10 символів',
      confirmError : !passwordConfirm ? '' : confirmValid ? '' : 'Паролі не збігаються',
    });
  };

  
  useImperativeHandle(ref, () => ({
    getValue: () => state.password,
    getValidity: () => state.valid,
  }));

  return (
    <div className="field">
      <label>Пароль</label>
      <input
        type="password"
        name="password"
        value={state.password}
        onChange={onChange}
        className={state.password.length >= 6 ? 'valid' : 'invalid'}
      />
      {state.error && <div className="error">{state.error}</div>}

      <label>Підтвердження</label>
      <input
        type="password"
        name="passwordConfirm"
        value={state.passwordConfirm}
        onChange={onChange}
        className={state.passwordConfirm.length > 0 && state.password === state.passwordConfirm ? 'valid' : 'invalid'
      }
      />
      {state.confirmError && (<div className="error">{state.confirmError}</div>)}

    </div>
  );
});

export default PasswordField;