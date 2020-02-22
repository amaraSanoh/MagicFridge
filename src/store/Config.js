import { createStore } from 'redux';

import { persistStore, persistReducer } from 'redux-persist'; 
import { AsyncStorage } from 'react-native'; 
import Index from './reducers/Index';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, Index); //redux-persist créé un reducer à partir du notre

export const Store = createStore(persistedReducer); //on utilise ce reducer pour créer le store redux
export let persistor = persistStore(Store);