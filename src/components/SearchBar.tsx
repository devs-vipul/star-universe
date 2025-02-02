import React, { useCallback } from "react";
import { Search } from "lucide-react";
import { debounce } from "../utils/debounce";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange }) => {
  // Debouncing to avoid too many API calls on searching
  const debouncedSearch = useCallback(
    debounce((searchValue: string) => {
      onChange(searchValue);
    }, 300),
    [onChange]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    e.target.value = newValue;
    debouncedSearch(newValue);
  };

  return (
    <div className="relative">
      <Search
        size={20}
        className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
      />
      <input
        type="text"
        defaultValue={value}
        onChange={handleChange}
        placeholder="Search characters..."
        className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 bg-transparent text-text-primary"
      />
    </div>
  );
};

export default SearchBar;
