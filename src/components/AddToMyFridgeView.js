import React, {useState, useEffect, useRef} from 'react';
import { Icon } from 'react-native-elements'; 
import { StyleSheet, Text, View, Button, Image, TextInput, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {getIngredientsAutoc} from '../api/SpoonacularIngredient';
import { Colors } from '../../definitions/Colors';
import { connect } from 'react-redux';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import ListIngredients from './ListIngredients';
import {IngredientsData} from '../../data/IngredientsData';
import {_getIngredientImage100} from '../helpers/IngredientHelpers';


const AddToMyFridgeView = ({navigation, ingredientsInMyFridge}) => {
  const [ingredients, setIngredients] = useState([]);  
  const [sortString, setSortString] = useState('');
  const [isRefreshing, setRefreshingState] = useState( false ); //pour savoir si une recharge des ingredients est en cours
  const [errorDataLoading, setErrorDataLoading] = useState(false);
  const sortByData = useRef( {currentSortBy: 0, currentSortByString: ''} ); 

  useEffect(() => {
    _searchIngredients(); 
  }, []); //le deuxième paramètre permet de ne pas appeler la fonction à chaque fois
  

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
    }else if(text.length == 1 || text.length == '1')
    {
      sortByData.current.currentSortByString += text;
    } 
  }

  const getCurrentSortByString = () => {
    return sortByData.current.currentSortByString; 
  }

  const _loadIngredients = async () => {
    setRefreshingState(true); 
    try 
    {
      var spoonacularSearchResult = ( await getIngredientsAutoc( (sortString.length <= 0) ? navigation.getParam("ingredientString") : sortString) );
      setIngredients( spoonacularSearchResult ); 
      setErrorDataLoading(false);
      console.log("call api"); 
    } 
    catch (error) 
    {
      setIngredients([]);
      setErrorDataLoading(true);
    }
    finally
    {
      setRefreshingState(false); 
    }

    // spoonacularSearchResult = IngredientsData; //A mettre en commentaire
    // setIngredients( spoonacularSearchResult ); 
    // setErrorDataLoading(false);
    // setRefreshingState(false); 
  }

  const _searchIngredients = async () => {
      _loadIngredients(); 
  }


  const generateListIngredients = () => {
    return(
        <ListIngredients 
          ingredients={ingredients}
          refreshTop={ () => _searchIngredients() } 
          refreshing={isRefreshing} //une recharge des ingredients est en cours
          ingredientsInMyFridge={ingredientsInMyFridge} 
          isFrigo={false}
        />
    ); 
  }

  const _refreshProcess = (evnmt) => 
  { 
    if(evnmt instanceof Object) {
      setSortString(getCurrentSortByString());
      _searchIngredients(); 
    }
  }

  const GenerateSortIngredientBar = () => 
  {
    const sortValues = [ {label: 'Name', value: 0}, {label: 'Aisle', value: 1} ];   
    if(sortString.length <= 0) setCurrentSortByString(navigation.getParam("ingredientString"));
    
    return (
        <View style={ {marginBottom: 12} }>
              <TextInput  
                  placeholder="Ingredients' name" 
                  style={{padding: 5, borderBottomColor: Colors.mainOrangeColor, borderBottomWidth: 2}} 
                  onKeyPress={ (text) => setCurrentSortByString(text.nativeEvent.key) }
                  onSubmitEditing={ (evnmt) => _refreshProcess(evnmt) }
                  defaultValue={ (sortString.length <= 0 ) ? navigation.getParam("ingredientString") : getCurrentSortByString()}
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

  
  return (
    <View style={styles.container}>
        { <GenerateSortIngredientBar /> }
        { generateListIngredients() }
    </View>
  );
}





AddToMyFridgeView.navigationOptions = {
  title: 'Add to my fridge'
};

const mapStateToProps = (state) => {
  return {
    // state.myFridgeIngredientsObjects
    ingredientsInMyFridge: []
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
