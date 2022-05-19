import React, { Fragment, useContext, useState, useEffect } from "react";
import { DataContext } from "../App";
import ReactPaginate from "react-paginate";
import ErrorBoundary from "./ErrorBoundary";
import "../styles/Home.css";

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

  useEffect(() => {
    if (apiData) {
      setUsers(apiData?.data);
    }
  }, [apiData]);

  const handlePageClick = (event) => {
    // console.log("handle page click", event.selected, typeof event.selected);

    let startArrInd = parseInt(event?.selected) * usersPerPage;
    let lastArrInd = parseInt(event?.selected + 1) * usersPerPage;
    setStartInd(startArrInd);
    setLastInd(lastArrInd);

    // console.log((event?.selected + 1) * 6);
    // console.log(users.slice(startArrInd, lastArrInd));
  };

  return (
    <ErrorBoundary errorProps={(serverError, isLoading)}>
      <Fragment>
        <table id="users-table" cellSpacing="0">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Gender</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {users?.slice(startInd, lastInd).map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.gender}</td>
                <td>{user.status}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <ReactPaginate
          previousLabel={"<<"}
          nextLabel={">>"}
          onPageChange={handlePageClick}
          pageCount={Math.ceil(users?.length / usersPerPage)}
          className="react-paginate"
        />
      </Fragment>
    </ErrorBoundary>
  );
};

export default Home;
