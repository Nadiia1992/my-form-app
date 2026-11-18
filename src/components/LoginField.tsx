import React, { useState, forwardRef, useImperativeHandle } from 'react';

type Props = { value: string; };

export interface LoginFieldHandle {
  getValue: () => string;
  getValidity: () => boolean;
}


const LoginField = forwardRef<LoginFieldHandle, Props>(({ value }, ref) => {
  const validate = (v: string) => v.trim().length >= 3;

  const initialValid = validate(value);
  const [state, setState] = useState({
    value,
    valid: initialValid,
    error: initialValid ? '' : 'Логін має містити щонайменше 3 символи',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    const ok = validate(v);
    setState({
      value: v,
      valid: ok,
      error: ok ? '' : 'Логін має містити щонайменше 3 символи',
    });
  };

  
  useImperativeHandle(ref, () => ({
    getValue: () => state.value,
    getValidity: () => state.valid,
  }));

  return (
    <div className="field">
      <label>Логін</label>
      <input
        type="text"
        value={state.value}
        onChange={onChange}
        className={state.valid ? 'valid' : 'invalid'}
      />
      {!state.valid && <div className="error">{state.error}</div>}
    </div>
  );
});

export default LoginField;