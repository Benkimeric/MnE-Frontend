import { Table } from 'antd';
import React from 'react';

interface Props {
  loading?: boolean;
  columns?: any[];
  dataSource?: any[];
  pageSize?: number;
  components?: any;
  bordered?: boolean;
}

const TableComponent: React.FC<Props> = (props: any) => {
  const {
    loading,
    columns,
    dataSource,
    pageSize,
    components,
    bordered,
  } = props;
  return (
    <Table
      components={components}
      bordered={bordered}
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={{ pageSize }}
    />
  );
};

TableComponent.defaultProps = {
  loading: false,
  columns: [],
  dataSource: [],
  pageSize: 10,
  bordered: false,
};

export default TableComponent;
