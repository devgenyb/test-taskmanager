import { BaseQueryFn, FetchArgs, FetchBaseQueryError, createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { apiUrl } from "./apiConstants";
import { resetUser } from "../store/slices/userSlice";

const tagTypes: string[] = [];

const baseQuery = fetchBaseQuery({
	baseUrl: apiUrl,
	prepareHeaders: (headers, { getState }) => {
		headers.set("Accept", "application/json");
		headers.set("Content-Type", "application/json");
		const user = (getState() as any).user.user;
		if (user && user.token) {
			headers.set("Authorization", "Bearer " + user.token);
		}
	},
})

const baseQueryWithAuthCheck: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401 && (result.error as any).message === 'Unauthenticated.') {
	api.dispatch(resetUser());
	
  }
  return result
}

export const backApi = createApi({
	reducerPath: "backApi",
	tagTypes,
	baseQuery: baseQueryWithAuthCheck,
	endpoints: (builed) => ({
		mustBequery: builed.query({
			query: () => "mustBe"
		})
	})
});
