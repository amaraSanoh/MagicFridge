import React, {useState, useEffect, useRef} from 'react';
import { Icon } from 'react-native-elements'; 
import { StyleSheet, Text, View, Button, Image, TextInput, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {DietData} from '../../data/DietData';
import {CuisineData} from '../../data/CuisineData';
import {getRecipesByRecipeNameCuisineDiet, getRecipesByIngredients} from '../api/Spoonacular';
import ListRecipe from './ListRecipe'; 
import { Colors } from '../../definitions/Colors';
import { connect } from 'react-redux';


const Search = ({navigation, savedRecipes, ingredientsInMyFridge}) => {
  const [recipes, setRecipes] = useState([]);  
  const [isRefreshing, setRefreshingState] = useState( false ); //pour savoir si une recharge de recettes est en cours
  const [errorDataLoading, setErrorDataLoading] = useState(false);
  const paginationData = useRef( {currentOffset: 0, currentNumber: 10, currentMaxResults: 0} ); 
  const searchData = useRef( {currentRecipeName: ' ', currentDiet: ' ', currentCuisine: ' '} ); 
  const standardOrCanICookData = useRef( {currentDecisionVariable: true } ); // true => standard 

  const setStandardOrCanICook = (decision) => {
    standardOrCanICookData.current.currentDecisionVariable = decision;
  }

  const getStandardOrCanICook = () => {
    standardOrCanICookData.current.currentDecisionVariable;
  }

  const _setRecipeName = (texte) => {
    searchData.current.currentRecipeName = texte;
  }

  const _getRecipeName = () => {
    return searchData.current.currentRecipeName;
  }

  const _setDiet = (texte) => {
    searchData.current.currentDiet = texte;
  }

  const _getDiet = () => {
    return searchData.current.currentDiet;
  }

  const _setCuisine = (texte) => {
    searchData.current.currentCuisine = texte;
  }

  const _getCuisine = () => {
    return searchData.current.currentCuisine;
  }

  const _setOffset = (texte) => {
    paginationData.current.currentOffset = texte;
  }

  const _getOffset = () => {
    return paginationData.current.currentOffset;
  }

  const _setNumber = (texte) => {
    paginationData.current.currentNumber = texte;
  }

  const _getNumber = () => {
    return paginationData.current.currentNumber;
  }

  const _setMaxResults = (texte) => {
    paginationData.current.currentMaxResults = texte;
  }

  const _getMaxResults = () => {
    return paginationData.current.currentMaxResults;
  }

  const _generateMyFridgeIngredientsString = () => 
  {
    let ingredientsString = ''; 
    let tabTaille = ingredientsInMyFridge.length; 
    for(let i = 0; i < tabTaille; i++)
    {
      if(i < tabTaille - 1) ingredientsString += ingredientsInMyFridge[i].name+",+"; 
      else ingredientsString += ingredientsInMyFridge[i].name; 
    } 
    
    return ingredientsString; 
  }

  console.log(_generateMyFridgeIngredientsString()); 

  const _loadRecipes = async (prevRecipes) => {
    setStandardOrCanICook(true); //false => standard search
    setRefreshingState(true); 
    try 
    {
      var spoonacularSearchResult = ( await getRecipesByRecipeNameCuisineDiet( _getRecipeName(), _getCuisine(), _getDiet(), _getOffset(), _getNumber() ) );
      let decalage = _getOffset() + spoonacularSearchResult.number; 
      _setOffset(decalage); 
      _setMaxResults(spoonacularSearchResult.totalResults); 
      setRecipes( [...prevRecipes, ...spoonacularSearchResult.results] ); 
      setErrorDataLoading(false);
    } 
    catch (error) 
    {
      _setOffset(0);
      _setNumber(10);
      _setMaxResults(0);
      setRecipes([]);
      setErrorDataLoading(true);
    }
    finally
    {
      setRefreshingState(false); 
    }
  }

  const _searchRecipes = async () => {
      _setOffset(0); 
      _setMaxResults(0);
      _loadRecipes([]); 
  }

  const _loadMoreRecipes = async () => {
    if(_getOffset() < _getMaxResults()) _loadRecipes(recipes);
  }

  const _loadRecipesByIngredients = async (myFridgeIngredients) => {
    setStandardOrCanICook(false); //false => can i cook
    setRefreshingState(true); 
    try 
    {
      var spoonacularSearchResult = ( await getRecipesByIngredients( myFridgeIngredients ) );
      // let decalage = _getOffset() + spoonacularSearchResult.number; 
      setRecipes( spoonacularSearchResult ); 
      setErrorDataLoading(false);
    } 
    catch (error) 
    {
      setRecipes([]);
      setErrorDataLoading(true);
    }
    finally
    {
      _setOffset(0); 
      _setMaxResults(0);
      _setMaxResults(0);
      _setRecipeName(''); 
      _setDiet(''); 
      _setCuisine('');
      setRefreshingState(false); 
    }
  }

  const _searchRecipesByIngredients = async (myFridgeIngredients) => {
    _setOffset(0); 
    _setMaxResults(0);
    _setMaxResults(0);
    _setRecipeName(''); 
    _setDiet(''); 
    _setCuisine('');
    _loadRecipesByIngredients(myFridgeIngredients); 
  }


  const pickerStyle = {
    inputIOS: {
      color: '#ff9b42',
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12, 
      alignItems: 'center',
      justifyContent: 'center'
    },
    inputAndroid: {
      color: '#ff9b42', 
      alignItems: 'center',
      justifyContent: 'center', 
      marginTop: -12, 
      marginBottom: -8
    }
  }

  const selectDiet = (DietData) => {
    return (
      <RNPickerSelect
            onValueChange={(value) => _setDiet(value)}
            items={DietData}
            placeholder={ {label: 'Diet ?', value: null, color: '#ff9b42'} }
            style={pickerStyle}
        />
    ); 
  }

  const selectCuisine = (CuisineData) => {
    return (
      <RNPickerSelect
            onValueChange={(value) => _setCuisine(value)}
            items={CuisineData}
            placeholder={ {label: 'Cuisine ?', value: null, color: '#ff9b42'} }
            style={pickerStyle}
        />
    ); 
  }

  const selectsDietAndCuisine = (DietData, CuisineData) => {
    return (
      <View style={styles.selectsDandC}>
        <View style={[styles.vueSelect, {marginRight: 5}]}>{selectDiet(DietData)}</View>
        <View style={[styles.vueSelect, {marginLeft: 5}]}>{selectCuisine(CuisineData)}</View>
      </View>
    ); 
  }

  const generateSearchBar = () => {
    return (
      <View style={ styles.searchView }>
          <TextInput  
              placeholder='Recipe name' 
              style={{padding: 5, borderBottomColor: '#ff9b42', borderBottomWidth: 2, flex:4}} 
              onChangeText={ (text) => _setRecipeName(text) }
          />
          <TouchableOpacity style={styles.btnTouchable} onPress={() => _searchRecipes() } >
            <Icon 
                style={ styles.tabIcon }  
                name='search' 
                type='font-awesome'
                color={ Colors.mainWhiteColor } 
            />
          </TouchableOpacity>
      </View>
    );
  }

  const whatCanICookToday = () => {
    return (
      <View>
          <Text  style={{alignSelf: 'center'}}>OR</Text>
          <TouchableOpacity style={styles.btnWhoCanICookToday} onPress={() => _searchRecipesByIngredients(_generateMyFridgeIngredientsString())} >
            <Text style={{color: 'white'}}>What can i cook today ?</Text>
          </TouchableOpacity>
      </View>
    ); 
  }

  const generateListRecipe = () => {
    return(
        <ListRecipe 
        recettes={recipes}
        refreshTop={ () => getStandardOrCanICook() ? _searchRecipes() : _searchRecipesByIngredients() } 
        refreshing={isRefreshing} //une recharge de recette est en cours
        moreRecipes={ () => _loadMoreRecipes() }
        navigateToRecipeDetails={ _navigateToRecipeDetails }
        savedRecipes={savedRecipes} 
      />
    ); 
  }

  const _navigateToRecipeDetails = (recipeId) => {
    navigation.navigate("RecipeDetails", {recipeId});
  }

  
  return (
    <View style={styles.container}>
      {generateSearchBar()}
      {selectsDietAndCuisine(DietData, CuisineData)}
      {whatCanICookToday()}
      {generateListRecipe()}
    </View>
  );
}





Search.navigationOptions = {
  title: 'Search'
};

const mapStateToProps = (state) => {
  return {
      savedRecipes: state.recipeReducer.recipesObjects, 
      ingredientsInMyFridge: state.addToMyFridgeReducer.ingredientsToMyFridgeObjects
  }
}

export default connect(mapStateToProps)(Search); 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 15, 
  }, 
  selectsDandC: {
    flexDirection: 'row', 
    justifyContent: 'space-between'
  }, 
  vueSelect: {
    flex:1, 
    backgroundColor: '#363537', 
    borderColor: 'white', 
    borderRadius: 7
  }, 
  searchView: {
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    marginBottom: 12
  }, 
  btnTouchable: {
    backgroundColor: '#ff9b42', 
    width: 40, 
    flex: 1, 
    marginLeft: 15, 
    justifyContent: 'center', 
    alignItems: 'center'
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
