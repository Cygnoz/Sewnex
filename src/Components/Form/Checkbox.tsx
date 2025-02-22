import { forwardRef, useState, useEffect } from "react";
import CheckMark from "../../assets/icons/CheckMark";

interface CheckboxProps {
  id?: string;
  name?: string;
  label?: string;
  error?: string;
  required?: boolean;
  checked?: boolean;
  className?: string;
  onChange?: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ id, name, label, error, required, checked = false, className = "", onChange }, ref) => {
    const [isChecked, setIsChecked] = useState(checked);

    useEffect(() => {
      setIsChecked(checked);
    }, [checked]);

    const handleToggle = () => {
      const newChecked = !isChecked;
      setIsChecked(newChecked);
      onChange?.(newChecked);
    };

    return (
      <div className="flex flex-col">
        <label
          htmlFor={id}
          className="flex items-center text-xs text-[#495160] mb-1 font-normal cursor-pointer"
        >
          <input
            ref={ref}
            id={id}
            name={name}
            type="checkbox"
            checked={isChecked}
            onChange={handleToggle}
            className="hidden"
          />
          <div
            className={`mr-2 w-5 h-5 border rounded flex items-center justify-center cursor-pointer 
              ${isChecked ? "bg-[#c78000] border-[#c78000]" : "border bg-white"} 
              ${error ? "border-[#BC0000]" : ""} ${className}`}
          >
            {isChecked && <CheckMark />}
          </div>
          <span>
            {label} {required && <span className="text-red-500">*</span>}
          </span>
        </label>
        {error && <p className="text-[#BC0000] text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default Checkbox;
