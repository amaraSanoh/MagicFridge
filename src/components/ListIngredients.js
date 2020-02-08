import React, { useState, useRef } from 'react';
import { View, TextInput, Text, Button, StyleSheet, FlatList, Keyboard } from 'react-native';
import { colors } from '../../definitions/Colors';
import Ingredient from './Ingredient';


const ListIngredients = ({ingredients, refreshTop, refreshing, ingredientsInMyFridge, isFrigo}) => {
    
    // _isItSaved = (recipeId) => {
    //     if(savedRecipes.findIndex(rec => rec.id === recipeId) !== -1 ) return true; 
    //     return false;
    // }

    return (
        <FlatList
            data={ingredients}
            extraData={ ingredientsInMyFridge }
            keyExtractor={(item) => item.id.toString() }
            renderItem={ ({item}) => <Ingredient isFrigo={isFrigo} ingredient={item} /> }
            onRefresh={ refreshTop }  //Permet de faire le chargement une fois en haut de la liste
            refreshing={ refreshing } //chargement si isRefreshing est à true
        />
    ); 
}

export default ListIngredients;