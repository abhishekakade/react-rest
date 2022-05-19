import { useEffect, useState } from "react";
import axios from "axios";

const useFetch = (url) => {
  // console.log(url);

  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [serverError, setServerError] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      try {
        const resp = await axios.get(url);
        const data = await resp?.data;

        setApiData(data);
        setIsLoading(false);
      } catch (err) {
        setServerError(err);
        setIsLoading(false);
        console.error(err);
      }
    };

    fetchData();
    // https://gorest.co.in/public/v1/users?page=1
  }, [url]);

  console.log("fetching data...");
  return { isLoading, apiData, serverError };
};

export default useFetch;
