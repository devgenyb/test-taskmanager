import { MouseEvent, useState } from "react";
import { entityType } from "../types/apiEntities";
import { PaginationResponseType } from "../types/general";

const useDeleteManyList = (data: PaginationResponseType<entityType>) => {

    const [selectedIds, setSelectedIds] = useState<number[]>([]);

	const handleItemCheck = (e: MouseEvent<HTMLButtonElement>, id: number) => {
		const target = e.target as HTMLInputElement;
		const flag = target.checked;
		setSelectedIds(
			flag
				? (prev): number[] => [...prev, id]
				: (prev) => prev.filter((item) => item !== id)
		);
	};

    const handleMainCheck = () => {
		if (!data?.data) {
			return;
		}
		if (!selectedIds.length) {
			setSelectedIds(data?.data.map((item) => item.id));
		} else {
			setSelectedIds([]);
		}
	};


    return {
        handleItemCheck,
        handleMainCheck,
        selectedIds
    }
}

export default useDeleteManyList;