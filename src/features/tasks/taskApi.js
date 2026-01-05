import { baseApi } from "@/store/baseApi";

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // ------------------- TASKS -------------------
    getTasks: builder.query({
      query: () => ({ url: "/tasks", method: "get" }),
      providesTags: ["Tasks"],
    }),

    getTaskById: builder.query({
      query: (id) => ({ url: `/tasks/${id}`, method: "get" }),
      providesTags: (result, error, id) => [
        { type: "Tasks", id },
      ],
    }),

    createTask: builder.mutation({
      query: (taskData) => ({
        url: "/tasks",
        method: "post",
        data: taskData,
      }),
      invalidatesTags: ["Tasks"],
    }),

    updateTask: builder.mutation({
      query: ({ id, taskData }) => ({
        url: `/tasks/${id}`,
        method: "patch",
        data: taskData,
      }),
      invalidatesTags: (result, error, { id }) => [
        "Tasks",
        { type: "Tasks", id },
      ],
    }),

    toggleCompleted: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}/toggle-completed`,
        method: "patch",
      }),
      invalidatesTags: (result, error, id) => [
        "Tasks",
        { type: "Tasks", id },
      ],
    }),

    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: "delete",
      }),
      invalidatesTags: ["Tasks"],
    }),
  }),
});

export const {
  useGetTasksQuery,
  useGetTaskByIdQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useToggleCompletedMutation,
  useDeleteTaskMutation,
} = tasksApi;
