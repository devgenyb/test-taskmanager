import { Route, Routes } from "react-router-dom";
import LoginPage from "../../pages/LoginPage";
import HomePage from "@/pages/HomePage";
import TasksCreatePage from "@/pages/tasks/TaskCreatePage";
import TasksEditPage from "@/pages/tasks/TasksEditPage";

export const Router = () => {
	return (
		<Routes>
			<Route path="/" element={<HomePage />} />

			<Route path="task">
				<Route path="" element={<HomePage />} />
				<Route
					path="create"
					element={<TasksCreatePage />}
				/>
				<Route
					path="edit/:id"
					element={<TasksEditPage />}
				/>
			</Route>

			<Route path="/login" element={<LoginPage />} />
			<Route path="/*" element={<div>Not found</div>} />
		</Routes>
	);
};
