import useAuth from '@modules/auth/hooks/api/useAuth';
import useEvents from '@modules/events/hooks/api/useEvents';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import * as Yup from 'yup';
import { Controller, useForm } from 'react-hook-form';
import { CreateOneReservation } from "@modules/events/hooks/api/useEvents"
import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from '@mui/material';
import event2 from '@common/assets/images/event2.jpg';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardMedia from '@mui/material/CardMedia';


export default function ReadOneEvent({ id }) {
  const { getOneEvent, DeleteEvent, createReservation, getAllReservation } = useEvents();
  const [event, setEvent] = useState(null); // Initialize event state as null
  const router = useRouter();
  const { user } = useAuth();
  var [AlerdyReserved, SetAlerdyReserved] = useState(false);
  var [countEvents, SetCountEvents] = useState(0);
  // CreateOneReservation
  useEffect(() => {
    let fetchData1 = async () => {
      const res = await getAllReservation({ displayProgress: true, displaySuccess: true });
      console.log("the reservation")
      var items = res.data.items;
      var number_registrations = await items.filter((item) => item.eventId == id);
      console.log(number_registrations)
      if (number_registrations.length > 0) {
        SetCountEvents(number_registrations.length)
      }
      if (await items.find(item => item.userId == user.id && item.eventId == id)) {
        SetAlerdyReserved(true);
      }
    }
    fetchData1();

    const fetchData = async () => {
      try {
        const res = await getOneEvent(id, { displayProgress: true, displaySuccess: true });
        setEvent(res.data.item);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchData();
    // Include id as a dependency to fetch data when id changes
  }, [id]);

  var deleteEvent = async (e) => {
    if (confirm("Voulez-vous vraiment supprimer l'événement ?  ?")) {
      const res = await DeleteEvent(e.id, { displayProgress: true, displaySuccess: true });

    }
  }

  // reservation code
  const CreateReservationSchema = Yup.object().shape({
    name: Yup.number(),
    date: Yup.number(),
  });
  const methods = useForm<CreateOneReservation>({
    resolver: yupResolver(CreateReservationSchema),
    defaultValues: {
      user_id: user && user.id,
      event_id: event && event.id,
    },
  });
  var reserve = async (e) => {
    const res = await createReservation({
      user_id: user && user.id,
      event_id: event && event.id,
    }, { displayProgress: true, displaySuccess: true });
  }


  return (
    <div>
      {event && (
        <>
          {/* show the concel button if you are the owner of the event or admin */}
          {user && (user.rolesNames[0] === "admin" ? <Button color="error" onClick={() => deleteEvent(event)}>Cancel</Button> : user.id == event.user.id ? <Button color="error" onClick={() => deleteEvent(event)}>Cancel Event</Button> : "")
          }
          <Grid container component="main" sx={{ mt: 6, minHeight: '60vh', display: 'flex', justifyContent: 'center' }}>
            <CssBaseline />
            {/* image */}
            <Grid>
              <CardMedia
                component="img"
                height="400vh"
                image={event2.src}
                alt="EVENT IMAGE"
              />
            </Grid>
            {/* content */}
            <Grid item xs={12} sm={8} md={5}  >
              <Box
                sx={{
                  my: 4,
                  mx: 4,

                  height: '80%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <Typography component="h1" variant="h5">
                  {event.name}
                </Typography>
                <Typography paragraph>
                  max participants : {event.maxParticipants}
                </Typography>
                <Typography component="h2" variant="h6">
                  Description
                </Typography>
                <Typography paragraph>
                  {event.description}
                </Typography>
                <Box component="form" noValidate
                // sx={{ mt: 1,my:9}}
                >



                </Box>
                {AlerdyReserved ? "Déja réservé" : countEvents == event.maxParticipants ? "tous les places sont réservés" : <Button
                  variant="contained"
                  onClick={() => reserve()}
                >
                  Réserver !
                </Button>}
              </Box>
            </Grid>
          </Grid>
          {/* {AlerdyReserved ? "Déja réservé" : countEvents == event.maxParticipants ?
          "tous les places sont réservées" : <button onClick={() => reserve()}>Réserver</button>} */}
        </>
      )
      }
    </div >
  );
}
