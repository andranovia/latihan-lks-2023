import React, { useCallback } from "react";
import { H1 } from "./Typography";
import DataHooks from "@/hooks/DataHooks";
import Card from "./Card";
import InputData from "./InputData";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function Index() {
  const { data } = DataHooks();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name: string, value: any) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);

      return params.toString();
    },
    [searchParams]
  );

  return (
    <div className="w-screen bg-gray-200 ">
      <div className="flex justify-center">
        <div className="mt-4">{H1("Data Recieved")}</div>
      </div>
      <InputData />
      <div className="flex flex-col gap-4 mt-10">
        {data ? (
          data.map((item, index) => (
            <div key={index} className="flex justify-center ">
              <Link
                href={
                  pathname +
                  "society/" +
                  "info" +
                  "?" +
                  createQueryString("id", item.id_society)
                }
              >
                <Card data={item} />
              </Link>
            </div>
          ))
        ) : (
          <div>No data available</div>
        )}
      </div>
    </div>
  );
}

export default Index;
