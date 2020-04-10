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
  },
  {
    path: '/users',
    exact: true,
    component: Users,
    id: 'users',
  },
  {
    path: '/roles',
    exact: true,
    component: Roles,
    id: 'roles',
  },
  {
    path: '/roles/:roleId',
    exact: true,
    component: RoleDetails,
    id: 'roleDetails',
  },
];

export default routes;
