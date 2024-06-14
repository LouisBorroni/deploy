import React, { useEffect, useState } from "react";
import "./rolesPage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";
import RoleService from "../services/roleService";

const RolePage: React.FC = () => {
  const storedUser: string | null = sessionStorage.getItem("User");
  const actualUser = storedUser ? JSON.parse(storedUser).user : null;

  const isForbidden = actualUser && actualUser.Id_Role < 3;

  const [roles, setRoles] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [selectedRole, setSelectedRole] = useState<any>('');


  useEffect(() => {
    if (!isForbidden) {
      fetchRoles();
      fetchUsers();
    }
  }, [isForbidden]);

  const fetchRoles = async () => {
    try {
      const res = await RoleService.getAllRoles();
      setRoles(res);
    } catch (error) {
      console.log("Erreur lors de la récupération des rôles :", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await RoleService.getAllUserForRoles();
      const filteredUsers = res.filter((user: any) => user.Id_User !== actualUser?.Id_User);
      setUsers(filteredUsers);
    } catch (error) {
      console.log("Erreur lors de la récupération des utilisateurs :", error);
    }
  };

  const handleEditRole = (user: any) => {
    setSelectedUser(user);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedUser(null);
  };

  const handleSaveRole = async (idUser: any, idRole: any) => {
    try {
      const parsedRoleId = parseInt(idRole);
      if (!isNaN(parsedRoleId)) {
        await RoleService.updateUserRole(idUser, parsedRoleId);
        handleCloseModal();
        fetchUsers();
      } else {
        console.error('Invalid role ID');
      }
    } catch (error) {
      console.log("Erreur lors de la modification du rôle :", error);
    }
  };
  

  return (
    <div className="role-page">
      {isForbidden ? (
        <h1>INTERDIT</h1>
      ) : (
        <div>
          <h1>Gérer les rôles des Utilisateurs</h1>
          <div className="table-wrapper">
            <table className="role-table">
              <thead>
                <tr>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Email</th>
                  <th>Téléphone</th>
                  <th>Role</th>
                  <th>Editer le rôle</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user: any, index: number) => (
                  <tr key={index}>
                    <td>{user.FirstName_User}</td>
                    <td>{user.LastName_User}</td>
                    <td>{user.Email_User}</td>
                    <td>{user.Tel_User}</td>
                    <td>{user.role.Title_Role}</td>
                    <td>
                      <button className="action-button see" onClick={() => handleEditRole(user)}>
                        <FontAwesomeIcon icon={faPen} />
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
                <span className="close" onClick={handleCloseModal}>
                  &times;
                </span>
                <h2>Modifier le rôle de {selectedUser.FirstName_User} {selectedUser.LastName_User}</h2>
                <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                  <option value="">Sélectionner un rôle</option>
                  {roles.map((role: any) => (
                    <option key={role.Id_Role} value={role.Id_Role}>{role.Title_Role}</option>
                  ))}
                </select>
                <button onClick={() => handleSaveRole(selectedUser.Id_User, selectedRole)}>Valider</button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RolePage;
