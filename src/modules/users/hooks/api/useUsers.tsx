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


// export interface CreateOneInput {
//   name: string;
//   email: string;
//   password: string;
//   role: ROLE;
// }

export interface UpdateOneInput {
  name: string;
  email: string;
  password?: string;
  role: ROLE;
}

// export type UpsertOneInput = CreateOneInput | UpdateOneInput;

// const useUsers: UseItems<User, CreateOneInput, UpdateOneInput> = (
//   opts: UseItemsOptions = defaultOptions
// ) => {
//   const apiRoutes = ApiRoutes.Users;
//   const useItemsHook = useItems<User, CreateOneInput, UpdateOneInput>(apiRoutes, opts);
//   return useItemsHook;
// };
interface AuthData {
  user: User | null;
  updateProfile: (
    _input: UpdateOneInput,
    _options?: FetchApiOptions
  ) => Promise<ApiResponse<{ token: string }>>;
}

const useUsers = (use,logout): AuthData => {
  console.log("the user from useUsers")
  console.log(use)
  var router = useRouter();

  // const [initialized, setInitialized] = useState<boolean>(false);
  //   const { data: user, mutate } = useSWR<User | null>(ApiRoutes.Auth.Me, async (url) => {
  //   if (!localStorage.getItem('authToken')) {
  //     setInitialized(true);
  //     return null;
  //   }
  //   const options: ApiOptions = {
  //     method: 'POST',
  //   };
  //   const response = await fetchApi<{ user: User }>(url, options);
  //   const { success, data } = response;
  //   let returnedUser = null;
  //   if (!success) {
  //     localStorage.removeItem('authToken');
  //   } else {
  //     returnedUser = data?.user ?? null;
  //   }
  //   setInitialized(true);
  //   return returnedUser;
  // });
    const fetchApi = useApi();

   
  const updateProfile = async (input: UpdateOneInput, options?: FetchApiOptions) => {
    console.log("from the useUser")
    const response = await fetchApi<{ token: string }>(`${ApiRoutes.Users.UpdateOne}/${use.id}`, {
      body: input,
      method:"PUT",
      ...options,
    });
    if (response.success && response.data?.token) {
      localStorage.setItem('authToken', response.data.token);
      mutate();
    }
      return logout();

  };
   
  return { user: ApiRoutes.Auth.me ?? null, updateProfile };
};

export default useUsers;
