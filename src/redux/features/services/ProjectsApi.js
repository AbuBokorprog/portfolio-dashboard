import { baseApi } from '../baseApi';

const projectApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Projects
    // query
    allProjects: builder.query({
      query: () => '/projects',
      providesTags: ['projects'],
    }),
    singleProjects: builder.query({
      query: (id) => `/projects/${id}`,
      providesTags: ['projects'],
    }),
    // mutation
    createProject: builder.mutation({
      query: (data) => ({
        url: '/projects',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['projects'],
    }),
    editProject: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['projects'],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['projects'],
    }),

    // Projects category
    // query
    allProjectsCategory: builder.query({
      query: () => '/projects-category',
      providesTags: ['category'],
    }),
    // mutation
    createProjectCategory: builder.mutation({
      query: (data) => ({
        url: '/projects-category',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['category'],
    }),
    editProjectCategory: builder.mutation({
      query: ({ id, data }) => ({
        url: `/projects-category/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['category'],
    }),
    deleteProjectCategory: builder.mutation({
      query: (id) => ({
        url: `/projects-category/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['category'],
    }),
  }),
});

export const {
  useAllProjectsQuery,
  useCreateProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
  useSingleProjectsQuery,
  useAllProjectsCategoryQuery,
  useCreateProjectCategoryMutation,
  useDeleteProjectCategoryMutation,
  useEditProjectCategoryMutation,
} = projectApi;
