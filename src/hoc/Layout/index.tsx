import React, { ReactNode, useEffect, useState } from 'react';
import { connect } from 'react-redux';
import Contents from '../../components/Contents';
import Header from '../../components/Header';
import SideBar from '../../components/SideBar';
import AuthenticationHelper from '../../helpers/authentication';
import { fetchUserData } from '../../redux/actionCreator/userActions';
import { UserStateInterface } from '../../redux/reducers/typed';

interface LayoutProps {
  children: ReactNode;
  userData: UserStateInterface;
  setCurrentUser: (data: any) => void;
  history: any;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
  const { children, userData, setCurrentUser, history } = props;
  const { currentUser } = userData;
  const [collapse, setCollapse] = useState<boolean>(false);
  const [path, setPath] = useState('');

  const { pathname } = window.location;
  const url = pathname.replace(/\W|\d|_/g, '');

  useEffect(() => {
    const location = path || url;
    setPath(location);
  }, [path, url]);

  useEffect(() => {
    const decodedToken: any = AuthenticationHelper.decodeToken() || {};
    const { userInfo } = decodedToken;
    userInfo && setCurrentUser(decodedToken.userInfo.userId);
  }, [setCurrentUser, url]);

  const handleNavItemClick = (e: any) => {
    setPath(e.key);
    if (/logout/.test(e.key)) {
      AuthenticationHelper.logoutUser(history);
    }
  };

  const clickToCollapse = () => {
    setCollapse(!collapse);
  };

  return (
    <>
      <SideBar
        handleNavItemClick={handleNavItemClick}
        path={path}
        currentUser={currentUser}
        collapse={collapse}
        clickToCollapse={clickToCollapse}
      />
      <Header
        path={path}
        clickToCollapse={clickToCollapse}
        collapse={collapse}
      />
      <Contents collapse={collapse} children={children} />
    </>
  );
};

export const mapStateToProps = ({ user }: any) => ({
  userData: user,
});

const actionCreators = {
  setCurrentUser: fetchUserData,
};

export default connect(mapStateToProps, actionCreators)(Layout);
