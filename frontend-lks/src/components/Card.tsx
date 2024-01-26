import DataHooks from "@/hooks/DataHooks";
import Image from "next/image";
import React, { useState } from "react";
import { H1 } from "./Typography";

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

const Card = ({ data }: CardProps) => {
  const [showMore, setShowMore] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(data);
  const { DeleteData, EditData } = DataHooks();

  return (
    <>
      <div className="w-[20rem]  rounded-md shadow-shadow-card p-4">
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
          <div className="fixed z-30 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-10 rounded-lg">
              <div className="my-4">{H1("Name")}</div>
              <div className="flex justify-center flex-col">
                <input
                  type="text"
                  value={editedData.name}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                  className="text-black p-2"
                />
                <div className="my-4">{H1("Gender")}</div>
                <input
                  type="text"
                  value={editedData.gender}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                  className="text-black p-2"
                />
                <div className="my-4">{H1("address")}</div>
                <input
                  type="text"
                  value={editedData.address}
                  onChange={(e) =>
                    setEditedData({ ...editedData, name: e.target.value })
                  }
                  className="text-black p-2"
                />
              </div>
              <div className="flex justify-start gap-4 mt-10">
                <button
                  className="bg-black p-2 rounded-md"
                  onClick={() => setIsEditing(false)}
                >
                  <p className="text-white">close</p>
                </button>
                <button
                  className="bg-black p-2 rounded-md"
                  onClick={() => EditData({ editedData: data })}
                >
                  <p className="text-white">send</p>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Card;
