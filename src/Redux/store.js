import { createStore } from "redux";
import stepMainReducer from "./stepMain_reducer"
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
const persistConfig = {
    key: 'root',
    storage: storage,
    stateReconciler: autoMergeLevel2 // 查看 'Merge Process' 部分的具体情况
};

const myPersistReducer = persistReducer(persistConfig, stepMainReducer)

const store = createStore(myPersistReducer)

export const persistor = persistStore(store)
export default store