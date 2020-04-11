import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import AuthenticationHelper from '../helpers/authentication';
import Socket from '../helpers/socket';
import UtilsHelper from '../helpers/utils';
import { UserStateInterface } from '../redux/reducers/typed';

interface Props {
  history: any;
  usersData: UserStateInterface;
}

export default function (ComposedComponent: any, allowedRoles: string[]) {
  const Authenticate: any = (props: Props) => {
    const { history, usersData } = props;
    const {
      currentUser: { roles },
    } = usersData;

    const token = localStorage.getItem('jwt-token');

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const verifyToken = () => {
      const decodedToken: any = AuthenticationHelper.decodeToken();
      const msg = 'Session Expired. Login to continue';
      const { exp } = decodedToken;
      if (AuthenticationHelper.isExpired(exp)) {
        localStorage.setItem('url', history.location.pathname);
        AuthenticationHelper.logoutUser(history, msg);
        return false;
      }
      Socket();
      return false;
    };
    useEffect(() => {
      if (token) {
        verifyToken();
      } else {
        localStorage.setItem('url', window.location.pathname);
        return AuthenticationHelper.logoutUser(
          history,
          'Session Expired. Login to continue'
        );
      }
      return () => {

      };
    }, [history, token, verifyToken]);

    return (
    token && roles &&
      UtilsHelper.checkUserPermission(history, allowedRoles, roles) ? (
        <ComposedComponent />
      ): null
    );
  };

  Authenticate.defaultProps = {
    history: {},
  };

  const mapStateToProps = ({ user }: any) => ({
    usersData: user,
  });


  return connect(mapStateToProps)(Authenticate);
}
