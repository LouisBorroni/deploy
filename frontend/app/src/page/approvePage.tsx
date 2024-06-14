import React, { useEffect, useState } from "react";
import RessourceService from "../services/ressourceService";
import "./approvePage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck, faTrash, faEye } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ApprovePage: React.FC = () => {
  const storedUser: string | null = sessionStorage.getItem("User");
  const user = storedUser ? JSON.parse(storedUser).user : null;
  const isForbidden = user && user.Id_Role < 2;
  const [ressources, setRessources] = useState<any[]>([]);
  useEffect(() => {
    if (!isForbidden) {
      const fetchRessources = async () => {
        try {
          const res = await RessourceService.getAllRessourcesForApproving();
          setRessources(res); 
        } catch (error) {
          console.log("Erreur lors de la récupération des ressources :", error);
        }
      };

      fetchRessources();
    }
  }, [isForbidden]);

  const handleDeleteRessource = async (id: number) => {
    const isConfirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette ressource ?"
    );
    if (isConfirmed) {
      try {
        await RessourceService.deleteRessource(id);
        const updatedRessources = ressources.filter(
          (ressource) => ressource.Id_Ressource !== id
        );
        setRessources(updatedRessources);
      } catch (error) {
        console.log("Erreur lors de la suppression de la ressource :", error);
      }
    }
  };

  const handleSetStatusRessource = async (
    ressource: any,
    newStatus: string
  ) => {
    try {
      const updatedRessource = { ...ressource, State_Ressource: newStatus };
      await RessourceService.updateStatus(updatedRessource);
      const updatedRessources = ressources.filter(
        (r) => r.Id_Ressource !== ressource.Id_Ressource
      );
      setRessources(updatedRessources);
    } catch (error) {
      console.log(
        "Erreur lors de la modification du statut de la ressource :",
        error
      );
    }
  };

  const navigate = useNavigate();
  const handleNavigateRessource = (id: any) => {
    navigate(`/ressource/${id}`);
  };

  return (
    <div className="approve-page">
      {isForbidden ? (
        <h1>INTERDIT</h1>
      ) : (
        <div>
          <h1>Approuver les ressources</h1>
          <div className="table-wrapper">
            {ressources.length > 0 ? (
              <table className="ressources-table">
                <thead>
                  <tr>
                    <th>Titre</th>
                    <th>Description</th>
                    <th>Type</th>
                    <th>Voir</th>
                    <th>Approuver</th>
                    <th>Désactiver</th>
                    <th>Supprimer</th>
                  </tr>
                </thead>
                <tbody>
                  {ressources.map((ressource: any, index: number) => (
                    <tr key={index}>
                      <td>{ressource.Title_Ressource}</td>
                      <td>{ressource.Description_Ressource}</td>
                      <td>{ressource.Type_Ressource}</td>
                      <td>
                        <button
                          className="action-button check"
                          onClick={() =>
                            handleNavigateRessource(ressource.Id_Ressource)
                          }
                        >
                          <FontAwesomeIcon icon={faEye} />
                        </button>
                      </td>
                      <td>
                        <button
                          className="action-button check"
                          onClick={() =>
                            handleSetStatusRessource(ressource, "Active")
                          }
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </button>
                      </td>
                      <td>
                        <button
                          className="action-button ban"
                          onClick={() =>
                            handleSetStatusRessource(ressource, "Inactive")
                          }
                        >
                          <FontAwesomeIcon icon={faBan} />
                        </button>
                      </td>
                      <td>
                        <button
                          className="action-button delete"
                          onClick={() =>
                            handleDeleteRessource(ressource.Id_Ressource)
                          }
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>Aucune ressource à approuver pour le moment</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApprovePage;
