import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal } from 'antd';
import React from 'react';

const { confirm } = Modal;

interface Props {
  title?: string;
  content?: string;
  onOk?: () => void;
}

const ConfirmModal = (props: any) => {
  const { title, content, onOk } = props;
  return confirm({
    title,
    icon: <ExclamationCircleOutlined />,
    content,
    onOk() {
      onOk && onOk();
    },
    onCancel() {},
  });
};

ConfirmModal.defaultProps = {
  title: '',
  content: '',
};

export default ConfirmModal;
