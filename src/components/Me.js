import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

const Me = () => {
  return (
    <View style={styles.container}>
        <View style={{flex: 1}}></View>
        <View style={styles.containerTouchable}>
            <TouchableOpacity style={styles.btnTouchable} onPress={() => alert('My fridge')} >
                <Image style={styles.btnImage} source={{ uri: 'image' }} />
                <Text style={styles.btnTouchableText}>My fridge</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnTouchable} onPress={() => alert('My list')} >
                <Image style={styles.btnImage} source={{ uri: 'image' }} />
                <Text style={styles.btnTouchableText}>My list</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnTouchable} onPress={() => alert('My recipes')} >
                <Image style={styles.btnImage} source={{ uri: 'image' }} />
                <Text style={styles.btnTouchableText}>My recipes</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex: 1}}></View>
    </View>
  );
}

export default Me; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  containerTouchable: {
    flex: 3
  }, 
  btnImage: {
    width: 40, 
    height: 45, 
    backgroundColor: 'white', 
    marginLeft: 10
  }, 
  btnTouchable: {
    flexDirection: 'row', 
    alignItems: 'center', 
    height: 70, 
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#fff', 
    backgroundColor: '#ff9b42', 
    marginBottom: 30
  }, 
  btnTouchableText: {
    marginLeft: 30, 
    color: 'white', 
    fontWeight: 'bold'
  }
});
