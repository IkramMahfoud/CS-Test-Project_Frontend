import FormProvider, { RHFTextField } from '@common/components/lib/react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useEvents, { CreateOneEvent } from '@modules/events/hooks/api/useEvents';
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

const CreateEventForm = () => {
  let { user } = useAuth();
  const { createEvent } = useEvents();

  const CreateEventSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est obligatoire'),
    date: Yup.date().required('La date est obligatoire'),
    description: Yup.string().required('La date est obligatoire'),
    location: Yup.string().required('La location est obligatoire'),
    image: Yup.string().required('l image est obligatoire'),
    max_participants: Yup.number()
  });
  const methods = useForm<CreateOneEvent>({
    resolver: yupResolver(CreateEventSchema),
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

  const onSubmit = async (data: CreateOneEvent) => {
    console.log("img")
    // var theImg = formData.append("image",data.image[0])

    console.log(data.image)
    const res = await createEvent(
      {
        user_id: user && user.id,
        name: data.name,
        date: data.date,
        description: data.description,
        location: data.location,
        image: data.image,
        max_participants: data.max_participants
      },
      { displayProgress: true, displaySuccess: true }
    );
    return res;
  };
  return (
    <>
      <Card sx={{ maxWidth: '450px', margin: 'auto' }}>
        <FormProvider
          methods={methods}
          onSubmit={handleSubmit(onSubmit)}
        >
          <Grid container spacing={4} sx={{ padding: 5 }}>
            <Grid item xs={12}>
              <RHFTextField fullWidth name="name" label="New name" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField fullWidth type='date' name="date" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField fullWidth name="location" label="location" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField fullWidth name="description" label="description" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField fullWidth name="max_participants" label="max_participants" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField type="file" fullWidth name="image" />
            </Grid>

            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <LoadingButton
                size="large"
                variant="contained"
                type="submit"
                loadingPosition="start"
                loading={isSubmitting}
              >
                Create
              </LoadingButton>
            </Grid>
          </Grid>
        </FormProvider>
      </Card>
    </>
  );
};

export default CreateEventForm;