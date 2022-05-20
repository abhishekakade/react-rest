import "./App.css";
import { createContext, } from "react";
import useFetch from "./hooks/useFetch";
import Home from "./components/Home";

export const DataContext = createContext();

function App() {
  const URL = "https://gorest.co.in/public/v1/users";
  const { isLoading, serverError, apiData } = useFetch(URL);
  // console.log(isLoading, serverError, apiData);

  return (
    <div className="App">
      <DataContext.Provider value={{ isLoading, serverError, apiData }}>
        <Home />
      </DataContext.Provider>
    </div>
  );
}

export default App;
