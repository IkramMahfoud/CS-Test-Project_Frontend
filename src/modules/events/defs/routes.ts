import { CrudRoutes } from '@common/defs/types';

const prefix = '/events';
const Routes: CrudRoutes = {
  ReadOne: '/readOne',
  ReadAll: prefix+"/readAll",
  CreateOne: prefix + '/create',
  UpdateOne: '/updateOne',
};

export default Routes;
