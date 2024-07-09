import React from "react";

export function Spinner() {
  return (
    <div
      role="status"
      className="my-4 animate-spin rounded-full border-t-2 border-b-2 border-gray-300 h-12 w-12 md:h-16 md:w-16 md:border-t-4 md:border-b-4 md:border-gray-400"
    ></div>
  );
}
