import FormProvider, { RHFTextField } from '@common/components/lib/react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useUsers, { UpdateOneInput } from '@modules/users/hooks/api/useUsers';
import { LockOpen } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import Link from '@mui/material/Link';
import Routes from '@common/defs/routes';
import { gridColumnsTotalWidthSelector } from '@mui/x-data-grid-premium';
import { TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useAuth from '@modules/auth/hooks/api/useAuth';

const UpdateProfileForm = () => {
  let { user,logout } = useAuth();
  const { updateProfile } = useUsers(user,logout);
 
  const UpdateProfileSchema = Yup.object().shape({
    name: Yup.string().required('Le nom est obligatoire'),
    password: Yup.string().required('Le champ est obligatoire'),
  });
  const methods = useForm<UpdateOneInput>({
    resolver: yupResolver(UpdateProfileSchema),
    defaultValues: {
      email: user ? user.email : '',
      password: '',
      name:'',
    },
  });

 

  let [name, SetName] = useState('');
  var [oldPassword,SetOldPassword] = useState("");
  let [newPassword,SetNewPassword] = useState("");

  const {
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: UpdateOneInput) => {
     const res = await updateProfile(
      {
        email: data.email,
        password: data.password,
        name:data.name,
      },
      { displayProgress: true, displaySuccess: true }
    );
  };
  return (
    <>
      <Card sx={{ maxWidth: '450px', margin: 'auto' }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <Grid container spacing={4} sx={{ padding: 5 }}>
           <h2 style={{ margin:"auto",marginTop:"6px" }}>{user ? user.name : ''}</h2> 
            <Grid item xs={12}>
              <RHFTextField fullWidth name="name" label="New name" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField value={user ? user.email : ''} fullWidth name="" label="Email" />
            </Grid>
            <Grid item xs={12}>
              <RHFTextField fullWidth name="password" placeholder="new password" type="password" />
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

export default UpdateProfileForm;
