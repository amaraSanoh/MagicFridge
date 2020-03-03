import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, Button, Image, CheckBox } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Icon } from 'react-native-elements'; 
import { Colors } from '../../definitions/Colors';
import { MyIcons } from '../../definitions/MyIcons';
import { connect } from 'react-redux';

const Setting = ({requestsInformation, configInformations, dispatch}) => {
    const [addInShoppList, setAddInShoppList] = useState(false); 
    const [removeInShoppList, setRemoveInShoppList] = useState(false); 

    useEffect(() => {
        setAddInShoppList(configInformations.addInShoppList);
        setRemoveInShoppList(configInformations.removeInShoppList); 
    }, []); //le deuxième paramètre permet de ne pas appeler la fonction à chaque fois    

    const configuration = () => {
        return (
            <View>
                <Text style={styles.textConfStyle}>Configuration</Text>
                <View style={styles.groupeCheckText}>
                    <CheckBox
                        value={addInShoppList}
                        onValueChange={(value) => { setAddInShoppList(value); _updateCheckboxesInformationsToState(removeInShoppList, value); } }
                    />
                    <Text numberOfLines={2} style={styles.textSize}>
                        Add ingredients removed from the fridge to the shopping list
                    </Text>
                </View>
                <View style={styles.groupeCheckText}>
                    <CheckBox
                        value={removeInShoppList}
                        onValueChange={(value) => { setRemoveInShoppList(value); _updateCheckboxesInformationsToState(value ,addInShoppList);  } }
                    />
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
                    <Text style={[styles.textSize, {fontWeight: 'bold'}]}> { requestsInformation.creditRemaining } </Text>
                </View>
                <View style={styles.groupeTextApiInfo}>
                    <Text style={styles.textSize}>Last update: </Text>
                    <Text style={[styles.textSize, {fontWeight: 'bold'}]}>{ requestsInformation.lastUpdate }</Text>
                </View>
            </View>
        ); 
    }

    const clearDataButton = () => {
        return (
            <View style={styles.btnDataClear}>
                <TouchableOpacity style={styles.btnTouchable} onPress={() => _clearData() } >
                    <View style={styles.btnImageBlock}>
                    <Icon 
                        style={styles.btnImage}  
                        name={MyIcons.mainClearIcon} 
                        type='font-awesome'
                        color={ Colors.mainWhiteColor } 
                    />
                    </View>
                    <Text style={styles.btnTouchableText}>Clear data</Text>
                </TouchableOpacity>
            </View>
        );
    }

    _updateCheckboxesInformationsToState  = async (removeInShoppList, addInShoppList) => { 
        let val = { removeInShoppList: removeInShoppList, addInShoppList: addInShoppList}
        const action = { type: 'UPDATE_CHECKBOXES_INFORMATION', value: val };
        dispatch(action);
    }

    const __clearFridge = async () => 
    {
        const action = { type: 'CLEAR_DATA_FRIDGE', value: null };
        dispatch(action);
    }

    const __clearShoppList = async () => 
    {
        const action = { type: 'CLEAR_DATA_SHOPP_LIST', value: null };
        dispatch(action);
    }

    const __clearRecipe = async () => 
    {
        const action = { type: 'CLEAR_DATA_RECIPE', value: null };
        dispatch(action);
    }

    const __clearSetting = async () => 
    {
        let val = { removeInShoppList: false, addInShoppList: false }
        const action = { type: 'CLEAR_DATA_SETTING', value: val };
        dispatch(action);
    }

    _clearData = async () => 
    {
        __clearFridge(); 
        __clearShoppList(); 
        __clearRecipe();
        __clearSetting(); 
        setAddInShoppList(false);
        setRemoveInShoppList(false);
    }
    
    return (
        <View style={styles.container}>
        {configuration()}
        {apiInfo()}
        {clearDataButton()}
        </View>
    );
}

const mapStateToProps = (state) => {
    return {
      requestsInformation: state.creditReducer.credit, 
      configInformations: state.settingReducer.settingInformations 
    }
}
  
export default connect(mapStateToProps)(Setting); 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: 80, 
        marginLeft: 10, 
        marginRight: 10, 

    }, 
    textConfStyle: {
        color: '#ff9b42', 
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
        backgroundColor: '#ff9b42', 
        marginBottom: 30
    },
    btnImage: {
        width: 36, 
        height: 40, 
        backgroundColor: 'white', 
        marginLeft: 10
    },  
    btnImageBlock: {
        width: 40, 
        height: 45, 
        marginLeft: 10,
        justifyContent: 'center', 
        alignItems: 'center'
      }, 
    btnTouchableText: {
        marginLeft: 30, 
        color: 'white', 
        fontWeight: 'bold'
    }
});
