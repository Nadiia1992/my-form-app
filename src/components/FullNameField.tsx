import React, { useState, forwardRef, useImperativeHandle } from 'react';

type Props = { value: string };

export interface FullNameFieldHandle {
  getValue: () => string;
  getValidity: () => boolean;
}


const FullNameField = forwardRef<FullNameFieldHandle, Props>(({ value }, ref) => {
  const validate = (v: string) => v.trim().length >= 10;

  const initialValid = validate(value);
  const [state, setState] = useState({
    value,
    valid: initialValid,
    error: initialValid ? '' : 'ПІБ має містити щонайменше 10 символів',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    const ok = validate(v);
    setState({
      value: v,
      valid: ok,
      error: ok ? '' : 'ПІБ має містити щонайменше 10 символів',
    });
  };


  useImperativeHandle(ref, () => ({
    getValue: () => state.value,
    getValidity: () => state.valid,
  }));

  return (
    <div className="field">
      <label>ПІБ</label>
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

export default FullNameField;