import React, { useState } from 'react';
import UserTable from '../components/UserTable';
import UserForm from '../components/UserForm';
import Modal from '../components/Modal';
import { User } from '../types/User';

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const addUser = (user: User) => {
    setUsers((prev) => [...prev, { ...user, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const updateUser = (updatedUser: User) => {
    setUsers((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
    setIsModalOpen(false);
  };

  const deleteUser = (id: number) => {
    setUsers((prev) => prev.filter((user) => user.id !== id));
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleAdd = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1>User Management Dashboard</h1>
      <button onClick={handleAdd}>Add User</button>
      <UserTable data={users} onEdit={handleEdit} onDelete={deleteUser} />
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <UserForm
          onSubmit={editingUser ? updateUser : addUser}
          initialValues={editingUser || undefined}
        />
      </Modal>
    </div>
  );
};

export default Dashboard;
