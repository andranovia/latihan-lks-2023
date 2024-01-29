import React from "react";
import { H1 } from "./Typography";
import DataHooks from "@/components/hooks/DataHooks";
import Card from "./Card";
import InputData from "./InputData";
import { useSave } from "@/components/contexts/SaveContext";

function Index() {
  const { data } = DataHooks();
  const { isChangesSaved } = useSave();
  const DataArray = data;
  return (
    <div className="w-screen bg-gray-200 ">
      <div className="flex justify-center">
        <div className="mt-4">{H1("Data Recieved")}</div>
      </div>
      <div className="sm:w-full sm:px-[10rem] sm:my-20">
        <InputData />
      </div>
      <div className="flex flex-col sm:grid grid-cols-3  gap-4 mt-10">
        {data &&
          DataArray.map((item, index) => (
            <div key={index} className="flex justify-center items-center">
              <Card data={item} />
            </div>
          ))}
        <div className="h-screen mx-6 flex flex-col gap-10">
          <div
            role="status"
            className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-600 rounded shadow animate-pulse  md:p-6 "
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5  rounded-full bg-gray-500 w-24 mb-2.5"></div>
                <div className="w-32 h-2 rounded-full bg-gray-500"></div>
              </div>
              <div className="h-2.5 rounded-full bg-gray-400 w-12"></div>
            </div>
          </div>
          <div
            role="status"
            className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-600 rounded shadow animate-pulse  md:p-6 "
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5  rounded-full bg-gray-500 w-24 mb-2.5"></div>
                <div className="w-32 h-2 rounded-full bg-gray-500"></div>
              </div>
              <div className="h-2.5 rounded-full bg-gray-400 w-12"></div>
            </div>
          </div>
          <div
            role="status"
            className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-600 rounded shadow animate-pulse  md:p-6 "
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5  rounded-full bg-gray-500 w-24 mb-2.5"></div>
                <div className="w-32 h-2 rounded-full bg-gray-500"></div>
              </div>
              <div className="h-2.5 rounded-full bg-gray-400 w-12"></div>
            </div>
          </div>
          <div
            role="status"
            className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-600 rounded shadow animate-pulse  md:p-6 "
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5  rounded-full bg-gray-500 w-24 mb-2.5"></div>
                <div className="w-32 h-2 rounded-full bg-gray-500"></div>
              </div>
              <div className="h-2.5 rounded-full bg-gray-400 w-12"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center">
        {isChangesSaved && (
          <>
            <div className="fixed z-40 bg-emerald-600 w-[16rem] h-14 rounded-md bottom-14 mb-10">
              <div className="p-4 flex justify-center items-center">
                <p className="text-md font-bold text-white">Changes Saved </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Index;
