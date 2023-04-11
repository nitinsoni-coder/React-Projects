import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Meal from "./Meal";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/meal-info" element={<Meal />} />
      </Routes>
    </>
  );
}

export default App;
