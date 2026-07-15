import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import Favorite from "./pages/Favorite";
import ThemePreview from "./pages/ThemePreview";
import CookingMode from "./pages/CookingMode";

function Router() {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/recipe/:id" element={<Recipe />} />
			<Route path="/cooking" element={<CookingMode />} />
			<Route path="/favorite" element={<Favorite />} />
			<Route path="/themepreview" element={<ThemePreview />} />
		</Routes>
	);
}

export default Router;
