import React from "react";

const ErrorBoundary = (errorProps) => {
  const {isLoading, serverError, children} = errorProps;

  if (isLoading && !serverError) {
    return <h3>Loading...</h3>;
  } else if (serverError) {
    return <h3>Server Error! Try again later...</h3>;
  } else return children;
};

export default ErrorBoundary;
