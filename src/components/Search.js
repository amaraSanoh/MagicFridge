import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {DietData} from '../../data/DietData';
import {CuisineData} from '../../data/CuisineData';
import {getRecipesByRecipeNameCuisineDiet} from '../api/Spoonacular';
import ListRecipe from './ListRecipe'; 


const Search = ({navigation}) => {
  const [recipes, setRecipes] = useState([]);  
  const [isRefreshing, setRefreshingState] = useState( false );
  const [errorDataLoading, setErrorDataLoading] = useState(false);
  const paginationData = useRef( {currentOffset: 0, currentNumber: 10, currentMaxResults: 0} ); 
  const searchData = useRef( {currentRecipeName: ' ', currentDiet: ' ', currentCuisine: ' '} ); 

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
  

  const _loadRecipes = async (prevRecipes) => {
    setRefreshingState(true); 
    try 
    {
      var spoonacularSearchResult = ( await getRecipesByRecipeNameCuisineDiet( _getRecipeName(), _getCuisine(), _getDiet(), _getOffset(), _getNumber() ) );
      let decalage = _getOffset() + spoonacularSearchResult.number; 
      console.log(decalage); 
      console.log(spoonacularSearchResult.totalResults); 
      _setOffset(decalage); 
      _setMaxResults(spoonacularSearchResult.totalResults); 
      setRecipes( [...prevRecipes, ...spoonacularSearchResult.results] ); 
      setErrorDataLoading(false);
      console.log(spoonacularSearchResult.results); 
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
              <Image style={styles.btnImage} source={{ uri: 'image' }} />
          </TouchableOpacity>
      </View>
    );
  }

  const whatCanICookToday = () => {
    return (
      <View>
          <Text  style={{alignSelf: 'center'}}>OR</Text>
          <TouchableOpacity style={styles.btnWhoCanICookToday} onPress={() => alert('appelle de la fonction qui hydrate la variable du hook des cuisines possibles avec le contenu du frigo')} >
            <Text style={{color: 'white'}}>What can i cook today ?</Text>
          </TouchableOpacity>
      </View>
    ); 
  }

  const generateListRecipe = () => {
    return(
      <ListRecipe 
        recettes={recipes}
        refreshTop={ () => _searchRecipes() } 
        refreshing={isRefreshing} 
        moreRecipes={ () => _loadMoreRecipes() }
        navigateToRecipeDetails={ _navigateToRecipe }
      />
    ); 
  }

  _navigateToRecipe = (recipe) => {
    // navigation.navigate("Recipe", {recipe});
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

export default Search; 

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
