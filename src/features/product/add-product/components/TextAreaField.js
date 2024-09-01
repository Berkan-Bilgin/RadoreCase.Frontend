import React from 'react';

const TextAreaField = ({ label, name, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={name}>{label}</label>
      <textarea id={name} name={name} value={value} onChange={onChange} className="form-control" />
    </div>
  );
};

export default TextAreaField;
