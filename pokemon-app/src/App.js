import React, { useState } from "react";
import { toast } from "react-toastify";
import "./App.css";

const App = () => {
  const [pokemonDetail, setPokemonDetail] = useState([]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const searchItem = formData.get("input_field");

    form.reset();

    if (searchItem.length > 0) {
      await fetchPokemonDetail(searchItem);
    } else {
      toast.warning("Enter your Pokemon name");
    }
  };

  const fetchPokemonDetail = async (searchItem) => {
    const fetchMealProduct = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${searchItem}`
    );

    const data = await fetchMealProduct.json();

    setPokemonDetail([data]);
  };

  return (
    <>
      <div className="main-div">
        <div className="main">
          <form onSubmit={handleSubmit} className="input-section">
            <input
              type="text"
              id="input_field"
              name="input_field"
              placeholder="Enter your favourite pokemon name"
            />
            <button type="submit" className="search-btn">
              Search
            </button>
          </form>
          <p className="fav-cus">Search your favourite Pokemon</p>
          <p className="describe-span">Personalize your experience</p>
        </div>
        {pokemonDetail.length > 0 ? (
          pokemonDetail?.map((items, index) => {
            const power = items.types.map((val) => {
              console.log(val.type);
              return val.type.name;
            });

            return (
              <div className="container" key={index}>
                <div className="pokie-card">
                  <img
                    src={items.sprites.other.dream_world.front_default}
                    className="pokemon-img"
                    alt="pokemon-img"
                  />
                  <p className="pokie-name">{items.name}</p>
                  <div className="pokie-main-detail">
                    <p>
                      <span>Height : </span>
                      <span>{items.height}</span>
                    </p>
                    <p>
                      <span>Weight : </span>
                      <span>{items.weight}</span>
                    </p>
                    <p>
                      <span>Power : </span>
                      <span>{power[0]}</span>
                    </p>
                  </div>
                </div>

                <div>
                  <p className="skill-head">Pokemon Skills</p>
                  <div className="pokie-stats">
                    {items.stats.map((skill) => {
                      const skillName =
                        skill.stat.name[0].toUpperCase() +
                        skill.stat.name.slice(1);

                      console.log("---skillName---", skillName);
                      return (
                        <p className="skill-para">
                          <span>{skillName} : </span>
                          <span>{skill.base_stat}</span>
                        </p>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div>
            <img src="./assets/pokie.gif" className="pokie-loader" />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
