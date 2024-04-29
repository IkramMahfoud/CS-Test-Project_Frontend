import { NextPage } from 'next';
import UpdateProfileForm from '@modules/users/pages/UpdateProfileForm';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import PageHeader from '@common/components/lib/partials/PageHeader';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Routes from '@common/defs/routes';
import ReadOneEvent from "@modules/events/pages/ReadOneEvent";
// onClick={()=>{router.push(ApiRoutes.Events.ReadOne+"/"+e.id)}}
const readOne: NextPage = ({params}) => {
  var router = useRouter();
  return <ReadOneEvent id={router.query.id} />;
};

export default readOne;
