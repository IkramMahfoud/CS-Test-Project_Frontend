import ApiRoutes from '@common/defs/apiRoutes';
import useAuth from '@modules/auth/hooks/api/useAuth';
import useEvents from '@modules/events/hooks/api/useEvents';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Routes from '@common/defs/routes';
import { SortGridMenuItems } from '@mui/x-data-grid-premium';
import Reservations from '@modules/reservations/defs/apiRoutes';
import { Card, CardActions, CardContent, CardHeader, CardMedia, Collapse, IconButton, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import event2 from '@common/assets/images/event2.jpg';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


export default function ReadMyReservations() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [events, setEvents] = useState([]);
  var router = useRouter();
  var { user } = useAuth();
  const { readMyReservations, getAllEvents, cancelMyReservation } = useEvents(user);
  var [myreservations, SetMyReservations] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await readMyReservations({ displayProgress: true, displaySuccess: true });
        console.log("reservations :")
        console.log(res.data.items)
        SetMyReservations(res.data.items)
        const allEvents = await getAllEvents({ displayProgress: true, displaySuccess: true });
        console.log("events :")
        console.log(allEvents.data.items)
        const filteredEvents = allEvents.data.items.filter(event => res.data.items.some(reservation => reservation.eventId === event.id));
        setEvents(filteredEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchData();
  }, []);

  var cancelReservation = async (e) => {
    var reservation = myreservations.filter(reservation => reservation.eventId == e.id && reservation.userId == user.id);
    console.log(reservation)
    var res = await cancelMyReservation(reservation[0].id, { displayProgress: true, displaySuccess: true });
  }


  return (

    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2%' }}>
      {(events && events.length > 0) ? (
        events.map((e) => (
          <Card sx={{ maxWidth: 280 }}>
            <CardHeader
              action={
                <>
                  <IconButton aria-label="delete" onClick={() => cancelReservation(e)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              }
              title={e.name}
              subheader={e.date}
            />
            <CardMedia
              component="img"
              height="194"
              image={event2.src}
              alt="EVENT IMAGE"
            />
            <CardActions disableSpacing>
              <Typography variant="body2" color="text.secondary">
                description
              </Typography>
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more">
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>

            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>
                  {e.description}
                </Typography>

              </CardContent>
            </Collapse>
          </Card>
        ))
      ) : (
        <h3 style={{ textAlign: "center" }}>loading ...</h3>
      )}
    </div>
  );
}




