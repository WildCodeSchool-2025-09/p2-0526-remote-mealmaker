import { useParams } from "react-router";
import Navbar from "../components/NavBar";
import Header from "../components/Header";
import {
	Apple,
	Drumstick,
	Hamburger,
	Popcorn
} from "lucide-react";

import { Link } from "react-router-dom";
// import recipeModel from "../recipes.model.json";
// import type { Step } from "../types/recipe.types";
import HeroRecipePage from '../components/RepicePage/HeroRecipePage';
import TitleRecipePage from '../components/RepicePage/TitleRecipePage';
import CarouselRecipePage from '../components/RepicePage/CarouselRecipePage';
import useRecipeById from "../hooks/useRecipeById";


function Recipe() {
	const { id } = useParams();
	const { recipe } = useRecipeById(id);

	if (!recipe) {
		return <p>Chargement...</p>;
	}

	return (
		<>
			<Header />
			<HeroRecipePage recipe={recipe} />
			<TitleRecipePage recipe={recipe} />
			<CarouselRecipePage recipe={recipe} />

			
			<section>
				<h2>Ingrédients principaux</h2>
				<ul>
					<li>
						<Drumstick />
					</li>
					<li>
						<Popcorn />
					</li>
					<li>
						<Apple />
					</li>
					<li>
						<Hamburger />
					</li>
				</ul>
			</section>

			<div className="p-8">
				<Link
					to={`/recipe/${id}/cooking`}
					className="btn btn-block btn-primary btn-xl"
				>
					Lancer la recette
				</Link>
			</div>

			<Navbar />
		</>
	);
}

export default Recipe;

// {
//     "id": 4632,
//     "summary": "The recipe Soy-and-Ginger-Glazed Salmon with Udon Noodles can be made  <b>in approximately 1 hour and 35 minutes </b>. One portion of this dish contains about  <b>48g of protein </b>,  <b>17g of fat </b>, and a total of  <b>552 calories </b>. This recipe serves 4. For  <b>$5.91 per serving </b>, this recipe  <b>covers 47% </b> of your daily requirements of vitamins and minerals. It works well as a main course. 1 person has tried and liked this recipe. It is brought to you by Food and Wine. If you have fresh ginger, udon noodles, salmon fillets, and a few other ingredients on hand, you can make it. It is a good option if you're following a  <b>dairy free and pescatarian </b> diet. All things considered, we decided this recipe  <b>deserves a spoonacular score of 92% </b>. This score is great. If you like this recipe, take a look at these similar recipes: Salmon With Soy-ginger Noodles, Ginger-Soy Salmon With Soba Noodles, and Soy & ginger salmon with soba noodles.",
//     "title": "Soy-and-Ginger-Glazed Salmon with Udon Noodles"
// }
