import React, { useEffect, useState } from "react";
import "./categoryPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBan, faCheck, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import CategoryService from "../services/categoryService";
import { PrimaryButton } from "../components/common/PrimaryButton/PrimaryButton";

const CategoryPage: React.FC = () => {
  const storedUser: string | null = sessionStorage.getItem("User");
  const user = storedUser ? JSON.parse(storedUser).user : null;
  const isForbidden = user && user.Id_Role < 2;

  // State local pour stocker les categories
  const [categories, setCategories] = useState<any[]>([]); // TODO ajouter un type 
  const [showModal, setShowModal] = useState(false);
  const [newCategoryTitle, setNewCategoryTitle] = useState("");

  useEffect(() => {
    if (!isForbidden) {
      const fetchCategories = async () => {
        try {
          const res = await CategoryService.getAllCategory();
          setCategories(res);
        } catch (error) {
          console.log("Erreur lors de la récupération des category :", error);
        }
      };

      fetchCategories();
    }
  }, [isForbidden]);

  const handleDeleteCategory = async (id: number) => {
    const isConfirmed = window.confirm("Voulez-vous vraiment supprimer cette categorie ?");
    if (isConfirmed) {
      try {
        await CategoryService.deleteCategory(id);
        const updatedCategories = categories.filter((category) => category.Id_Category !== id);
        setCategories(updatedCategories);
      } catch (error) {
        console.log("Erreur lors de la suppression de la categorie :", error);
      }
    }
  };
  

  const handleAddCategory = async () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewCategoryTitle(""); // Réinitialiser le titre de la nouvelle catégorie
  };

  const handleSaveCategory = async () => {
    try {
        console.log(newCategoryTitle)
      await CategoryService.addCategory({ Title_Category: newCategoryTitle });
      setShowModal(false);
      setNewCategoryTitle(""); // Réinitialiser le titre de la nouvelle catégorie
      // Rafraîchir la liste des catégories
      const res = await CategoryService.getAllCategory();
      setCategories(res);
    } catch (error) {
      console.log("Erreur lors de l'ajout de la catégorie :", error);
    }
  };

  return (
    <div className="category-page">
      {isForbidden ? (
        <h1>INTERDIT</h1> 
      ) : (
        <div>
          <h1>Gérer les catégories</h1>
          <PrimaryButton icon={faPlus} onClick={handleAddCategory}>Ajouter une catégorie</PrimaryButton>
          <div className="table-wrapper">
            <table className="category-table">
              <thead>
                <tr>
                  <th>Titre</th>
                  <th>Supprimer</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category: any, index: number) => (
                  <tr key={index}>
                    <td>{category.Title_Category}</td>
                    <td>
                      <button className="action-button delete" onClick={() => handleDeleteCategory(category.Id_Category)}> 
                        <FontAwesomeIcon icon={faTrash}/>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showModal && (
            <div className="modal">
              <div className="modal-content">
                <span className="close" onClick={handleCloseModal}>&times;</span>
                <h2>Ajouter une catégorie</h2>
                <input
                  type="text"
                  placeholder="Titre de la catégorie"
                  value={newCategoryTitle}
                  onChange={(e) => setNewCategoryTitle(e.target.value)}
                />
                <div className="modal-buttons">
                  <button onClick={handleSaveCategory}>Valider</button>
                  <button onClick={handleCloseModal}>Annuler</button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CategoryPage;
