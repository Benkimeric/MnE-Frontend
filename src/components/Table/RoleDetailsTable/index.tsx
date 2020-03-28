/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import Table from '..';
import ConfirmModal from '../../ConfirmModal';

interface Props {
  handleDelete: (data: any) => void;
  data: any[];
  loading: boolean;
}

const UsersTable: React.FC<Props> = (props) => {
  const { data, handleDelete, loading } = props;

  const showConfirm = (userRecord: any) => {
    const title = `Remove user ${userRecord.fullName}?`;
    const content = `Are you sure you want to remove ${userRecord.fullName}?`;
    return ConfirmModal({
      title,
      content,
      onOk: () => handleDelete(userRecord),
    });
  };

  const RenderDelete: any = (props: any) => {
    const { record } = props;
    return <a onClick={() => showConfirm(record)}>Delete</a>;
  };

  const columns = [
    {
      title: 'No.',
      dataIndex: 'key',
      key: 'key',
    },
    {
      title: 'Name',
      dataIndex: 'fullName',
      key: 'fullName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      render: (text: string, record: any) => (
        <RenderDelete record={record} text={text} />
      ),
    },
  ];

  return <Table dataSource={data} columns={columns} loading={loading} />;
};

export default UsersTable;
