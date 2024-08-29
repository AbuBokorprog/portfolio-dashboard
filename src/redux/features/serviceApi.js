import { baseApi } from "./baseApi";

const ServiceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPokemonByName: builder.query({
      query: (name) => `pokemon/${name}`,
    }),
  }),
});

export const { useGetPokemonByNameQuery } = ServiceApi;
