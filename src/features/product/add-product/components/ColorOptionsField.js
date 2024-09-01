import React from 'react';

const ColorOptionsField = ({ colorOptions, onChange }) => {
  const handleColorChange = (index, event) => {
    const newColorOptions = [...colorOptions];
    newColorOptions[index].value = event.target.value;
    onChange(newColorOptions);
  };

  return (
    <div className="form-group">
      <label>Color Options</label>
      {colorOptions.map((option, index) => (
        <input
          key={index}
          type="text"
          value={option.value}
          onChange={(e) => handleColorChange(index, e)}
          className="form-control"
        />
      ))}
    </div>
  );
};

export default ColorOptionsField;
