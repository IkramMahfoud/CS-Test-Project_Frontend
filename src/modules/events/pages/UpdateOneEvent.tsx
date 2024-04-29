import FormProvider, { RHFTextField } from '@common/components/lib/react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useEvents, { UpdateOneEvent } from '@modules/events/hooks/api/useEvents';
import { LockOpen } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { Controller, useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Link from '@mui/material/Link';
import Routes from '@common/defs/routes';
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid-premium';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '@modules/auth/hooks/api/useAuth';

const UpdateEventForm = ({ id }) => {
  let { user } = useAuth();
  const { updateEvent, getOneEvent } = useEvents();
  var [event, setEvent] = useState();

  const UpdateEventSchema = Yup.object().shape({
    name: Yup.string(),
    description: Yup.string(),
    location: Yup.string(),
    image: Yup.string(),
    max_participants: Yup.number()
  });
  const methods = useForm<UpdateOneEvent>({
    resolver: yupResolver(UpdateEventSchema),
    defaultValues: {
      user_id: user && user.id,
      name: '',
      date: '',
      description: '',
      location: '',
      image: '',
      max_participants: 0,
    },
  });


  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;


  const onSubmit = async (data: UpdateOneEvent) => {

    const res = await updateEvent(event.id,
      {
        user_id: user && user.id,
        name: (name != null && name != "") ? name : event.name,
        date: (date != null && date != "") ? date : event.date,
        description: (description != null && description != "") ? description : event.description,
        location: (location != null && location != "") ? location : event.location,
        image: (image != null && image != "") ? image : event.image,
        max_participants: (maxParticipants != null && maxParticipants != "") ? maxParticipants : event.maxParticipants
      },
      { displayProgress: true, displaySuccess: true }
    );
    return res;
  };



  useEffect(() => {
    console.log(user);
    const fetchData = async () => {
      try {
        const res = await getOneEvent(id, { displayProgress: true, displaySuccess: true });
        console.log("evnt update")
        console.log(res.data.item)
        setEvent(res.data.item);
      } catch (error) {
        console.error('Error fetching event:', error);
      }
    };
    fetchData();
  }, []);
  var [name, SetName] = useState(null);
  var [date, SetDate] = useState(null);
  var [location, SetLocation] = useState(null);
  var [description, SetDescription] = useState(null);
  var [maxParticipants, SetMaxParticipants] = useState(null);
  var [image, SetImage] = useState();
  return (
    <>
      <Card sx={{ maxWidth: '450px', margin: 'auto' }}>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={4} sx={{ padding: 5 }}>
            <Grid item xs={12}>
              <RHFTextField onChange={(e) => SetName(e.target.value)} value={name != null ? name : event && event.name} fullWidth name="name" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField onChange={(e) => SetDate(e.target.value)} value={date != null ? date : event && event.date} fullWidth type='date' name="date" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField fullWidth onChange={(e) => SetLocation(e.target.value)} value={location != null ? location : event && event.location} name="location" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField fullWidth onChange={(e) => SetDescription(e.target.value)} value={description != null ? description : event && event.description} name="description" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField fullWidth onChange={(e) => SetMaxParticipants(e.target.value)} value={maxParticipants != null ? maxParticipants : event && event.maxParticipants} name="max_participants" />
            </Grid>

            <img style={{ width: "180px", height: "200px" }} src="https://cdn-icons-png.flaticon.com/512/1055/1055650.png" alt="" />


            <Grid item xs={12}>
              <RHFTextField type="file" onChange={(e) => SetImage(e.target.value)} fullWidth name="image" />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <LoadingButton
                size="large"
                variant="contained"
                type="submit"
                loadingPosition="start"
                loading={isSubmitting}
              >
                Update
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>
    </>
  );
};

export default UpdateEventForm;



//  <form  onSubmit={(e)=>{testFunc(e)}} style={{ flexDirection:"column",display:"flex" }} action="">
//          <input name="name" type="text" /> <br />
//          <input name="date" type="date" /> <br />
//          <input name="location" type="location" /> <br />
//          <textarea name="description" id="" cols="30" rows="10"></textarea> <br />
//          <input name="max_participants" type="number" /> <br />
//          <input name="image"   type="file" />
//          <button type='submit'>add</button>
//         </form>