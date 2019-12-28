const API_KEY = 'bbcb691cf0c84258862750810dabb1be';

const RECIPE_NAME = ' '; 
const CUISINE = ' ';
const DIET = ' ';
const START = 0;
const NUMBER = 10;


export async function getRecipesByRecipeNameCuisineDiet( recipeName, cuisine, diet, start, number ) {
    try {
      const url = `https://api.spoonacular.com/recipes/search?apiKey=bbcb691cf0c84258862750810dabb1be&query=${recipeName || RECIPE_NAME}&cuisine=${cuisine || CUISINE}&diet=${diet || DIET}&offset=${start || START}&number=${number || NUMBER}`;  
  
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