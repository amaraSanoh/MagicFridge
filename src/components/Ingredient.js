import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { _getRecipeImgUri, _getRecipeImgUriById } from '../helpers/Helpers';
import { Colors } from '../../definitions/Colors';
import { MyIcons } from '../../definitions/MyIcons';
import { Icon } from 'react-native-elements'; 
import {_getIngredientImage100} from '../helpers/IngredientHelpers';


const Ingredient = ({isFrigo, ingredient}) => {

  const generateIcons = () => {
      if(isFrigo)
      {
        return (
            <View style={styles.blocIcon}>
                <View style={{marginLeft: 25}}>
                    <Icon 
                        style={styles.iconStyle}  
                        name={MyIcons.mainListIcon} 
                        type='font-awesome'
                        color={ true ? Colors.mainOrangeColor : Colors.mainGrayColor } 
                    />
                </View>
                <View style={{marginLeft: 25}}>
                    <Icon 
                        style={styles.iconStyle}  
                        name={MyIcons.mainClearIcon} 
                        type='font-awesome'
                        color={ false ? Colors.mainOrangeColor : Colors.mainGrayColor } 
                    />
                </View>
            </View>    
        ); 
      }


      return (
        <View style={styles.blocIcon}>
            <View style={{marginLeft: 25}}>
                <Icon 
                    style={styles.iconStyle}  
                    name={MyIcons.mainFrigeIcon} 
                    type='font-awesome'
                    color={ true ? Colors.mainOrangeColor : Colors.mainGrayColor } 
                />
            </View>
        </View>
      ); 
  }

  const formatName = (name) => 
  {
    if(name != '') return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase(); 
    return '';
  }

  return (
      <View style={{marginTop:20}}>
        <View style={styles.container}>
                <Image style={styles.ingredientImage} source={{ uri: _getIngredientImage100(ingredient.image) }} />
                <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: 5, width: 160}}>
                    <Text style={styles.ingredientName} numberOfLines = { 1 } ellipsizeMode='tail'>{formatName(ingredient.name)}</Text>
                </View>
                { generateIcons() }
        </View>
        <View style={styles.horizonalBar} />
      </View>
  );
}

export default Ingredient; 

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.mainWhiteColor, 
    marginBottom: 10,
    justifyContent: 'space-between'
  },
  ingredientImage: {
    height: 50,
    width: 60,
    backgroundColor: Colors.mainOrangeColor, 
  }, 
  ingredientName: {
    fontWeight: 'bold', 
  }, 
  iconStyle:{
    width: 36, 
    height: 40
  }, 
  horizonalBar: {
    borderBottomColor: Colors.mainOrangeColor, 
    borderBottomWidth: 2, 
    marginTop: 5
  }, 
  blocIcon:{
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center'
  }
});
