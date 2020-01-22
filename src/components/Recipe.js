import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { _getRecipeImgUri, _getRecipeImgUriById } from '../helpers/Helpers';
import { Colors } from '../../definitions/Colors';
import { MyIcons } from '../../definitions/MyIcons';
import { Icon } from 'react-native-elements'; 


const Recipe = ({recipeItem, isSaved, onClickOnMe}) => {

  const _imageContructor = (imageUrl) => {
    if(imageUrl.substring(0, 5) == "https")
    {
      return imageUrl; 
    }
    return _getRecipeImgUri(imageUrl);
  }

  return (
    <TouchableOpacity onPress={ onClickOnMe }>
      <View style={styles.container}>
          <Image style={styles.recipeImage} source={{ uri: _imageContructor(recipeItem.image) }} />
          <View style={styles.blocText}>
              <Text style={styles.recipeName} numberOfLines = { 1 }>{recipeItem.title}</Text>
              <Icon 
                  style={styles.addMyRecipe}  
                  name={MyIcons.mainRecipeIcon} 
                  type='font-awesome'
                  color={ isSaved ? Colors.mainOrangeColor : Colors.mainGrayColor } 
              />
          </View>
          <View style={styles.horizonalBar} />
      </View>
    </TouchableOpacity>
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
