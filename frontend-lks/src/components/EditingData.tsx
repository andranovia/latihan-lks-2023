import { H1 } from "@/components/Typography";
import axiosInstance from "@/tools/axiosIntance";
import React, { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { useSave } from "./contexts/SaveContext";
import RegionalHooks from "./hooks/RegionalsHooks";

interface dataItem {
  id_society: number;
  id_card_number: number;
  name: string;
  gender: string;
  password: string;
  address: string;
  born_date: string;
  regional_id: number;
}

interface EditProps {
  item: any;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}

interface EditDataProps {
  editedData: dataItem;
}

const EditingData = ({ item, setIsEditing }: EditProps) => {
  const [editedData, setEditedData] = useState({ ...item });
  const { setIsChangesSaved } = useSave();
  const { regionalData } = RegionalHooks();

  const EditData = ({ editedData }: EditDataProps) => {
    let genderValue;
    if (editedData.gender === "laki-laki") {
      genderValue = "male";
    } else if (editedData.gender === "perempuan") {
      genderValue = "female";
    } else {
      genderValue = "unknown";
    }

    let sendedData = {
      id_card_number: editedData.id_card_number,
      password: editedData.password,
      name: editedData.name,
      born_date: editedData.born_date,
      gender: genderValue,
      address: editedData.address,
      regional_id: editedData.regional_id,
    };

    axiosInstance
      .put(`api/v1/society/${editedData.id_society}`, sendedData)
      .then(() => setIsChangesSaved(true))
      .catch((err) => console.log("Error updating data", err));
  };
  const handleEdit = () => {
    setIsEditing(false);
    EditData({ editedData });
  };

  const handleRegionChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const selectedRegionId = parseInt(e.target.value, 10);
    setEditedData((prevData: any) => ({
      ...prevData,
      regional_id: selectedRegionId,
    }));
  };

  return (
    <>
      <div className="fixed z-30 top-0 left-0 w-screen h-screen  bg-opacity-50 flex justify-center items-center">
        <div className="bg-white p-10 rounded-lg">
          <div className="my-4">{H1("Name")}</div>
          <div className="flex justify-center flex-col">
            <input
              type="text"
              value={editedData.name}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  name: e.target.value,
                })
              }
              className="text-black p-2"
            />
            <div className="my-4">{H1("Gender")}</div>
            <div className="flex justify-center items-center mb-4 gap-10">
              <div className="flex justify-center items-center">
                <input
                  id="default-radio-1"
                  type="radio"
                  checked={editedData["gender"] === "laki-laki"}
                  onChange={() =>
                    setEditedData({
                      ...editedData,
                      gender: "laki-laki",
                    })
                  }
                  name="gender"
                  className="w-4 h-4 bg-gray-100 border-gray-300  "
                />
                <label
                  htmlFor="default-radio-1"
                  className="ms-2 text-sm font-medium text-gray-700 "
                >
                  Male
                </label>
              </div>
              <div className="flex justify-center items-center">
                <input
                  id="default-radio-2"
                  type="radio"
                  checked={editedData["gender"] === "perempuan"}
                  onChange={() =>
                    setEditedData({
                      ...editedData,
                      gender: "perempuan",
                    })
                  }
                  name="gender"
                  className="w-4 h-4 bg-gray-100 border-gray-300  "
                />
                <label
                  htmlFor="default-radio-2"
                  className="ms-2 text-sm font-medium text-gray-700 "
                >
                  Female
                </label>
              </div>
            </div>
            <div className="my-4">{H1("Regional")}</div>
            <select
              id="countries"
              value={editedData.regional_id}
              onChange={handleRegionChange}
              className="my-4 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            >
              <option value={0}>{editedData.regional_id}</option>
              {regionalData.data.map((region) => (
                <option key={region.id} value={region.id}>
                  {region.province} - {region.district}
                </option>
              ))}
            </select>
            <div className="my-4">{H1("Born Date")}</div>
            <div className="relative max-w-sm ">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
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
                value={editedData["born_date"]}
                onChange={(e) =>
                  setEditedData({
                    ...editedData,
                    born_date: e.target.value,
                  })
                }
                name="born_date"
              />
            </div>
            <div className="my-4">{H1("Address")}</div>
            <input
              type="text"
              value={editedData.address}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  address: e.target.value,
                })
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
            <button className="bg-black p-2 rounded-md" onClick={handleEdit}>
              <p className="text-white">send</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditingData;
