import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {DietData} from '../../data/DietData';
import {CuisineData} from '../../data/CuisineData';


const Search = () => {
  const [diet, setDiet] = useState("");
  const [cuisine, setCuisine] = useState("");
  console.log(CuisineData); 
  
  const selectDiet = (DietData) => {
    return (
      <RNPickerSelect
            onValueChange={(value) => setDiet(value)}
            style={styles.selectPicker}
            placeholder={ {label: 'Diet ?', value: null} }
            items={DietData}
        />
    ); 
  }

  const selectCuisine = (CuisineData) => {
    return (
      <RNPickerSelect
            onValueChange={(value) => setCuisine(value)}
            style={styles.selectPicker}
            placeholder={ {label: 'Cuisine ?', value: null} }
            items={CuisineData}
        />
    ); 
  }

  return (
    <View style={styles.container}>
        {selectDiet(DietData)}
        {selectCuisine(CuisineData)}
    </View>
  );
}

export default Search; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  selectPicker: {
    flex:1,
    backgroundColor: 'purple'
  }
});
