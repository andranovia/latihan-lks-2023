import { useSearchParams } from "next/navigation";
import React from "react";

function DataInfo() {
  const searchParams = useSearchParams();

  const id = searchParams.get("id");

  return (
    <div className="">
      <p className="">ID: {id}</p>
    </div>
  );
}

export default DataInfo;
