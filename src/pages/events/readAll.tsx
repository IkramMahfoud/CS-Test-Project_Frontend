import { NextPage } from 'next';
import UpdateProfileForm from '@modules/users/pages/UpdateProfileForm';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import PageHeader from '@common/components/lib/partials/PageHeader';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Routes from '@common/defs/routes';
import ReadEventsUser from "@modules/events/pages/ReadEventsUser";
import ReadEventsAdmin from "@modules/events/pages/ReadEventsAdmin";
import { Button } from '@mui/material';

const readAll: NextPage = () => {

  var router = useRouter();
  var { user } = useAuth();
  useEffect(() => {
    if (user == null) {
      router.push(Routes.Common.Home)
    }
  })
  return (
    <>
      {user?.rolesNames[0] === 'admin' ? (
        <>
          <PageHeader title="Tous les événements" />
          {/* <Button onClick={() => router.push(Routes.Events.CreateOne)}>Ajouter un événement</Button> */}
          <ReadEventsAdmin />
        </>
      ) : (
        <>
          <PageHeader title="Mes événements" />
          <Button onClick={() => router.push(Routes.Events.CreateOne)}>Ajouter un événement</Button>
          <ReadEventsUser />
        </>
      )
      }
    </>
  );
};

export default readAll;
