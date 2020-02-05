import React, {useState, useEffect, useRef} from 'react';
import { Icon } from 'react-native-elements'; 
import { StyleSheet, Text, View, Button, Image, TextInput, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {getIngredientsAutoc} from '../api/SpoonacularIngredient';
import { Colors } from '../../definitions/Colors';
import { connect } from 'react-redux';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import SortIngredientBar from './SortIngredientBar';


const MyFridge = ({navigation, myFridgeIngredients}) => {
  const [ingredients, setIngredients] = useState([]);  
  const [sortString, setSortString] = useState('');
  const [isRefreshing, setRefreshingState] = useState( false ); //pour savoir si une recharge des ingredients est en cours
  const [errorDataLoading, setErrorDataLoading] = useState(false);
  const sortByData = useRef( {currentSortBy: 0} ); 

  const setCurrentSortBy = (decision) => {
    sortByData.current.currentSortBy = decision;
    console.log(sortByData.current.currentSortBy); 
  }

  const getCurrentSortBy = () => {
    return sortByData.current.currentSortBy; 
  }

  const addNewIngredient = (ingredientString) => {
    return (
      <View>
          <TouchableOpacity style={styles.btnAddNewIngredient} onPress={() => _navigateToAddNewIngredient(ingredientString)} >
            <View style={[{flexDirection: 'row'}]}>
                <Text style={[{color: 'white', flex: 1}]}>+</Text>
                <Text style={[{color: 'white', flex: 5, justifyContent: 'center'}]}>Add new ingredient</Text>
            </View>
          </TouchableOpacity>
      </View>
    ); 
  }

//   const generateListRecipe = () => {
//     return(
//         <ListRecipe 
//         recettes={recipes}
//         refreshTop={ () => getStandardOrCanICook() ? _searchRecipes() : _searchRecipesByIngredients() } 
//         refreshing={isRefreshing} //une recharge de recette est en cours
//         moreRecipes={ () => _loadMoreRecipes() }
//         navigateToRecipeDetails={ _navigateToRecipeDetails }
//         savedRecipes={savedRecipes} 
//       />
//     ); 
//   }

  const _navigateToAddNewIngredient = (ingredientString) => {
    navigation.navigate("AddToMyFridgeView", {ingredientString});
  }

  
  return (
    <View style={styles.container}>
        <SortIngredientBar
            setSortStringHook={setSortString}
            setCurrentSortByRef={setCurrentSortBy}
            defaultSortString = {sortString}
        />
        {addNewIngredient(sortString)}
    </View>
  );
}





MyFridge.navigationOptions = {
  title: 'My fridge'
};

const mapStateToProps = (state) => {
  return {
    // state.myFridgeIngredientsObjects
    myFridgeIngredients: []
  }
}

export default connect(mapStateToProps)(MyFridge); 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 15, 
  },
  sortView: {
    marginBottom: 12, 
  }, 
  btnAddNewIngredient: {
    backgroundColor: '#ff9b42',  
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 5, 
    borderRadius: 7, 
    marginBottom: 10
  }, 
  btnImage: {
    backgroundColor: 'white', 
    width: 20, 
    height: 20
  }
});
