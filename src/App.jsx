import { useState } from "react";
import Banner from "./components/Banner";
import Header from "./components/Header";
import OurRecipes from "./components/OurRecipes";
import Recipes from "./components/Recipes";
import Sidebar from "./components/Sidebar";

const App = () => {
  const [recipeQueue, setRecipeQueue] = useState([]);
  const [preparedRecipe, setPreparedRecipe] = useState([]);
  const [totalTime, setTotalTime] = useState(0);
  const [totalCalries, settotalCalries] = useState(0);

  const addRecipeToQueue = (recipe) => {
    // console.log(recipe);

    const isExist = recipeQueue.find(
      (previousRecipe) => previousRecipe.recipe_id === recipe.recipe_id
    );

    if (!isExist) {
      setRecipeQueue([...recipeQueue, recipe]);
    } else {
      alert("Recipe already exists in queue");
    }
  };

  // console.log(recipeQueue);

  const handleRemove = (id) => {
    // find which recipe to remove
    const deletedRecipe = recipeQueue.find((recipe) => recipe.recipe_id === id);

    // remove from want to cook table
    const updatedQueue = recipeQueue.filter(
      (recipe) => recipe.recipe_id !== id
    );
    setRecipeQueue(updatedQueue);
    setPreparedRecipe([...preparedRecipe, deletedRecipe]);
  };

  const calculateTimeAndCalories = (time, calories) => {
    setTotalTime(totalTime + time);
    settotalCalries(totalCalries + calories);
  };

  return (
    <div className="container mx-auto px-4">
      {/* Header */}
      <Header />
      {/* Banner */}
      <Banner />
      {/* Our Recipes Section */}
      <OurRecipes />
      {/* Recipe Cards Section */}
      <section className="flex flex-col md:flex-row gap-6">
        {/* Cards section */}
        <Recipes addRecipeToQueue={addRecipeToQueue}></Recipes>
        {/* Sidebar */}
        <Sidebar
          handleRemove={handleRemove}
          recipeQueue={recipeQueue}
          preparedRecipe={preparedRecipe}
          calculateTimeAndCalories={calculateTimeAndCalories}
          totalTime={totalTime}
          totalCalries={totalCalries}
        ></Sidebar>
      </section>
    </div>
  );
};

export default App;
