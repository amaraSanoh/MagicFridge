import React, {useState, useEffect, useRef} from 'react';
import { Icon } from 'react-native-elements'; 
import { StyleSheet, Text, View, Button, Image, TextInput, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {getIngredientsAutoc} from '../api/SpoonacularIngredient';
import { Colors } from '../../definitions/Colors';
import { connect } from 'react-redux';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


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

  const sortValues = [ {label: 'Name', value: 0}, {label: 'Aisle', value: 1}]; 

  const generateSortBar = () => {
    return (
      <View style={ styles.sortView }>
            <TextInput  
                placeholder="Ingredients' name" 
                style={{padding: 5, borderBottomColor: Colors.mainOrangeColor, borderBottomWidth: 2}} 
                onChangeText={ (text) => setSortString(text) }
            />
            <View style={{marginTop:15}}>
                <RadioForm
                    radio_props={sortValues}
                    initial={0}
                    formHorizontal={true}
                    labelHorizontal={true}
                    buttonColor={Colors.mainGrayColor}
                    labelColor={Colors.mainGrayColor}
                    selectedButtonColor={Colors.mainGrayStrongColor}
                    animation={true}
                    borderWidth={1}
                    buttonSize={10}
                    buttonOuterSize={20}
                    onPress={(value) => setCurrentSortBy(value) }
                />
            </View>
      </View>
    );
  }

  const addNewIngredient = (ingredientString) => {
    return (
      <View>
          <TouchableOpacity style={styles.btnWhoCanICookToday} onPress={() => alert(ingredientString)} >
            <View style={[{flexDirection: 'row'}]}>
                <Text style={[{color: 'white', flex: 1}]}>+</Text>
                <Text style={[{color: 'white', flex: 5}]}>Add new ingredient</Text>
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
      {generateSortBar()}
      {addNewIngredient('Add new Ingredient')}
    </View>
  );
}





MyFridge.navigationOptions = {
  title: 'MyFridge'
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
  btnWhoCanICookToday: {
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
