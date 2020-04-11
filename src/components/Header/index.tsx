import { MenuOutlined } from '@ant-design/icons';
import { Layout } from 'antd';
import React from 'react';
import styles from './Header.module.scss';
const { Header: AntHeader } = Layout;

interface HeaderProps {
  collapse: boolean;
  clickToCollapse: () => void;
  path: string;
}
const Header = (props: HeaderProps) => {
  const { clickToCollapse, collapse, path } = props;

  return (
    <AntHeader
      style={{
        position: 'fixed',
        zIndex: 1,
        width: '100%',
        backgroundColor: '#e5e5e6',
        marginLeft: collapse ? '' : 200,
      }}
    >
      <div>
        {collapse && (
          <span onClick={clickToCollapse} className={styles.menuIcon}>
            <MenuOutlined />
          </span>
        )}
        {path.toUpperCase()}
      </div>
    </AntHeader>
  );
};

export default Header;
