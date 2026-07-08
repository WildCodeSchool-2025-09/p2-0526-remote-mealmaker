import GetRecipes from "../components/GetRecipes";
import Header from "../components/Header";
import Hero from "../components/Hero";
import IngredientsList from "../components/IngredientsList";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/NavBar";
import { useState } from "react";

function Home() {
	const [selectedIngredients, setSelectedIngredients] = useState([]);

	function addIngredient(ingredient) {
		setSelectedIngredients((previous) => {
			const alreadyExists = previous.some((item) => item.id === ingredient.id);
			if (alreadyExists) return previous;
			return [...previous, ingredient];
		});
	}
	function removeIngredient(id) {
		setSelectedIngredients((previous) =>
			previous.filter((item) => item.id !== id),
		);
	}

	return (
		<>
			<Header />
			<Hero />
			<section className="flex flex-col p-8 gap-4">
				<SearchBar onAddIngredient={addIngredient} />
				<IngredientsList
					ingredients={selectedIngredients}
					onRemoveIngredient={removeIngredient}
				/>
				<GetRecipes selectedIngredients={selectedIngredients} />
			</section>
			<footer>
				<p className="m-4 text-center text-text-muted">Copyright &copy; 2026</p>
			</footer>
			<div className="w-full h-24"> </div>
			<Navbar />
		</>
	);
}

export default Home;
