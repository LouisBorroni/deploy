// src/redux/ressource/ressourceActions.ts
export const SET_RESSOURCES = 'SET_RESSOURCES';

export const setRessources = (ressources: any[]) => ({
  type: SET_RESSOURCES,
  payload: ressources,
});
