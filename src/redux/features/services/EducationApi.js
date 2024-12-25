import { baseApi } from '../baseApi';

export const educationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allEducations: builder.query({
      query: () => '/education',
      providesTags: ['education'],
    }),
    singleEducations: builder.query({
      query: (id) => `/education/${id}`,
      providesTags: ['education'],
    }),
    createEducation: builder.mutation({
      query: (data) => ({
        url: '/education',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['education'],
    }),
    updateEducation: builder.mutation({
      query: ({ id, data }) => ({
        url: `/education/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['education'],
    }),
    deleteEducation: builder.mutation({
      query: (id) => ({
        url: `/education/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['education'],
    }),
  }),
});

export const {
  useCreateEducationMutation,
  useAllEducationsQuery,
  useSingleEducationsQuery,
  useUpdateEducationMutation,
  useDeleteEducationMutation,
} = educationApi;
