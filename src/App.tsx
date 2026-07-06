import { Route, Routes } from "react-router-dom";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import ThemePreview from "./pages/ThemePreview";
import CookingMode from "./pages/CookingMode";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/recipe/:id" element={<Recipe />} />
				<Route path="/recipe/:id/cooking" element={<CookingMode />} />
				<Route path="/favorite" element={<Favorite />} />
				<Route path="/themepreview" element={<ThemePreview />} />
			</Routes>
		</>
	);
}

export default App;
