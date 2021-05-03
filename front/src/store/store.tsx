import { createStore, combineReducers } from "redux";
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import userReducer from "../components/Singin/reducer/reducer"


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['user']
}

const rootReducer = combineReducers({
    user: userReducer
});


const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = createStore(persistedReducer);

export default store; 