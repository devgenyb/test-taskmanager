import { Box, IconButton, Toolbar, Tooltip, Typography, alpha } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { FC, PropsWithChildren, ReactNode } from "react";
import { Loader } from "@/shared/ui/conponents/Loader/Loader";
import CachedIcon from '@mui/icons-material/Cached';

type PropsType = {
	title: string;
	actionsMode: boolean;
	numSelected?: number;
    loading: boolean;
    onReload: () => void;
    onDelete?: () => void;
    actions?: ReactNode;
} & PropsWithChildren;

export const DataTableToolbar: FC<PropsType> = ({
	title,
	actionsMode,
	numSelected,
    loading,
    actions,
    onReload,
    onDelete,
}) => {
    const reloadHandler = () => {
        onReload()
        
    }
	const infoToolbar = (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
			}}
		>
			<Typography sx={{ flex: "1 1 100%" }} variant="h6" component="div">
				{title}
			</Typography>
            <Box sx={{marginRight: 5}}>
                {loading ? 
                <Loader size={15} borderWdth={2} />
                :
                <div onClick={reloadHandler}><CachedIcon sx={{cursor: 'pointer'}}/></div>
            }
            </Box>
            {actions}
		</Toolbar>
	);

	const actionsToolbar = (
		<Toolbar
			sx={{
				pl: { sm: 2 },
				pr: { xs: 1, sm: 1 },
				bgcolor: (theme) =>
					alpha(
						theme.palette.primary.main,
						theme.palette.action.activatedOpacity
					),
			}}
		>
			<Typography
				sx={{ flex: "1 1 100%" }}
				color="inherit"
				variant="subtitle1"
				component="div"
			>
				{numSelected} Выбрано
			</Typography>
			<Tooltip onClick={() => onDelete ? onDelete() : null} title="Удалить">
				<IconButton>
					<DeleteIcon />
				</IconButton>
			</Tooltip>
		</Toolbar>
	);
	return actionsMode ? actionsToolbar : infoToolbar;
};
