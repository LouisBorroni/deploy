// src/services/RessourceService.ts

type MediaType = 'video' | 'article' | 'defi' | 'exercice' | 'fiche_lecture';

const API_URL = 'http://localhost/api';

interface RessourceData {
  Title_Ressource: string;
  Description_Ressource: string;
  State_Ressource: string;
  Public_Ressource: boolean;
  Content_Ressource: string;
  Type_Ressource: MediaType;
}

export interface RessourceDataUpdate{
  Id_Ressource?: number;
  Title_Ressource: string;
  Description_Ressource: string;
  Content_Ressource: string;
  State_Ressource:string,
  Type_Ressource: string;
  Public_Ressource: number;
  Id_Category: number;
  Id_RelationType: number;
}





const RessourceService = {

  getRessourceById: async (ressourceId: number) => {
    try {
      const response = await fetch(`${API_URL}/ressourceById/${ressourceId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error while fetching resource by ID:', error.message);
      throw error;
    }
  },

  updateStatus: async (ressourceData: RessourceDataUpdate) => {
    try {
      const response = await fetch(`${API_URL}/updateStatus`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ressourceData),
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error while updating resource:', error.message);
      throw error;
    }
  },
  
  updateRessource: async (ressourceData: RessourceDataUpdate) => {
    try {
      const response = await fetch(`${API_URL}/updateRessource/`, {
        method: 'Patch',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ressourceData),
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error while updating resource:', error.message);
      throw error;
    }
  },

  getAllRessources: async () => {
    try {
      const response = await fetch(`${API_URL}/ressources`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ressources:', error);
      throw error;
    }
  },

  getAllRessourcesForApproving: async () => {
    try {
      const response = await fetch(`${API_URL}/ressourcesForApproving`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ressources:', error);
      throw error;
    }
  },

  getAllRessourcesForListing: async () => {
    try {
      const response = await fetch(`${API_URL}/ressourcesForListing`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching ressources:', error);
      throw error;
    }
  },

  addRessource: async (ressourceData: RessourceData) => {
    try {
      const response = await fetch(`${API_URL}/addRessource`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ressourceData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error adding ressource:', error);
      throw error;
    }
  },

  deleteRessource: async (ressourceId: number) => {
    try {
      const response = await fetch(`${API_URL}/deleteRessource/${ressourceId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      return data;
    } catch (error: any) {
      console.error('Error while delting resource by ID:', error.message);
      throw error;
    }
  },
};

export default RessourceService;
