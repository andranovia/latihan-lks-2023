import { useEffect, useState, useCallback } from "react";
import axiosInstance from "@/tools/axiosIntance";
import { isEqual } from 'lodash';

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

interface inputDataItem {
  id_card_number: number;
  name: string;
  gender: string;
  password: string;
  address: string;
  born_date: string;
  regional_id: number;
}

interface InputDataProps {
  sendInputData: inputDataItem;
}

interface EditDataProps {
  editedData: dataItem;
}

const DataHooks = () => {
  const [data, setData] = useState<dataItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("api/v1/society");
        const newData = response.data.data;

        if (!isEqual(newData, data)) {
          setData(newData);
        }
      } catch (err) {
        console.error("Error fetching items:", err);
      }
    };
  
    fetchData();
  }, [data]);

  const AddData = ({ sendInputData }: InputDataProps) => {
    axiosInstance
      .post(`api/v1/society`, sendInputData)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const DeleteData = useCallback((id: number) => {
    axiosInstance
      .delete(`api/v1/society/${id}`)
      .then((res) => console.log(res))
      .catch((e) => console.log("error deleting data", e));
  }, []);

  const EditData = useCallback(({ editedData }: EditDataProps) => {
    let genderValue;
    if (editedData.gender === "laki-laki") {
      genderValue = "male";
    } else if (editedData.gender === "perempuan") {
      genderValue = "female";
    } else {
      genderValue = "unknown";
    }

    axiosInstance
      .put(`api/v1/society/${editedData.id_society}`, {
        id_card_number: editedData.id_card_number,
        password: editedData.password,
        name: editedData.name,
        born_date: editedData.born_date,
        gender: genderValue,
        address: editedData.address,
        regional_id: editedData.regional_id,
      })
      .then((res) => console.log(res))
      .catch((err) => console.log("Error updating data", err));
  }, []);

  return {
    data,
    DeleteData,
    EditData,
    AddData,
  };
};

export default DataHooks;
