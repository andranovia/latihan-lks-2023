import React from "react";

export const H1 = (text: string) => (
  <div className="font-bold text-gray-800">
    <h1>{text}</h1>
  </div>
);

export const H2 = (text: string) => (
  <div>
    <h1>{text}</h1>
  </div>
);

const Typography = {
  H1,
  H2,
};

export default Typography;
