import Dashboard from '../components/Dashboard';
import RoleDetails from '../views/RoleDetails';
import Roles from '../views/Roles';
import Users from '../views/Users';
import RoutesInterface from './typed';

const routes: RoutesInterface[] = [
  {
    path: '/dashboard',
    exact: true,
    component: Dashboard,
    id: 'home',
    allowedRoles: [],
  },
  {
    path: '/users',
    exact: true,
    component: Users,
    id: 'users',
    allowedRoles: ['Super Administrator'],
  },
  {
    path: '/roles',
    exact: true,
    component: Roles,
    id: 'roles',
    allowedRoles: ['Super Administrator'],
  },
  {
    path: '/roles/:roleId',
    exact: true,
    component: RoleDetails,
    id: 'roleDetails',
    allowedRoles: ['Super Administrator'],
  },
];

export default routes;
