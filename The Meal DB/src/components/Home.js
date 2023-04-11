import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const searchItem = formData.get("input_field");

    form.reset();
    const mealDetail = await fetchProduct(searchItem);

    if (searchItem.length > 0) {
      navigate("/meal-info", { state: mealDetail });
    } else {
      toast.warning("Please enter your meal name");
    }
  };

  const fetchProduct = async (searchItem) => {
    const fetchMealProduct = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchItem}`
    );

    const data = await fetchMealProduct.json();

    return data.meals;
  };

  return (
    <>
      <div className="bg-img"></div>
      <div className="main">
        <form onSubmit={handleSubmit} className="input-section">
          <input
            type="text"
            id="input_field"
            name="input_field"
            placeholder="Enter your meal name"
          />
          <button type="submit" className="search-btn">
            Search
          </button>
        </form>
        <p className="fav-cus">What are your favourite cuisines?</p>
        <p className="describe-span">Personalize your experience</p>
      </div>
    </>
  );
};

export default Home;
