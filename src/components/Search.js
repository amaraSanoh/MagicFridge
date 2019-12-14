import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, Picker } from 'react-native';
import DietDat, { DietData } from '../../data/DietData';
const Search = () => {
  const [diet, setDiet] = useState("");

  return (
    <View style={styles.container}>
        <Picker
            selectedValue={diet}
            style={{height: 60, width: 200, borderRadius: 5, borderColor: 'white', borderWidth: 2}}
            onValueChange={(itemValue, itemIndex) => setDiet(itemValue)
        }>

            <Picker.Item label="Java" value="java" />
            <Picker.Item label="JavaScript" value="js" />
        </Picker>
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
  }
});
