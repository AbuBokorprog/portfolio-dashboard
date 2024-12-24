import { baseApi } from '../baseApi';

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // query
    allProjects: builder.query({
      query: () => 'api/projects',
      providesTags: ['projects'],
    }),
    // mutation
    createProject: builder.mutation({
      query: (data) => ({
        url: '/api/projects',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['projects'],
    }),
    editProject: builder.mutation({
      query: (data) => ({
        url: '/api/projects',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['projects'],
    }),
  }),
});

export const {
  useAllProjectsQuery,
  useCreateProjectMutation,
  useEditProjectMutation,
} = projectApi;
