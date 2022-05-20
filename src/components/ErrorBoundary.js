import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleNotch,
  faExclamationCircle,
} from "@fortawesome/free-solid-svg-icons";

const ErrorBoundary = (props) => {
  const { isLoading, serverError, children } = props;
  // console.log("isLoading", isLoading, "serverError", serverError);

  if (isLoading && !serverError) {
    return (
      <div>
        <h3>
          <FontAwesomeIcon icon={faCircleNotch} />
        </h3>
        <h3>Loading...</h3>
      </div>
    );
  } else if (serverError) {
    return (
      <div>
        <h3><FontAwesomeIcon icon={faExclamationCircle} /></h3>
        <h3>Server Error! Try again later...</h3>
      </div>
    );
  } else return children;
};

export default ErrorBoundary;
