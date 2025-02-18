import React, { useState, useRef, useEffect } from "react";
import CheveronDown from "../../assets/icons/CheveronDown";
import SearchBar from "../SearchBar";

interface SelectProps {
  required?: boolean;
  label?: string;
  options: { value: any; label: string }[];
  error?: string;
  placeholder?: string;
  readOnly?: boolean;
  value?: string;
  onChange?: (value: string) => void;
  size?: "sm" | "md" | "lg";
  header?: string;
  addNew?: any;
}

const Select: React.FC<SelectProps> = ({
  label,
  options = [],
  error,
  placeholder,
  required,
  readOnly,
  value,
  onChange,
  size = "md",
  header,
  addNew,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [filteredOptions, setFilteredOptions] =
    useState<{ value: any; label: string }[]>(options);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const dropdownRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const allOptions = placeholder
      ? [{ value: "", label: placeholder }, ...options]
      : options;

    setFilteredOptions(
      allOptions.filter((option) =>
        option.label.toLowerCase().includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, options, placeholder]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleOptionSelect = (selectedValue: string) => {
    if (onChange) onChange(selectedValue);
    setIsOpen(false);
    setSelectedIndex(null);
  };

  const getSizeClasses = (size: "sm" | "md" | "lg") => {
    switch (size) {
      case "sm":
        return "h-7 py-1 text-[10px] px-2 pt-2";
      case "md":
        return "h-9 py-2 px-3 text-xs";
      case "lg":
        return "h-11 py-3 px-4 pr-12 text-base";
    }
  };

  const handleSearchChange = (value: string) => {
    setSearchValue(value);
  };

  const addNewModal = () => {
    return <div>{addNew}</div>;
  };

  return (
    <div className="relative w-full" ref={dropdownRef}>
      <label className={`block text-xs text-[#495160]  ${label && "mb-1"}`}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div
        className={`relative ${
          readOnly ? "pointer-events-none opacity-50" : "cursor-pointer"
        }`}
        onClick={() => !readOnly && setIsOpen(!isOpen)}
      >
        <div
          className={`block ${getSizeClasses(
            size
          )} text-[#818894] bg-white border w-full flex items-center 
          ${
            error
              ? "border-[#BC0000]"
              : "border-borderColor focus:border-primary-default focus:outline-none focus:ring-primary-default"
          }
          rounded-[40px] leading-tight`}
        >
          {value
            ? options.find((option) => option.value === value)?.label ||
              placeholder
            : placeholder || options[0]?.label}
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 ml-auto flex items-center px-2 text-gray-700">
          <CheveronDown />
        </div>
      </div>

      {isOpen && (
        <div className="p-1 absolute w-[100%] z-10">
          <div
            className={`  w-[97%] ms-1 bg-white border border-gray-300 rounded-[4px] shadow-lg`}
            tabIndex={0}
          >
            {header && (
              <div className="px-4 py-2 text-xs text-gray-700 font-bold border-b">
                {header}
              </div>
            )}
            {searchValue && (
              <SearchBar
                searchValue={searchValue}
                onSearchChange={handleSearchChange}
              />
            )}
            <div
              ref={listRef}
              className="max-h-52 overflow-y-auto custom-scrollbar"
            >
              {filteredOptions.map((option, index) => (
                <div
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`px-4 py-2 text-xs text-gray-700 cursor-pointer rounded-[10px] hover:bg-gray-100 ${
                    selectedIndex === index ? "bg-gray-200" : ""
                  }`}
                >
                  {option.label}
                </div>
              ))}
            </div>
            {addNew && (
                <div
                className="hover:bg-gray-100 rounded-[10px]"
                onClick={(e) => {
                  e.stopPropagation();
                }}
                >
                {addNewModal()}
                </div>
            )}
            {filteredOptions.length === 0 && (
              <div className="px-4 py-2 font-bold text-red-500 text-center text-xs">
                No options found!
              </div>
            )}
          </div>
        </div>
      )}
      {error && <p className="text-[#BC0000] text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Select;
