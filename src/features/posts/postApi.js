import { baseApi } from "@/store/baseApi";

export const postsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ------------------- POSTS -------------------
    getPosts: builder.query({
      query: () => ({ url: "/posts", method: "get" }),
      providesTags: ["Posts"],
    }),
    getPostById: builder.query({
      query: (id) => ({ url: `/posts/${id}`, method: "get" }),
      providesTags: (result, error, id) => [{ type: "Posts", id }],
    }),
    createPost: builder.mutation({
      query: (postData) => ({
        url: "/posts",
        method: "post",
        data: postData,
      }),
      invalidatesTags: ["Posts"],
    }),
    updatePost: builder.mutation({
      query: ({ id, postData }) => ({
        url: `/posts/${id}`,
        method: "put",
        data: postData,
      }),
      invalidatesTags: ["Posts"],
    }),
    deletePost: builder.mutation({
      query: (id) => ({ url: `/posts/${id}`, method: "delete" }),
      invalidatesTags: ["Posts"],
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostByIdQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
} = postsApi;
