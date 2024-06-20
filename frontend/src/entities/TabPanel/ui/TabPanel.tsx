import { Box } from "@mui/material";

interface TabPanelProps {
	children?: React.ReactNode;
	index: number | string;
	value: number | string;
}

export function TabPanel(props: TabPanelProps) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
					{children}
				</Box>
			)}
		</div>
	);
}
