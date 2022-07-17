import { HomeOutlined, LogoutOutlined, MenuOutlined, UnorderedListOutlined, UserOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import { Avatar, Col, Row } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import UtilsHelper from '../../helpers/utils';
import { UserInterface } from '../../redux/reducers/typed';
import styles from './SideBar.module.scss';

const { Sider } = Layout;

interface SidebarProps {
  collapse: boolean;
  clickToCollapse: () => void;
  currentUser: UserInterface;
  handleNavItemClick: (data: string) => void;
  path: string;
}

const SideBar = (props: SidebarProps) => {
  const {
    collapse,
    clickToCollapse,
    currentUser,
    handleNavItemClick,
    path,
  } = props;
  const { fullName, roles } = currentUser;

  const handleClick = (e: any) => {
    handleNavItemClick(e);
  };

  const userRoles = roles?.map((role) => role.roleName);

  const isLinkVisible = (allowedRoles: any[]) => {
    let hasPermission;
    if (allowedRoles) {
      hasPermission =
        userRoles && userRoles.some((role: any) => allowedRoles.includes(role));
    }
    const showItem = !allowedRoles || hasPermission;

    return showItem;
  };

  return (
    <Layout className={styles.sideBar}>
      <Sider
        trigger={null}
        collapsible
        collapsedWidth={0}
        collapsed={collapse}
        className={styles.sideBar}
        style={{
          overflow: 'auto',
          height: '100vh',
          position: 'fixed',
          left: 0,
          backgroundColor: '#282828',
        }}
      >
        <div className="logo" />

        <Row className={styles.companyNameDiv}>
            <span className={styles.companyName}>MnE</span>
            <span onClick={clickToCollapse} className={styles.sideCollapseMenu}>
              <MenuOutlined />
            </span>
        </Row>

        <Row className={styles.avatarDetails}>
          <Col span={8} className={styles.avatar}>
            <Avatar shape="circle" size={56}>
              {fullName && UtilsHelper.getInitials(fullName)}
            </Avatar>
          </Col>
          <Col span={16} className={styles.avatarUsername}>
            <span className={styles.fullName}>{fullName}</span>
            <br></br>
            <span className={styles.role}>{roles?.[0].roleName || ''}</span>
          </Col>
        </Row>

        <div className={styles.title}>Menu</div>

        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['dashboard']}
          style={{ backgroundColor: '#282828' }}
          onClick={handleClick}
          selectedKeys={[path]}
        >
          <Menu.Item key="dashboard" className={styles.menuItem}>
            <HomeOutlined />
            <Link to={'/dashboard'}>Dashboard</Link>
          </Menu.Item>
          {isLinkVisible(['Super Administrator']) && (
            <Menu.Item key="users">
              <UserOutlined />
              <Link to={'/users'}>Users</Link>
            </Menu.Item>
          )}
          {isLinkVisible(['Super Administrator']) && (
            <Menu.Item key="roles">
              <UnorderedListOutlined />
              <Link to={'/roles'}>Roles</Link>
            </Menu.Item>
          )}
          <Menu.Item key="logout" className={styles.menuItem}>
            <LogoutOutlined />
            <Link to={'/'}>Logout</Link>
          </Menu.Item>
        </Menu>
      </Sider>
    </Layout>
  );
};

export default SideBar;
