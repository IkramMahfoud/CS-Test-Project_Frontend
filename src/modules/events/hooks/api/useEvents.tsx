import ApiRoutes from '@common/defs/apiRoutes';
import useApi, { FetchApiOptions } from '@common/hooks/useApi';
import { useRouter } from 'next/router';
import Routes from '@common/defs/routes';
import Common from '@common/defs/routes';

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


const useEvents = (user: any, logout: any): any => {
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
    if (user.rolesNames[0] == "admin") {
      router.push(Routes.Common.Home)
    } else {
      router.push(Routes.Events.ReadAll)
    }
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
