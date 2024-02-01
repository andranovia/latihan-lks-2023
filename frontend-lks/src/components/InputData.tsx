import React, { useState, ChangeEvent } from "react";
import { H1 } from "./Typography";
import DataHooks from "@/components/hooks/DataHooks";
import Image from "next/image";
import RegionalHooks from "./hooks/RegionalsHooks";

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
  const { regionalData } = RegionalHooks();



  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInputData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedRegionId = parseInt(e.target.value, 10);
    setInputData((prevData) => ({
      ...prevData,
      regional_id: selectedRegionId,
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
      name: "Password",
      value: "password" as keyof inputDataProps,
    },
    {
      name: "Address",
      value: "address" as keyof inputDataProps,
    },
  ];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => prevIndex + 4);
  };

  const isLastPage = currentIndex === 4;
  const isFirstPage = currentIndex === 0;

  const handleSend = () => {
    AddData({ sendInputData: inputData });
    setAddModal(false);
    setInputData({
      id_card_number: 0,
      name: "",
      gender: "",
      password: "",
      address: "",
      born_date: "",
      regional_id: 0,
    })
    setCurrentIndex(0)
  };
  return (
    <div className="flex sm:mt-10 justify-between items-center mx-10 ">
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
            <div className="bg-white rounded-lg p-6">
              <button onClick={() => setAddModal(false)}>
                <Image
                  src={"https://img.icons8.com/ios/50/multiply.png"}
                  alt="cancel"
                  height={34}
                  width={34}
                  className="opacity-100 w-9"
                />
              </button>
              <div className="px-10 py-14 flex flex-col justify-center">
                {inputArray
                  .slice(currentIndex, currentIndex + 4)
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
                {isLastPage && (
                  <>
                    <div className="">{H1("Regional")}</div>
                    <select
                      id="countries"
                      value={inputData.regional_id}
                      onChange={handleRegionChange}
                      className="my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                    >
                      <option value={0}>Choose a region</option>
                      {regionalData.data.map((region) => (
                        <option key={region.id} value={region.id}>
                          {region.province} - {region.district}
                        </option>
                      ))}
                    </select>
                    <div className="mb-8">{H1("Gender")}</div>
                    <div className="flex flex-col gap-10">
                      <div className="relative max-w-sm">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                          <svg
                            className="w-4 h-4 text-gray-500 "
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                          </svg>
                        </div>
                        <input
                          type="date"
                          className="bg-gray-50 border border-gray-300 rounded-md text-gray-900 text-sm rounded-lgblock w-full ps-10 p-2.5  0"
                          placeholder="Select date"
                          value={inputData["born_date"]}
                          onChange={(e) => handleInputChange(e)}
                          name="born_date"
                        />
                      </div>
                      <div className="flex justify-center items-center mb-4 gap-10">
                        <div className="flex justify-center items-center">
                          <input
                            id="default-radio-1"
                            type="radio"
                            checked={inputData["gender"] === "male"}
                            onChange={() =>
                              handleInputChange({
                                target: { name: "gender", value: "male" },
                              } as ChangeEvent<HTMLInputElement>)
                            }
                            name="gender"
                            className="w-4 h-4 bg-gray-100 border-gray-300  "
                          />
                          <label
                            form="default-radio-1"
                            className="ms-2 text-sm font-medium text-gray-700 "
                          >
                            Male
                          </label>
                        </div>
                        <div className="flex justify-center items-center">
                          <input
                            id="default-radio-2"
                            type="radio"
                            checked={inputData["gender"] === "female"}
                            onChange={() =>
                              handleInputChange({
                                target: { name: "gender", value: "female" },
                              } as ChangeEvent<HTMLInputElement>)
                            }
                            name="gender"
                            className="w-4 h-4 bg-gray-100 border-gray-300  "
                          />
                          <label
                            form="default-radio-2"
                            className="ms-2 text-sm font-medium text-gray-700 "
                          >
                            Female
                          </label>
                        </div>
                      </div>
                    </div>
                  </>
                )}

                <div className="flex justify-center gap-10">
                  <button
                    className="bg-black px-6 h-10 rounded-md my-4"
                    onClick={() =>
                      isFirstPage
                        ? setAddModal(false)
                        : setCurrentIndex(currentIndex - 4)
                    }
                  >
                    <p className="text-white">Back</p>
                  </button>
                  {isLastPage ? (
                    <>
                      <button
                        className="bg-black px-6 h-10 rounded-md my-4"
                        onClick={() => handleSend()}
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
          </div>
        </>
      )}
    </div>
  );
}

export default InputData;
