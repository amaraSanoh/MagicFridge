import React, { useState, useRef } from 'react';
import { View, TextInput, Text, Button, StyleSheet, FlatList, Keyboard } from 'react-native';
import { colors } from '../../definitions/Colors';
import Ingredient from './Ingredient';


const ListIngredients = ({ingredients, refreshTop, refreshing, ingredientsExtras, isFrigo, isList, isAddToFridge, isAddToList}) => {

    return (
        <FlatList
            data={ingredients}
            extraData={ ingredientsExtras }
            keyExtractor={(item) => item.id.toString() }
            renderItem={ ({item}) => <Ingredient isFrigo={isFrigo} isList={isList} isAddToFridge={isAddToFridge} isAddToList={isAddToList} ingredient={item} /> }
            onRefresh={ refreshTop }  //Permet de faire le chargement une fois en haut de la liste
            refreshing={ refreshing } //chargement si isRefreshing est à true
        />
    ); 
}

export default ListIngredients;