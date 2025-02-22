import React, { forwardRef } from "react";

interface InputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'size'> {
  required?: boolean;
  label?: string;
  error?: string;
  placeholder?: string;
  readOnly?: boolean;
  type?: string;
  size?: "sm" | "md" | "lg";
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, placeholder, required, readOnly, type, size = "md", ...props }, ref) => {
    const sizeClasses: Record<string, string> = {
      sm: "h-7 py-1 text-[10px] px-2",
      md: "h-9 py-2 px-3 text-xs",
      lg: "h-11 py-3 px-4 text-sm",
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;

      if (type === "number") {
        const regex = /^[0-9]*\.?[0-9]*$/
        if (!regex.test(value)) return; 
      }

      if (props.onChange) {
        props.onChange(e);
      }
    };

    return (
      <div>
        {label && (
          <label
            htmlFor={props.name}
            className="block text-xs text-[#495160] mb-1 font-normal text-deepStateBlue"
          >
            <p>
              {label} {required && <span className="text-red-500">*</span>}
            </p>
          </label>
        )}
        <input
          ref={ref}
          id={props.name}
          readOnly={readOnly}
          className={`w-full ${sizeClasses[size]} rounded-[40px] text-textPrimary border px-2 bg-[white]
            ${error ? "border-[#BC0000]" : "border-borderColor focus:border-primary-default focus:outline-none focus:ring-primary-default"} 
            ${type === "number" ? "appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none" : ""}
          `}
          placeholder={placeholder}
          {...props}
          type={type}
          onChange={handleChange}
        />
        {error && <p className="text-[#BC0000] text-xs mt-1">{error}</p>}
      </div>
    );
  }
);

export default Input;
