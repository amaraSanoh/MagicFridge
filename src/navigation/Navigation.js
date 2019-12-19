import React from 'react';
import { StyleSheet, Image } from 'react-native';

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Search from '../components/Search'; 
import Me from '../components/Me';
import Setting from '../components/Setting';

const SearchNavigation = createStackNavigator(
  {
  Search: Search
  },
  {
    initialRouteName: 'Search'
  }
);

const TabNavigation = createBottomTabNavigator(
    {
      Search: {
        screen: SearchNavigation,
        navigationOptions: {
          title: 'Search',
          headerTitle: 'Search',
          tabBarIcon: () => {
            return <Image style={ styles.tabIcon } source={{ uri: 'image' }}/>
          },
        },
      },
      Me: {
        screen: Me,
        navigationOptions: {
          title: 'Me',
          tabBarIcon: () => {
            return <Image style={ styles.tabIcon } source={{ uri: 'image' }}/>
          },
        },
      },
      Setting: {
        screen: Setting,
        navigationOptions: {
          title: 'Setting',
          tabBarIcon: () => {
            return <Image style={ styles.tabIcon } source={{ uri: 'image' }}/>
          },
        },
      },
    }, 
    {
      tabBarOptions: {
        activeBackgroundColor: 'orange',
        activeTintColor: 'white',
      },
      initialRouteName: 'Me',
    }
  );
  
  export default createAppContainer(TabNavigation);

  const styles = StyleSheet.create({
    tabIcon: {
      width: 20,
      height: 20,
      backgroundColor: 'white'
    },
  });