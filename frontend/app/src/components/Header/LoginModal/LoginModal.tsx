import React, { useState } from 'react';
import './LoginModal.css';
import { PrimaryButton } from '../../common/PrimaryButton/PrimaryButton';
import { faCheck, faXmark, faUser } from "@fortawesome/free-solid-svg-icons";
import { Input } from '../../common/Input/Input';
import UserService from '../../../services/userService';

const LoginModal: React.FC<{ onClose: () => void; onLogin: (loginData: any) => Promise<void>; }> = ({ onClose, onLogin }) => {
  const [activeForm, setActiveForm] = useState<'logIn' | 'signIn'>('logIn');
  const [dataSignIn, setDataSignIn] = useState({
    FirstName_User: '',
    LastName_User: '',
    Email_User: '',
    Tel_User: '',
    Password_User: '',
    ConfirmationPassword_User: '',
    Id_Role: 1,
  });
  const [dataLogin, setDataLogin] = useState({
    Email_User: '',
    Password_User: '',
  });
  const [passwordMatchError, setPasswordMatchError] = useState<string | null>(null);
  const [loginError, setLoginError] = useState<string | null>(null);

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const switchToConnexionForm = () => {
    setActiveForm('logIn');
  };

  const switchToInscriptionForm = () => {
    setActiveForm('signIn');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataSignIn((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInputLogInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDataLogin((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSignInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (dataSignIn.Password_User !== dataSignIn.ConfirmationPassword_User) {
      setPasswordMatchError("Les mots de passe ne correspondent pas");
      return;
    }

    setPasswordMatchError(null);

    console.log('Data submitted:', dataSignIn);

    try {
      await UserService.signIn(dataSignIn);
      onClose();
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleLogInSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('Data submitted:', dataLogin);

    try {
      const result =  await UserService.logIn(dataLogin);
      if(result){ 
        onClose();
      }
      else {
        setLoginError("Erreur: mot de passe ou identifiant incorrect");
      }
    } catch (error) {
      handleApiError(error);
    }
  };

  const handleApiError = (error: any) => {
    if (error instanceof Error) {
      console.error('API Error:', error.message);
    } else {
      console.error('Unknown API Error:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className='modal-header'>
          <PrimaryButton className='primary-button close-btn' icon={faXmark} onClick={onClose}/>
        </div>
        <div className='modal-type-button'>
          <PrimaryButton
            onClick={switchToConnexionForm}
            className={activeForm === 'logIn' ? 'primary-button active-button' : 'primary-button inactive-button'}
          >
            Connexion
          </PrimaryButton>
          <PrimaryButton
            onClick={switchToInscriptionForm}
            className={activeForm === 'signIn' ? 'primary-button active-button' : 'primary-button inactive-button'}
          >
            Inscription
          </PrimaryButton>
        </div>
        {activeForm === 'logIn' && (
          <div className='form-content'>
            <div className='form-header'>
                <h2 className='form-title'>Se connecter</h2>
            </div>
            <form className='logIn-form' onSubmit={handleLogInSubmit}>  
              <div className='form-inputs'>
                <div className='input-content'>
                  <span className='input-span'>Email / Username</span>
                  <Input type="email" name="Email_User" value={dataLogin.Email_User} onChange={handleInputLogInChange} />
                </div>
                <div className='input-content'>
                  <span className='input-span'>Mot de passe</span>
                  <Input type="password" name="Password_User" value={dataLogin.Password_User} onChange={handleInputLogInChange}/>
                </div>
              </div>
              {loginError && (
                <div className="error-message">
                  <p>{loginError}</p>
                </div>
              )}
              <PrimaryButton icon={faUser} type="submit">Se connecter</PrimaryButton>
            </form>
          </div>
        )}

        {activeForm === 'signIn' && (
          <div className='form-content'>
            <div className='form-header'>
                <h2 className='form-title'>Inscription</h2>
            </div>            
            <form className='signIn-form' onSubmit={handleSignInSubmit}>
              <div className='form-inputs'>
                <div className='input-content'>
                  <span className='input-span'>Nom</span>
                  <Input type="text" name="LastName_User" value={dataSignIn.LastName_User} onChange={handleInputChange} />
                </div>
                <div className='input-content'>
                  <span className='input-span'>Prénom</span>
                  <Input type="text" name="FirstName_User" value={dataSignIn.FirstName_User} onChange={handleInputChange}/>
                </div>
                <div className='input-content'>
                  <span className='input-span'>Email</span>
                  <Input type="email" name="Email_User" value={dataSignIn.Email_User} onChange={handleInputChange}/>
                </div>
                <div className='input-content'>
                  <span className='input-span'>Téléphone</span>
                  <Input type="text" name="Tel_User" value={dataSignIn.Tel_User} onChange={handleInputChange}/>
                </div>
                <div className='input-content'>
                  <span className='input-span'>Mot de passe</span>
                  <Input type="password" name="Password_User" value={dataSignIn.Password_User} onChange={handleInputChange}/>
                </div>
                <div className='input-content'>
                  <span className='input-span'>Confirmez Votre Mot de passe</span>
                  <Input type="password" name="ConfirmationPassword_User" value={dataSignIn.ConfirmationPassword_User} onChange={handleInputChange}/>
                </div>
              </div>
              {passwordMatchError && (
                <div className="error-message">
                  <p>{passwordMatchError}</p>
                </div>
              )}
              <PrimaryButton icon={faCheck} type="submit">Valider</PrimaryButton>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginModal;
