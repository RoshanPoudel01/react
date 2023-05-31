import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import apiCall from "../../helper/Axios";

const Success = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    checkStatus();
  }, []);
  const checkStatus = async () => {
    const result = await apiCall.get(
      `booking/payment-status/?id=${id}`
    );
    console.log(result);
  };
  //localhost:9000/api/booking/payment-status/?id=644fd5d1cab8856b09a08ff5
  http: return <div>Success{id}</div>;
};

export default Success;
