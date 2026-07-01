import { Route, Routes } from "react-router-dom";
import Favorite from "./pages/Favorite";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import RecipeLive from "./pages/RecipeLive";
import ThemePreview from "./pages/ThemePreview";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/recipe/:id" element={<Recipe />} />
				<Route path="/recipelive" element={<RecipeLive />} />
				<Route path="/favorite" element={<Favorite />} />
				<Route path="/themepreview" element={<ThemePreview />} />
			</Routes>
		</>
	);
}

export default App;
