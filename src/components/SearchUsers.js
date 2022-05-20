import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../styles/SearchUsers.css";

const SearchUsers = (props) => {
  const { passChildData } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [apiData, setApiData] = useState([]);
  const [serverError, setServerError] = useState(null);

  const [finalURL, setFinalURL] = useState("");

  let URL = "https://gorest.co.in/public/v1/users?";

  const [idParam, nameParam, emailParam] = ["id=", "name=", "email="];

  const handleKeyPress = (event) => {
    let targetVal = event.target.value.trim();
    if (event.key === "Enter") {
      // console.log("enter pressed");
      // console.log(targetVal);

      let emailRegex = new RegExp(
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/g
      );
      // console.log(emailRegex.test(targetVal));

      if (emailRegex.test(targetVal)) {
        console.log("email:", targetVal);
        emailParam && targetVal && setFinalURL(URL + emailParam + targetVal);
      } else if (parseInt(targetVal)) {
        console.log("num:", targetVal);
        idParam && targetVal && setFinalURL(URL + idParam + targetVal);
      } else {
        console.log("string:", targetVal);
        nameParam && targetVal && setFinalURL(URL + nameParam + targetVal);
      }
    }
  };

  console.log("finalURL", finalURL);

  useEffect(() => {
    if (finalURL) {
      setIsLoading(true);
      const fetchData = async () => {
        try {
          const resp = await axios.get(finalURL);
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
    }
  }, [finalURL]);

  useEffect(() => {
    !isLoading && !serverError && passChildData(apiData?.data);
  }, [apiData?.data, isLoading, passChildData, serverError]);

  // show the user input value to console
  const getInputValue = (event) => {
    let targetVal = event.target.value.trim();
    console.log(targetVal);
  };

  return (
    <div>
      <p>Search</p>
      <div className="wrapper">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <input
          type="search"
          onChange={getInputValue}
          onKeyPress={handleKeyPress}
          placeholder="Search for ID Name or Email"
        />
      </div>
    </div>
  );
};

export default SearchUsers;
