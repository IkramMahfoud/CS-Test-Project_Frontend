import ApiRoutes from '@common/defs/apiRoutes';
import { ROLE } from '@modules/permissions/defs/types';
import { User } from '@modules/users/defs/types';
import useItems, { UseItems, UseItemsOptions, defaultOptions } from '@common/hooks/useItems';
import useApi, { ApiOptions, ApiResponse, FetchApiOptions } from '@common/hooks/useApi';
import { mutate } from 'swr';
import useSWR from 'swr';
import { useState } from 'react';
import useAuth from '@modules/auth/hooks/api/useAuth';
import { useRouter } from 'next/router';
import Routes from '@common/defs/routes';

export interface CreateOneEvent {
  name: string;
  date: Date;
  max_participants: Number,
  description: Text,
  location: string,
  image: string,
  user_id: Number
}


export interface UpdateOneEvent {
  name: string;
  date: Date;
  max_participants: Number,
  description: Text,
  location: string,
  image: string,
  user_id: Number
}



export interface CreateOneReservation {
  user_id: Number,
  event_id: Number
}
// export type UpsertOneInput = CreateOneInput | UpdateOneInput;

// const useUsers: UseItems<User, CreateOneInput, UpdateOneInput> = (
//   opts: UseItemsOptions = defaultOptions
// ) => {
//   const apiRoutes = ApiRoutes.Users;
//   const useItemsHook = useItems<User, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
//   return useItemsHook;
// };
// interface AuthData {
//   user: User | null;
//   updateProfile: (
//     _input: UpdateOneInput,
//     _options?: FetchApiOptions
//   ) => Promise<ApiResponse<{ token: string }>>;
// }

const useEvents = (logout: any): any => {
  var router = useRouter();
  const fetchApi = useApi();
  const getAllEvents = async (options?: FetchApiOptions) => {
    const response = await fetchApi<{ token: string }>(`${ApiRoutes.Events.ReadAll}`, {
      method: "GET",
      ...options,
    });
    return response;
  };



  const getOneEvent = async (id: any, options?: FetchApiOptions) => {
    const response = await fetchApi<{ token: string }>(`${ApiRoutes.Events.ReadOne}/${id}`, {
      method: "GET",
      ...options,
    });
    return response;
  };

  const createEvent = async (input: CreateOneEvent, options?: FetchApiOptions) => {
    const response = await fetchApi<{ token: string }>(`${ApiRoutes.Events.CreateOne}`, {
      method: "POST",
      body: input,
      ...options,
    });
    router.push(Routes.Events.ReadAll)
  };


  var DeleteEvent = async (id: any, options?: FetchApiOptions) => {
    const response = await fetchApi<{ token: string }>(`${ApiRoutes.Events.DeleteOne}/${id}`, {
      method: "DELETE",
      ...options,
    });
    router.push(Routes.Events.ReadAll)
  };


  const updateEvent = async (id: any, input: UpdateOneEvent, options?: FetchApiOptions) => {
    const response = await fetchApi<{ token: string }>(`${ApiRoutes.Events.UpdateOne}/${id}`, {
      method: "PUT",
      body: input,
      ...options,
    });
    router.push(Routes.Events.ReadAll)
  };


  const createReservation = async (input: CreateOneReservation, options?: FetchApiOptions) => {
    const response = await fetchApi<{ token: string }>(`${ApiRoutes.Reservations.CreateOne}`, {
      method: "POST",
      body: input,
      ...options,
    });
    router.push(Routes.Common.Home)
  };


  const getAllReservation = async (options?: FetchApiOptions) => {
    const response = await fetchApi<{ token: string }>(`${ApiRoutes.Reservations.ReadAll}`, {
      method: "GET",
      ...options,
    });
    return response;
  };

  return { user: ApiRoutes.Auth.Me ?? null, getAllEvents, getOneEvent, createEvent, DeleteEvent, updateEvent, createReservation, getAllReservation };
};

export default useEvents;
