import { Heart, Leaf, Star, TimerIcon } from "lucide-react";

function RecipeCard() {
	return (
		<section className=" flex m-4 ">
			<img
				className="w-6/12 rounded-l-box border-primary"
				src="./InspecteurGuidget.png"
				alt=""
			/>
			<article className="w-6/12 flex flex-col p-4 border rounded-r-box bg-surface border-primary">
				<Heart className=" self-end m-4" />
				<h3 className="pb-4 font-bold text-2xl ">
					Nom du plat sur deux lignes
				</h3>
				<div className="w-full flex justify-around py-4">
					<Leaf color="#7A9E7E" />
					<Star color="gold" />
				</div>
				<div className="flex justify-around py-8">
					<TimerIcon />
					<p> X min</p>
				</div>
			</article>
		</section>
	);
}

export default RecipeCard;
