import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { Icon } from 'react-native-elements'; 
import { Colors } from '../../definitions/Colors';
import { MyIcons } from '../../definitions/MyIcons';

import Search from '../components/Search'; 
import Me from '../components/Me';
import Setting from '../components/Setting';
import RecipeDetails from '../components/RecipeDetails'; 
import MyRecipes from '../components/MyRecipes'; 
import MyFridge from '../components/MyFridge'; 
import AddToMyFridgeView from '../components/AddToMyFridgeView';
import MyList from '../components/MyList';

const SearchNavigation = createStackNavigator(
  {
    Search: Search,
    RecipeDetails: RecipeDetails
  },
  {
    initialRouteName: 'Search'
  }
);

const MyRecipesNavigation = createStackNavigator(
  {
    Me: Me,
    MyRecipes: MyRecipes,
    RecipeDetails: RecipeDetails,
    MyFridge: MyFridge, 
    AddToMyFridgeView: AddToMyFridgeView,
    MyList: MyList
  },
  {
    initialRouteName: 'Me'
  }
);


const TabNavigation = createBottomTabNavigator(
    {
      Search: {
        screen: SearchNavigation,
        navigationOptions: {
          title: 'Search',
          headerTitle: 'Search',
          tabBarIcon: ({focused, tintColor }) => { 
            return <Icon 
                      focused={focused}
                      style={ styles.tabIcon }  
                      name={ MyIcons.mainSearchIcon }
                      type='font-awesome' 
                      color={tintColor} 
                  />
          },
        },
      },
      Me: {
        screen: MyRecipesNavigation,
        navigationOptions: {
          title: 'Me',
          tabBarIcon: ({focused, tintColor }) => { 
            return <Icon 
                      focused={focused}
                      style={ styles.tabIcon }  
                      name={ MyIcons.mainMeIcon }
                      type='font-awesome' 
                      color={tintColor} 
                  />
          },
        },
      },
      Setting: {
        screen: Setting,
        navigationOptions: {
          title: 'Setting',
          tabBarIcon: ({focused, tintColor }) => { 
            return <Icon 
                      focused={focused}
                      style={ MyIcons.mainSettingIcon }
                      name='cog' 
                      type='font-awesome' 
                      color={tintColor} 
                  />
          },
        },
      },
    }, 
    {
      tabBarOptions: {
        activeBackgroundColor: Colors.mainWhiteColor,
        activeTintColor: Colors.mainOrangeColor, 
        inactiveTintColor: Colors.mainBlackColor
      },
      initialRouteName: 'Me',
    }
  );
  
  export default createAppContainer(TabNavigation);

  const styles = StyleSheet.create({
    tabIcon: {
      width: 20,
      height: 20,
      backgroundColor: Colors.mainBlackColor
    },
  });