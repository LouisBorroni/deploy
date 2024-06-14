import React, { useEffect, useState } from "react";
import RessourceService from "../services/ressourceService";
import "./refrentialPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faTrash,
  faBan,
  faPlay,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const ReferentielPage: React.FC = () => {
  const storedUser: string | null = sessionStorage.getItem("User");
  const user = storedUser ? JSON.parse(storedUser).user : null;
  const isForbidden = user && user.Id_Role < 3;
  const [ressources, setRessources] = useState<any[]>([]);

  useEffect(() => {
    if (!isForbidden) {
      const fetchRessources = async () => {
        try {
          const res = await RessourceService.getAllRessourcesForListing();
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

  const navigate = useNavigate();
  const handleNavigateRessource = (id: any) => {
    navigate(`/ressource/${id}`);
  };

  const handleSetStatusRessource = async (ressource: any) => {
    const isConfirmed = window.confirm(
      "Voulez-vous vraiment modifier le statut de cette ressource ?"
    );
    if (isConfirmed) {
      try {
        const newStatus =
          ressource.State_Ressource === "Active" ? "Inactive" : "Active";
        const updatedRessource = { ...ressource, State_Ressource: newStatus };
        await RessourceService.updateStatus(updatedRessource);
        const updatedRessources = ressources.map((r: any) => {
          if (r.Id_Ressource === ressource.Id_Ressource) {
            return updatedRessource;
          }
          return r;
        });
        setRessources(updatedRessources);
      } catch (error) {
        console.log(
          "Erreur lors de la modification du statut de la ressource :",
          error
        );
      }
    }
  };

  return (
    <div className="referentiel-page">
      {isForbidden ? (
        <h1>INTERDIT</h1>
      ) : (
        <div className="table-wrapper">
          <table className="ressources-table">
            <thead>
              <tr>
                <th>Titre</th>
                <th>Description</th>
                <th>Type</th>
                <th>voir</th>
                <th>Suspendre / Activer</th>
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
                    <button className="action-button see">
                      <FontAwesomeIcon
                        icon={faEye}
                        onClick={() =>
                          handleNavigateRessource(ressource.Id_Ressource)
                        }
                      />
                    </button>
                  </td>
                  <td>
                    {ressource.State_Ressource === "Active" ? (
                      <button
                        className="action-button ban"
                        onClick={() => handleSetStatusRessource(ressource)}
                      >
                        <FontAwesomeIcon icon={faBan} />
                      </button>
                    ) : (
                      <button
                        className="action-button activate"
                        onClick={() => handleSetStatusRessource(ressource)}
                      >
                        <FontAwesomeIcon icon={faPlay} />
                      </button>
                    )}
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
        </div>
      )}
    </div>
  );
};

export default ReferentielPage;
