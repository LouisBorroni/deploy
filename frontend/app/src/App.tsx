import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Header/Navbar';
import LeftSide from './components/LeftSide/LeftSide';
import UserService from './services/userService';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import ReferentielPage from './page/referentialPage';
import MiddleSide from './components/MiddleSide/MiddleSide';
import ApprovePage from './page/approvePage';
import CategoryPage from './page/categoryPage';
import RessourceDetailPage from './page/RessourceDetailPage';
import RolePage from './page/rolesPage';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(UserService.isLoggedIn());
  const [userInfo, setUserInfo] = useState<any>(null);

  useEffect(() => {
    const storedUser = sessionStorage.getItem('User');
    if (storedUser) {
      const { user } = JSON.parse(storedUser);
      const { FirstName_User, LastName_User } = user;
      setUserInfo({ FirstName_User, LastName_User });
    }
  }, [isLoggedIn]); 

  const updateUserInfo = (user: any) => {
    const { FirstName_User, LastName_User } = user;
    setUserInfo({ FirstName_User, LastName_User });
  };

  return (
    <Router>
      <div className="App">
        <div className="header">
          <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} userInfo={userInfo} updateUserInfo={updateUserInfo} />
        </div>
          <Routes>
            <Route path="/referentiel" element={<ReferentielPage />} />
            <Route path="/approve" element={<ApprovePage />} />
            <Route path="/categories" element={<CategoryPage />} />
            <Route path="/roles" element={<RolePage />} />
            <Route path="/ressource/:id" element={<RessourceDetailPage />} />
            <Route path="/" element={<Home isLoggedIn={isLoggedIn} />} />
          </Routes>
      </div>
    </Router>
  );
}

const Home: React.FC<{isLoggedIn: boolean}> = ({isLoggedIn}) => {
  return (
    <div className="header">
      <div className="container">
        <LeftSide isLoggedIn={isLoggedIn} />
        <MiddleSide /> {/* Placez MiddleSide ici */}
      </div>
    </div>
  );
}

export default App;
