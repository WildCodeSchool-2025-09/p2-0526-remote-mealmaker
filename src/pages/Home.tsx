import GetRecipes from "../components/GetRecipes";
import Header from "../components/Header";
import Hero from "../components/Hero";
import IngredientsList from "../components/IngredientsList";
import SearchBar from "../components/SearchBar";

function Home() {
	return (
		<>
			<Header />
			<Hero />
			<section className="flex flex-col">
				<SearchBar />
				<IngredientsList />
				<GetRecipes />
			</section>
		</>
	);
}

export default Home;
