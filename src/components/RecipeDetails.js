import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { _getRecipeImgUri, _getRecipeImgUriById, _getIngredientImage100 } from '../helpers/Helpers';
import { getRecipeDetailsById } from '../api/Spoonacular';
import { Colors } from '../../definitions/Colors';

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
                    <Text style={[styles.listDietOrCuisine, styles.textColor]} numberOfLines = { 1 }>{c}</Text>
                    <Text style={[styles.dietOrCuisineConst, styles.textColor]}>cuisine(s)</Text>
                </View>
                <View style={[{flexDirection: 'row'}]}>
                    <Text style={[styles.listDietOrCuisine, styles.textColor]} numberOfLines = { 1 }>{d}</Text>
                    <Text style={[styles.dietOrCuisineConst, styles.textColor]}>diet(s)</Text>
                </View>
            </View>
            
        ); 
    }

    const _cuisineTimeBlock = (recipe) => {
        return (
            <View style={[{marginTop: 25}]}>
                <Text style={styles.textColor}>Ready in {recipe.readyInMinutes} min, up to {recipe.servings} people</Text>
            </View>
        ); 
    }

    const IngredientHelperView = (ingredient) => {
        return (
            <View style={[ {flexDirection: 'row', marginBottom: 10}]}>
                <Image style={[styles.addMyRecipe, {marginRight: 5, alignSelf: 'center'}]} source={{ uri: _getIngredientImage100(ingredient.image) }} />
                <Text style={[styles.textColor, {paddingRight: 40}]} numberOfLines = { 3 } > {ingredient.original} </Text>
            </View>
        ); 
    }
    const _ingredientBlockView = (inMyFridge, missing) => { 
        return (
            <View style={{marginTop: 25}}>
                <Text style={styles.ingredientTitle}>Ingredients</Text>
                <View style={[{flexDirection: 'row', marginTop: 25}]}>
                    <View style={[{flex: 6}]}>
                        <Text style={[ styles.ingredientCategorie ]}>In my  fridge</Text>
                        <View >
                            {
                                inMyFridge.map(
                                    item => (
                                        <View key={item.id}>
                                            {IngredientHelperView(item)}
                                        </View>
                                    )
                                )
                            }     
                        </View>
                    </View>
                    <View style={[{flexDirection: 'row', flex: 1}]}>
                        <View style={[{flex: 1}]} />
                        <View style={[{flex: 1, borderLeftWidth: 1, borderLeftColor: Colors.mainGrayColor}]} />
                    </View>
                    <View style={[{flex: 6}]}>
                        <Text style={[ styles.ingredientCategorie ]}>Missing</Text>
                        <View>
                            {
                                missing.map(
                                    item => (
                                        <View key={item.id}>
                                            {IngredientHelperView(item)}
                                        </View>
                                    )
                                )
                            }
                        </View>
                    </View>
                </View>
            </View>
        ); 
    }

    const _checker = (tab, item) => {
        trouver = false;
        taille = tab.length;
        i = 0; 
        while(i < taille && !trouver)
        {
            if (tab[i].id == item.id) trouver = true;
            i++;
        }
        return trouver;
    }


    const _ingredientBlock = (extendedIngredients, myFridgecontent) => { 
        myFridgecontent = [
            // {
            //     "aisle": "Milk, Eggs, Other Dairy",
            //     "amount": 1,
            //     "consitency": "solid",
            //     "id": 1123,
            //     "image": "egg.png",
            //     "measures": {
            //       "metric": {
            //         "amount": 1,
            //         "unitLong": "large",
            //         "unitShort": "large",
            //       },
            //       "us": {
            //         "amount": 1,
            //         "unitLong": "large",
            //         "unitShort": "large",
            //       },
            //     },
            //     "meta": [],
            //     "metaInformation": [],
            //     "name": "egg",
            //     "original": "1 large egg",
            //     "originalName": "egg",
            //     "originalString": "1 large egg",
            //     "unit": "large",
            // }
        ]; 
        inMyFridge = []; 
        missing = []; 
        extendedIngredients.forEach(ingredient => {
            if(_isInMyFridge(ingredient, myFridgecontent))
            {
                trouver = _checker(inMyFridge, ingredient); 
                if(!trouver) inMyFridge.push(ingredient);  
            }
            else 
            {
                trouver = _checker(missing, ingredient);
                if(!trouver) missing.push(ingredient);
            }
        });

        // console.log(missing);
        return (  _ingredientBlockView(inMyFridge, missing)  ); 
    }


    const _isInMyFridge = (ingredient, inMyFridge) => {
        var length = inMyFridge.length;
        for(var i = 0; i < length; i++) {
            if(inMyFridge[i].id == ingredient.id) return true;
        }
        return false;
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
                    <View style={styles.containerWithoutImg}>
                        { _titleBlock() }
                        { _cuisinesAndDietsBlock(recipe.cuisines, recipe.diets) }
                        { _cuisineTimeBlock(recipe) }
                        { _ingredientBlock(recipe.extendedIngredients, []) }
                    </View>
                </View>
            );
        }
        return null;
    }


    return (
        <ScrollView style={styles.container}>
            { _displayLoading() }
            { _displayRecipeDetails()}
        </ScrollView>
    );
}

export default RecipeDetails; 

const styles = StyleSheet.create({
    container: {
        flex: 1
    }, 
    containerWithoutImg: {
        backgroundColor: '#fff',
        margin: 15, 
    }, 
    recipeImage: {
        height: 200,
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
    }, 
    textColor : {
        color: Colors.mainDetailsTextColor
    }, 
    ingredientCategorie: { 
        color: Colors.mainOrangeColor, 
        alignSelf: 'center', 
        marginBottom: 15, 
        fontStyle: 'italic'
    }
});
