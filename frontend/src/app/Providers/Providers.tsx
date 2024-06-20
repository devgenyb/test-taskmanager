import React, { FC } from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "../store";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Layout } from "../../entities/Layout/ui/Layout";
import "../style.css";
import MuiThemeProvider from "../themes/MuiThemeProvider";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store/store";

interface IProps {
	children: React.ReactNode;
}

const Providers: FC<IProps> = ({ children }) => {
	return (
		<React.StrictMode>
			<BrowserRouter>
				<Provider store={store}>
					<PersistGate loading={null} persistor={persistor}>
						<MuiThemeProvider>
							<ToastContainer position="bottom-center" />
							<Layout>{children}</Layout>
						</MuiThemeProvider>
					</PersistGate>
				</Provider>
			</BrowserRouter>
		</React.StrictMode>
	);
};

export default Providers;
