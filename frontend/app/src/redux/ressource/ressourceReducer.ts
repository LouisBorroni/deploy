// src/redux/ressource/ressourceReducer.ts
import { SET_RESSOURCES } from './ressourceActions';

const initialState: any[] = [];

const ressourceReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case SET_RESSOURCES:
      return action.payload;
    default:
      return state;
  }
};

export default ressourceReducer;
