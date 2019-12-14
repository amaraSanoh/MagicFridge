import React from 'react';
import { StyleSheet, Text, View, Button, Image, CheckBox } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Setting = () => {

  const configuration = () => {
    return (
        <View>
            <Text style={styles.textConfStyle}>Configuration</Text>
            <View style={styles.groupeCheckText}>
                <CheckBox  onValueChange={() => alert('ok')}/>
                <Text numberOfLines={2} style={styles.textSize}>
                    Add ingredients removed from the fridge to the shopping list
                </Text>
            </View>
            <View style={styles.groupeCheckText}>
                <CheckBox  onValueChange={() => alert('ok')}/>
                <Text numberOfLines={2} style={styles.textSize}>
                    When adding an ingredient to the fridge from the shopping list, remove it from the shopping list 
                </Text>
            </View>
        </View>
    ); 
  }

  const apiInfo = () => {
      return (
        <View style={{marginTop: 50}}>
            <Text style={styles.textConfStyle}>API</Text>
            <View style={styles.groupeTextApiInfo}>
                <Text style={styles.textSize}>API credits remaining: </Text>
                <Text style={[styles.textSize, {fontWeight: 'bold'}]}>147.8</Text>
            </View>
            <View style={styles.groupeTextApiInfo}>
                <Text style={styles.textSize}>Last update: </Text>
                <Text style={[styles.textSize, {fontWeight: 'bold'}]}>14 November, 9:27 pm</Text>
            </View>
        </View>
      ); 
  }

  const clearDataButton = () => {
      return (
        <View style={styles.btnDataClear}>
            <TouchableOpacity style={styles.btnTouchable} onPress={() => alert('Clear data')} >
                <Image style={styles.btnImage} source={{ uri: 'image' }} />
                <Text style={styles.btnTouchableText}>Clear data</Text>
            </TouchableOpacity>
        </View>
      ); 
  }


  
  return (
    <View style={styles.container}>
       {configuration()}
       {apiInfo()}
       {clearDataButton()}
    </View>
  );
}

export default Setting; 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 80, 
        marginLeft: 10, 
        marginRight: 10, 

    }, 
    textConfStyle: {
        color: 'orange', 
        fontWeight: 'bold', 
        marginBottom: 8, 
        paddingLeft: 8
    }, 
    groupeCheckText: {
        flexDirection: 'row', 
        marginBottom: 10, 
        justifyContent: 'space-between', 
        paddingRight: 18
    }, 
    textSize: {
        fontSize: 12
    }, 
    groupeTextApiInfo: {
        flexDirection: 'row', 
        paddingLeft: 9
    }, 
    btnDataClear: {
        marginTop: 70, 
        justifyContent: 'center', 
        alignItems: 'center'
    },  
    btnTouchable: {
        flexDirection: 'row', 
        alignItems: 'center', 
        height: 60, 
        width: 200,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff', 
        backgroundColor: 'orange', 
        marginBottom: 30
    },
    btnImage: {
        width: 36, 
        height: 40, 
        backgroundColor: 'white', 
        marginLeft: 10
    },  
    btnTouchableText: {
        marginLeft: 30, 
        color: 'white', 
        fontWeight: 'bold'
    }
});
