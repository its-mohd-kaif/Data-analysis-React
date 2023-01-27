import { createContext, useState } from "react";
import Country from "./Components/Country";
import LandingPage from "./Components/LandingPage";
import Unidesc from "./Components/Unidesc";
import UniqueId from "./Components/UniqueId";
export const dataContext = createContext();
// export const descContext = createContext();
function App() {
  const [data, setData] = useState([]);
  const [id, setId] = useState([]);
  const [desc, setDesc] = useState([]);
  return (
    <div>
      <dataContext.Provider value={{ data, setData, desc, setDesc, id, setId }}>
        <LandingPage />
        <UniqueId />
        <Unidesc />
        <Country />
      </dataContext.Provider>
    </div>
  );
}

export default App;
