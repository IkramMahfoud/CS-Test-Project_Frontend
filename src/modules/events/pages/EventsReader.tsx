import useAuth from '@modules/auth/hooks/api/useAuth';
import useEvents from '@modules/events/hooks/api/useEvents';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Routes from '@common/defs/routes';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import event2 from '@common/assets/images/event2.jpg';
import { Button } from '@mui/material';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function EventsReader() {
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  var { user } = useAuth();
  const { getAllEvents, DeleteEvent } = useEvents(user);
  const [events, setEvents] = useState([]);
  var router = useRouter();
  useEffect(() => {
    console.log(user)
    const fetchData = async () => {
      try {
        const res = await getAllEvents({ displayProgress: true, displaySuccess: true });
        const sortedEvents = res.data.items.sort((a, b) => new Date(a.date) - new Date(b.date));
        setEvents(sortedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchData();
  }, []);
  var deleteEvent = async (e) => {
    if (confirm("Voulez-vous vraiment supprimer l'événement ?")) {
      const res = await DeleteEvent(e.id, { displayProgress: true, displaySuccess: true });
    }
  }
  var SortDesc = () => {
    setEvents([...events].sort((a, b) => new Date(b.date) - new Date(a.date)));
  };

  var SortAsc = () => {
    setEvents([...events].sort((a, b) => new Date(a.date) - new Date(b.date)));
  };
  return (

    <div>

      <Button style={{ marginBottom: 20 }} onClick={() => SortDesc()}>trier par récent</Button>
      <Button style={{ marginBottom: 20 }} onClick={() => SortAsc()}> trier par ancien</Button >

      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
        {events.map((e) => (
          <Card key={e.id} sx={{ maxWidth: 280 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="user">
                  {e.user.name.charAt(0)}
                </Avatar>
              }
              action={
                <IconButton aria-label="reserve" onClick={() => { router.push(`${Routes.Common.Events}/${e.id}${Routes.Events.ReadOne}`) }}>
                  <EventAvailableIcon />
                </IconButton>
              }
              title={e.name}
              subheader={e.date}
            />
            <CardMedia
              component="img"
              height="194"
              image={event2.src} // Assuming 'src' is a property of 'e'
              alt="EVENT IMAGE"
            />
            <CardActions disableSpacing>
              <Typography variant="body2" color="text.secondary">
                {user.rolesNames[0] === "admin" ? (
                  <button onClick={() => deleteEvent(e)}>Cancel</button>
                ) : (
                  "Plus d'infos"
                )}
              </Typography>
              <IconButton
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>{e.description}</Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </div>

    </div >
  );
}
