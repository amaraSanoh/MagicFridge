import React, {useState, useEffect, useRef} from 'react';
import { Icon } from 'react-native-elements'; 
import { StyleSheet, Text, View, Button, Image, TextInput, Keyboard } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import RNPickerSelect from 'react-native-picker-select';
import {getIngredientsAutoc} from '../api/SpoonacularIngredient';
import { Colors } from '../../definitions/Colors';
import { connect } from 'react-redux';
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';


const SortIngredientBar = ({setSortStringHook, setCurrentSortByRef, defaultSortString}) => {

  const sortValues = [ {label: 'Name', value: 0}, {label: 'Aisle', value: 1}]; 

  const generateSortBar = () => {
    return (
      <View style={ styles.sortView }>
            <TextInput  
                placeholder="Ingredients' name" 
                style={{padding: 5, borderBottomColor: Colors.mainOrangeColor, borderBottomWidth: 2}} 
                onChangeText={ (text) => setSortStringHook(text) }
                value={defaultSortString}
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
                    onPress={(value) => setCurrentSortByRef(value) }
                />
            </View>
      </View>
    );
  }



  
  return (
      <View>
        {generateSortBar()}
      </View>
  );
}


export default SortIngredientBar;  

const styles = StyleSheet.create({
  sortView: {
    marginBottom: 12, 
  }
});
