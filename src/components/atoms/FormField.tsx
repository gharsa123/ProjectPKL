import React from "react";
import Input from "./Input";

interface FormFieldProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  LabelclassName?: string;
  InputclassName?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  LabelclassName,
  InputclassName,
  children,
}) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className={LabelclassName}>
        {children}
      </label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={InputclassName}
      />
    </div>
  );
};

export default FormField;
