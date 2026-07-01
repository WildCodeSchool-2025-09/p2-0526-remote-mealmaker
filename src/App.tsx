import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Recipe from "./pages/Recipe";
import RecipeLive from "./pages/RecipeLive";
import Favorite from "./pages/Favorite";
import ThemePreview from "./pages/ThemePreview";
import Navbar from "./components/NavBar";

function App() {
	return (
		<>
			<Navbar />

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
