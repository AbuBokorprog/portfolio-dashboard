import { baseApi } from '../baseApi';

const reportsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    dashboardReports: builder.query({
      query: () => '/reports',
    }),
  }),
});

export const { useDashboardReportsQuery } = reportsApi;
