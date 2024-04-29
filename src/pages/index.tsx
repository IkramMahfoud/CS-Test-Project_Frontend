import PageHeader from '@common/components/lib/partials/PageHeader';
import Routes from '@common/defs/routes';
import withAuth, { AUTH_MODE } from '@modules/auth/hocs/withAuth';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { NextPage } from 'next';
import { useEffect } from 'react';
import EventsReader from '../modules/events/pages/EventsReader';

const Index: NextPage = () => {
  return (
    <>
      <PageHeader title="Tous les événements" />
      <EventsReader />
    </>
  );
};

export default withAuth(Index, {
  mode: AUTH_MODE.LOGGED_IN,
  redirectUrl: Routes.Auth.Login,
});
