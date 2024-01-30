import { Outlet } from "react-router-dom";
import { useState } from "react";

import Navbar from "../../Components/Navbar";
import Footer from "../../Components/Footer";

import LocationContext from '../../Contexts/LocationContext';

const Root = () => {
  const [selectedPlace, setSelectedPlace] = useState({ value: "auto:ip", label: 'Search location....' });

  return (
    <LocationContext.Provider value={{ selectedPlace, setSelectedPlace }}>
      <Navbar />
      <Outlet />
      <Footer />
    </LocationContext.Provider>
  );
};

export default Root;
