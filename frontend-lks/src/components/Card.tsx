import DataHooks from "@/components/hooks/DataHooks";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { H1 } from "./Typography";
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import axiosInstance from "@/tools/axiosIntance";
import { useSave } from "./contexts/SaveContext";
import EditingData from "./EditingData";

interface Data {
  id_society: number;
  id_card_number: number;
  name: string;
  gender: string;
  password: string;
  address: string;
  born_date: string;
  regional_id: number;
}

interface CardProps {
  data: Data;
}

const Card = React.memo(({ data }: CardProps) => {
  const [showMore, setShowMore] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { setIsChangesSaved } = useSave();

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

  const DeleteData = useCallback((id: number) => {
    axiosInstance
      .delete(`api/v1/society/${id}`)
      .then(() => setIsChangesSaved(true))
      .catch((e) => console.log("error deleting data", e));
  }, []);

  return (
    <>
      <div className="w-[20rem] rounded-md shadow-shadow-card p-4 ">
        <div className="text-gray-700 flex justify-between gap-2">
          <div className="flex justify-center gap-2 items-center">
            <span className="mr-4 font-bold ">{data.id_society}</span>
            <span>{data.name}</span>
            {data.gender === "laki-laki" ? (
              <>
                <Image
                  src={"https://img.icons8.com/sf-black-filled/64/male.png"}
                  alt=""
                  width={25}
                  height={10}
                />
              </>
            ) : (
              <Image
                src={"https://img.icons8.com/sf-black-filled/64/female.png"}
                alt=""
                width={25}
                height={10}
              />
            )}
          </div>
          <button onClick={() => setShowMore(true)}>
            <Image
              src={"https://img.icons8.com/material-two-tone/24/menu-2.png"}
              alt=""
              width={10}
              height={10}
              className="w-4 h-4"
            />
          </button>
        </div>
      </div>
      {showMore && (
        <>
          <div className="fixed z-20 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex flex-col justify-end items-center">
            <div className="bg-white w-screen h-fit p-4 absolute  ">
              <button onClick={() => setShowMore(false)}>
                <Image
                  src={"https://img.icons8.com/ios/50/multiply.png"}
                  alt="cancel"
                  height={34}
                  width={34}
                  className="opacity-70"
                />
              </button>
              <div className="flex flex-col m-2 mt-4 gap-2 font-bold text-md text-gray-800 ">
                <Link
                  href={
                    pathname +
                    "society/" +
                    "info" +
                    "?" +
                    createQueryString("id", data.id_society)
                  }
                >
                  <button className="bg-black px-6 h-10  my-4 rounded-md">
                    <p className=" text-start text-white">See More</p>
                  </button>
                </Link>

                <button
                  onClick={() => {
                    DeleteData(data.id_society);
                  }}
                >
                  <p className=" text-start">Delete Data</p>
                </button>
                <button
                  onClick={() => {
                    setIsEditing(true);
                  }}
                >
                  <p className=" text-start">Edit Data</p>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
      {isEditing && (
        <>
         <EditingData item={data} setIsEditing={setIsEditing}/>
        </>
      )}
    </>
  );
});

export default Card;
