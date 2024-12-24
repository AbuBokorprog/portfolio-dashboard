import { baseApi } from '../baseApi';

const usersApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userLogin: builder.mutation({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Users'],
    }),
  }),
});

export const { useUserLoginMutation } = usersApi;