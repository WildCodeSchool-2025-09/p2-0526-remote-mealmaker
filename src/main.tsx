import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./index.css";
import { FavoriteProvider } from "./components/contexts/FavoriteContext";
import { SearchProvider } from "./components/contexts/SearchContext";

// biome-ignore lint/style/noNonNullAssertion: <explanation>
ReactDOM.createRoot(document.getElementById("root")!).render(
	<BrowserRouter>
		<FavoriteProvider>
			<SearchProvider>
				<App />
			</SearchProvider>
		</FavoriteProvider>
	</BrowserRouter>,
);
