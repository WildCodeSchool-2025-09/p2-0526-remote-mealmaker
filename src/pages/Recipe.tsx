import { useParams } from "react-router";
import Navbar from "../components/NavBar";
import Header from "../components/Header";

import HeroRecipePage from '../components/RepicePage/HeroRecipePage';
import TitleRecipePage from '../components/RepicePage/TitleRecipePage';
import CarouselRecipePage from '../components/RepicePage/CarouselRecipePage';
import IngredientsRecipePage from '../components/RepicePage/IngredientsRecipePage';
import StartCookingButton from '../components/RepicePage/StartCookingButton';
import useRecipeById from "../hooks/useRecipeById";


function Recipe() {
	const { id } = useParams();
	const { recipe } = useRecipeById(id);

	if (!id) {
		return null;
	}

	if (!recipe) {
		return <p>Chargement...</p>;
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
