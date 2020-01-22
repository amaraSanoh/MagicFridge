import React, { useState, useRef } from 'react';
import { View, TextInput, Text, Button, StyleSheet, FlatList, Keyboard } from 'react-native';
import { colors } from '../../definitions/Colors';
import Recipe from './Recipe'; 
import { connect } from 'react-redux';
import { MyIcons } from '../../definitions/MyIcons';
import { Icon } from 'react-native-elements'; 



const MyRecipes = ({navigation, savedRecipes}) => {
    
    const _isItSaved = (recipeId) => {
        if(savedRecipes.findIndex(rec => rec.id === recipeId) !== -1 ) return true; 
        return false;
    }

    const _navigateToRecipeDetails = (recipeId) => {
        navigation.navigate("RecipeDetails", {recipeId});
    }

    return (
        <View style={styles.container}>
            <FlatList
                data={savedRecipes}
                keyExtractor={(item) => item.id.toString() }
                renderItem={ ({item}) => <Recipe recipeItem={item} isSaved={ _isItSaved(item.id)} onClickOnMe={ () => _navigateToRecipeDetails(item.id) } /> }
            />
        </View>
    ); 
}




MyRecipes.navigationOptions = {
    title: 'My recipes'
};

const mapStateToProps = (state) => {
    return {
        savedRecipes: state.recipesObjects
    }
}
  
export default connect(mapStateToProps)(MyRecipes);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      margin: 20
    }
}); 