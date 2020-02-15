import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { _getRecipeImgUri, _getRecipeImgUriById } from '../helpers/Helpers';
import { Colors } from '../../definitions/Colors';
import { MyIcons } from '../../definitions/MyIcons';
import { Icon } from 'react-native-elements'; 
import {_getIngredientImage100} from '../helpers/IngredientHelpers';
import { connect } from 'react-redux';


const Ingredient = ({isFrigo, isList, ingredient, dispatch, ingredientsInMyFridge, ingredientsinMyList}) => {

  const isInMyFridge = (ingredient) => 
  {
    if(ingredientsInMyFridge.findIndex(ingred => ingred.id === ingredient.id) !== -1) return true; 
    return false;
  }

  const isInMyList = (ingredient) => 
  {
    if(ingredientsinMyList.findIndex(ingred => ingred.id === ingredient.id) !== -1) return true; 
    return false;
  }



  const generateIcons = (ingredient) => {
      if(isFrigo)
      {
        return (
            <View style={styles.blocIcon}>
                <TouchableOpacity style={{marginLeft: 25}} onPress={() => (isInMyList(ingredient)) ? _unsaveIngredientInMyList(ingredient) : _saveIngredientInMyList(ingredient) } >
                    <Icon 
                        style={styles.iconStyle}  
                        name={MyIcons.mainListIcon} 
                        type='font-awesome'
                        color={ (isInMyList(ingredient)) ? Colors.mainOrangeColor : Colors.mainGrayColor } 
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 25}} onPress={() => _unsaveIngredientInMyFridge(ingredient) } >
                    <Icon 
                        style={styles.iconStyle}  
                        name={MyIcons.mainClearIcon} 
                        type='font-awesome'
                        color={ Colors.mainRedColor } 
                    />
                </TouchableOpacity>
            </View>    
        ); 
      }else if (isList)
      {
          return (
            <View style={styles.blocIcon}>
                <TouchableOpacity style={{marginLeft: 25}} onPress={() => (isInMyFridge(ingredient)) ? _unsaveIngredientInMyFridge(ingredient) : _saveIngredientInMyFridge(ingredient) } >
                    <Icon 
                        style={styles.iconStyle}  
                        name={MyIcons.mainFrigeIcon} 
                        type='font-awesome'
                        color={ (isInMyFridge(ingredient)) ? Colors.mainOrangeColor : Colors.mainGrayColor } 
                    />
                </TouchableOpacity>
                <TouchableOpacity style={{marginLeft: 25}} onPress={() => _unsaveIngredientInMyList(ingredient) } >
                    <Icon 
                        style={styles.iconStyle}  
                        name={MyIcons.mainClearIcon} 
                        type='font-awesome'
                        color={ Colors.mainRedColor } 
                    />
                </TouchableOpacity>
            </View>    
        ); 
      }else if ( !isList && !isFrigo )
      {
        return (
          <View style={styles.blocIcon}>
            <TouchableOpacity style={{marginLeft: 25}} onPress={() => (isInMyList(ingredient)) ? _unsaveIngredientInMyList(ingredient) : _saveIngredientInMyList(ingredient) } >
                <Icon 
                    style={styles.iconStyle}  
                    name={MyIcons.mainListIcon} 
                    type='font-awesome'
                    color={ (isInMyList(ingredient)) ? Colors.mainOrangeColor : Colors.mainGrayColor } 
                />
            </TouchableOpacity>
          </View>
        ); 
      }


      return (
        <View style={styles.blocIcon}>
            <TouchableOpacity style={{marginLeft: 25}} onPress={() => (isInMyFridge(ingredient)) ? _unsaveIngredientInMyFridge(ingredient) : _saveIngredientInMyFridge(ingredient) } >
                <Icon 
                    style={styles.iconStyle}  
                    name={MyIcons.mainFrigeIcon} 
                    type='font-awesome'
                    color={ (isInMyFridge(ingredient)) ? Colors.mainOrangeColor : Colors.mainGrayColor } 
                />
            </TouchableOpacity>
        </View>
      ); 
  }

  const formatName = (name) => 
  {
    if(name != '') return name.charAt(0).toUpperCase() + name.substring(1).toLowerCase(); 
    return '';
  }

  _saveIngredientInMyFridge  = async (ingredient) => {
    const action = { type: 'ADD_INGREDIENT_TO_MY_FRIDGE', value: ingredient };
    dispatch(action);
  }

  _unsaveIngredientInMyFridge = async (ingredient) => {
    const action = { type: 'REMOVE_INGREDIENT_TO_MY_FRIDGE', value: ingredient };
    dispatch(action);
  }

  _saveIngredientInMyList  = async (ingredient) => {
    const action = { type: 'ADD_INGREDIENT_TO_MY_LIST', value: ingredient };
    dispatch(action);
  }

  _unsaveIngredientInMyList = async (ingredient) => {
    const action = { type: 'REMOVE_INGREDIENT_TO_MY_LIST', value: ingredient };
    dispatch(action);
  }


  return (
      <View style={{marginTop:20}}>
        <View style={styles.container}>
                <Image style={styles.ingredientImage} source={{ uri: _getIngredientImage100(ingredient.image) }} />
                <View style={{alignItems: 'center', justifyContent: 'center', marginLeft: 5, width: 160}}>
                    <Text style={styles.ingredientName} numberOfLines = { 1 } ellipsizeMode='tail'>{formatName(ingredient.name)}</Text>
                </View>
                { generateIcons(ingredient) }
        </View>
        <View style={styles.horizonalBar} />
      </View>
  );
}


const mapStateToProps = (state) => {

  return {
    ingredientsInMyFridge: state.addToMyFridgeReducer.ingredientsToMyFridgeObjects, 
    ingredientsinMyList: state.myListReducer.ingredientsToMyListObjects
  }
}

export default connect(mapStateToProps)(Ingredient); 

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
