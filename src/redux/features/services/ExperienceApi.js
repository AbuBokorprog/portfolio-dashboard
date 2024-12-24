import { baseApi } from '../baseApi';

const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // query
    allExperience: builder.query({
      query: () => 'api/skills',
      providesTags: ['skills'],
    }),
    // mutation
    createExperience: builder.mutation({
      query: (data) => ({
        url: '/api/skills',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['skills'],
    }),
    editExperience: builder.mutation({
      query: (data) => ({
        url: '/api/skills',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['skills'],
    }),
  }),
});

export const {
  useAllExperienceQuery,
  useCreateExperienceMutation,
  useEditExperienceMutation,
} = experienceApi;
