import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import {DietData} from '../../data/DietData';
import {CuisineData} from '../../data/CuisineData';


const Search = () => {
  const [diet, setDiet] = useState("");
  const [cuisine, setCuisine] = useState("");


  const pickerStyle = {
    inputIOS: {
      color: 'orange',
      paddingTop: 13,
      paddingHorizontal: 10,
      paddingBottom: 12
    },
    inputAndroid: {
      color: 'orange'
    }
  };

  const selectDiet = (DietData) => {
    return (
      <RNPickerSelect
            onValueChange={(value) => setDiet(value)}
            items={DietData}
            placeholder={ {label: 'Diet ?', value: null, color: 'red'} }
            style={pickerStyle}
        />
    ); 
  }; 

  const selectCuisine = (CuisineData) => {
    return (
      <RNPickerSelect
            onValueChange={(value) => setCuisine(value)}
            items={CuisineData}
            placeholder={ {label: 'Cuisine ?', value: null, color: 'red'} }
            style={pickerStyle}
        />
    ); 
  }; 

  const selectsDietAndCuisine = (DietData, CuisineData) => {
    return (
      <View style={{flexDirection: 'row'}}>
        <View style={{flex:1}}>{selectDiet(DietData)}</View>
        <View style={{flex:1}}>{selectCuisine(CuisineData)}</View>
      </View>
    ); 
  };

  return (
    <View style={styles.container}>
      {selectsDietAndCuisine(DietData, CuisineData)}
    </View>
  );
}

export default Search; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    marginTop: 15
  }
});
