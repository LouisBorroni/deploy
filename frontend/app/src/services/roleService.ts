const API_URL = 'http://localhost/api';


const RoleService = {
    getAllRoles: async () => {
        try {
          const response = await fetch(`${API_URL}/roles`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching relation types:', error);
          throw error;
        }
      },

      updateUserRole: async (idUser: any, idRole: any) => {
        const dataUpdate = {
          Id_User: idUser,
          Id_Role: idRole
        };
        console.log(dataUpdate)
      
        try {
          const response = await fetch(`${API_URL}/updateRole`, {
            method: 'Post',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(dataUpdate),
          });
          const data = await response.json();
          return data;
        } catch (error: any) {
          console.error('Error while updating resource:', error.message);
          throw error;
        }
      },

      getAllUserForRoles: async () => {
        try {
          const response = await fetch(`${API_URL}/users`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error('Error fetching ressources:', error);
          throw error;
        }
      },
};


export default RoleService;
