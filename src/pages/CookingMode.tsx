import { useEffect, useState } from "react";
import { useParams } from "react-router";

type RecipeStep = {
	number: number;
	step: string;
	length?: { number: number; unit: string };
};
type CookingRecipe = {
	title: string;
	analyzedInstructions: { steps: RecipeStep[] }[];
};

function CookingMode() {
	const { id } = useParams();
	const [recipe, setRecipe] = useState<CookingRecipe>();

	useEffect(() => {
		const myApiKey = import.meta.env.VITE_API_URL;

		fetch(
			`https://api.spoonacular.com/recipes/${id}/information?apiKey=${myApiKey}`,
		)
			.then((response) => response.json())
			.then((data) => setRecipe(data));
	}, [id]);

	return (
		<>
			<h1>Mode cuisine — recette {id}</h1>;
		</>
	);
}

export default CookingMode;
