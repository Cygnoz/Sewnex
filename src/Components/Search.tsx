import { ChangeEvent } from "react";
import SearchIcon from "../assets/icons/SearchIcon";

type Props = {
  searchValue: string;
  onSearchChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

const Search = ({
  searchValue,
  onSearchChange,
  placeholder = "search",
  className,
}: Props) => {
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="relative w-full h-[44px] rounded-lg flex items-center">
      <SearchIcon />
      <input
        className={`${className} pl-9 w-full rounded-full text-start text-[#8F99A9] text-xs h-10 p-2 border border-[#CECECE] bg-[#FFFFFF] outline-none`}
        placeholder={placeholder}
        onChange={handleSearch}
        value={searchValue}
      />
    </div>
  );
};

export default Search;
