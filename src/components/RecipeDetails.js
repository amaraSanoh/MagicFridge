import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { _getRecipeImgUri, _getRecipeImgUriById } from '../helpers/Helpers';
import { getRecipeDetailsById } from '../api/Spoonacular';

const RecipeDetails = ({navigation}) => {
    const [recipe, setRecipe] = useState([]);
    const [erreurRecipe, setErreurRecipe] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


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
  
        var c = "";
        for(var i=0, cl = cuisines.length; i< cl; i++)
        {
            if(i < cl - 1 && i > 0) c += ", "+cuisines[i];
            else if(i == 0) c = cuisines[i];
        }
        if(c == "") c = "No cuisine has been selected";

        var d = "";
        for(var i=0, dl = diets.length; i< dl; i++)
        {
            if(i < dl - 1 && i > 0) d += ", "+diets[i];
            else if(i == 0) d = diets[i];
        }
        if(d == "") d = "No diet has been selected";

        return (
            <View style={{marginTop: 25}}>
                <View style={[{flexDirection: 'row'}]}>
                    <Text style={styles.listDietOrCuisine} numberOfLines = { 1 }>{c}</Text>
                    <Text style={styles.dietOrCuisineConst}>cuisine(s)</Text>
                </View>
                <View style={[{flexDirection: 'row'}]}>
                    <Text style={styles.listDietOrCuisine} numberOfLines = { 1 }>{d}</Text>
                    <Text style={styles.dietOrCuisineConst}>diet(s)</Text>
                </View>
            </View>
            
        ); 
    }

    const _cuisineTimeBlock = (recipe) => {
        return (
            <View style={{marginTop: 25}}>
                <Text>Ready in {recipe.readyInMinutes} min, up to {recipe.servings} people</Text>
            </View>
        ); 
    }

    const _ingredientBlock = (recipe) => {
        return (
            <View style={{marginTop: 25}}>
                <Text style={styles.ingredientTitle}>Ingredients</Text>
                <View style={[{flexDirection: 'row', marginTop: 25}]}>
                    <View style={[{flex: 1}]}>
                        <Text>gfgsdfhgfdsgh</Text>
                        <Text>gfgsdfhgfdsgh</Text>
                        <Text>gfgsdfhgfdsgh</Text>
                    </View>
                    <View style={{flex: 1}}>
                        <View style={[{flexDirection: 'row'}]}>
                            <View style={[{flex: 1}]} />
                            <View style={[styles.verticalBar]} />
                        </View>
                    </View>
                    <View style={[{flex: 1}]}>
                        <Text>gfgsdfhgfdsgh</Text>
                        <Text>gfgsdfhgfdsgh</Text>
                        <Text>gfgsdfhgfdsgh</Text>
                        <Text>gfgsdfhgfdsgh</Text>
                    </View>
                </View>
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
                    { _titleBlock() }
                    { _cuisinesAndDietsBlock(recipe.cuisines, recipe.diets) }
                    { _cuisineTimeBlock(recipe) }
                    { _ingredientBlock(recipe) }
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
    }, 
    listDietOrCuisine:{
        flex: 2, 
        marginRight: 10
    }, 
    dietOrCuisineConst:{
        flex: 1
    }, 
    ingredientTitle: {
        fontWeight: 'bold',
        fontSize: 14,
        paddingTop: 5, 
        marginRight: 22, 
        maxWidth: 278
    }, 
    verticalBar: {
        borderLeftColor: '#aeafa9', 
        borderLeftWidth: 2, 
        flex: 1
    } 
});
