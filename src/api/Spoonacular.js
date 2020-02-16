const API_KEY = 'bbcb691cf0c84258862750810dabb1be';

const RECIPE_NAME = ' '; 
const CUISINE = ' ';
const DIET = ' ';
const START = 0;
const NUMBER = 10;
const PATH_API_RECIPES = `https://api.spoonacular.com/recipes/search?apiKey=bbcb691cf0c84258862750810dabb1be&query=`; 
const PATH_API_RECIPE_DETAILS_START = `https://api.spoonacular.com/recipes/`;
const PATH_API_RECIPE_DETAILS_END = `/information?apiKey=`+API_KEY+`&includeNutrition=true`;
const RECIPE_ID = ' '; 
const PATH_API_RECIPES_BY_INGREDIENTS = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=bbcb691cf0c84258862750810dabb1be&ingredients=`; 
const INGREDIENTS = ''; 
const PATH_API_INGREDIENTS_AUTOC = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=bbcb691cf0c84258862750810dabb1be&number=10&metaInformation=true&query=`; 
const INGREDIENT_AUTOC = ' '; 



export async function getRecipesByRecipeNameCuisineDiet( recipeName, cuisine, diet, start, number ) {
    try {
      const url = PATH_API_RECIPES+`${recipeName || RECIPE_NAME}&cuisine=${cuisine || CUISINE}&diet=${diet || DIET}&offset=${start || START}&number=${number || NUMBER}`;  
  
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
  
    } catch (error) {
      console.log('Error with function getRecipesByDietAndCuisine ' + error.message);
      throw error;
    }

}

export async function getRecipeDetailsById( recipeId ) {
  try {
    const url = PATH_API_RECIPE_DETAILS_START+`${recipeId || RECIPE_ID}`+PATH_API_RECIPE_DETAILS_END;  

    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status);

  } catch (error) {
    console.log('Error with function getRecipeDetailsById ' + error.message + recipeId);
    throw error;
  }

}


export async function getRecipesByIngredients( ingredients) {
  try {
    const url = PATH_API_RECIPES_BY_INGREDIENTS+`${ingredients || INGREDIENTS}&number=10`;  

    const response = await fetch(url);
    if (response.ok) {
      return response.json();
    }
    throw new Error(response.status);

  } catch (error) {
    console.log('Error with function getRecipesByIngredients ' + error.message + ingredients); 
    throw error;
  }

}

