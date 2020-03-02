import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Button, Image, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { _getIngredientImage100 } from '../helpers/IngredientHelpers';
import { getRecipeDetailsById } from '../api/Spoonacular';
import { Colors } from '../../definitions/Colors';
import { connect } from 'react-redux';
import { MyIcons } from '../../definitions/MyIcons';
import { Icon } from 'react-native-elements'; 
import { totalCreditPerDay, UPDATE_CREDIT, updateCredit } from '../constants/CreditConstant';

const RecipeDetails = ({navigation, savedRecipes, dispatch, ingredientsInMyFridge}) => {
    const [recipe, setRecipe] = useState([]);
    const [erreurRecipe, setErreurRecipe] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        _loadRecipe(); 
    }, []); //le deuxième paramètre permet de ne pas appeler la fonction à chaque fois
      
    const _updateCredit = async (headers) => {
        let action = updateCredit(headers);
        if(action == null) return;
        dispatch(action);  
    }

    const _loadRecipe = async () => {
        setErreurRecipe(false); 
        setIsLoading(true);
        try {
            let datas = ( await getRecipeDetailsById( navigation.getParam("recipeId") ) );
            let spoonacularRecipeDetailsResult = datas.data; 
            let headers = datas.headers;
            setRecipe( spoonacularRecipeDetailsResult ); 
            setIsLoading(false);

            _updateCredit(headers); 
        } catch (error) {
            setRecipe([]);
            setErreurRecipe(true);
            setIsLoading(false); 
        }
    }

  
    const _titleBlock = (recipe) => {
        return(
            <View style={styles.blocText}>
                <Text style={styles.recipeName} numberOfLines = { 1 }>{recipe.title}</Text>
                { _saveRecipeHelper(recipe) }
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

    const _ingredientHelperView = (ingredient) => {
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
                                            {_ingredientHelperView(item)}
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
                                            {_ingredientHelperView(item)}
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
        // myFridgecontent = []; 
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

    const _instructionsBlock = (analyzedInstructions) => 
    {
        if(typeof analyzedInstructions !== 'undefined')
        {
            steps = analyzedInstructions.steps; 
            return (
                <View style={{marginTop: 25}}>
                    <Text style={styles.ingredientTitle}>Instructions</Text>
                    <View >
                        {
                            steps.map(
                                item => (
                                    <View key={item.number}>
                                        {_instructionsHelperView(item)}
                                    </View>
                                )
                            )
                        }     
                    </View>
                </View>
            ); 
        }

        return (
            <View style={{marginTop: 25}}></View>
        ); 
    
    }

    const _instructionsHelperView = (step) => 
    {
        return (
            <View style={[{flexDirection: 'row', marginBottom: 10}]}>
                <Text style={[{flex:1, color: Colors.mainOrangeColor}]}>{step.number}. </Text>
                <Text style={[{flex:12}, styles.textGrayStrong]}>{step.step}</Text>
            </View>
        ); 
    }


    const _winesBlock = (winePairing) => 
    {
        wines = winePairing.pairedWines;
        if(typeof wines !== 'undefined')
        {
            winesString = ""; 
            winesLength = wines.length; 
            for(i=0; i < winesLength; i++){
                if(i == winesLength - 1 && winesString.length > 0) winesString = winesString + " or " + wines[i]; 
                else if(winesString.length > 0) winesString = winesString + ", " + wines[i];
                else if(winesString.length == 0 ) winesString = wines[i]; 
            }
    
            pairingText = winePairing.pairingText;  
    
            return (
                <View style={{marginTop: 25}}>
                    <Text style={styles.ingredientTitle}>Un peu de vin monsieur ?</Text>
                    <Text style={[{marginTop: 8, fontWeight: 'bold'}, styles.textGrayStrong]}>{winesString}</Text>
                    <Text style={[{marginTop: 8}, styles.textGrayStrong]}>{pairingText}</Text>
                </View>
            ); 
        }

        return (
            <View style={{marginTop: 25}}></View>
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
                    <View style={styles.containerWithoutImg}>
                        { _titleBlock(recipe) }
                        { _cuisinesAndDietsBlock(recipe.cuisines, recipe.diets) }
                        { _cuisineTimeBlock(recipe) }
                        { _ingredientBlock(recipe.extendedIngredients, ingredientsInMyFridge) }
                        { _instructionsBlock(recipe.analyzedInstructions[0]) }
                        { _winesBlock(recipe.winePairing) }
                    </View>
                </View>
            );
        }
        return null;
    }

    _saveRecipe = async (recipe) => {
        const action = { type: 'SAVE_RECIPE', value: recipe };
        dispatch(action);
    }

    _unsaveRecipe = async (recipe) => {
        const action = { type: 'UNSAVE_RECIPE', value: recipe };
        dispatch(action);
    }

    //La fonction pour sauvegarder et supprimer
    const _saveRecipeHelper = (recipe) => {
        if( savedRecipes.findIndex(rec => rec.id === recipe.id) !== -1 ) {
            //La recette est sauvegardée
            return (
                <TouchableOpacity onPress={ () => _unsaveRecipe(recipe) }>
                    <Icon 
                        style={styles.addMyRecipe}  
                        name={MyIcons.mainRecipeIcon} 
                        type='font-awesome'
                        color={ Colors.mainOrangeColor } 
                    />
                </TouchableOpacity>
            );  
        }
        //La n'est pas sauvegardée
        return (
            <TouchableOpacity onPress={ () => _saveRecipe(recipe) }>
                <Icon 
                    style={styles.addMyRecipe}  
                    name={MyIcons.mainRecipeIcon} 
                    type='font-awesome'
                    color={ Colors.mainGrayColor } 
                />       
            </TouchableOpacity>
        );
    }

    return (
        <ScrollView style={styles.container}>
            { _displayLoading() }
            { _displayRecipeDetails()}
        </ScrollView>
    );
}



RecipeDetails.navigationOptions = {
    title: 'Recipe'
};

const mapStateToProps = (state) => {
    return {
        savedRecipes: state.recipeReducer.recipesObjects, 
        ingredientsInMyFridge: state.addToMyFridgeReducer.ingredientsToMyFridgeObjects
    }
}
  
export default connect(mapStateToProps)(RecipeDetails);


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
    textGrayStrong : {
        color: Colors.mainGrayStrongColor
    },
    ingredientCategorie: { 
        color: Colors.mainOrangeColor, 
        alignSelf: 'center', 
        marginBottom: 15, 
        fontStyle: 'italic'
    }
});
