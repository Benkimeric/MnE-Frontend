import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Button from '../../components/Button';
import UserForm from '../../components/Form/UserForm';
import Modal from '../../components/Modal';
import UsersTable from '../../components/Table/UsersTable';
import {
  closeModalAction,
  openModalAction,
} from '../../redux/actionCreator/modalActions';
import {
  addUser,
  deleteUser,
  editUsers,
  fetchUsers,
} from '../../redux/actionCreator/userActions';

import './Users.scss';

const Users = (props: any) => {
  const {
    deleteUsersAction,
    editUsersAction,
    fetchUsersAction,
    usersData,
    openModal,
    closeModal,
    modal,
    addUsersAction,
  } = props;
  const { shouldOpen, modalType } = modal;
  const { users, isLoading, currentUser } = usersData;
  const [editingKey, setEditingKey] = useState('');
  const [formName, setFormName] = useState('Add');

  useEffect(() => {
    fetchUsersAction();
  }, [fetchUsersAction]);

  const [form] = Form.useForm();

  const handleSave = async (userDetails: any) => {
    if (/Add/.test(formName)) {
      addUsersAction(userDetails);
    }
    if (/Edit/.test(formName)) {
      editUsersAction(userDetails, editingKey);
      setEditingKey('');
    }
  };

  const deleteUser = (userId: string) => {
    deleteUsersAction(userId);
  };

  const renderAddUserModal = () => {
    setFormName('Add');
    openModal('Add User');
  };

  const closeModalFunction = () => {
    form.setFieldsValue({ fullName: '', email: '', gender: null });
    closeModal();
  };

  const renderEditUserModal = (data: any) => {
    setFormName('Edit');
    openModal('Add User');
    const { userId, email, fullName, gender } = data;
    setEditingKey(userId);
    form.setFieldsValue({ email, fullName, gender });
  };

  return (
    <>
      <div className="header-button">
        <Button onClick={renderAddUserModal} buttonText="Add User" />
      </div>
      <UsersTable
        data={users}
        deleteUser={deleteUser}
        loading={isLoading}
        renderEditUserModal={renderEditUserModal}
        currentUser={currentUser}
      />
      <Modal
        isVisible={shouldOpen && /(Add|Edit) User/.test(modalType)}
        title={`${formName} User`}
        handleSubmit={closeModal}
        handleClose={closeModalFunction}
      >
        <UserForm
          users={users}
          handleSubmit={handleSave}
          isLoading={isLoading}
          handleChange={() => {}}
          form={form}
          isEditing={formName === 'Edit'}
        />
      </Modal>
    </>
  );
};

export const mapStateToProps = ({ user, modal }: any) => ({
  usersData: user,
  modal,
});

const actionCreators = {
  fetchUsersAction: fetchUsers,
  editUsersAction: editUsers,
  deleteUsersAction: deleteUser,
  addUsersAction: addUser,
  openModal: openModalAction,
  closeModal: closeModalAction,
};

export default connect(mapStateToProps, actionCreators)(Users);
