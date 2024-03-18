import React, { useState } from "react";
import { useTicketContext } from "../../api/ticketApi"; // Import useTicketContext hook

export const SearchForm = () => {
  const { filterTicketsBySearch } = useTicketContext(); // Get the filterTicketsBySearch function from context
  const [searchStr, setSearchStr] = useState("");

  const handleOnChange = async (e) => {
    const { value } = e.target;
    setSearchStr(value);

    try {
      // Call the filterTicketsBySearch function from context
      const filteredTickets = await filterTicketsBySearch(value);
      // Do something with the filteredTickets (e.g., update state or props)
    } catch (error) {
      console.error("Error filtering tickets:", error);
    }
  };

  return (
    <div className="mt-4">
      <label htmlFor="search" className="block text-sm font-medium text-gray-700">
        Search:
      </label>
      <div className="mt-1">
        <input
          type="text"
          name="searchStr"
          id="search"
          className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          placeholder="Search ..."
          value={searchStr}
          onChange={handleOnChange}
        />
      </div>
    </div>
  );
};
