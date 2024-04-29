import ApiRoutes from '@common/defs/apiRoutes';
import useAuth from '@modules/auth/hooks/api/useAuth';
import useEvents from '@modules/events/hooks/api/useEvents';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Routes from '@common/defs/routes';
import { SortGridMenuItems } from '@mui/x-data-grid-premium';
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
  const { getAllEvents, DeleteEvent } = useEvents();
  const [events, setEvents] = useState([]);
  var router = useRouter();
  var { user } = useAuth();
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

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2%' }}>
        {
          (events && events.length > 0) ? events.map((e) => (
            // <div style={{ border: "1px solid black", margin: "10px" }} key={e.id}>
            //   {/* Assuming e.id is a unique identifier */}
            //   <img style={{ width: "180px", height: "200px" }} src="https://cdn-icons-png.flaticon.com/512/1055/1055650.png" alt="" />
            //   <h1 onClick={() => { router.push(`${Routes.Common.Events}/${e.id}${Routes.Events.ReadOne}`) }}>{e.name}</h1>
            //   <span>{e.description}</span>
            //   <span>{e.date}</span>
            //   <h1>{e.user.name}</h1>
            //   <button>now more</button> <br />
            //   {
            //     user.rolesNames[0]=="admin" && <button onClick={()=>deleteEvent(e)}>cancel</button>
            //   }
            // </div>
            <Card sx={{ maxWidth: 280 }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
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
                image={event2.src}
                alt="EVENT IMAGE"
              />
              <CardActions disableSpacing>
                <Typography variant="body2" color="text.secondary">
                  {
                    user.rolesNames[0] == "admin" ? <button onClick={() => deleteEvent(e)}>cancel</button> : "plus d'infos"
                  }
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
            : <h3 style={{ textAlign: "center" }}>loading ...</h3>
        }
      </div>

    </div >
  );
}
