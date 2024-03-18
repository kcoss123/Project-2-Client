import React from "react";
import { Link } from "react-router-dom";

export const PageBreadcrumb = ({ page }) => {
  return (
    <nav className="bg-gray-100 py-2 px-4">
      <ol className="list-none flex">
        <li className="flex items-center">
          <Link to="/" className="text-blue-500 hover:text-blue-700">Home</Link>
          <svg className="fill-current w-4 h-4 mx-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"/></svg>
        </li>
        <li className="flex items-center">
          <span className="text-gray-500">{page}</span>
        </li>
      </ol>
    </nav>
  );
};
