import { useEffect, useRef, useState } from "react";
import { ChefHat } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import Navbar from "../components/NavBar";
import { Link } from "react-router-dom";
import testRecipe from "../recipes.model.json";

type RecipeIngredient = {
	id: number;
	name: string;
	image: string;
};

type RecipeStep = {
	number: number;
	step: string;
	length?: { number: number; unit: string };
	ingredients: RecipeIngredient[];
};

type CookingRecipe = {
	image: string | undefined;
	title: string;
	analyzedInstructions: { steps: RecipeStep[] }[];
};

function CookingMode() {
	const { id } = useParams();
	const [recipe, setRecipe] = useState<CookingRecipe>();
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	const [recipeCompleted, setRecipeCompleted] = useState(false);
	const navigate = useNavigate();
	const quitModalRef = useRef<HTMLDialogElement>(null);

	useEffect(() => {
		const myApiKey = import.meta.env.VITE_API_URL;

		fetch(
			`https://api.spoonacular.com/recipes/${id}/information?apiKey=${myApiKey}`,
		)
			.then((response) => response.json())
			.then((data) => setRecipe(data));
		// setRecipe(testRecipe as CookingRecipe);
	}, [id]);

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
			<button
				type="button"
				className="btn btn-primary self-end mb-4 py-5"
				onClick={() => quitModalRef.current?.showModal()}
			>
				Quitter le mode cuisine
			</button>
			<dialog ref={quitModalRef} className="modal">
				<div className="modal-box text-base-content">
					<h3 className="font-bold text-lg">Quitter le mode cuisine ?</h3>
					<p className="py-4">
						Ta progression dans les étapes ne sera pas conservée.
					</p>
					<div className="modal-action">
						<button
							type="button"
							className="btn"
							onClick={() => quitModalRef.current?.close()}
						>
							Annuler
						</button>
						<button
							type="button"
							className="btn btn-error"
							onClick={() => navigate(`/recipe/${id}`)}
						>
							Quitter
						</button>
					</div>
				</div>
			</dialog>

			<article>
				<h1 className="text-3xl font-heading font-bold">{recipe?.title}</h1>
				<p className="mt-8 text-xl font-bold">
					Étape {currentStep.number} / {steps.length}
				</p>
				<progress
					className="progress w-full mt-2 mb-8 [&::-webkit-progress-bar]:bg-neutral-content/20 [&::-webkit-progress-value]:bg-neutral-content [&::-moz-progress-bar]:bg-neutral-content"
					value={currentStepIndex + 1}
					max={steps.length}
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
