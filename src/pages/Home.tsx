import { Heart, House, Search } from "lucide-react";
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
			<nav className="fixed bottom-0 right-0 left-0 mx-8 p-4 border-2 border-primary rounded-2xl bg-surface ">
				<ul className="flex justify-around ">
					<li className="text-center">
						<House className="text-primary m-auto size-8" />
						<p className="text-primary font-bold">Accueil</p>
					</li>
					<li className="text-center">
						<Search className="text-secondary m-auto size-8" />
						<p className="text-secondary font-bold">Recherche</p>
					</li>
					<li className="text-center">
						<Heart className="text-secondary m-auto size-8" />
						<p className="text-secondary font-bold">Favoris</p>
					</li>
				</ul>
			</nav>
		</>
	);
}

export default Home;
