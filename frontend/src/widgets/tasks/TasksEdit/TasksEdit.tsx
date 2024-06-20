
import taskApi from "@/app/rtk/endpointsApi/tasksApi";
import TaskForm from "@/features/TaskForm";
import { useParams } from "react-router-dom";


export const TasksEdit = () => {

    let { id } = useParams();

    const { data, isLoading, isError } = taskApi.get(Number(id));

    
    if(isLoading) return <div>Loading</div>
    if(isError) return <div>Error</div>
    return (
        <TaskForm data={data} type={'edit'} />
    )
}