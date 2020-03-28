import { Form } from 'antd';
import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import BackButton from '../../components/BackButton';
import Button from '../../components/Button';
import UserRoleForm from '../../components/Form/UserRoleForm';
import Modal from '../../components/Modal';
import RoleDetailsTable from '../../components/Table/RoleDetailsTable';
import {
  closeModalAction,
  openModalAction,
} from '../../redux/actionCreator/modalActions';
import {
  assignRole,
  deleteAssignedRole,
  getRole,
} from '../../redux/actionCreator/roleActions';
import { fetchUsers } from '../../redux/actionCreator/userActions';
import {
  ModalStateInterface,
  RoleStateInterface,
  UserStateInterface,
} from '../../redux/reducers/typed';

import './RoleDetails.scss';

interface Props {
  getRoleAction: (roleId: any) => void;
  userRole: RoleStateInterface;
  match: any;
  openModal: (data: any) => void;
  closeModal: () => void;
  modal: ModalStateInterface;
  getUsersAction: () => void;
  user: UserStateInterface;
  assignRoleAction: (data: any) => any;
  deleteAssignedRoleAction: (data: any) => any;
  history: any;
}

const RoleDetails: React.FC<Props> = (props) => {
  const {
    getRoleAction,
    userRole,
    match,
    openModal,
    closeModal,
    modal,
    getUsersAction,
    user: userState,
    assignRoleAction,
    deleteAssignedRoleAction,
    history,
  } = props;
  const { shouldOpen, modalType } = modal;
  const {
    params: { roleId },
  } = match;
  const { role, isLoading, assignLoading } = userRole;
  const { users } = userState;

  const [values, setValues] = useState({ email: '' });

  useEffect(() => {
    getRoleAction(roleId);
    getUsersAction();
  }, [getRoleAction, getUsersAction, roleId]);

  const [form] = Form.useForm();

  const renderAddUserRoleModal = () => {
    setValues({ email: '' });
    openModal('Add User Role');
  };

  const closeModalFunction = () => {
    form.setFieldsValue({ email: '' });
    closeModal();
  };

  const handleSubmit = () => {
    assignRoleAction({ roleId: role.id, email: values.email });
  };

  const handleChange = (data: string) => {
    setValues({ email: data });
  };

  const handleDelete = (data: any) => {
    const { email } = data;
    deleteAssignedRoleAction({ roleId: role.id, email });
  };

  role.users?.forEach((element: any, index: any) => {
    element.key = index + 1;
  });

  const dropDownOption = users.filter(
    (element) => !element.roles?.map((role) => role.id).includes(role.id)
  );

  const titleName = role.roleName ? `${role.roleName}s` : '';
  return (
    <div>
      <div className="header-buttons">
        <BackButton history={history} backUrl={'/roles'} backText={titleName} />
        <Button onClick={renderAddUserRoleModal} buttonText="Add User" />
      </div>
      <Modal
        isVisible={shouldOpen && modalType === 'Add User Role'}
        title={`Add ${role.roleName || ''}`}
        handleSubmit={closeModalFunction}
        handleClose={closeModalFunction}
      >
        <UserRoleForm
          users={dropDownOption}
          handleSubmit={handleSubmit}
          isLoading={assignLoading}
          handleChange={handleChange}
          form={form}
        />
      </Modal>

      <RoleDetailsTable
        loading={isLoading}
        handleDelete={handleDelete}
        data={role.users}
      />
    </div>
  );
};

export const mapStateToProps = ({ userRole, modal, user }: any) => ({
  userRole,
  modal,
  user,
});

const actionCreators = {
  getRoleAction: getRole,
  openModal: openModalAction,
  closeModal: closeModalAction,
  getUsersAction: fetchUsers,
  assignRoleAction: assignRole,
  deleteAssignedRoleAction: deleteAssignedRole,
};

export default withRouter(
  connect(mapStateToProps, actionCreators)(RoleDetails)
);
