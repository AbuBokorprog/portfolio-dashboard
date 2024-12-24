import { baseApi } from '../baseApi';

const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // query
    allSkills: builder.query({
      query: () => '/skills',
      providesTags: ['skills'],
    }),
    // mutation
    createSkill: builder.mutation({
      query: (data) => ({
        url: '/skills',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['skills'],
    }),
    editSkill: builder.mutation({
      query: ({ id, data }) => ({
        url: `/skills/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['skills'],
    }),
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skills/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['skills'],
    }),
  }),
});

export const {
  useAllSkillsQuery,
  useCreateSkillMutation,
  useEditSkillMutation,
  useDeleteSkillMutation,
} = skillsApi;
