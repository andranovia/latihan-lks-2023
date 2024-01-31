import axiosInstance from "@/tools/axiosIntance";
import React, { useEffect, useState } from "react";

interface RegionalDataItem {
  data: {
    id: number;
    province: string;
    district: string;
  }[];
}

const RegionalHooks = () => {
  const [regionalData, setRegionalData] = useState<RegionalDataItem>({ data: [] });

  useEffect(() => {
    axiosInstance
      .get("/api/v1/regionals/")
      .then((res) => setRegionalData(res.data))
      .catch((err) => console.log(err));
  }, []);

  return {
    regionalData,
  };
};

export default RegionalHooks;
