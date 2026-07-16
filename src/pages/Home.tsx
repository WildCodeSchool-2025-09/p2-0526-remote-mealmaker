import GetRecipes from "../components/GetRecipes";
import Header from "../components/Header";
import Hero from "../components/Hero";
import IngredientsList from "../components/IngredientsList";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/NavBar";
import { useSearch } from "../components/contexts/SearchContext";

function Home() {
	const {
		selectedIngredients,
		addIngredient,
		removeIngredient,
		filters,
		setFilters,
	} = useSearch();

	return (
		<>
			<Header />
			<Hero />
			<section className="flex flex-col p-8 gap-4">
				<SearchBar
					onAddIngredient={addIngredient}
					filters={filters}
					setFilters={setFilters}
				/>
				<hr className="border-base-300" />
				<IngredientsList
					ingredients={selectedIngredients}
					onRemoveIngredient={removeIngredient}
				/>
				<GetRecipes
					selectedIngredients={selectedIngredients}
					filters={filters}
				/>
			</section>
			<footer>
				<p className="m-4 text-center text-text-muted">Copyright &copy; 2026</p>
			</footer>
			<Navbar />
		</>
	);
}

export default Home;
