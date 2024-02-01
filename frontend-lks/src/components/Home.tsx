import React from "react";
import { H1 } from "./Typography";
import InputData from "./InputData";
import DataTable from "./DataTable";
import { useAuth } from "./hooks/AuthHooks";

function Index() {
  const { user, logoutAction} = useAuth();

  return (
    <div className="sm:w-full w-screen bg-gray-200 ">
      <div className="flex justify-center py-10">
        <div className="mt-4 flex flex-col justify-center gap-4 items-center">
          {H1("Data Recieved")}
          {user ? (
            <>
            <div className="flex justify-between gap-24 items-center mt-4 fixed bg-white rounded-md p-4 bottom-4">
             <p className="font-medium ">- {user?.name} -</p>
              <button
                className="bg-black px-6 h-10 rounded-md text-white"
                onClick={() => logoutAction()}
              >
                Logout
              </button>
              </div>
            </>
          ) : (
            <>
              <p>loading</p>
            </>
          )}
        </div>
      </div>
      <div className="sm:w-full sm:px-[10rem] sm:my-14 ">
        <InputData />
      </div>
      <div className="overflow-hidden">
        <DataTable />
      </div>
    </div>
  );
}

export default Index;
