import { useState } from "react";
import Input from "./Input";

interface PhoneNumberInputProps {
  countryData: any;
  onChange: (value: string) => void;
  initialValue?: string;
  size?: "sm" | "md" | "lg";
  error?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: any;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  countryData,
  onChange,
  initialValue = "",
  size = "md",
  error = "",
  name = "phoneNumber",
  label,
  value,
  placeholder,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<any | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState(initialValue);

  const sizeClasses: Record<string, string> = {
    sm: "h-7 py-1 text-[10px] px-2",
    md: "h-9 py-2 px-3 text-sm",
    lg: "h-11 py-3 px-4 text-base",
  };
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value.trim();
    const phoneNumberLimit = selectedCountry?.phoneNumberLimit || 0;

    let sanitizedNumber = rawInput
      .replace(selectedCountry?.phoneNumberCode || "", "")
      .trim();

    if (sanitizedNumber.length > phoneNumberLimit) {
      sanitizedNumber = sanitizedNumber.slice(0, phoneNumberLimit);
    }

    const updatedPhoneNumber = `${
      selectedCountry?.phoneNumberCode || ""
    } ${sanitizedNumber}`;

    setPhoneNumber(updatedPhoneNumber);
    onChange(updatedPhoneNumber);
  };

  const handleCountrySelect = (country: any) => {
    setSelectedCountry(country);
    setDropdownOpen(false);
    const updatedPhoneNumber = `${country.phoneNumberCode} `;
    setPhoneNumber(updatedPhoneNumber);
    onChange(updatedPhoneNumber);
  };

  return (
    <div className="w-full relative">
      <label className="block text-sm mb-1 font-normal text-deepStateBlue">
        {label} <span className="text-red-500">*</span>
      </label>
      <div className="flex items-center relative">
        {/* Flag and Dial Code Dropdown */}
        <div
          className={`flex items-center cursor-pointer border rounded-l-full px-3  ${
            sizeClasses[size]
          }  bg-white ${
            dropdownOpen ? "border-primary-default" : "border-borderColor"
          }`}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {selectedCountry?.flag ? (
            <>
              <img
                src={selectedCountry.flag}
                alt={`${selectedCountry.name} flag`}
                className="h-4 w-4 mr-2"
              />
              {/* <span className="text-sm">{selectedCountry.phoneNumberCode}</span> */}
            </>
          ) : (
            <span className="text-sm text-gray-500">Select</span>
          )}
        </div>

        {dropdownOpen && (
          <div className="absolute top-full left-0 mt-2 bg-white shadow-md rounded-md z-10 max-h-60 overflow-y-auto">
            {countryData.map((country: any, index: number) => (
              <div
                key={index}
                onClick={() => handleCountrySelect(country)}
                className="flex items-center px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm"
              >
                <img
                  src={country.flag}
                  className="h-4 w-4 mr-2"
                  alt={`${country.name} flag`}
                />
                <span>{country.name}</span>{" "}
                <span className="ml-2 text-gray-500">
                  {country.phoneNumberCode}
                </span>
              </div>
            ))}
          </div>
        )}
        <Input
          name={name}
          value={value}
          placeholder={placeholder}
          size={size}
          onChange={handlePhoneNumberChange}
          className={`w-full max-w-md ${
            sizeClasses[size]
          } rounded-r-[40px] text-textPrimary border px-2 ${
            error
              ? "border-[#BC0000]"
              : "border-borderColor focus:border-primary-default focus:outline-none focus:ring-primary-default"
          }`}        />
      </div>
      {error && <p className="text-[#BC0000] text-sm mt-1">{error}</p>}{" "}
      {/* Error message */}
    </div>
  );
};

export default PhoneNumberInput;
