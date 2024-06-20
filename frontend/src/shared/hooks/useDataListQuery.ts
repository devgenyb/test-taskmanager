import { useSearchParams } from "react-router-dom";
import { OrderEnum } from "../types/general";

const useDataListQuery = () => {
	const [searchParams, setSearchParams] = useSearchParams();

	const changeSortHandler = (sort_name: string) => {
		const currentParams = Object.fromEntries(searchParams.entries());
		let order = OrderEnum.ASC;
		const isCurrent =
			Boolean(searchParams.get("sort")) &&
			searchParams.get("sort") === sort_name;
		if (isCurrent && searchParams.get("order")) {
			order =
				searchParams.get("order") === OrderEnum.ASC
					? OrderEnum.DESC
					: OrderEnum.ASC;
		}
		setSearchParams({
			...currentParams,
			sort: sort_name,
			order: order.toLocaleLowerCase()
		});
	};

	const changePageHandler = (page_number: number) => {
		const currentParams = Object.fromEntries(searchParams.entries());
		setSearchParams({
			...currentParams,
			page: String(page_number)
		});
	};

	const changeRowsPerPageHandle = (rows_number: number) => {
		const currentParams = Object.fromEntries(searchParams.entries());
		setSearchParams({
			...currentParams,
			per_page: String(rows_number),
			page: "1"
		});
	};

	const getQuryString = () => {
		const currentParams = Object.fromEntries(searchParams.entries());
		const query = new URLSearchParams({
			page: searchParams.get("page") ?? "1",
			per_page: searchParams.get("per_page") ?? "10"
		});
		let sort = currentParams.sort;
		const order = currentParams.order;
		if (sort) {
			order ? (sort = sort + ":" + order) : sort;
			query.append("sort", sort);
		}

		return query.toString();
	};

	const isSortActive = (name: string) => {
		return searchParams.get("sort") === name;
	};

	const getSortDirection = () => {
		return searchParams.get("sort") &&
			searchParams.get("order")!.toLowerCase() === OrderEnum.ASC
			? "asc"
			: "desc";
	};

	return {
		changeSortHandler,
		changePageHandler,
		changeRowsPerPageHandle,
		getQuryString,
		isSortActive,
		getSortDirection
	};
};

export default useDataListQuery;
