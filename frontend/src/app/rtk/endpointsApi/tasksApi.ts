import { PaginationResponseType } from "@/shared/types/general";
import { backApi } from "..";
import { TaskType } from "@/shared/types/apiEntities";
import { backApiEndpoints } from "../apiConstants";
import { RequestMethod } from "@/shared/types/httpMethods";

const api = backApi.injectEndpoints({
	endpoints: (build) => {
		return {
			getTasksList: build.query<
				PaginationResponseType<TaskType & { id: number }>,
				string
			>({
				query: (queryString) =>
					backApiEndpoints.task + "?" + queryString,
				providesTags: (result) => {
					const tags: any[] = result
						? [
								...result.data.map((item) => ({
									type: "Task",
									id: item.id
								}))
						  ]
						: [];
					return [...tags, { type: "Task", id: "PARTIAL-LIST" }];
				}
			}),

			getStatuses: build.query<any, void>({
				query: () =>
					backApiEndpoints.taskStatuses,
			}),

			getTask: build.query<TaskType, number>({
				query: (id: number) => backApiEndpoints.task + "/" + id,
				providesTags: (result, _, arg) => {
					return result
						? [{ type: "Task", id: arg }]
						: [{ type: "Task" }];
				}
			}),

			createTask: build.mutation<TaskType & { id: number }, TaskType>({
				query: (body) => ({
					url: backApiEndpoints.task,
					body: JSON.stringify(body),
					method: RequestMethod.POST
				}),
				invalidatesTags: [{ type: "Task", id: "PARTIAL-LIST" }],
				async onQueryStarted(_, { dispatch, queryFulfilled }) {
					const response = await queryFulfilled;
					dispatch(
						api.util.upsertQueryData(
							"getTask",
							response.data.id,
							response.data
						)
					);
				}
			}),

			updateTask: build.mutation<null, TaskType & { id: number }>({
				query: (body) => ({
					url: backApiEndpoints.task,
					body: JSON.stringify(body),
					method: RequestMethod.PUT
				}),
				invalidatesTags: [{ type: "Task", id: "PARTIAL-LIST" }],
				async onQueryStarted(
					{ id, ...patch },
					{ dispatch, queryFulfilled }
				) {
					await queryFulfilled;
					dispatch(
						api.util.updateQueryData(
							"getTask",
							id,
							(draft: any) => {
								Object.assign(draft, patch);
							}
						)
					);
				}
			})
		};
	}
});

const taskApi = {
	get: api.useGetTaskQuery,
    getStatuses: api.useGetStatusesQuery,
	getList: api.useGetTasksListQuery,
	update: api.useUpdateTaskMutation,
	create: api.useCreateTaskMutation
};

export default taskApi;
