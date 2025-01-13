import React, { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  label?: string;
  error?: string;
  placeholder?: string;
  readOnly?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, placeholder, required, readOnly, ...props }, ref) => {
    return (
      <div className="">
        {label && (
          <label
            htmlFor={props.name}
            className="block text-sm mb-2 font-normal text-deepStateBlue"
          >
            <p>
              {label} {required && <span className="text-red-500">*</span>}
            </p>
          </label>
        )}
        <input
          ref={ref} // Forward ref to the input element
          id={props.name}
          readOnly={readOnly}
          className={`w-full py-2 px-3 text-sm border rounded-[4px] font-[400] h-9 text-[#495160] ${
            error ? "border-red-500" : "border-gray-300"
          }`}
          placeholder={placeholder}
          {...props} // Spread all other props such as 'onChange', 'value', etc.
        />
        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default Input;
