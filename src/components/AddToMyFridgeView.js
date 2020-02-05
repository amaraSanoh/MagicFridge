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


const AddToMyFridgeView = ({navigation}) => {
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

  
  return (
    <View style={styles.container}>
        <SortIngredientBar
            setSortStringHook={setSortString}
            setCurrentSortByRef={setCurrentSortBy}
            defaultSortString = {navigation.getParam("ingredientString")}
        />
    </View>
  );
}





AddToMyFridgeView.navigationOptions = {
  title: 'Add to my fridge'
};

const mapStateToProps = (state) => {
  return {
    // state.myFridgeIngredientsObjects
    IngredientsInMyFridge: []
  }
}

export default connect(mapStateToProps)(AddToMyFridgeView); 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 15, 
  }
});
