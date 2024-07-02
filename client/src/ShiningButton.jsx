import React from "react";
import "./index.css"; // Import CSS file for styles

const ShiningButton = ({name}) => {
  return (
    <button class="tailwind-style">
      {name}
      <span class="shine"></span>
    </button>
  );
};

export default ShiningButton;
