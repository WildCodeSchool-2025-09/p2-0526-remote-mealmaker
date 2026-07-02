import GetRecipes from "../components/GetRecipes";
import Header from "../components/Header";
import Hero from "../components/Hero";
import IngredientsList from "../components/IngredientsList";
import RecipeCard from "../components/RecipeCard";
import SearchBar from "../components/SearchBar";
import Navbar from "../components/NavBar";

function Home() {
	return (
		<>
			<Header />
			<Hero />
			<section className="flex flex-col p-8 gap-4">
				<SearchBar />
				<IngredientsList />
				<GetRecipes />
			</section>
			<section className="p-8">
				<article>
					<h2 className="mt-8 font-bold text-2xl">Entrée du moment</h2>
					<RecipeCard />
				</article>
				<article>
					<h2 className="mt-8 font-bold text-2xl">Plat du moment</h2>
					<RecipeCard />
				</article>
				<article>
					<h2 className="mt-8 font-bold text-2xl">Dessert du moment</h2>
					<RecipeCard />
				</article>
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
