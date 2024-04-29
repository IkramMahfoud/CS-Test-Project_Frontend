import Auth from '@modules/auth/defs/routes';
import Users from '@modules/users/defs/routes';
import Events from '@modules/events/defs/routes';

import Permissions from '@modules/permissions/defs/routes';

const Common = {
  Home: '/',
  NotFound: '/404',
  Profile: '/profile',
  Events: '/events',
};

const Routes = {
  Common,
  Auth,
  Permissions,
  Users,
  Events,
};

export default Routes;
