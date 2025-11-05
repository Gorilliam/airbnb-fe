"use client";

import { InputHTMLAttributes } from "react";

type InputWLabelProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  labelClassname?: string;
};

export default function InputWLabel({
  type,
  value,
  required,
  onChange,
  label,
  className = "",
  labelClassname = "",
  ...props
}: InputWLabelProps) {
  const labelClasses =
    "block text-sm font-medium text-gray-700 mb-1 " + labelClassname;
  const inputClasses =
    "w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 " +
    className;

  return (
    <div className="mb-4">
      <label className={labelClasses}>{label}</label>
      <input
        type={type}
        value={value}
        required={required}
        onChange={onChange}
        className={inputClasses}
        {...props}
      />
    </div>
  );
}
