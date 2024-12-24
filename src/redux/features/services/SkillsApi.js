import { baseApi } from '../baseApi';

const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // query
    allSkills: builder.query({
      query: () => 'api/skills',
      providesTags: ['skills'],
    }),
    // mutation
    createSkill: builder.mutation({
      query: (data) => ({
        url: '/api/skills',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['skills'],
    }),
    editSkill: builder.mutation({
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
  useAllSkillsQuery,
  useCreateSkillMutation,
  useEditSkillMutation,
} = skillsApi;
