import { forwardRef, useState, useEffect } from "react";
import CheckMark from "../../assets/icons/CheckMark";

interface CheckboxProps {
  label?: string;
  error?: string;
  required?: boolean;
  checked?: boolean; 
  onChange?: (checked: boolean) => void;
}

const Checkbox = forwardRef<HTMLDivElement, CheckboxProps>(
  ({ label, error, required, checked = false, onChange }, ref) => {
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
        <label className="flex items-center text-xs text-[#495160] mb-1 font-normal">
          <div
            ref={ref}
            onClick={handleToggle}
            className={`mr-2 w-4 h-4 border rounded flex items-center justify-center cursor-pointer 
            ${isChecked ? "bg-[#c78000] border-[#c78000]" : "border-borderColor"} 
            ${error ? "border-[#BC0000]" : ""}`}
          >
            {isChecked && <CheckMark />}
          </div>
          {label && (
            <span>
              {label} {required && <span className="text-red-500">*</span>}
            </span>
          )}
        </label>
        {error && <p className="text-[#BC0000] text-sm mt-1">{error}</p>}
      </div>
    );
  }
);

export default Checkbox;
