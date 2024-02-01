import React from "react";
import { H1 } from "./Typography";
import InputData from "./InputData";
import DataTable from "./DataTable";
import { useAuth } from "./hooks/AuthHooks";

function Index() {
  const {user} = useAuth()
console.log(user)

  return (
    <div className="sm:w-full w-screen bg-gray-200 ">
      <div className="flex justify-center py-10">
        <div className="mt-4">{H1("Data Recieved")}</div>
      </div>
      <div className="sm:w-full sm:px-[10rem] sm:my-14 ">
        <InputData />
      </div>
      <div className="overflow-hidden">
      <DataTable/>
      </div>
    </div>
  );
}

export default Index;
