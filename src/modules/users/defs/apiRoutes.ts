import { CrudApiRoutes } from '@common/defs/types';

const prefix = '/users';



const ApiRoutes: CrudApiRoutes = {
  CreateOne: prefix,
  ReadAll: prefix,
  ReadOne: prefix + '/{id}',
  UpdateOne: prefix,
  DeleteOne: prefix + '/{id}',
};

export default ApiRoutes;
