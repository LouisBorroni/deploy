const API_URL = 'http://localhost/api';

export interface RelationType {
  Id_RelationType: number;
  Title_RelationType: string;
}


const RelationTypeService = {
    getAllRelationTypes: async () => {
        try {
          const response = await fetch(`${API_URL}/relationTypes`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching relation types:', error);
          throw error;
        }
      },
};


export default RelationTypeService;
