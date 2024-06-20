import { Box, Button, MenuItem } from "@mui/material";
import { FC, PropsWithChildren } from "react";
import { ResponseType } from "@/shared/types/general";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { TaskType } from "@/shared/types/apiEntities";
import { ResponseErrorType } from "@/shared/types/responseErrors";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "@/shared/ui/conponents/RHFTextField/RHFTextField";
import { useForm, useFormState } from "react-hook-form";
import RHFSwitcher from "@/shared/ui/conponents/RHFSwitcher/RHFSwitcher";
import RHFSelect from "@/shared/ui/conponents/RHFSelect/RHFSelect";
import taskApi from "@/app/rtk/endpointsApi/tasksApi";

type PropsType = {
    data?: TaskType | null;
    type: "create" | "edit";
} & PropsWithChildren;

type FormType = Omit<TaskType, "id"> & Partial<Pick<TaskType, "id">>;

const schema = yup.object().shape({
    name: yup
        .string()
        .required("Поле не может быть пустым")
        .min(3, "Поле не может быть менее 3х символов"),
    status_id: yup.number().positive().integer(),
    description: yup.string(),
    done: yup.boolean()
});

export const TaskForm: FC<PropsType> = ({ data = null, type = "create" }) => {
    const navigate = useNavigate();


    const { control, handleSubmit } = useForm<FormType>({
        mode: "onBlur",
        resolver: yupResolver(schema) as any,
        defaultValues: {
            name: data ? data.name : "",
            description: data && data.description ? data.description : "",
            done: data && data.done ? Boolean(data.done) : false,
            status_id: data?.status_id
        }
    });

    const { dirtyFields } = useFormState({ control });

    const [fetchCreate] = taskApi.create();
    const [fetchUpdate] = taskApi.update();

    const { data: statuses } = taskApi.getStatuses();

    const getChangedFields = (dirtyFields: any, formData: any) => {
        const changedFields: any = {};
        for (const key in dirtyFields) {
            if (dirtyFields[key]) {
                changedFields[key] = formData[key];
            }
        }
        return changedFields;
    };

    const onSubmit = async (formData: any, closeAfter: boolean) => {
        const changedFields = getChangedFields(dirtyFields, formData);

        if (type === "edit" && data) {
            changedFields.id = data.id;
        }

        try {
            const response: ResponseType =
                type === "create" && !data
                    ? await fetchCreate(changedFields).unwrap()
                    : await fetchUpdate(changedFields).unwrap();
            console.log(response);
            toast.success("Сохранено");
            if (closeAfter) {
                navigate("/task/");
                return;
            }
            if (type === "create") {
                navigate("/task/edit/" + response.id);
            }
        } catch (error) {
            const fetchError = error as ResponseErrorType;
            toast.error(fetchError.data?.message);
        }
    };

    const cancelHandler = () => {
        if (confirm("Вы уверены? Изменения не сохранятся!")) {
            navigate("/task");
        }
    };

    return (
        <Box
            sx={{ minHeight: "90%", display: "flex", flexDirection: "column" }}
        >
            <Box sx={{ flex: "1 1 100%" }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between"
                    }}
                >
                    <Box sx={{ width: "47%" }}>
                        <RHFTextField
                            name="name"
                            control={control}
                            label={"Наименование"}
                            placeholder="Наименование"
                            fullWidth
                        />
                    </Box>
                    <Box sx={{ width: "47%" }}>
                        <RHFTextField
                            name="description"
                            control={control}
                            label={"Описание"}
                            placeholder="Описание"
                            fullWidth
                        />
                    </Box>
                </Box>
                <Box sx={{ mt: 3 }}>
                    <RHFSelect
                        name="status_id"
                        label="Статус"
                        control={control}
                    >
                        {statuses &&
                            statuses.data.map((item: any) => (
                                <MenuItem selected key={item.id} value={item.id}>
                                    {item.name}
                                </MenuItem>
                            ))}
                    </RHFSelect>
                </Box>
                <Box>
                    <RHFSwitcher
                        name="done"
                        control={control}
                        label="Закрыта"
                    />
                </Box>
            </Box>
            <Box></Box>
            <Box>
                <Button
                    onClick={handleSubmit((par: any) => onSubmit(par, false))}
                    sx={{ mr: 2 }}
                    variant="contained"
                    disableElevation
                >
                    {type === "edit" ? "сохранить" : "создать"}
                </Button>
                <Button
                    sx={{ mr: 2 }}
                    variant="outlined"
                    onClick={handleSubmit((par: any) => onSubmit(par, true))}
                >
                    {type === "edit" ? "сохранить" : "создать"} и закрыть
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    onClick={() => cancelHandler()}
                >
                    Отмена
                </Button>
            </Box>
        </Box>
    );
};