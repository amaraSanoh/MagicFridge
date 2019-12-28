import React, { useState, useRef } from 'react';
import { View, TextInput, Text, Button, StyleSheet, FlatList, Keyboard } from 'react-native';
import { colors } from '../../definitions/Colors';

const ListRecipe = ({navigation, recipes}) => {
    
    return (
        <FlatList
            data={recipes}
            extraData={ savedRestaurants }
            keyExtractor={(item) => item.restaurant.id.toString() }
            renderItem={ ({item}) => <Restaurant restaurantItem={item.restaurant} isSaved = { _isItSaved(item.restaurant.id) } onClickOnMe={ () => navigateToDetailsResto(item.restaurant.id) } /> }

            onRefresh={ refreshTop }  //Permet de faire le chargement une fois en haut de la liste
            refreshing={ refreshing } //chargement si isRefreshing est à true
            onEndReached={ moreRestaurants } //une fois à la fin de la page, executer la fonction _loadMoreRestaurants
            onEndReachedThreshold={ 0.5 } // A la moitié du dernier composant, appeler la fonction stockée dans onEndReached
        />
    ); 
}

export default ListRecipe;