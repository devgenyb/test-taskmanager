import {
	Box,
	Button,
	Checkbox,
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	TableSortLabel,
	Typography
} from "@mui/material";
import Paper from "@mui/material/Paper";

import DataTableToolbar from "@/features/DataTableTollbar";
import { Link, useNavigate } from "react-router-dom";
import CustomTablePagination from "@/features/CustomTablePagination";
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import useDataListQuery from "@/shared/hooks/useDataListQuery";
import useDeleteManyList from "@/shared/hooks/useDeleteManyList";
import { PaginationResponseType } from "@/shared/types/general";
import { entityType } from "@/shared/types/apiEntities";
import taskApi from "@/app/rtk/endpointsApi/tasksApi";

type TableHeaderType = {
	title: string;
	name: string;
	isNumeric: boolean;
};

const tableHeaders: TableHeaderType[] = [
	{ title: "Номер", name: "id", isNumeric: true },
	{ title: "Наименование", name: "name", isNumeric: false },
	{ title: "Статус", name: "status", isNumeric: false },
	{ title: "Автор", name: "user", isNumeric: false },
	{ title: "Завершена", name: "done", isNumeric: true }
];

export const TasksList = () => {
	const navigate = useNavigate();

	const {
		changeSortHandler,
		changePageHandler,
		changeRowsPerPageHandle,
		getQuryString,
		isSortActive,
		getSortDirection
	} = useDataListQuery();

	const { data, isLoading, refetch, isFetching } = taskApi.getList(
		getQuryString()
	);

	const { handleItemCheck, handleMainCheck, selectedIds } =
		useDeleteManyList(
			data as PaginationResponseType<entityType>,
		);

	if (isLoading) return <div>Loading</div>;

	if (!data?.data) return <div>Error</div>;

	console.log(data);
	

	return (
		<Box>
			<TableContainer component={Paper}>
				<DataTableToolbar
					title="Задачи"
					actionsMode={!!selectedIds.length}
					numSelected={selectedIds.length}
					loading={isFetching}
					onReload={() => refetch()}
					actions={
						<Link to={"create"}>
							<Button variant="text" size="small">
								<Box sx={{ whiteSpace: "nowrap" }}>
									<Typography
										variant="subtitle2"
										color="inherit"
										component={"span"}
									>
										создать
									</Typography>
								</Box>
							</Button>
						</Link>
					}
				/>
				<Table sx={{ minWidth: 400 }}>
					<TableHead>
						<TableRow>
							<TableCell padding="checkbox">
								<Checkbox
									color="primary"
									indeterminate={
										selectedIds.length <
											data?.data.length &&
										!!selectedIds.length
									}
									checked={!!selectedIds.length}
									onChange={handleMainCheck}
									inputProps={{
										"aria-label": "select all desserts"
									}}
								/>
							</TableCell>
							{tableHeaders.map((item) => (
								<TableCell
									align={item.isNumeric ? "right" : "left"}
									key={item.name}
								>
									<TableSortLabel
										active={isSortActive(item.name)}
										direction={getSortDirection()}
										onClick={() =>
											changeSortHandler(item.name)
										}
									>
										{item.title}
									</TableSortLabel>
								</TableCell>
							))}
						</TableRow>
					</TableHead>
					<TableBody>
						{data!.data.map((item) => (
							<TableRow
								sx={{ cursor: "pointer" }}
								key={item.id}
								onClick={() => navigate("/task/edit/" + item.id)}
							>
								<TableCell padding="checkbox">
									<Checkbox
										checked={selectedIds.includes(item.id)}
										color="primary"
										onClick={(e) => {
											e.stopPropagation();
											handleItemCheck(e, item.id);
										}}
									/>
								</TableCell>
								<TableCell
									align={
										tableHeaders[0].isNumeric
											? "right"
											: "left"
									}
								>
									{item.id}
								</TableCell>
								<TableCell
									align={
										tableHeaders[1].isNumeric
											? "right"
											: "left"
									}
								>
									{item.name}
								</TableCell>
								<TableCell
									align={
										tableHeaders[2].isNumeric
											? "right"
											: "left"
									}
								>
									{item.status.name}
								</TableCell>
								<TableCell
									align={
										tableHeaders[3].isNumeric
											? "right"
											: "left"
									}
								>
									{item.user.email}
								</TableCell>
								<TableCell
									align={
										tableHeaders[4].isNumeric
											? "right"
											: "left"
									}
								>
									{item.done ? <CheckCircleOutlineIcon color="success" /> : <HighlightOffIcon color="error" />}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Box sx={{ float: "right", mt: 2 }}>
				<CustomTablePagination
					labelRowsPerPage={"Показать на странице"}
					rowsPerPageOptions={[5, 10, 15, 25, 50]}
					component="div"
					count={data.meta.total}
					rowsPerPage={data.meta.per_page}
					page={data.meta.current_page}
					onPageChange={changePageHandler}
					lastPate={data.meta.last_page}
					onRowsPerPageChange={changeRowsPerPageHandle}
				/>
			</Box>
		</Box>
	);
};
