import React, { useState, forwardRef, useImperativeHandle } from 'react';


type Props = {
  value: string;
  options: { value: string; label: string }[];
};


export interface SpecializationFieldHandle {
  getValue: () => string;
  getValidity: () => boolean;
}


const SpecializationField = forwardRef<SpecializationFieldHandle, Props>(({ value, options }, ref) => {

  const validate = (v: string) => v !== '';

  const initialValid = validate(value);

  const [state, setState] = useState({
    value,
    valid: initialValid,
    error: initialValid ? '' : 'Оберіть спеціалізацію',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    const ok = validate(v);

    setState({
      value: v,
      valid: ok,
      error: ok ? '' : 'Оберіть спеціалізацію',
    });
  };

  
  useImperativeHandle(ref, () => ({
    getValue: () => state.value,
    getValidity: () => state.valid,
  }));

  return (
    <div className="field">
      <label>Спеціалізація</label>

      {options.map((option) => (
          <label key={option.value}>
            <input
              type="radio"
              name="specialization"
              value={option.value}
              checked={state.value === option.value}
              onChange={onChange}
            />
            {option.label}
          </label>
        ))}

        {!state.valid && <div className="error">{state.error}</div>}
      </div>
    );
  }
);

export default SpecializationField;