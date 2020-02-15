import React, { useState, useRef } from 'react';
import { View, TextInput, Text, Button, StyleSheet, FlatList, Keyboard } from 'react-native';
import { colors } from '../../definitions/Colors';
import { connect } from 'react-redux';
import { MyIcons } from '../../definitions/MyIcons';
import { Icon } from 'react-native-elements'; 
import ListIngredients from './ListIngredients';



const MyList = ({navigation, ingredientsInMyList}) => {
    const [isRefreshing, setRefreshingState] = useState( false ); //pour savoir si une recharge des ingredients est en cours
    const [errorDataLoading, setErrorDataLoading] = useState(false);

    const _isItSaved = (ingredient) => {
        if(ingredientsInMyList.findIndex(ingred => ingred.id === ingredient.id) !== -1 ) return true; 
        return false;
    }

    const _searchIngredients = () => 
    {
        return ingredientsInMyList; 
    }

    return (
        <View style={styles.container}>
            <ListIngredients 
                ingredients={ingredientsInMyList}
                refreshTop={ () => _searchIngredients() } 
                refreshing={isRefreshing} //une recharge des ingredients est en cours
                ingredientsExtras={ingredientsInMyList} 
                isFrigo={false}
                isList={true}
            />
        </View>
    ); 
}




MyList.navigationOptions = {
    title: 'My list'
};

const mapStateToProps = (state) => {
    return {
        ingredientsInMyList: state.myListReducer.ingredientsToMyListObjects
    }
}
  
export default connect(mapStateToProps)(MyList);

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      margin: 20
    }
}); 