import { Button, Pagination, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import React, { FC, useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

type PropsType = {
	labelRowsPerPage: string;
	rowsPerPageOptions: number[];
	rowsPerPage: number;
	component?: string;
	lastPate: number;
	count: number; // общее количесвто элементов в таблице
	page: number; // текущий номер страницы
	onPageChange: (
		newPage: number
	) => void; // событие при изменении страницы
	onRowsPerPageChange: (item: number) => void // событие на переключение показать на странице
};

export const CustomTablePagination: FC<PropsType> = ({
	labelRowsPerPage,
	rowsPerPageOptions,
	onRowsPerPageChange,
	rowsPerPage,
	page,
	count,
	lastPate,
	onPageChange,
}) => {

	const firstIndex = (page - 1) * rowsPerPage
	const lastIndex = Math.min(firstIndex + rowsPerPage, count)
	
	

	const [currRowPerPageOption, setCurrRowPerPageOption] = useState<number>(
		rowsPerPage
	);

	const [rowsPerPageOption, setRowsPerPageOption] = React.useState<null | HTMLElement>(null);


	const open = Boolean(rowsPerPageOption);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setRowsPerPageOption(event.currentTarget);
	};
	const handleClose = (item: number) => {
		setRowsPerPageOption(null);
		if (typeof item !== 'number') {
			return;
		}
		setCurrRowPerPageOption(item)
		onRowsPerPageChange(item)
	};
	

	return (
		<Box sx={{ display: "flex", alignItems: "center" }}>
			<Typography component={"div"} variant="body2">
				{labelRowsPerPage}
			</Typography>
			<div>
				<Box
					sx={{
						display: "flex",
						alignItems: "start",
						justifyContent: "center",
						p: 0
					}}
				>
					<Button variant="text" onClick={handleClick}>
						{currRowPerPageOption} <ArrowDropDownIcon />
					</Button>
				</Box>
				<Menu
					id="basic-menu"
					anchorEl={rowsPerPageOption}
					open={open}
					onClose={handleClose}
					MenuListProps={{
						"aria-labelledby": "basic-button"
					}}
				>
					{rowsPerPageOptions.map((item) => (
						<MenuItem key={item} onClick={() => handleClose(item)}>{item}</MenuItem>
					))}
				</Menu>
			</div>
			<Typography component={'div'} variant="body2">{firstIndex + 1}–{lastIndex} из {count}</Typography>
			<Box sx={{ml: 2}}><Pagination onChange={(_: unknown, number) => onPageChange(number)} page={page} showFirstButton showLastButton size="small" count={lastPate} color="primary" /></Box>
		</Box>
	);
};
