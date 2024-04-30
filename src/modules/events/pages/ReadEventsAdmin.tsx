import useAuth from '@modules/auth/hooks/api/useAuth';
import useEvents from '@modules/events/hooks/api/useEvents';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Routes from '@common/defs/routes';


export default function ReadEventsAdmin() {
  const { getAllEvents, DeleteEvent } = useEvents();
  var router = useRouter();

  const [events, setEvents] = useState([]);
  var { user } = useAuth();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAllEvents({ displayProgress: true, displaySuccess: true });
        var data = [];
        await res.data.items.forEach(event => {
          if (event.user.id == user.id) {
            data.push(event)
          }
        });
        setEvents(data)
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
    fetchData();
  }, []);

  var deleteEvent = async (e) => {
    if (confirm("Voulez-vous vraiment supprimer l'événement ? ")) {
      const res = await DeleteEvent(e.id, { displayProgress: true, displaySuccess: true });
    }
  }
  return (
    <div>
      {(events && events.length > 0) ? events.map((e) => (
        <div style={{ border: "1px solid black", margin: "10px" }} key={e.id}>
          <img style={{ width: "180px", height: "200px" }} src="https://cdn-icons-png.flaticon.com/512/1055/1055650.png" alt="" />

          <h1 onClick={() => { router.push(`${Routes.Common.Events}/${e.id}${Routes.Events.ReadOne}`) }}>{e.name}</h1>

          <span>{e.description}</span>

          <h1>{e.user.name}</h1>
          <button onClick={() => deleteEvent(e)}>cancel</button>
          <button onClick={() => { router.push(`${Routes.Common.Events}/${e.id}${Routes.Events.UpdateOne}`) }}>update</button>

        </div>
      )) : (
        <h3 style={{ textAlign: "center" }}>Loading ...</h3>
      )}
    </div>
  );
}
