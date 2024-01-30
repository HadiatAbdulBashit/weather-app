import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "../../Components/Navbar";

import LocationContext from '../../Contexts/LocationContext';

const Root = () => {
  const [selectedPlace, setSelectedPlace] = useState({ value: "auto:ip" });

  return (
    <LocationContext.Provider value={{ selectedPlace, setSelectedPlace }}>
      <Navbar />
      <Outlet />
    </LocationContext.Provider>
  );
};

export default Root;
