import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { SerializedError } from "@reduxjs/toolkit";

export type PaginationResponseType<T> = {
	data: Array<T>;
    links?: Array<{ url: string | null; label: string; active: boolean }>;
	meta: {
        current_page: number;
		first_page_url: string | null;
		from: number;
		last_page: number;
		last_page_url: string | null;
		next_page_url: string | null;
		path: string;
		per_page: number;
		prev_page_url: string | null;
		to: number;
		total: number;
	};
};

export enum OrderEnum {
	ASC = "asc",
	DESC = "desc"
}

export type DataListTableHeaderType = {
	title: string;
	name: string;
	isNumeric: boolean;
};

export type ResponseType = any | FetchBaseQueryError | SerializedError;
