import parse from 'html-react-parser';
import type Recipe from "../../types/recipe.types";
import type { Step } from "../../types/recipe.types";

type CarouselRecipePageProps = {
    recipe: Recipe;
};

function CarouselRecipePage({ recipe }: CarouselRecipePageProps) {

    const RecipeStep: Step[] = recipe.analyzedInstructions[0].steps;
	const Summary = recipe.summary;

    return (
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
                <div id="item1" className="carousel-item w-full flex flex-col">
                    {parse(Summary)}
                </div>
                <div id="item2" className="carousel-item w-full">
                    <ul className="flex w-full gap-2">
                        {RecipeStep.map((steplist) =>
                            <li className="bg-primary" key={steplist.number}>
                                <h3>{steplist.ingredients[0]?.name}</h3>
                                <img src={`https://img.spoonacular.com/ingredients_100x100/${steplist.ingredients[0]?.image}`} alt="" />
                            </li>
                        )}
                    </ul>
                </div>
                <div id="item3" className="carousel-item w-full">
                    <ul className="flex flex-col gap-2">
                        {RecipeStep.map((steplist) =>
                            <li className="bg-primary" key={steplist.number}>
                                {steplist.step}
                            </li>
                        )}
                    </ul>
                </div>
            </article>
        </section>
    );
}

export default CarouselRecipePage