const API_URL = 'http://localhost/api';

interface SignInData {
  FirstName_User: string;
  LastName_User: string;
  Email_User: string;
  Tel_User: string;
  Password_User: string;
}

interface LoginData {
  Email_User: string;
  Password_User: string;
}

interface UserService {
  signIn: (data: SignInData) => Promise<void>;
  logIn: (data: LoginData) => Promise<any>;
  logout: () => void;
  isLoggedIn: () => boolean;
  subscribeToAuthChanges: (callback: (isLoggedIn: boolean) => void) => void;
  triggerAuthChange: () => void;
}

const UserService: UserService = {

  signIn: async (data) => {
    try {
      const response = await fetch(`${API_URL}/signIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Sign In success:', result);
      } else {
        console.error('Sign In failed:', response.statusText);
      }
    } catch (error: any) {
      console.error('Error during Sign In:', error.message);
    }
  },

  logIn: async (data) => {
    try {
      const response = await fetch(`${API_URL}/logIn`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        const result = await response.json();
        console.log(result.user);
        sessionStorage.setItem('User', JSON.stringify(result.user));
        UserService.triggerAuthChange(); 
        window.location.reload();
        return result.user;
      } else {
        console.error('Login failed:', response.statusText);
      }
    } catch (error: any) {
      console.error('Error during Login:', error.message);
    }
  },

  logout: () => {
    sessionStorage.removeItem('User'); 
    UserService.triggerAuthChange(); 
  },

  isLoggedIn: () => {
    const user = sessionStorage.getItem('User');
    return !!user;
  },


  subscribeToAuthChanges(callback) {
    window.addEventListener('authChange', () => {
      callback(this.isLoggedIn());
    });
  },

  triggerAuthChange() {
    window.dispatchEvent(new Event('authChange'));
  }
};

export default UserService;
