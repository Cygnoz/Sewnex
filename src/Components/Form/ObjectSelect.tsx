import { useState, useRef } from "react";
import CheveronDown from "../../assets/icons/CheveronDown";
import SearchBar from "../SearchBar";

type ObjectSelectProps = {
  required?: boolean;
  error?: string;
  size?: "sm" | "md" | "lg"; 
  options: any;
  label: string;
  placeholder?: string;
  selectedOption: any | null;
  onSelect: (option: any) => void;
  renderOptionContent?: (option: any) => React.ReactNode; 
  searchKey?: keyof any;
  displayFields: {
    optionImage:string;
    optionLabel: string; 
    optionMobile:string;
    optionAdditionalInfo?: string;
  };
  NewItem?:any
};

const ObjectSelect = ({
  required,
  size = "md",
  error,
  options,
  label,
  placeholder = "Select",
  selectedOption,
  onSelect,
  renderOptionContent,
  searchKey,
  displayFields, 
  NewItem
}: ObjectSelectProps) => {
  const [openDropdown, setOpenDropdown] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => setOpenDropdown((prev) => !prev);

  const filteredOptions = options.filter((option: any) => {
    if (searchKey) {
      const value = option[searchKey];
      return (
        typeof value === "string" &&
        value.toLowerCase().includes(searchValue.toLowerCase())
      );
    }
    return false;
  });

  const sizeClasses: Record<string, string> = {
    sm: "h-7 py-1 text-[10px] px-2",
    md: "h-9 py-2 px-3 text-xs",
    lg: "h-11 py-3 px-4 text-sm",
  };

  const handleOptionClick = (option: any) => {
    onSelect(option);
    setOpenDropdown(false);
  };

  console.log(NewItem,renderOptionContent)
  return (
    <div>
      <label className="block text-xs mb-1 text-text_tertiary">
        {label}{" "}
    {  required &&   <span className="text-[#bd2e2e]">*</span>}
      </label>
      <div className="relative w-full" onClick={toggleDropdown}>
        <div className={`w-full ${sizeClasses[size]} rounded-[40px] text-xs text-text_tertiary border px-2 ${error ? "border-[#BC0000]" : "border-borderColor focus:border-primary-default focus:outline-none focus:ring-primary-default"}`}>
          <p className="mt-0.5">
            {selectedOption && Object.keys(selectedOption).length > 0
              ? selectedOption[displayFields.optionLabel]
              : placeholder}
          </p>
        </div>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <CheveronDown color="gray" />
        </div>
      </div>
      {openDropdown && (
        <div
          ref={dropdownRef}
          className="absolute border z-10 bg-white shadow rounded-lg mt-1  w-[20%] space-y-1 max-h-72 overflow-y-auto hide-scrollbar"
        >
          <SearchBar
            searchValue={searchValue}
            onSearchChange={setSearchValue}
            placeholder={`Search ${label}`}
          />
          {filteredOptions.length > 0 ? (
            filteredOptions.map((option: any) => (
              <div
                key={option.id}
                className="grid grid-cols-12  px-4  hover:bg-[#eeeeee] h-11 cursor-pointer text-xs text-text_tertiary  bg-lightPink"
                onClick={() => handleOptionClick(option)}
              >
                <div className="flex items-center gap-2">
                  <img
                    className="rounded-full h-8 w-8 object-cover "
                    src={option[displayFields.optionImage] || "https://example.com/default-avatar.jpg"}
                    alt="supplier-avatar"
                  />
                  <div>
                    <p className="text-xs whitespace-nowrap">
                      {option[displayFields.optionLabel]}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center border-slate-400 border rounded-lg">
              <p className="text-[red] text-sm py-4">{label} Not Found!</p>
            </div>
          )}
          <div className="shadow">
{/* {<NewItem/>} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default ObjectSelect;
