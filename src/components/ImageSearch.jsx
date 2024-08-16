import React, { useState } from "react";

const ImageSearch = ({ searchText }) => {
  const [text, setText] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      alert("Please enter a search term.");
      return;
    }
    searchText(text);
  };

  return (
    <div className="   max-w-full sm:max-w-md mx-auto my-10">
      <form
        onSubmit={onSubmit}
        className="flex flex-row sm:flex-row items-center gap-2 sm:gap-2"
      >
        <input
          onChange={(e) => setText(e.target.value)}
          className="w-full sm:w-64 p-2 border-2 border-teal-500 rounded-md dark:border-teal-300 focus:outline-none focus:border-teal-700"
          type="text"
          placeholder="Search Image Term..."
          value={text}
        />
        <button
          className="bg-teal-500 hover:bg-teal-700 text-white border-2 border-teal-500 dark:border-teal-300 py-2 px-4 rounded-md focus:outline-none"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
};

export default ImageSearch;
