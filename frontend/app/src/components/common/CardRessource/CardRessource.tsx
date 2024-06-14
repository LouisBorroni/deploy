import React from 'react';
import './CardRessource.css'
import { PrimaryButton } from '../PrimaryButton/PrimaryButton';
import { faArrowUpRightFromSquare, faHeart, faEye } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from 'react-router-dom';

interface CardRessourceProps {
  Id_Ressource: number;
  Title_Ressource: string;
  Description_Ressource: string;
}

const CardRessource: React.FC<CardRessourceProps> = ({ Title_Ressource, Description_Ressource, Id_Ressource }) => {

  const navigate = useNavigate();
  const handleNavigateRessource = (id: any) => {
    navigate(`/ressource/${id}`);
  };
  return (
    <div className="card-ressource">
        <div className='card-ressource-header'>
            <span className='ressource-title'>{Title_Ressource}</span>
        </div>
      
      <p>{Description_Ressource}</p>
      <div className='card-ressource-footer'>
        <div className='card-button'>
            <PrimaryButton icon={faArrowUpRightFromSquare} onClick={() => handleNavigateRessource(Id_Ressource)}>En savoir Plus</PrimaryButton>
        </div>
      </div>
    </div>
  );
};

export default CardRessource;

