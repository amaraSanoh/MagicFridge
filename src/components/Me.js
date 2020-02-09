import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'; 
import { Colors } from '../../definitions/Colors';
import { MyIcons } from '../../definitions/MyIcons';

const Me = ({navigation}) => {

  const _navigateToMyRecipes = () => {
    navigation.navigate("MyRecipes");
  }

  const _navigateToMyFridge = () => {
    navigation.navigate("MyFridge");
  }

  return (
    <View style={styles.container}>
        <View style={{flex: 1}}></View>
        <View style={styles.containerTouchable}>
            <TouchableOpacity style={styles.btnTouchable} onPress={() => _navigateToMyFridge() } >
                <View style={styles.btnImageBlock}>
                  <Icon 
                      style={styles.btnImage}  
                      name={MyIcons.mainFrigeIcon} 
                      type='font-awesome'
                      color={ Colors.mainWhiteColor } 
                  />
                </View>
                <Text style={styles.btnTouchableText}>My fridge</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnTouchable} onPress={() => alert('My List') } >
                <View style={styles.btnImageBlock}>
                  <Icon 
                      style={styles.btnImage}  
                      name={MyIcons.mainListIcon}
                      type='font-awesome'
                      color={ Colors.mainWhiteColor } 
                  />
                </View>
                <Text style={styles.btnTouchableText}>My list</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.btnTouchable} onPress={() => _navigateToMyRecipes() } >
                <View style={styles.btnImageBlock}>
                  <Icon 
                      style={styles.btnImage}  
                      name={MyIcons.mainRecipeIcon}
                      type='font-awesome'
                      color={ Colors.mainWhiteColor } 
                  />
                </View>
                <Text style={styles.btnTouchableText}>My recipes</Text>
            </TouchableOpacity>
        </View>
        <View style={{flex: 1}}></View>
    </View>
  );
}




Me.navigationOptions = {
  title: 'Me'
};

export default Me; 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainWhiteColor,
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
    backgroundColor: Colors.mainWhiteColor, 
    marginLeft: 10
  }, 
  btnImageBlock: {
    width: 40, 
    height: 45, 
    marginLeft: 10,
    justifyContent: 'center', 
    alignItems: 'center'
  }, 
  btnTouchable: {
    flexDirection: 'row', 
    alignItems: 'center', 
    height: 70, 
    borderRadius: 5,
    borderWidth: 1,
    borderColor: Colors.mainWhiteColor, 
    backgroundColor: Colors.mainOrangeColor, 
    marginBottom: 30
  }, 
  btnTouchableText: {
    marginLeft: 30, 
    color: 'white', 
    fontWeight: 'bold'
  }
});
