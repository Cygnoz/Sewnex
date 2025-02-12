import { useEffect, useState } from "react";
import Input from "./Input";
import { endpoints } from "../../Services/apiEdpoints";
import useApi from "../../Hooks/useApi";
import CheveronDown from "../../assets/icons/CheveronDown";

interface Country {
  name: string;
  phoneNumberCode: string;
  flag: string;
}

interface PhoneNumberInputProps {
  country?: string;
  onChange: (value: string) => void;
  initialValue?: string;
  size?: "sm" | "md" | "lg";
  error?: string;
  name?: string;
  label?: string;
  placeholder?: string;
  value?: string;
}

const PhoneNumberInput: React.FC<PhoneNumberInputProps> = ({
  onChange,
  initialValue = "",
  size = "md",
  error = "",
  name = "phoneNumber",
  label,
  value,
  country,
  placeholder,
}) => {
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [phoneNumber, setPhoneNumber] = useState(initialValue);
  const [countryList, setCountryList] = useState<Country[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { request: getAdditionalData } = useApi("get", 5004);

  const sizeClasses: Record<string, string> = {
    sm: "h-7 py-1 text-[10px] px-2",
    md: "h-9 py-2 px-3 text-sm",
    lg: "h-11 py-3 px-4 text-base",
  };

  const fetchData = async () => {
    try {
      const url = endpoints.GET_COUNTRY_DATA;
      const { response, error } = await getAdditionalData(url);
      if (!error && response) {
        console.log("Fetched country data:", response.data);
        const countries = Array.isArray(response.data)
          ? response.data[0]?.countries || []
          : response.data.countries || [];

        setCountryList(countries);

      
      }
    } catch (error) {
      console.log("Error fetching country data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawInput = e.target.value.trim();
    const phoneNumberCode = selectedCountry?.phoneNumberCode || "";
    let sanitizedNumber = rawInput.replace(phoneNumberCode, "").trim();
    const updatedPhoneNumber = `${phoneNumberCode} ${sanitizedNumber}`;

    setPhoneNumber(updatedPhoneNumber);
    onChange(updatedPhoneNumber);
  };

  const handleCountrySelect = (country: Country) => {
    setSelectedCountry(country);
    setPhoneNumber(`${country.phoneNumberCode} `);
    onChange(`${country.phoneNumberCode} `);
    setDropdownOpen(false);
  };

  useEffect(() => {
      if (country && selectedCountry === null) {  
        const foundCountry = countryList.find((c:any) => c.name === country);
        if (foundCountry) {
          setSelectedCountry(foundCountry);
          setPhoneNumber(`${foundCountry.phoneNumberCode} `);
          onChange(`${foundCountry.phoneNumberCode} `);
        }
      }
  }, [country]);

  console.log()

  return (
<div className="w-full min-w-full ">
<label className="text-xs mb-1 font-normal text-deepStateBlue">
      {label} <span className="text-red-500">*</span>
    </label>
    <div className="relative flex w-full min-w-full">
  {/* Flag and Dropdown */}
  <div
    className="flex items-center cursor-pointer border border-neutral-300 justify-center text-xs h-[x] rounded-l-[40px] px-3"
    onClick={() => setDropdownOpen(!dropdownOpen)}
  >
    {selectedCountry ? (
      <div className="flex items-center">
        <img
          src={selectedCountry.flag}
          alt={`${selectedCountry.name} flag`}
          className="h-4 w-4 mr-2"
        />
        <CheveronDown />
      </div>
    ) : (
      <span>Select</span>
    )}
  </div>

  {/* Dropdown List */}
  {dropdownOpen && (
    <div className="absolute top-full left-0 mt-1 bg-white shadow-md rounded-md z-10 max-h-60 overflow-y-auto border border-gray-300 w-full min-w-full">
      {countryList.map((country, index) => (
        <div
          key={index}
          className="flex items-center px-3 py-2 hover:bg-red-50 cursor-pointer text-sm border-b border-neutral-300"
          onClick={() => handleCountrySelect(country)}
        >
          <img src={country.flag} className="h-4 w-4 mr-2" alt={country.name} />
          <span>{country.name}</span>
          <span className="ml-auto">{country.phoneNumberCode}</span>
        </div>
      ))}
    </div>
  )}

  {/* Input Field - Modified with flex-1 */}
  <Input
    name={name}
    value={value || phoneNumber}
    placeholder={placeholder}
    size={size}
    onChange={handlePhoneNumberChange}
    className={`flex-1 w-full min-w-full ${sizeClasses[size]} text-xs rounded-r-[40px] text-textPrimary border px-2 ${
      error
        ? "border-[#BC0000]"
        : "border-borderColor focus:border-primary-default focus:outline-none focus:ring-primary-default"
    }`}
  />
</div>


  
    {/* Error Message */}
    {error && <p className="text-[#BC0000] text-sm mt-1">{error}</p>}
  </div>
  
  );
};

export default PhoneNumberInput;
