import React from "react";

const Intraction = (prop) => {
  return (
    <div>
      <p>{prop.data.user}</p>
      <p>{prop.data.bot}</p>
    </div>
  );
};

export default Intraction;
