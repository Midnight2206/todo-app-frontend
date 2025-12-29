import { createApi } from '@reduxjs/toolkit/query/react';
import http from '@/utils/http';
const axiosBaseQuery =
  () =>
  async ({ url, method, data, params }) => {
    try {
      if (method === "get") {
        const result = await http.get(url, { params });
        return { data: result.data };
      }

      const result = await http[method](url, data, { params });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

export const baseApi = createApi({
  reducerPath: 'baseApi',
  baseQuery: axiosBaseQuery(),
  tagTypes: ['User', 'Posts', 'Comments'],
  endpoints: () => ({}),
});
