import React from "react";

interface InputProps {
  id?: string;
  name?: string;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  checked?: boolean;
  required?: boolean
}


const Input: React.FC<InputProps> = ({
  id,
  name,
  type,
  value,
  onChange,
  placeholder,
  className,
  checked,
}) => {
  return (
    <input
      id={id}
      name={name}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={className}
      checked={checked}
    />
  );
};

export default Input;
