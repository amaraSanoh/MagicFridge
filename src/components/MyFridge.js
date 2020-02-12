import React, {useState, useEffect, useRef} from 'react';
import { Icon } from 'react-native-elements'; 
import { StyleSheet, Text, View, Button, Image, TextInput, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {getIngredientsAutoc} from '../api/SpoonacularIngredient';
import { Colors } from '../../definitions/Colors';
import { connect } from 'react-redux';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import {IngredientsData} from '../../data/IngredientsData';
import ListIngredients from './ListIngredients';


const MyFridge = ({navigation, ingredientsInMyFridge}) => { 
  const [sortString, setSortString] = useState('');
  const [isRefreshing, setRefreshingState] = useState( false ); //pour savoir si une recharge des ingredients est en cours
  const [errorDataLoading, setErrorDataLoading] = useState(false);
  const sortByData = useRef( {currentSortBy: 0, currentSortByString: ''} ); 

  const setCurrentSortBy = (decision) => {
    sortByData.current.currentSortBy = decision;
  }

  const getCurrentSortBy = () => {
    return sortByData.current.currentSortBy; 
  }

  const setCurrentSortByString = (text) => {
    if(text == 'Backspace')
    {
      taille = sortByData.current.currentSortByString.length; 
      sortByData.current.currentSortByString = sortByData.current.currentSortByString.substring(0, taille-1);
    }else
    {
      sortByData.current.currentSortByString += text;
    } 
  }

  const getCurrentSortByString = () => {
    return sortByData.current.currentSortByString; 
  }

  const _refreshProcess = (event) => 
  { 
    if(event instanceof Object) setSortString(getCurrentSortByString()); 
  }

  const GenerateSortIngredientBar = () => 
  {
    const sortValues = [ {label: 'Name', value: 0}, {label: 'Aisle', value: 1} ]; 
    
    return (
        <View style={ {marginBottom: 12} }>
              <TextInput  
                  placeholder="Ingredients' name" 
                  style={{padding: 5, borderBottomColor: Colors.mainOrangeColor, borderBottomWidth: 2}} 
                  onKeyPress={ (text) => setCurrentSortByString(text.nativeEvent.key) }
                  onSubmitEditing={ (event) => _refreshProcess(event) }
                  defaultValue={getCurrentSortByString()}
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
          <TouchableOpacity style={styles.btnAddNewIngredient} onPress={() => _navigateToAddNewIngredient(ingredientString)} >
            <View style={[{flexDirection: 'row'}]}>
                <Text style={[{color: 'white', flex: 1}]}>+</Text>
                <Text style={[{color: 'white', flex: 5, justifyContent: 'center'}]}>Add new ingredient</Text>
            </View>
          </TouchableOpacity>
      </View>
    ); 
  }


  const _searchIngredients = () => 
  {
    return ingredientsInMyFridge; 
  }

  const generateListIngredients = () => {
    return(
        <ListIngredients 
          ingredients={ingredientsInMyFridge}
          refreshTop={ () => _searchIngredients() } 
          refreshing={isRefreshing} //une recharge des ingredients est en cours
          ingredientsInMyFridge={ingredientsInMyFridge} 
          isFrigo={true}
        />
    ); 
  }

  const _navigateToAddNewIngredient = (ingredientString) => {
    navigation.navigate("AddToMyFridgeView", {ingredientString});
  }

  

  return (
    <View style={styles.container}>
        <GenerateSortIngredientBar />
        {generateListIngredients()}
        {addNewIngredient(sortString)}
    </View>
  );
}





MyFridge.navigationOptions = {
  title: 'My fridge'
};

const mapStateToProps = (state) => {
  return {
    ingredientsInMyFridge: state.addToMyFridgeReducer.ingredientsToMyFridgeObjects
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
    marginTop: 10
  }, 
  btnImage: {
    backgroundColor: 'white', 
    width: 20, 
    height: 20
  }
});
