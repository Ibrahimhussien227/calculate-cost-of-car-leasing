import React from "react";

const Input = ({
  label,
  name,
  value,
  handleValueChange,
  min,
  max,
  icon,
  error,
}) => {
  return (
    <>
      {" "}
      <label>
        <h5>{label}</h5>
        <div className="calculator__content">
          <input
            type="number"
            name={name}
            value={value}
            onChange={handleValueChange}
            required
          />
          <h2>{icon}</h2>
        </div>
        <input
          className="slider"
          type="range"
          name={name}
          min={min}
          max={max}
          value={value}
          onChange={handleValueChange}
          required
        />
        <br />
        <span>{error}</span>
      </label>
    </>
  );
};

export default Input;
