import React from "react";
import { PrimaryButton } from "../common/PrimaryButton/PrimaryButton";
import { useNavigate } from "react-router-dom";
import "./LeftSide.css";

interface User {
  Id_User: number;
  FirstName_User: string;
  LastName_User: string;
  Email_User: string;
  Tel_User: string;
  Id_Role: number;
  Token_User: string;
}

interface LeftSideProps {
  isLoggedIn: boolean;
}

const LeftSide: React.FC<LeftSideProps> = ({ isLoggedIn }) => {
  const storedUser: string | null = sessionStorage.getItem("User");
  const user: User | null = storedUser ? JSON.parse(storedUser).user : null;

  // Utilisez useNavigate au lieu de useHistory
  const navigate = useNavigate();

  const handleButtonClick = () => {
    if (user) {
      console.log(user);
    }
  };

  const handleReferentielClick = () => {
    navigate("/referentiel");
  };

  const handleApprove = () => {
    navigate("/approve"); 
  }

  const handleCategory = () => {
    navigate("/categories"); 
  }

  const handleRole = () => {
    navigate("/roles"); 
  }

  return (
    <div className="left-side">
      <div className="left-side-container">
        <div className="user-actions">
          {isLoggedIn && (
            <>
              <div className="title">
                <h2>Menu</h2>
              </div>
              <PrimaryButton onClick={handleButtonClick}>
                Nouvelle ressource
              </PrimaryButton>
              <PrimaryButton onClick={handleButtonClick}>
                progression
              </PrimaryButton>
            </>
          )}
        </div>

        {user && user.Id_Role > 1 && (
          <div className="moderation">
            <div className="title">
              <h2>Administration</h2>
            </div>
            <PrimaryButton onClick={handleApprove}>
              Approuver des ressources
            </PrimaryButton>
            {user.Id_Role > 2 && (
              <>
                <PrimaryButton onClick={handleReferentielClick}>
                  Référentiel Ressource
                </PrimaryButton>
                <PrimaryButton onClick={handleCategory}>
                  Gérer les catégories
                </PrimaryButton>
                <PrimaryButton onClick={handleRole}>
                  Gérer les roles
                </PrimaryButton>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LeftSide;
