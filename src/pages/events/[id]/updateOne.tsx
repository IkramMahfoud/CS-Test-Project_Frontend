import { NextPage } from 'next';
import UpdateProfileForm from '@modules/users/pages/UpdateProfileForm';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import PageHeader from '@common/components/lib/partials/PageHeader';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Routes from '@common/defs/routes';
import UpdateOneEvent from "@modules/events/pages/UpdateOneEvent";

// onClick={()=>{router.push(ApiRoutes.Events.ReadOne+"/"+e.id)}}
const readOne: NextPage = ({params}) => {
  var router = useRouter();
  useEffect(()=>{
       console.log("param")
       console.log(router.query)
  },[])
  return <UpdateOneEvent id={router.query.id} />;
};

export default readOne;
