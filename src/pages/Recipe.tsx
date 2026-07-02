import { useParams } from "react-router";
import Navbar from "../components/NavBar";
import Header from "../components/Header";
import { Apple, ArrowLeft, ChefHat, Drumstick, Heart, Popcorn, Star, Timer } from "lucide-react";

function Recipe() {
	const { id } = useParams();

	return (
		<>
			<Header />
			<section className="w-full relative">
				<img src="https://picsum.photos/id/237/900/600" alt="Test" className="w-full" />
				<ul className="w-full h-24 absolute top-0 flex justify-between p-4">
					<li className="text-surface"><ArrowLeft /></li>
					<li className="text-alert"> <Heart /></li>
				</ul>
			</section>
			<section className="w-full">
				<h1 className="flex text-xl font-bold pl-4 text-text py-4">Nom de la recette</h1>
				<ul className="w-full flex text-sm">
					<li className="flex text-secondary items-center px-4">
						<Timer />
						<p className="px-2">30 min</p>
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
			<section className="w-full px-4">
				<ul className="w-full flex justify-around py-4">
					<li className="min-h-8 text-center border-b-2 border-primary font-bold">
						<a href="#item1">Aperçu</a>
					</li>
					<li className="min-h-8 text-center font-bold">
						<a href="#item2">Ingrédients</a>
					</li>
					<li className="min-h-8 text-center font-bold">
						<a href="#item3"> Etapes
						</a>
					</li>
				</ul>
				<article className="carousel w-full">
					<p id="item1" className="carousel-item w-full">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry.
						orem Ipsum has been the industry's standard dummy text ever since 1966,
						when designers at Letraset and James Mosley, the librarian at St Bride
						Printing Library in London,
					</p>
					<p id="item2" className="carousel-item w-full">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry.
						orem Ipsum has been the industry's standard dummy text ever since 1966,
						when designers at Letraset and James Mosley, the librarian at St Bride
						Printing Library in London,
					</p>
					<p id="item3" className="carousel-item w-full">
						Lorem Ipsum is simply dummy text of the printing and typesetting industry.
						orem Ipsum has been the industry's standard dummy text ever since 1966,
						when designers at Letraset and James Mosley, the librarian at St Bride
						Printing Library in London,
					</p>
				</article>
			</section>
			<section>
				<h2>Ingrédients principaux</h2>
				<ul>
					<li><Drumstick /></li>
					<li><Popcorn /></li>
					<li><Apple /></li>
					<li><Hamburger /></li>
				</ul>
			</section>




			{/* <button className=" w-full flex justify-center rounded-sm text-surface bg-brand-hover ">Lancer la recette</button> */}

			<div className="w-full h-24"> </div>
			<Navbar />
		</>
	);
}

export default Recipe;
