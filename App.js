import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Me from './src/components/Me';
import Setting from './src/components/Setting';
import Search from './src/components/Search';
import Recipe from './src/components/Recipe';
import Navigation from './src/navigation/Navigation';
import { Provider } from 'react-redux';
import { Store } from './src/store/Config';
import Ingredient from './src/components/Ingredient';

export default function App() {
  return (
    <Provider store={ Store }>
        <Navigation/>
    </Provider>
    // <Ingredient></Ingredient>
  );
}

