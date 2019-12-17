import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, TextInput, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {DietData} from '../../data/DietData';
import {CuisineData} from '../../data/CuisineData';


const Search = () => {
  const [diet, setDiet] = useState("");
  const [cuisine, setCuisine] = useState("");


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
  };

  const selectDiet = (DietData) => {
    return (
      <RNPickerSelect
            onValueChange={(value) => setDiet(value)}
            items={DietData}
            placeholder={ {label: 'Diet ?', value: null, color: '#ff9b42'} }
            style={pickerStyle}
        />
    ); 
  }; 

  const selectCuisine = (CuisineData) => {
    return (
      <RNPickerSelect
            onValueChange={(value) => setCuisine(value)}
            items={CuisineData}
            placeholder={ {label: 'Cuisine ?', value: null, color: '#ff9b42'} }
            style={pickerStyle}
        />
    ); 
  }; 

  const selectsDietAndCuisine = (DietData, CuisineData) => {
    return (
      <View style={styles.selectsDandC}>
        <View style={[styles.vueSelect, {marginRight: 5}]}>{selectDiet(DietData)}</View>
        <View style={[styles.vueSelect, {marginLeft: 5}]}>{selectCuisine(CuisineData)}</View>
      </View>
    ); 
  };

  const generateSearchBar = () => {
    return (
      <View style={ styles.searchView }>
          <TextInput  
              placeholder='Recipe name' 
              style={{padding: 5, borderBottomColor: '#ff9b42', borderBottomWidth: 2, flex:4}} 
              onChangeText={ (text) => alert(text) }
          />
          <TouchableOpacity style={styles.btnTouchable} onPress={() => alert('Search my recipes')} >
              <Image style={styles.btnImage} source={{ uri: 'image' }} />
          </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {generateSearchBar()}
      {selectsDietAndCuisine(DietData, CuisineData)}
    </View>
  );
}

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
  btnImage: {
    backgroundColor: 'white', 
    width: 20, 
    height: 20
  }
});
