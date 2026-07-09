import { ArrowLeft, Heart } from "lucide-react"
import type Recipe from "../../types/recipe.types";

type HeroRecipePageProps = {
    recipe: Recipe;
};

function HeroRecipePage({ recipe }: HeroRecipePageProps) {
    const { image } = recipe;

    return(
        <section className="w-full relative">
            <img src={image} alt="Test" className="w-full" />
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
    )
}

export default HeroRecipePage