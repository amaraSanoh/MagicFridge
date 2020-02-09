const API_KEY = 'bbcb691cf0c84258862750810dabb1be';
const PATH_API_INGREDIENTS_AUTOC = `https://api.spoonacular.com/food/ingredients/autocomplete?apiKey=bbcb691cf0c84258862750810dabb1be&number=10&metaInformation=true&query=`; 
const INGREDIENT_AUTOC = ' '; 


export async function getIngredientsAutoc( ingredientAutoc ) {
    try {
      const url = PATH_API_INGREDIENTS_AUTOC+`${ingredientAutoc || INGREDIENT_AUTOC}`;  
  
      const response = await fetch(url);
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.status);
  
    } catch (error) {
      console.log('Error with function getIngredientsAutoc ' + error.message + ingredients); 
      throw error;
    }
  
}