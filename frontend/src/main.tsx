import ReactDOM from "react-dom/client";
import Providers from "./app/Providers/Providers.tsx";
import { Router } from "./app/Router/Router.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
	<Providers>
		<Router />
	</Providers>
);
