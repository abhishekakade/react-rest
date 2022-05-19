import { useContext } from "react";
import { DataContext } from "../App";

const useContextData = () => {
  // using ContextAPI to share fetched API data between components
  const allAPIData = useContext(DataContext);
  // console.log("allAPIData", allAPIData);

  const { apiData, isLoading, serverError } = allAPIData;

  // console.log(
  //   apiData,
  //   isLoading,
  //   serverError,
  // );

  return {
    apiData,
    isLoading,
    serverError,
  };
};

export default useContextData;
