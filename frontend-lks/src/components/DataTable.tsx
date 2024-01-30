import React from "react";
import DataHooks from "./hooks/DataHooks";
import { useSave } from "./contexts/SaveContext";
import DataSkeleton from "./DataSkeleton";

import Card from "./Card";

const DataTable = () => {
  const { data } = DataHooks();
  const { isChangesSaved } = useSave();

  return (
    <>
    <div className="overflow-x-hidden">
      <div className="flex flex-col sm:grid grid-cols-4 mx-20  gap-4 mt-10">
        {data ? (
          data.map((item, index) => (
            <div key={index} className="flex justify-center items-center ">
              <Card data={item} />
            </div>
          ))
        ) : (
          <>
            <DataSkeleton />
          </>
        )}
      </div>
      </div>
      <div className="flex justify-center">
        {isChangesSaved && (
          <>
            <div className="fixed z-40 bg-emerald-600 w-[16rem] h-14 rounded-md bottom-14 mb-10 ">
              <div className="p-4 flex justify-center items-center">
                <p className="text-md font-bold text-white">Changes Saved </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default DataTable;
