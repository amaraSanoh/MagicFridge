import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Recipe = ({recipeItem, onClickOnMe}) => {

  const _getRecipeImgUri = (image) => {
    return 'https://spoonacular.com/recipeImages/'+image; 
  }

  const _getRecipeImgUriById = (id) => {
    return 'https://spoonacular.com/recipeImages/'+id+'636x393.jpg'; 
  }

  

  return (
    <View style={styles.container}>
        <Image style={styles.recipeImage} source={{ uri: _getRecipeImgUri(recipeItem.image) }} />
        <View style={styles.blocText}>
            <Text style={styles.recipeName} numberOfLines = { 1 }>{recipeItem.title}</Text>
            <Image style={styles.addMyRecipe} source={{ uri: 'image' }} />
        </View>
        <View style={styles.horizonalBar} />
    </View>
  );
}

export default Recipe; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff', 
    marginBottom: 20
  },
  recipeImage: {
    height: 130,
    backgroundColor: 'orange'
  }, 
  recipeName: {
    fontWeight: 'bold',
    paddingTop: 5, 
    flex: 7
  }, 
  addMyRecipe:{
    height: 30,
    width: 30,
    backgroundColor: 'orange', 
    flex:1
  }, 
  horizonalBar: {
    borderBottomColor: 'orange', 
    borderBottomWidth: 2, 
    marginTop: 5
  }, 
  blocText:{
    flexDirection: 'row', 
    marginTop: 5 , 
    justifyContent: 'space-between'
  }
});
