import React, { useState, forwardRef, useImperativeHandle } from 'react';

type Props = { value: string };

export interface GenderFieldHandle {
  getValue: () => string;
  getValidity: () => boolean;
}


const GenderField = forwardRef<GenderFieldHandle, Props>(({ value }, ref) => {

  const validate = (v: string) => v != '';

  const initialValid = validate(value);

  const [state, setState] = useState({
    value,
    valid: initialValid,
    error: initialValid ? '' : 'Оберіть стать',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    const ok = validate(v);

    setState({
      value: v,
      valid: ok,
      error: ok ? '' : 'Оберіть стать',
    });
  };

  
  useImperativeHandle(ref, () => ({
    getValue: () => state.value,
    getValidity: () => state.valid,
  }));

  return (
    <div className="field">
      <label>Стать</label>

      <label>
        <input
          type="radio"
          name="gender"
          value="male"
          checked={state.value === 'male'}
          onChange={onChange}
        />
        Чоловіча
      </label>

      <label>
        <input
          type="radio"
          name="gender"
          value="female"
          checked={state.value === 'female'}
          onChange={onChange}
        />
        Жіноча
      </label>

      {!state.valid && <div className="error">{state.error}</div>}
    </div>
  );
});

export default GenderField;