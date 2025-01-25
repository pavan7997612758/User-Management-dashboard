import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { User } from '../types/User';

interface UserFormProps {
  onSubmit: (data: User) => void;
  initialValues?: User;
}

const UserForm: React.FC<UserFormProps> = ({ onSubmit, initialValues }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    defaultValues: initialValues,
  });

  const submitHandler: SubmitHandler<User> = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)}>
      <div>
        <label>Name</label>
        <input {...register('name', { required: 'Name is required' })} />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div>
        <label>Email</label>
        <input {...register('email', { 
          required: 'Email is required', 
          pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } 
        })} />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <div>
        <label>Role</label>
        <select {...register('role', { required: 'Role is required' })}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        {errors.role && <span>{errors.role.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
