import '../RessourceFormModal/RessourceFormModal.css';
import { PrimaryButton } from '../../common/PrimaryButton/PrimaryButton';
import { faXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useState } from 'react';
import { Input } from '../../common/Input/Input';
import { TextArea } from '../../common/TextArea/TextArea';
import RessourceService from '../../../services/ressourceService';

type MediaType = 'video' | 'article' | 'defi' | 'exercice' | 'fiche_lecture';

const RessourceFormModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [dataRessource, setdataRessource] = useState({
    Title_Ressource: '',
    Description_Ressource: '',
    State_Ressource: 'Pending',
    Public_Ressource: false,
    Content_Ressource: '', // Store video link instead of file
    Type_Ressource: 'video' as MediaType // Default to 'video'
  });



  const [filePreview, setFilePreview] = useState<string | null>(null); // State to hold file preview URL

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setdataRessource((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleMediaTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setdataRessource((prevData) => ({
      ...prevData,
      [name]: value,
      Content_Ressource: value === 'video' ? prevData.Content_Ressource : '', // Reset Media_Ressource if MediaType is not 'video'
    }));
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      // Read the file content and set it to state for preview
      const reader = new FileReader();
      reader.onload = (event) => {
        setFilePreview(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRessourceSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // Appel de la fonction addRessource du service avec les données du formulaire
      const response = await RessourceService.addRessource(dataRessource);
      console.log('Ressource added:', response);
      // Fermer le modal après la soumission
      onClose();
    } catch (error) {
      console.error('Error adding ressource:', error);
      // Gérer l'erreur ici
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className='modal-header'>
          <PrimaryButton className='primary-button close-btn' icon={faXmark} onClick={onClose}/>
        </div>
        <h1 className='form-title'>Nouvelle ressource</h1>
        <form className='ressource-form' onSubmit={handleRessourceSubmit}>  
          <div className='form-inputs'>
            <div className='input-content'>
              <span className='input-span'>Titre</span>
              <Input icon={faArrowRight} type="text" name="Title_Ressource" value={dataRessource.Title_Ressource} onChange={handleInputChange} />
            </div>

            <div className='input-content'>
              <span className='input-span'>Description</span>
              <TextArea value={dataRessource.Description_Ressource} name='Description_Ressource'  onChange={handleInputChange}></TextArea>
            </div>

            <div className='input-content'>
              <span className='input-span'>Type de contenu</span>
              <select name="MediaType" value={dataRessource.Type_Ressource} onChange={handleMediaTypeChange}>
                <option value="video">Vidéo</option>
                <option value="article">Article</option>
                <option value="defi">Défi</option>
                <option value="exercice">Exercice/Atelier</option>
                <option value="fiche_lecture">Fiche de lecture</option>
              </select>
            </div>

            {dataRessource.Type_Ressource === 'video' && (
              <div className='input-content'>
              <span className='input-span'>Lien direct de la vidéo</span>
              <Input icon={faArrowRight} type="text" name="Content_Ressource" value={dataRessource.Content_Ressource} onChange={handleInputChange} />
              {dataRessource.Content_Ressource && (
                <div className='video-preview'>
                  <iframe
                    width="560"
                    height="315"
                    src={`https://www.youtube.com/embed/${dataRessource.Content_Ressource.split('v=')[1]}`}
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              )}
            </div>
            
            )}

            {/* {['defi', 'exercice'].includes(dataRessource.MediaType) && (
              <div className='input-content'>
                <span className='input-span'>Contenu</span>
                <TextArea value={dataRessource.Content_Ressource} name='Content_Ressource'  onChange={handleInputChange}></TextArea>
              </div>
            )} */}

            

            {/* {['article', 'fiche_lecture'].includes(dataRessource.MediaType) && (
              <div className='input-content'>
                <span className='input-span'>Fichier PDF</span>
                <input type="file" name="Content_Ressource" onChange={handleFileInputChange} />
              </div>
            )} */}



          </div>
          <PrimaryButton type="submit">Ajouter</PrimaryButton>
        </form>
      </div>
    </div>
  );
};

export default RessourceFormModal;
