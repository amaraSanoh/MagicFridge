const PATH_RECIPE_IMAGES = 'https://spoonacular.com/recipeImages/'; 
const RECIPE_IMAGES_636x393 = '636x393'; 
const PATH_INGREDIENT_100_100 = 'https://spoonacular.com/cdn/ingredients_100x100/'; 

export function _getRecipeImgUri(image)
{
    return PATH_RECIPE_IMAGES+''+image; 
}

export function _getRecipeImgUriById(id)
{
    return PATH_RECIPE_IMAGES+''+id+''+RECIPE_IMAGES_636x393+'.jpg'; 
}

export function _getIngredientImage100(image)
{
    return PATH_INGREDIENT_100_100+''+image;
}