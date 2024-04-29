import { CrudApiRoutes } from '@common/defs/types';

const prefix = '/reservations';
const ApiRoutes: CrudApiRoutes = {
  CreateOne: prefix,
  ReadOne: prefix,
  ReadAll:prefix
};

export default ApiRoutes;
