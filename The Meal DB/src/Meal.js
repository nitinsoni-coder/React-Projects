import React from "react";
import { useLocation } from "react-router-dom";

const Meal = () => {
  const { state } = useLocation();

  return (
    <div className="main-menu-container">
      <div className="main-menu-card">
        {state ? (
          state?.map((item, index) => {
            const tags = item.strTags && [item.strTags].join().split(",");

            const instructions = item.strInstructions.split("\r\n\r\n");

            let ingredientArray = [];
            for (let i = 1; i <= 20; i++) {
              const ingredient = item["strIngredient" + i];
              if (ingredient) {
                ingredientArray.push(ingredient);
              }
            }

            let measureArray = [];
            for (let i = 1; i <= 20; i++) {
              const measure = item["strMeasure" + i];

              if (measure && measure !== " ") {
                measureArray.push(measure);
              }
            }

            let newMeasureArr = [];
            for (let i = 0; i < measureArray.length; i++) {
              const newStr = `${ingredientArray[i]} ${measureArray[i]}`;

              newMeasureArr.push(newStr);
            }

            return (
              <div className="menu-card" key={index}>
                {/* upper section   */}
                <div className="card-upper-section">
                  {/* left section   */}
                  <div>
                    <img src={item.strMealThumb} className="meal-img" />
                  </div>

                  {/* right section   */}
                  <div>
                    <p className="meal-name">{item.strMeal}</p>
                    <p>
                      <span className="upper-section-span">Category :</span>
                      <span>{item.strCategory}</span>
                    </p>
                    <p>
                      <span className="upper-section-span">Recipe :</span>
                      <span>
                        <a href={item.strSource}>{item.strSource}</a>
                      </span>
                    </p>
                    <p>
                      <span className="upper-section-span">
                        YouTube Source :
                      </span>
                      <span>
                        <a href={item.strYoutube}>{item.strYoutube}</a>
                      </span>
                    </p>
                    <p>
                      <span className="upper-section-span">Tags :</span>
                      {tags ? (
                        tags?.map((tagItem, tagIndex) => (
                          <span className="tag-name" key={tagIndex}>
                            {tagItem}
                          </span>
                        ))
                      ) : (
                        <span>No Tags</span>
                      )}
                    </p>

                    <span className="ingredients-name">Ingredients :</span>
                    <div className="ingredients-section">
                      {ingredientArray?.map(
                        (ingredientVal, ingredientIndex) => (
                          <p key={ingredientIndex}>
                            <span className="ingredients-number">
                              {ingredientIndex + 1}
                            </span>
                            <span>{ingredientVal}</span>
                          </p>
                        )
                      )}
                    </div>
                  </div>
                </div>

                {/* bottom section   */}
                <span className="measure-name">Measure:</span>
                <div className="meal-container">
                  {newMeasureArr?.map((measureItem, measureIndex) => (
                    <p key={measureIndex}>
                      <i className="fas fa-weight-hanging"></i>
                      <span>{measureItem}</span>
                    </p>
                  ))}
                </div>

                <div>
                  <span className="instruction-name">Instructions: </span>
                  {instructions.map((items, instructionIndex) => (
                    <p className="instruction-detail" key={instructionIndex}>
                      <i className="fas fa-hand-point-right"></i>
                      <span>{items}</span>
                    </p>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="nobowl-container">
            <img src="./assets/no-bowl.jpg" className="nobowl" />
            <h1 className="no-found">No such meal found</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Meal;
