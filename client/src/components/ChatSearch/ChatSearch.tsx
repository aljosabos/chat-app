import { SearchIcon } from "@icons/Search";
import { Input } from "@components/index";
import { FilterIcon, ReturnIcon } from "@icons/index";
import { useState } from "react";

export const ChatSearch = () => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="flex items-center justify-between p-3">
      <div className="flex items-center bg-gray-100 dark:bg-dark-2 rounded-lg px-4 py-1">
        {isFocused ? (
          <ReturnIcon className="dark:fill-green-1 rotateAnimation" />
        ) : (
          <SearchIcon className="dark:fill-dark-svg-2 mr-2" />
        )}
        <Input
          name="search"
          placeholder="Search or start a new chat"
          className="border-none"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>

      <FilterIcon className="dark:fill-dark-svg-2" />
    </div>
  );
};
