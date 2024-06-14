import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RessourceService from "../services/ressourceService";
import "./RessourceDetailPage.css";

const RessourceDetailPage: React.FC = () => {
  // Utilisez useParams pour récupérer les paramètres de l'URL
  const { id } = useParams<{ id?: string }>(); // Définir id comme une chaîne de caractères facultative

  // State local pour stocker les détails de la ressource
  const [ressource, setRessource] = useState<any>(null);

  useEffect(() => {
    // Vérifiez si l'ID est défini avant de l'utiliser
    if (id) {
      // Convertissez l'ID en nombre (si nécessaire)
      const resourceId = parseInt(id, 10);
      if (!isNaN(resourceId)) {
        // Utilisez l'ID pour récupérer les détails de la ressource depuis le service
        const fetchRessource = async () => {
          try {
            const res = await RessourceService.getRessourceById(resourceId);
            setRessource(res);
          } catch (error) {
            console.log(
              "Erreur lors de la récupération des détails de la ressource :",
              error
            );
          }
        };

        fetchRessource();
      }
    }
  }, [id]);

  if (!ressource) {
    return <div>Loading...</div>;
  }

  // Extraire l'identifiant de la vidéo YouTube à partir du lien dans le contenu
  const youtubeVideoId = extractYoutubeVideoId(ressource.Content_Ressource);

  return (
    <div className="ressource-container">
      <div className="ressource-title">
        <h2>{ressource.Title_Ressource}</h2>
      </div>
      <p>Description: {ressource.Description_Ressource}</p>
      <p>Type: {ressource.Type_Ressource}</p>
      <p>Catégorie: {ressource.category.Title_Category}</p>
      <p>Type de relation: {ressource.relation_type.Title_RelationType}</p>
      {ressource.Type_Ressource == "vidéo" && youtubeVideoId ? (
        <div className="video-preview">
          <iframe
            width="560"
            height="315"
            src={`https://www.youtube.com/embed/${youtubeVideoId}`}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      ) : (
        <p>Contenu : {ressource.Content_Ressource}</p>
      )}
    </div>
  );
};

// Fonction pour extraire l'identifiant de la vidéo YouTube à partir du lien
const extractYoutubeVideoId = (content: string): string | null => {
  const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = content.match(youtubeRegex);
  return match ? match[1] : null;
};

export default RessourceDetailPage;
