import { baseApi } from '../baseApi';

export const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allExperiences: builder.query({
      query: () => '/experience',
      providesTags: ['experience'],
    }),
    singleExperience: builder.query({
      query: (id) => `/experience/${id}`,
      providesTags: ['experience'],
    }),
    // mutation
    createExperience: builder.mutation({
      query: (data) => ({
        url: '/experience',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['experience'],
    }),
    updateExperience: builder.mutation({
      query: ({ id, data }) => ({
        url: `/experience/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['experience'],
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/experience/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['experience'],
    }),
  }),
});

export const {
  useCreateExperienceMutation,
  useAllExperiencesQuery,
  useSingleExperienceQuery,
  useUpdateExperienceMutation,
  useDeleteExperienceMutation,
} = experienceApi;
