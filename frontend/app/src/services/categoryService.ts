const API_URL = 'http://localhost/api';

export interface Category {
  Id_Category: number;
  Title_Category: string;
}


const CategoryService = {
    getAllCategory: async () => {
        try {
          const response = await fetch(`${API_URL}/categories`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching categories:', error);
          throw error;
        }
      },

      deleteCategory: async (id: any) => {
        try {
          const response = await fetch(`${API_URL}/deleteCategory/${id}`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
          });
          const data = await response.json();
          return data;
        } catch (error: any) {
          console.error('Error while delting category by ID:', error.message);
          throw error;
        }
      },

      addCategory: async (Title_Category: any) => {
        try {
          const response = await fetch(`${API_URL}/addCategory`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(Title_Category),
          });
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error adding ressource:', error);
          throw error;
        }
      },
};




export default CategoryService;
