import React, { useState } from "react";
import { toast } from "react-toastify";
import "./App.css";

const App = () => {
  const [movieDetail, setMovieDetail] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const searchItem = formData.get("input_field");

    form.reset();

    if (searchItem.length > 0) {
      await fetchMovieDetail(searchItem);
    } else {
      toast.warning("Enter Movie Name");
    }
  };

  const fetchMovieDetail = async (searchItem) => {
    const fetchMealInfo = await fetch(
      `http://www.omdbapi.com/?i=tt3896198&apikey=c2818fc0&t=${searchItem}`
    );

    const data = await fetchMealInfo.json();

    setMovieDetail([data]);
  };

  return (
    <>
      <div className="main-div">
        <div className="main">
          <form onSubmit={handleSubmit} className="input-section">
            <p className="fav-cus">Search your favourite Movie Name</p>
            <p className="describe-span">Personalize your experience</p>
            <div className="input-fields">
              <input
                type="text"
                id="input_field"
                name="input_field"
                placeholder="Enter movie name"
              />
              <button type="submit" className="search-btn">
                Search
              </button>
            </div>
          </form>
        </div>

        {movieDetail?.map((item) => {
          return (
            <div className="movie-container">
              <div className="left-section">
                <img src={item?.Poster} alt="movie-img" />
                <p>
                  <span>Title : </span>
                  <span>{item.Title}</span>
                </p>
                <p>
                  <span>Actors : </span>
                  <span>{item.Actors}</span>
                </p>
                <p>
                  <span>Director : </span>
                  <span>{item.Director}</span>
                </p>
                <p>
                  <span>Writer : </span>
                  <span>{item.Writer}</span>
                </p>
              </div>

              <div className="right-section">
                      <p><span>Plot : </span><span>{item.Plot}</span></p>
                      <p><span>Awards : </span><span>{item.Awards}</span></p>
                      <p><span>BoxOffice : </span><span>{item.BoxOffice}</span></p>
                      <p><span>Country : </span><span>{item.Country}</span></p>
                      <p><span>DVD : </span><span>{item.DVD}</span></p>
                      <p><span>Genre : </span><span>{item.Genre}</span></p>
                      <p><span>Language : </span><span>{item.Language}</span></p>
                      <p><span>Metascore : </span><span>{item.Metascore}</span></p>
                      <p><span>Rated : </span><span>{item.Rated}</span></p>
                      <p><span>Released : </span><span>{item.Released}</span></p>
                      <p><span>Runtime : </span><span>{item.Runtime}</span></p>
                      <p><span>Year : </span><span>{item.Year}</span></p>
                      <p><span>imdbID : </span><span>{item.imdbID}</span></p>
                      <p><span>imdbRating : </span><span>{item.imdbRating}</span></p>
                      <p><span>imdbVotes : </span><span>{item.imdbVotes}</span></p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default App;
