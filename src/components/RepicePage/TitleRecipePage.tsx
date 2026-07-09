import { ChefHat, Star, Timer } from "lucide-react"
import type Recipe from "../../types/recipe.types";

type HeroRecipePageProps = {
    recipe: Recipe;
};

function TitleRecipePage({ recipe }: HeroRecipePageProps) {
    const { title, readyInMinutes } = recipe;

    return(
        <section className="w-full">
            <h1 className="flex text-xl font-bold pl-4 text-text py-4">
                {title}
            </h1>
            <ul className="w-full flex text-sm">
                <li className="flex text-secondary items-center px-4">
                    <Timer />
                    <p className="px-2">{readyInMinutes} min</p>
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
        )
    }

export default TitleRecipePage