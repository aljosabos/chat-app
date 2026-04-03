
import { Input } from "@components/Input/Input";
import { FilterIcon, ReturnIcon, SearchIcon } from "@icons/index";
import { useState } from "react";

interface IChatSearchProps {
  search: string;
  setSearchContacts: React.Dispatch<React.SetStateAction<string>>;
}

export const ChatSearch = ({ search, setSearchContacts }: IChatSearchProps) => {
  // const dispatch = useAppDispatch();

  const [isFocused, setIsFocused] = useState(false);
  // const [search, setSearch] = useState("");
  // const [users, setUsers] = useState<User[]>([]);

  // const debouncedSearch = useDebounce(search);

  // const handleSearchUser = useCallback(
  //   async (search: string) => {
  //     try {
  //       const data = await dispatch(searchUser({ search })).unwrap();
  //       return data;
  //     } catch (err) {
  //       console.error("Search error:", err);
  //     }
  //   },
  //   [dispatch]
  // );

  // useEffect(() => {
  //   if (!debouncedSearch.trim()) {
  //     setUsers([]);
  //     return;
  //   }

  //   const fetchUsers = async () => {
  //     const users = await handleSearchUser(debouncedSearch.trim());
  //     if (users) setUsers(users);
  //   };

  //   fetchUsers();
  // }, [debouncedSearch, handleSearchUser]);

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
          value={search}
          onChange={(e) => setSearchContacts(e.target.value)}
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
