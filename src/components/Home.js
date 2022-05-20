import ErrorBoundary from "./ErrorBoundary";
import React, { useContext, useState, useEffect } from "react";
import { DataContext } from "../App";
import ReactPaginate from "react-paginate";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faPerson,
  faPersonDress,
  faAngleLeft,
  faAngleRight,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/Home.css";
import SearchUsers from "./SearchUsers";

const Home = () => {
  // using ContextAPI to share fetched API data between components
  const usersData = useContext(DataContext);

  const { isLoading, serverError, apiData } = usersData;
  //   console.log("usersData", isLoading, serverError, apiData);

  const usersPerPage = 6;
  const [users, setUsers] = useState([]);
  // start index for slice of first 6 users on initial load
  const [startInd, setStartInd] = useState(0);
  // last index for slice of first 6 users on initial load
  const [lastInd, setLastInd] = useState(6);
  // array of current 6 users being displayed on page
  const [currentSixUsers, setCurrentSixUsers] = useState([]);

  // to get search component data
  const [searchedUsersData, setSearchedUsersData] = useState([]);

  const [ascending, descending] = ["ascending", "descending"];
  const [sort, setSort] = useState(ascending);

  useEffect(() => {
    if (apiData) {
      setUsers(apiData?.data);
      setCurrentSixUsers(users?.slice(startInd, lastInd));
    }
  }, [apiData, lastInd, startInd, users]);

  useEffect(() => {
    if (searchedUsersData) {
      setUsers(searchedUsersData);
      setCurrentSixUsers(users?.slice(startInd, lastInd));
    }
  }, [lastInd, searchedUsersData, startInd, users]);

  // console.log(currentSixUsers);

  const handlePageClick = (event) => {
    // console.log("handle page click", event.selected, typeof event.selected);

    let startArrInd = parseInt(event?.selected) * usersPerPage;
    let lastArrInd = parseInt(event?.selected + 1) * usersPerPage;
    setStartInd(startArrInd);
    setLastInd(lastArrInd);

    // console.log((event?.selected + 1) * 6);
    // console.log(users.slice(startArrInd, lastArrInd));
  };

  const genderIcon = (gender) => {
    if (gender.toLowerCase() === "male") {
      return <FontAwesomeIcon icon={faPerson} />;
    } else if (gender.toLowerCase() === "female") {
      return <FontAwesomeIcon icon={faPersonDress} />;
    } else return;
  };

  const activeStatus = (status) => {
    if (status.toLowerCase() === "active") {
      return " active";
    } else if (status.toLowerCase() === "inactive") {
      return " inactive";
    }
  };

  const handleIdSort = (e) => {
    let sortedCurrentUsers;

    // change fa icon color depending on which sort
    e.target.className = sort;
    if (sort === ascending) {
      sortedCurrentUsers = [...currentSixUsers].sort((a, b) => a.id - b.id);
      setSort(descending);
    }

    if (sort === descending) {
      sortedCurrentUsers = [...currentSixUsers].sort((a, b) => b.id - a.id);
      setSort(ascending);
    }

    // console.log(sortedCurrentUsers);
    setCurrentSixUsers(sortedCurrentUsers);

    // console.log("handle id sort");
  };

  const handleNameSort = (e) => {
    let sortedCurrentUsers;

    // change fa icon color depending on which sort
    e.target.className = sort;

    if (sort === ascending) {
      sortedCurrentUsers = [...currentSixUsers].sort((a, b) =>
        a.name?.split(" ")[0].toLowerCase() >
        b.name?.split(" ")[0].toLowerCase()
          ? 1
          : -1
      );

      setSort(descending);
    }

    if (sort === descending) {
      sortedCurrentUsers = [...currentSixUsers].sort((a, b) => {
        let aFirstName = a.name?.split(" ")[0].toLowerCase();
        let bFirstName = b.name?.split(" ")[0].toLowerCase();
        let aLastName = a.name?.split(" ")[1].toLowerCase();
        let bLastName = b.name?.split(" ")[1].toLowerCase();

        if (aFirstName === bFirstName) {
          if (aLastName < bLastName) {
            return 1;
          } else return -1;
        }

        if (aFirstName < bFirstName) return 1;
        else return -1;
      });
      setSort(ascending);
    }

    // console.log("name sort", sortedCurrentUsers);
    setCurrentSixUsers(sortedCurrentUsers);

    // console.log("handle name sort");
  };

  // console.log("searchedUsersData", searchedUsersData);

  return (
    <ErrorBoundary serverError={serverError} isLoading={isLoading}>
      <SearchUsers passChildData={setSearchedUsersData} />
      <table id="users-table" cellSpacing="0">
        {/* <table id="users-table"> */}
        <thead>
          <tr>
            <th id="user-id-column" onClick={(e) => handleIdSort(e)}>
              ID <FontAwesomeIcon icon={faSortUp} />
              <FontAwesomeIcon icon={faSortDown} />
            </th>
            <th id="user-name-column" onClick={(e) => handleNameSort(e)}>
              Name <FontAwesomeIcon icon={faSortUp} />
              <FontAwesomeIcon icon={faSortDown} />
            </th>
            <th>Email</th>
            <th>Gender</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {currentSixUsers?.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.name}</td>
              <td>
                <FontAwesomeIcon icon={faEnvelope} />
                {user.email}
              </td>
              <td className="gender">
                {genderIcon(user.gender)}
                {user.gender}
              </td>
              <td>
                <span className={activeStatus(user.status)}>{user.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        previousLabel={<FontAwesomeIcon icon={faAngleLeft} />}
        nextLabel={<FontAwesomeIcon icon={faAngleRight} />}
        onPageChange={handlePageClick}
        pageCount={users?.length ? Math.ceil(users?.length / usersPerPage) : 3}
        className="react-paginate"
        // pageRangeDisplayed={3}
        activeLinkClassName="active-paginate-link"
        previousLinkClassName="previous-paginate-link"
        nextLinkClassName="next-paginate-link"
      />
    </ErrorBoundary>
  );
};

export default Home;
