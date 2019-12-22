import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Recipe = () => {
  return (
    <View style={styles.container}>
        <Image style={styles.recipeImage} source={{ uri: 'image' }} />
        <View style={styles.blocText}>
            <Text style={styles.recipeName}>Recipe name here</Text>
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
    margin: 15
  },
  recipeImage: {
    height: 70,
    backgroundColor: 'orange'
  }, 
  recipeName: {
    fontWeight: 'bold',
    paddingTop: 5
  }, 
  addMyRecipe:{
    height: 30,
    width: 30,
    backgroundColor: 'orange', 
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
