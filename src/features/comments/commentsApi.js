import { baseApi } from "@/store/baseApi";

export const commentsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getComments: builder.query({
      query: (postId) => ({ url: `/posts/${postId}/comments`, method: "get" }),
      providesTags: (result, error, postId) => [
        { type: "Comments", id: postId },
      ],
    }),
    addComment: builder.mutation({
      query: ({ postId, commentData }) => {
        return {
          url: `/posts/${postId}/comments`,
          method: "post",
          data: commentData,
        };
      },
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),
    updateComment: builder.mutation({
      query: ({ postId, commentId, content }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "patch",
        data: { content },
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),
    deleteComment: builder.mutation({
      query: ({ postId, commentId }) => ({
        url: `/posts/${postId}/comments/${commentId}`,
        method: "delete",
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),
  }),
  overrideExisting: false,
});

export const {
  useGetCommentsQuery,
  useAddCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = commentsApi;
