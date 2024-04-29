import { CrudApiRoutes } from '@common/defs/types';

const prefix = '/events';



const ApiRoutes: CrudApiRoutes = {
  CreateOne: prefix,
  ReadAll: prefix,
  ReadOne: prefix,
  UpdateOne: prefix,
  DeleteOne: prefix,
};

export default ApiRoutes;
