import React from 'react';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { _getRecipeImgUri, _getRecipeImgUriById } from '../helpers/Helpers';
import { Colors } from '../../definitions/Colors';
import { MyIcons } from '../../definitions/MyIcons';
import { Icon } from 'react-native-elements'; 


const Ingredient = ({isFrigo}) => {

  const _imageContructor = (imageUrl) => {
    if(imageUrl.substring(0, 5) == "https")
    {
      return imageUrl; 
    }
    return _getRecipeImgUri(imageUrl);
  }

  console.log(isFrigo);

  const generateIcons = () => {
      if(isFrigo)
      {
        return (
            <View style={styles.blocIcon}>
                <View style={{marginLeft: 25}}>
                    <Icon 
                        style={styles.iconStyle}  
                        name={MyIcons.mainListIcon} 
                        type='font-awesome'
                        color={ true ? Colors.mainOrangeColor : Colors.mainGrayColor } 
                    />
                </View>
                <View style={{marginLeft: 25}}>
                    <Icon 
                        style={styles.iconStyle}  
                        name={MyIcons.mainClearIcon} 
                        type='font-awesome'
                        color={ false ? Colors.mainOrangeColor : Colors.mainGrayColor } 
                    />
                </View>
            </View>    
        ); 
      }


      return (
        <View style={styles.blocIcon}>
            <View style={{marginLeft: 25}}>
                <Icon 
                    style={styles.iconStyle}  
                    name={MyIcons.mainFrigeIcon} 
                    type='font-awesome'
                    color={ true ? Colors.mainOrangeColor : Colors.mainGrayColor } 
                />
            </View>
        </View>
      ); 
  }

  return (
      <View style={{marginLeft:15, marginRight:15, marginTop:15}}>
        <View style={styles.container}>
                <Image style={styles.ingredientImage} source={{ uri: 'image' }} />
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Text style={styles.ingredientName} numberOfLines = { 1 }>Tomatoes</Text>
                </View>
                { generateIcons() }
        </View>
        <View style={styles.horizonalBar} />
      </View>
  );
}

export default Ingredient; 

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: Colors.mainWhiteColor, 
    marginBottom: 20,
    marginTop: 50, 
    justifyContent: 'space-between'
  },
  ingredientImage: {
    height: 90,
    width: 110,
    backgroundColor: Colors.mainOrangeColor, 
  }, 
  ingredientName: {
    fontWeight: 'bold', 
  }, 
  iconStyle:{
    width: 36, 
    height: 40
  }, 
  horizonalBar: {
    borderBottomColor: Colors.mainOrangeColor, 
    borderBottomWidth: 2, 
    marginTop: 5
  }, 
  blocIcon:{
    flexDirection: 'row',
    justifyContent: 'center', 
    alignItems: 'center'
  }
});
