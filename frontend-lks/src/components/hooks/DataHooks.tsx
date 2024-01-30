import { useEffect, useState, useCallback } from "react";
import axiosInstance from "@/tools/axiosIntance";
import { useSave } from "@/components/contexts/SaveContext";

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



const DataHooks = () => {
  const [data, setData] = useState<dataItem[]>([]);

  const { setIsChangesSaved } = useSave();


 

  const fetchData = useCallback(async () => {
    try {
      const response = await axiosInstance.get("api/v1/society");
      return response.data.data;
    } catch (error) {
      console.log(error);
    }
  }, []);

  
  useEffect(() => {
    fetchData().then(setData);
  }, []);

  const AddData = ({ sendInputData }: InputDataProps) => {
    axiosInstance
      .post(`api/v1/society`, sendInputData)
      .then(() => setIsChangesSaved(true))
      .catch((err) => console.log(err));
  };

 


  return {
    data,
    AddData,
  };
};

export default DataHooks;
