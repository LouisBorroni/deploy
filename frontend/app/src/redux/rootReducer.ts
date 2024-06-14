// src/redux/rootReducer.ts
import { combineReducers } from 'redux';
import ressourceReducer from './ressource/ressourceReducer';
import userReducer from './user/userReducer';

const rootReducer = combineReducers({
  ressources: ressourceReducer,
  user: userReducer,
});

export default rootReducer;
