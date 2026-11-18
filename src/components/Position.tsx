import React, { useState, forwardRef, useImperativeHandle } from 'react';


type Props = {
  value: string;
  options: { value: string; label: string }[];
};


export interface PositionFieldHandle {
  getValue: () => string;
  getValidity: () => boolean;
}


const PositionField = forwardRef<PositionFieldHandle, Props>(({ value, options }, ref) => {

  const validate = (v: string) => v !== '';

  const initialValid = validate(value);

  const [state, setState] = useState({
    value,
    valid: initialValid,
    error: initialValid ? '' : 'Оберіть посаду',
  });

  const onChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const v = e.target.value;
    const ok = validate(v);

    setState({
      value: v,
      valid: ok,
      error: ok ? '' : 'Оберіть посаду',
    });
  };

  
  useImperativeHandle(ref, () => ({
    getValue: () => state.value,
    getValidity: () => state.valid,
  }));

  return (
    <div className="field">
      <label>Посада</label>

      <select name="position" value={state.value} onChange={onChange}>
        <option value="" disabled>
            -- Оберіть посаду --
        </option>

      {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
            </option>
        ))}
        </select>

        {!state.valid && <div className="error">{state.error}</div>}
      </div>
    );
  }
);

export default PositionField;