import { baseApi } from '../baseApi';

const blogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // query
    allBlogs: builder.query({
      query: () => '/blogs',
      providesTags: ['blogs'],
    }),
    // mutation
    createBlog: builder.mutation({
      query: (data) => ({
        url: '/blogs',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['blogs'],
    }),
    editBlog: builder.mutation({
      query: ({ id, data }) => ({
        url: `/blogs/${id}`,
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['blogs'],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['blogs'],
    }),
  }),
});

export const {
  useCreateBlogMutation,
  useEditBlogMutation,
  useAllBlogsQuery,
  useDeleteBlogMutation,
} = blogApi;
