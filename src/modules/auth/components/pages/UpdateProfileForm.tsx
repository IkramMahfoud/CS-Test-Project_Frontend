import FormProvider, { RHFTextField } from '@common/components/lib/react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useUser, { UpdateProfileInput } from '@modules/auth/hooks/api/useUser';
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
  let { user } = useAuth();
   const { UpdateProfile } = useUser();
 
  const UpdateProfileSchema = Yup.object().shape({
    name: Yup.string()
      .required('Le nom est obligatoire'),
    email: Yup.string()
      .email("Le format de l'email est incorrect")
      .required('Le champ est obligatoire'),
    password: Yup.string().required('Le champ est obligatoire'),
  });
  const methods = useForm<UpdateProfileInput>({
    resolver: yupResolver(UpdateProfileSchema),
    defaultValues: {
      email: '',
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

  const onSubmit = async (data: UpdateProfileInput) => {
    console.log(data);
  };
  useEffect(()=>{
    SetName(user.name)
  },[])
  return (
    <>
      <Card sx={{ maxWidth: '450px', margin: 'auto' }}>
        <FormProvider methods={methods}>
          <Grid container spacing={4} sx={{ padding: 5 }}>
          <Grid item xs={12}>
              <TextField
                onChange={(e) => SetName(e.target.value)}
                value={name}
                fullWidth
                name="name"
                label="Name"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField disabled value={user.email} fullWidth name="email" label="Email" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={(e) => SetNewPassword(e.target.value)}
                fullWidth
                name="password"
                placeholder="new password"
                type="password"
              />
            </Grid>
            <Grid item xs={12} sx={{ textAlign: 'center' }}>
              <LoadingButton
                size="large"
                variant="contained"
                type="submit"
                loadingPosition="start"
                loading={isSubmitting}
                onClick={()=>console.log("test")}
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
