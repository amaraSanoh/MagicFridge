import { createStore } from 'redux';

import RecipeReducers from './reducers/RecipeReducers';
import { persistStore, persistReducer } from 'redux-persist'; 
import { AsyncStorage } from 'react-native'; 

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, RecipeReducers); //redux-persist créé un reducer à partir du notre

export const Store = createStore(persistedReducer); //on utilise ce reducer pour créer le store redux
export let persistor = persistStore(Store);