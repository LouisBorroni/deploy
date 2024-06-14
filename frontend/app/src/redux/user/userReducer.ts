// userReducer.ts

import { User } from '../../types/User';
import { SET_USER, LOGOUT_USER } from './userActions';

// Définir le type UserState
interface UserState {
  currentUser: User | null;
}

// Vérifie si des données d'utilisateur sont présentes dans le stockage local
const savedUser = localStorage.getItem('currentUser');
const initialState: UserState = {
  currentUser: savedUser ? JSON.parse(savedUser) : null,
};

const userReducer = (state = initialState, action: any): UserState => {
  switch (action.type) {
    case SET_USER:
      // Sauvegarde les informations de l'utilisateur dans le stockage local
      localStorage.setItem('currentUser', JSON.stringify(action.payload));

      return {
        ...state,
        currentUser: action.payload,
      };
    case LOGOUT_USER:
      // Supprime les informations de l'utilisateur du stockage local
      localStorage.removeItem('currentUser');

      return {
        ...state,
        currentUser: null,
      };
    default:
      return state;
  }
};

export default userReducer;
