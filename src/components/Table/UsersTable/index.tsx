/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Table from '../';
import ConfirmModal from '../../ConfirmModal';

interface Item {
  key: string;
  fullName: string;
  gender: string;
}

interface Props {
  deleteUser: (data: any) => void;
  data: any[];
  loading: boolean;
  renderEditUserModal: (data: Item) => void;
  currentUser: any;
}

const UsersTable: React.FC<Props> = (props) => {
  const { data, deleteUser, loading, renderEditUserModal, currentUser } = props;

  const { email: currentUserEmail } = currentUser;

  const showConfirm = (userRecord: Item) => {
    const title = `Delete user ${userRecord.fullName}?`;
    const content = `Are you sure you want to delete ${userRecord.fullName}?`;
    return ConfirmModal({
      title,
      content,
      onOk: () => deleteUser(userRecord.key),
    });
  };

  const usersData = data.map((user: any, index: number) => ({
    ...user,
    index: index + 1,
    key: user.userId,
  }));

  const RenderDelete: any = (props: any) => {
    const { record } = props;
    return <a onClick={() => showConfirm(record)}>Delete</a>;
  };

  const RenderName: any = (props: any) => {
    const { record, text } = props;
    return <a onClick={() => renderEditUserModal(record)}>{text}</a>;
  };

  const columns = [
    {
      title: 'No.',
      dataIndex: 'index',
    },
    {
      title: 'Full Name',
      dataIndex: 'fullName',
      render: (text: string, record: any) => (
        <RenderName record={record} text={text} />
      ),
    },
    {
      title: 'Gender',
      dataIndex: 'gender',
      width: '15%',
    },
    {
      title: 'Email',
      dataIndex: 'email',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (text: string, record: any) =>
        currentUserEmail !== record.email && (
          <RenderDelete record={record} text={text} />
        ),
    },
  ];

  return <Table dataSource={usersData} columns={columns} loading={loading} />;
};

export default UsersTable;
