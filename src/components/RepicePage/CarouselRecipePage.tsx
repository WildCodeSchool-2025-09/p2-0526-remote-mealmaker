import parse from "html-react-parser";
import { useState } from "react";
import type Recipe from "../../types/recipe.types";
import type { Step } from "../../types/recipe.types";
import IngredientImage from "./IngredientImage";

type CarouselRecipePageProps = {
	recipe: Recipe;
};

type CarouselItem = "item1" | "item2" | "item3";

function CarouselRecipePage({ recipe }: CarouselRecipePageProps) {
	const RecipeStep: Step[] = recipe.analyzedInstructions[0].steps;
	const Summary = recipe.summary;
	const [activeTab, setActiveTab] = useState<CarouselItem>("item1");

	const getTabClassName = (tab: CarouselItem) =>
		`min-h-8 text-center font-bold ${
			activeTab === tab ? "border-b-2 border-primary" : ""
		}`;

	const handleTabClick = (tab: CarouselItem) => {
		setActiveTab(tab);
		document.getElementById(tab)?.scrollIntoView({
			behavior: "smooth",
			inline: "start",
		});
	};

	return (
		<section className="flex flex-col w-full px-4">
			<ul className="w-full flex justify-around py-4">
				<li className={getTabClassName("item1")}>
					<button type="button" onClick={() => handleTabClick("item1")}>
						Aperçu
					</button>
				</li>
				<li className={getTabClassName("item2")}>
					<button type="button" onClick={() => handleTabClick("item2")}>
						Ingredients
					</button>
				</li>
				<li className={getTabClassName("item3")}>
					<button type="button" onClick={() => handleTabClick("item3")}>
						Steps
					</button>
				</li>
			</ul>
			<article className="carousel w-full">
				<div
					id="item1"
					className="carousel-item w-full flex flex-col gap-2 text-sm text-text leading-relaxed"
				>
					{parse(Summary)}
				</div>
				<div id="item2" className="carousel-item w-full">
					<ul className="flex w-full gap-4 overflow-x-auto">
						{RecipeStep.map((steplist) => (
							<li
								className="flex flex-col items-center gap-1 shrink-0 w-16"
								key={steplist.number}
							>
								<IngredientImage
									image={steplist.ingredients[0]?.image ?? ""}
									alt={steplist.ingredients[0]?.name ?? ""}
								/>
								<p className="text-xs text-text text-center">
									{steplist.ingredients[0]?.name}
								</p>
							</li>
						))}
					</ul>
				</div>
				<div id="item3" className="carousel-item w-full">
					<ol className="flex flex-col gap-4">
						{RecipeStep.map((steplist) => (
							<li className="flex gap-3 text-sm text-text" key={steplist.number}>
								<span className="font-bold text-primary">
									{steplist.number}.
								</span>
								<p>{steplist.step}</p>
							</li>
						))}
					</ol>
				</div>
			</article>
		</section>
	);
}

export default CarouselRecipePage;
