import React, { useEffect, useState } from 'react';
import RessourceService from '../../services/ressourceService';
import './MiddleSide.css';
import CardRessource from '../common/CardRessource/CardRessource';

const MiddleSide = () => {
  const [ressources, setRessources] = useState<any[]>([]);

  useEffect(() => {
    const fetchRessources = async () => {
      try {
        const res = await RessourceService.getAllRessources();
        setRessources(res);
      } catch (error) {
        console.log("Erreur lors de la récupération des ressources :", error);
      }
    };

    fetchRessources();
    console.log(ressources)
  }, []);

  return (
    <div className="middle-side">
      <div className="scrollable-container">
        {ressources.map((ressource: any, index: number) => (
          <CardRessource
            key={index}
            Id_Ressource={ressource.Id_Ressource}
            Title_Ressource={ressource.Title_Ressource}
            Description_Ressource={ressource.Description_Ressource}
          />
        ))}
      </div>
    </div>
  );
};

export default MiddleSide;
