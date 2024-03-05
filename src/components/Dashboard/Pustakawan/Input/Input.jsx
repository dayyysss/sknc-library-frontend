// input.jsx
import React, { useState } from 'react';
import './input.scss';

function Input({ label, onChange, type, errorMsg, placeholder, ...detail }) {
    const [focus, setFocus] = useState(false);

    const handleBlur = () => {
        setFocus(true);
    };

    return (
        <div className="input_component">
            <label>{label}</label>
            <input
                className="input_field"
                {...detail}
                onChange={onChange}
                onBlur={handleBlur}
                onFocus={() => detail.name === 'password' && setFocus(true)}
                focused={focus.toString()}
                type={type}
                placeholder={placeholder}
            />

            <span>{errorMsg}</span>
        </div>
    );
}

export default Input;
