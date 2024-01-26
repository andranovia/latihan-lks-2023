import React, { useState, ChangeEvent, useEffect } from "react";
import { H1 } from "./Typography";
import DataHooks from "@/hooks/DataHooks";

interface inputDataProps {
  id_card_number: number;
  name: string;
  gender: string;
  password: string;
  address: string;
  born_date: string;
  regional_id: number;
}

function InputData() {
  const [addModal, setAddModal] = useState(false);
  const [inputData, setInputData] = useState<inputDataProps>({
    id_card_number: 0,
    name: "",
    gender: "",
    password: "",
    address: "",
    born_date: "",
    regional_id: 0,
  });
  const [currentIndex, setCurrentIndex] = useState(0);
  const { AddData } = DataHooks();
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const inputArray = [
    {
      name: "Card Number",
      value: "id_card_number" as keyof inputDataProps,
    },
    {
      name: "Name",
      value: "name" as keyof inputDataProps,
    },
    {
      name: "Gender",
      value: "gender" as keyof inputDataProps,
    },
    {
      name: "Password",
      value: "password" as keyof inputDataProps,
    },
    {
      name: "Address",
      value: "address" as keyof inputDataProps,
    },
    {
      name: "Born Date",
      value: "born_date" as keyof inputDataProps,
    },
    {
      name: "Regional Id",
      value: "regional_id" as keyof inputDataProps,
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 3);
  };


  const isLastPage = currentIndex === 6;
  const isFirstPage = currentIndex === 0;

  return (
    <div className="flex mt-10 justify-between items-center mx-10">
      <div className="my-4">{H1("Add More Data")}</div>
      <button
        className="bg-black px-6 h-10 rounded-md" 
        onClick={() => setAddModal(true)}
      >
        <p className="text-white">Add</p>
      </button>
      {addModal && (
        <>
          <div className="fixed z-30 top-0 left-0 w-screen h-screen bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white px-14 py-16 rounded-lg flex flex-col justify-center">
              {inputArray
                .slice(currentIndex, currentIndex + 3)
                .map((data, index) => (
                  <React.Fragment key={index}>
                    <div className="my-4">{H1(data.name)}</div>
                    <input
                      type="text"
                      value={inputData[data.value]}
                      onChange={handleInputChange}
                      name={data.value}
                      className="text-black p-2 border-4 rounded-md"
                    />
                  </React.Fragment>
                ))}
              <div className="flex justify-center gap-10">
                <button
                  className="bg-black px-6 h-10 rounded-md my-4"
                  onClick={() =>
                    isFirstPage
                      ? setAddModal(false)
                      : setCurrentIndex(currentIndex - 3)
                  }
                >
                  <p className="text-white">Back</p>
                </button>
                {isLastPage ? (
                  <>
                    <button
                      className="bg-black px-6 h-10 rounded-md my-4"
                      onClick={() => AddData({ sendInputData: inputData })}
                    >
                      <p className="text-white">Send</p>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="bg-black px-6 h-10 rounded-md my-4"
                      onClick={handleNext}
                    >
                      <p className="text-white">Next</p>
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default InputData;
