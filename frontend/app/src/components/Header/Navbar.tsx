import React, { useState } from 'react';
import './Header.css';
import { PrimaryButton } from '../common/PrimaryButton/PrimaryButton';
import { faRightToBracket } from "@fortawesome/free-solid-svg-icons";
import LoginModal from './LoginModal/LoginModal';
import UserService from '../../services/userService';
import { useNavigate } from 'react-router-dom';

interface NavbarProps {
    isLoggedIn: boolean;
    setIsLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
    userInfo: any;
    updateUserInfo: (user: any) => void; // Ajoutez cette fonction comme prop
}

const Navbar: React.FC<NavbarProps> = ({ isLoggedIn, setIsLoggedIn, userInfo, updateUserInfo }) => {
    const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

    const navigate = useNavigate();
    const openLoginModal = () => {
        setIsLoginModalOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginModalOpen(false);
    };

    const handleLogout = () => {
        const confirmLogout = window.confirm("Êtes-vous sûr de vouloir vous déconnecter ?");
        if (confirmLogout) {
            UserService.logout();
            UserService.triggerAuthChange();
        }
        
        navigate("/");
        window.location.reload();
    };
    
    const handleLogin = async (loginData: any) => {
        const user = await UserService.logIn(loginData);
        if (user) {
            updateUserInfo(user);
            setIsLoggedIn(true);
        }
    };
    

    return (
        <nav className="navbar">
            <h1 className="navbar-title">salut</h1>
            <ul className="nav-list">
                {isLoggedIn ? (
                    <>
                        {userInfo && (
                            <li className="user-info">
                                Bonjour {userInfo.FirstName_User} {userInfo.Id_Role}
                            </li>
                        )}
                        <li>
                            <PrimaryButton icon={faRightToBracket} onClick={handleLogout}>Se déconnecter</PrimaryButton>
                        </li>
                    </>
                ) : (
                    <PrimaryButton icon={faRightToBracket} onClick={openLoginModal}>
                        Se connecter
                    </PrimaryButton>
                )}
            </ul>
            {isLoginModalOpen && <LoginModal onClose={closeLoginModal} onLogin={handleLogin} />}
        </nav>
    );
};

export default Navbar;
