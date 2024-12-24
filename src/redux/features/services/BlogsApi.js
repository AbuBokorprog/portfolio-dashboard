import { baseApi } from '../baseApi';

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // query
    allBlogs: builder.query({
      query: () => 'api/blogs',
      providesTags: ['blogs'],
    }),
    // mutation
    createBlog: builder.mutation({
      query: (data) => ({
        url: '/api/blog',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['blogs'],
    }),
    editBlog: builder.mutation({
      query: (data) => ({
        url: '/api/blog',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['blogs'],
    }),
  }),
});

export const { useCreateBlogMutation, useEditBlogMutation, useAllBlogsQuery } =
  blogApi;
