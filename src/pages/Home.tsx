import GetRecipes from "../components/GetRecipes";
import Header from "../components/Header";
import Hero from "../components/Hero";
import IngredientsList from "../components/IngredientsList";
import RecipeCard from "../components/RecipeCard";
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
			<section>
				<article>
					<h2 className=" mt-8 mx-4 font-bold text-2xl">Entrée du moment</h2>
					<RecipeCard />
				</article>
				<article>
					<h2 className=" mt-8 mx-4 font-bold text-2xl">Plat du moment</h2>{" "}
					<RecipeCard />
				</article>
				<article>
					<h2 className=" mt-8 mx-4 font-bold text-2xl">Dessert du moment</h2>{" "}
					<RecipeCard />
				</article>
			</section>
		</>
	);
}

export default Home;
