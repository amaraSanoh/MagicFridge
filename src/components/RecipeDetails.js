import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { _getRecipeImgUri, _getRecipeImgUriById } from '../helpers/Helpers';
import { getRecipeDetailsById } from '../api/Spoonacular';

const RecipeDetails = ({navigation}) => {
    const [recipe, setRecipe] = useState([]);
    const [erreurRecipe, setErreurRecipe] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const cuisinesDietsData = useRef( {currentCuisines: ' ', currentDiets: ' '} ); 

    const _getCuisines = () => {
        return cuisinesDietsData.current.currentCuisines; 
    }

    const _addCuisine = (cuisine) => {
        var cuisines = _getCuisines();
        if(cuisines.length == 0) cuisinesDietsData.current.currentCuisines = cuisine; 
        else cuisinesDietsData.current.currentCuisines += ', '+cuisine;
    }

    const _getDiets = () => {
        return cuisinesDietsData.current.currentDiets; 
    }

    const _addDiet = (diet) => {
        var diets = _getCuisines();
        if(diets.length == 0) cuisinesDietsData.current.currentDiets = diet; 
        else cuisinesDietsData.current.currentDiets += ', '+diet;
    }


    useEffect(() => {
        _loadRecipe(); 
    }, []); //le deuxième paramètre permet de ne pas appeler la fonction à chaque fois
      

    const _loadRecipe = async () => {
        setErreurRecipe(false); 
        setIsLoading(true);
        try {
            var spoonacularRecipeDetailsResult = ( await getRecipeDetailsById( navigation.getParam("recipeId") ) );
            setRecipe( spoonacularRecipeDetailsResult ); 
            setIsLoading(false);
        } catch (error) {
            setRecipe([]);
            setErreurRecipe(true);
            setIsLoading(false); 
        }
    }

  
    const _titleBlock = () => {
        return(
            <View style={styles.blocText}>
                <Text style={styles.recipeName} numberOfLines = { 1 }>{recipe.title}</Text>
                <Image style={styles.addMyRecipe} source={{ uri: 'image' }} />
            </View>
        ); 
    }

    const _cuisinesAndDietsBlock = (cuisines, diets) => {
        cuisines.forEach(element => { _addCuisine(element); });
        diets.forEach(element => { _addDiet(element); });
        return (
            <View>
                <Text>{_getCuisines()} cuisine(s)</Text>
                <Text>{_getDiets()} diet(s)</Text>
            </View>
        ); 
    }


    const _displayLoading = () => {
        if (isLoading && !erreurRecipe) 
        {
          return (
              <ActivityIndicator size="large" />
          );
        }
        return null;
    }

    const _displayRecipeDetails = () => {
        if(!isLoading && !erreurRecipe)
        {
            return (
                <View>
                    <Image style={styles.recipeImage} source={{ uri: recipe.image }} />
                    {_titleBlock()}
                    { _cuisinesAndDietsBlock(recipe.cuisines, recipe.diets) }
                </View>
            );
        }
        return null;
    }


    return (
        <View style={styles.container}>
            { _displayLoading() }
            { _displayRecipeDetails()}
        </View>
    );
}

export default RecipeDetails; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        margin: 15, 
    }, 
    recipeImage: {
        height: 130,
        backgroundColor: 'orange'
    },
    blocText:{
        flexDirection: 'row', 
        marginTop: 5 
    },
    recipeName: {
        fontWeight: 'bold',
        fontSize: 16,
        paddingTop: 5, 
        marginRight: 22, 
        maxWidth: 278
    }, 
    addMyRecipe:{
        height: 30,
        width: 30,
        backgroundColor: 'orange'
    }
});
