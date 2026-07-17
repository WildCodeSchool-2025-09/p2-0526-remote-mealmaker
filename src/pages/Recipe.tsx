import { useParams } from "react-router";
import Navbar from "../components/NavBar";
import Header from "../components/Header";

import HeroRecipePage from "../components/RepicePage/HeroRecipePage";
import TitleRecipePage from "../components/RepicePage/TitleRecipePage";
import CarouselRecipePage from "../components/RepicePage/CarouselRecipePage";
import IngredientsRecipePage from "../components/RepicePage/IngredientsRecipePage";
import StartCookingButton from "../components/RepicePage/StartCookingButton";
import useRecipeById from "../hooks/useRecipeById";
import { useSearch } from "../components/contexts/SearchContext";

function Recipe() {
	const { id } = useParams();
	const { recipes } = useSearch();
	const cachedRecipe =
		recipes.find(
			(item) => item.id === Number(id) && item.analyzedInstructions?.length,
		) ?? null;
	const { recipe } = useRecipeById(Number(id), cachedRecipe);

	if (!id) {
		return null;
	}

	if (!recipe) {
		return <p>Loading...</p>;
	}

	return (
		<>
			<Header />
			<HeroRecipePage recipe={recipe} />
			<TitleRecipePage recipe={recipe} />
			<CarouselRecipePage recipe={recipe} />
			<IngredientsRecipePage recipe={recipe} />
			<StartCookingButton id={id} />
			<Navbar />
		</>
	);
}

export default Recipe;
