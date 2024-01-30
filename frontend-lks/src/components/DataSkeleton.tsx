import React from "react";

function DataSkeleton() {
  return (
    <div className="h-screen mx-6 flex flex-col gap-10 sm:flex-row sm:gap-36">
      <div
        role="status"
        className="max-w-md sm:h-fit p-4 space-y-4 border border-gray-200 divide-y divide-gray-600 rounded shadow animate-pulse  md:p-6 "
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
        className="max-w-md sm:h-fit  p-4 space-y-4 border border-gray-200 divide-y divide-gray-600 rounded shadow animate-pulse  md:p-6 "
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
        className="max-w-md sm:h-fit p-4 space-y-4 border border-gray-200 divide-y divide-gray-600 rounded shadow animate-pulse  md:p-6 "
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
        className="max-w-md p-4 sm:h-fit  space-y-4 border border-gray-200 divide-y divide-gray-600 rounded shadow animate-pulse  md:p-6 "
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
  );
}

export default DataSkeleton;
