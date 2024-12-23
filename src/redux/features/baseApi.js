// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://pokeapi.co/api/v2/',
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.token;

    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});

const customBaseQuery = async (args, api, extraOptions) => {
  const result = await baseQuery(args, api, extraOptions);

  return result;
};

export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: customBaseQuery,
  tagTypes: ['products', 'cart', 'order'],
  endpoints: () => ({}),
});

export const { useGetPokemonByNameQuery } = baseApi;
