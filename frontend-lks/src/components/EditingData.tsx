import { H1 } from "@/components/Typography";
import axiosInstance from "@/tools/axiosIntance";
import React, { Dispatch, SetStateAction, useState } from "react";
import { useSave } from "./contexts/SaveContext";

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
            <input
              type="text"
              value={editedData.gender}
              onChange={(e) =>
                setEditedData({
                  ...editedData,
                  gender: e.target.value,
                })
              }
              className="text-black p-2"
            />
            <div className="my-4">{H1("address")}</div>
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
