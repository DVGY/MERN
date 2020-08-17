import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import { alertReducer } from './alert/alertReducer';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['alert', 'auth'],
};
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['currentUser', 'isUserAuthenticated'],
  blacklist: ['loading', 'error'],
};
const rootReducer = combineReducers({
  auth: persistReducer(authPersistConfig, authReducer),
  alert: alertReducer,
});
export default persistReducer(rootPersistConfig, rootReducer);
