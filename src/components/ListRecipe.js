import React, { useState, useRef } from 'react';
import { View, TextInput, Text, Button, StyleSheet, FlatList, Keyboard } from 'react-native';
import { colors } from '../../definitions/Colors';
import Recipe from './Recipe'; 


const ListRecipe = ({navigation, recettes, refreshTop, moreRecipes, navigateToRecipeDetails, refreshing, savedRecipes}) => {
    
    _isItSaved = (recipeId) => {
        if(savedRecipes.findIndex(rec => rec.id === recipeId) !== -1 ) return true; 
        return false;
    }

    return (
        <FlatList
            data={recettes}
            extraData={ savedRecipes }
            keyExtractor={(item) => item.id.toString() }
            renderItem={ ({item}) => <Recipe recipeItem={item} isSaved={ _isItSaved(item.id)} onClickOnMe={ () => navigateToRecipeDetails(item.id) } /> }

            onRefresh={ refreshTop }  //Permet de faire le chargement une fois en haut de la liste
            refreshing={ refreshing } //chargement si isRefreshing est à true
            onEndReached={ moreRecipes } //une fois à la fin de la page, executer la fonction _loadRecipes
            onEndReachedThreshold={ 0.5 } // A la moitié du dernier composant, appeler la fonction stockée dans onEndReached
        />
    ); 
}

export default ListRecipe;