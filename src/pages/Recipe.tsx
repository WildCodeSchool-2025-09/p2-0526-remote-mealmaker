import { useParams } from "react-router";
import Navbar from "../components/NavBar";
import Header from "../components/Header";
import {
	Apple,
	ArrowLeft,
	ChefHat,
	Drumstick,
	Hamburger,
	Heart,
	Popcorn,
	Star,
	Timer,
} from "lucide-react";
import { useEffect, useState } from "react";

function Recipe() {
	const { id } = useParams();
	const [recipe, setRecipe] = useState(null);

	useEffect(() => {
		const myApiKey = import.meta.env.VITE_API_URL;

		fetch(
			`https://api.spoonacular.com/recipes/${id}/information?apiKey=${myApiKey}`,
		)
			.then((response) => response.json())
			.then((data) => {
				setRecipe(data);
			});
	}, [id]);

	if (!recipe) {
		return <p>Chargement...</p>;
	}

	return (
		<>
			<Header />
			<section className="w-full relative">
				<img src={recipe.image} alt="Test" className="w-full" />
				<ul className="w-full h-24 absolute top-0 flex justify-between p-4">
					<li className="text-surface">
						<ArrowLeft />
					</li>
					<li className="text-alert">
						{" "}
						<Heart />
					</li>
				</ul>
			</section>
			<section className="w-full">
				<h1 className="flex text-xl font-bold pl-4 text-text py-4">
					{recipe.title}
				</h1>
				<ul className="w-full flex text-sm">
					<li className="flex text-secondary items-center px-4">
						<Timer />
						<p className="px-2">{recipe.readyInMinutes} min</p>
					</li>
					<li className="flex text-brand-hover items-center px-4">
						<ChefHat />
						<p className="px-2">Facile</p>
					</li>
					<li className="flex text-yellow-400 items-center px-4">
						<Star />
						<p className="px-2">4.5/5</p>
					</li>
				</ul>
			</section>
			<section className="flex flex-col w-full px-4">
				<ul className="w-full flex justify-around py-4">
					<li className="min-h-8 text-center border-b-2 border-primary font-bold">
						<a href="#item1">Aperçu</a>
					</li>
					<li className="min-h-8 text-center font-bold">
						<a href="#item2">Ingrédients</a>
					</li>
					<li className="min-h-8 text-center font-bold">
						<a href="#item3"> Etapes</a>
					</li>
				</ul>
				<article className="carousel w-full">
					<p id="item1" className="carousel-item w-full">
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. orem Ipsum has been the industry's standard dummy text
						ever since 1966, when designers at Letraset and James Mosley, the
						librarian at St Bride Printing Library in London,
					</p>
					<p id="item2" className="carousel-item w-full">
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry.
					</p>
					<p id="item3" className="carousel-item w-full">
						Lorem Ipsum is simply dummy text of the printing and typesetting
						industry. orem Ipsum has been the industry's standard dummy text
						ever since 1966, when designers at Letraset and James Mosley, the
						librarian at St Bride Printing Library in London,
					</p>
				</article>
			</section>
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

			{/* <button className=" w-full flex justify-center rounded-sm text-surface bg-brand-hover ">Lancer la recette</button> */}

			<div className="w-full h-24"> </div>
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
