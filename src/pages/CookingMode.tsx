import { useState } from "react";
import { ChefHat } from "lucide-react";
import { useParams } from "react-router";
import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";
import useRecipeById from "../hooks/useRecipeById";
import QuitButton from "../components/CookingMode/QuitButton";
import ProgressBar from "../components/CookingMode/ProgressBar";
import TimerCookModule from "../components/CookingMode/TimerCookModule";

// import testRecipe from "../recipes.model.json";

function CookingMode() {
	const { id } = useParams();
	const { recipe } = useRecipeById(Number(id));
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [recipeCompleted, setRecipeCompleted] = useState(false);

	const steps = recipe?.analyzedInstructions[0]?.steps ?? [];

	if (!recipe) {
		return <p>Chargement...</p>;
	}

	if (steps.length === 0) {
		return <p>Le mode cuisine n'est pas disponible pour cette recette.</p>;
	}

	if (recipeCompleted) {
		return (
			<section className="min-h-screen flex flex-col items-center justify-center gap-6 p-8 text-center">
				<img
					src={recipe.image}
					alt={recipe.title}
					className="w-48 h-48 rounded-2xl object-cover"
				/>
				<div>
					<h1 className="text-2xl font-heading font-bold">Bon appétit !</h1>
					<p className="text-lg">Tu as terminé la recette</p>
				</div>
				<Link to={`/recipe/${id}`} className="btn btn-primary btn-xl w-full">
					Revenir à la recette
				</Link>
				<Link to="/" className="btn btn-outline btn-primary btn-xl w-full">
					Retour à l'accueil
				</Link>
			</section>
		);
	}
	const currentStep = steps[currentStepIndex];
	const previousStep = () => {
		setCurrentStepIndex((actualIndex) => actualIndex - 1);
	};
	const nextStep = () => {
		setCurrentStepIndex((actualIndex) => actualIndex + 1);
	};
	const handleNextOrFinish = () => {
		if (currentStepIndex === steps.length - 1) {
			setRecipeCompleted(true);
		} else {
			nextStep();
		}
	};

	return (
		<section className="min-h-screen flex flex-col p-8 bg-[#5e4b00] bg-[url('/bg-wood.png')] text-neutral-content">
			<QuitButton id={Number(id)} />

			<article>
				<h1 className="text-3xl font-heading font-bold">{recipe?.title}</h1>

				<ProgressBar
					currentStep={currentStep}
					steps={steps}
					currentStepIndex={currentStepIndex}
				/>

				<div className="flex flex-wrap gap-2 py-4">
					{currentStep.ingredients.length > 0 ? (
						currentStep.ingredients.map((ingredient) => (
							<img
								key={`${ingredient.id}-${ingredient.name}`}
								src={`https://img.spoonacular.com/ingredients_100x100/${ingredient.image}`}
								alt={ingredient.name}
								className="w-24 h-24 rounded-lg object-contain p-2 border-2 border-sage bg-base-200"
							/>
						))
					) : (
						<div className="w-24 h-24 rounded-lg bg-base-200 flex items-center justify-center border-2 border-sage">
							<ChefHat className="w-24 h-24 text-secondary" />
						</div>
					)}
				</div>

				<TimerCookModule currentStep={currentStep} />

				<p className="text-lg leading-relaxed mt-4">{currentStep.step}</p>
			</article>
			<article className="mt-auto flex gap-4 mb-4">
				<button
					type="button"
					className="btn btn-primary shadow-xl/20 btn-xl flex-1"
					onClick={previousStep}
					disabled={currentStepIndex === 0}
				>
					Précédent
				</button>
				<button
					type="button"
					className="btn btn-primary shadow-xl/20 btn-xl flex-1"
					onClick={handleNextOrFinish}
				>
					{currentStepIndex === steps.length - 1 ? "Terminer" : "Suivant"}
				</button>
			</article>
			<div className="h-16"> </div>
			<Navbar />
		</section>
	);
}

export default CookingMode;
