import { NextPage } from 'next';
import UpdateProfileForm from '@modules/users/pages/UpdateProfileForm';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import PageHeader from '@common/components/lib/partials/PageHeader';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Routes from '@common/defs/routes';
import ReadMyReservations from '@modules/events/pages/ReadMyReservations';

const readAll: NextPage = () => {

  var router = useRouter();
  var {user} = useAuth();
  useEffect(()=>{
    if(user==null){
        router.push(Routes.Common.Home)
    }
  })
 return (
    <>
     
          <PageHeader title="My Reservations" />
          <ReadMyReservations />
      
    </>
  );
};

export default readAll;
