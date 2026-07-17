import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { Filters, Ingredient } from "../types/recipe.types";
import RecipeFilters from "./RecipeFilters";

const MIN_QUERY_LENGTH = 3;
const AUTOCOMPLETE_DELAY = 2000;

const commonIngredients = [
	{
		id: 1001,
		name: "butter",
		label: "Butter",
		image: "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg",
	},
	{
		id: 4053,
		name: "olive oil",
		label: "Olive oil",
		image: "https://img.spoonacular.com/ingredients_100x100/olive-oil.jpg",
	},
	{
		id: 1077,
		name: "milk",
		label: "Milk",
		image: "https://img.spoonacular.com/ingredients_100x100/milk.png",
	},
	{
		id: 19335,
		name: "sugar",
		label: "Sugar",
		image: "https://img.spoonacular.com/ingredients_100x100/sugar-in-bowl.png",
	},
	{
		id: 1123,
		name: "egg",
		label: "Egg",
		image: "https://img.spoonacular.com/ingredients_100x100/egg.png",
	},
	{
		id: 20081,
		name: "wheat flour",
		label: "Wheat flour",
		image: "https://img.spoonacular.com/ingredients_100x100/flour.png",
	},
];

type AutocompleteResult = {
	id: number;
	name: string;
	image: string;
};

type SearchBarProps = {
	onAddIngredient: (ingredient: Ingredient) => void;
	filters: Filters;
	setFilters: Dispatch<SetStateAction<Filters>>;
};

function SearchBar({ onAddIngredient, filters, setFilters }: SearchBarProps) {
	const [query, setQuery] = useState("");
	const [error, setError] = useState("");
	const [suggestions, setSuggestions] = useState<AutocompleteResult[]>([]);

	useEffect(() => {
		if (query.trim().length < MIN_QUERY_LENGTH) {
			setSuggestions([]);
			return;
		}

		const myApiKey = import.meta.env.VITE_API_URL;

		const debounceId = setTimeout(() => {
			fetch(
				`https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&metaInformation=true&apiKey=${myApiKey}`,
			)
				.then((response) => response.json())
				.then((results: AutocompleteResult[]) => {
					setSuggestions(results);
				});
		}, AUTOCOMPLETE_DELAY);

		return () => clearTimeout(debounceId);
	}, [query]);

	function handleSelectSuggestion(suggestion: AutocompleteResult) {
		onAddIngredient({
			id: suggestion.id,
			name: suggestion.name,
			image: `https://img.spoonacular.com/ingredients_100x100/${suggestion.image}`,
		});
		setError("");
		setQuery("");
		setSuggestions([]);
	}

	function handleSearch() {
		if (!query) return;

		const myApiKey = import.meta.env.VITE_API_URL;

		fetch(
			`https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&metaInformation=true&apiKey=${myApiKey}`,
		)
			.then((response) => response.json())
			.then((results) => {
				const match = results.find(
					(item: AutocompleteResult) =>
						item.name.toLowerCase() === query.toLowerCase(),
				);

				if (!match) {
					setError("IngrÃ©dient introuvable");
					return;
				}

				setError("");
				onAddIngredient({
					id: match.id,
					name: match.name,
					image: `https://img.spoonacular.com/ingredients_100x100/${match.image}`,
				});
				setQuery("");
				setSuggestions([]);
			});
	}

	function handleKeyDown(event: { key: string }) {
		if (event.key === "Enter") {
			handleSearch();
		}
	}

	function handleQuickAdd(ingredient: Ingredient) {
		onAddIngredient({
			id: ingredient.id,
			name: ingredient.name,
			image: ingredient.image,
		});
	}

	return (
		<section className="w-full flex flex-col gap-1">
			<div className="w-full relative flex flex-col justify-between items-center gap-2">
				<label className="input w-full bg-surface border border-solid border-primary">
					<Search />
					<input
						type="search"
						required
						placeholder="Search ingredients..."
						className="input"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						onKeyDown={handleKeyDown}
					/>
				</label>
				{suggestions.length > 0 && (
					<ul className="absolute top-full left-0 z-10 mt-1 w-full max-h-60 overflow-y-auto list-none p-0 bg-surface border border-solid border-primary rounded-box shadow-lg">
						{suggestions.map((suggestion) => (
							<li key={suggestion.id}>
								<button
									type="button"
									className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-primary/10"
									onClick={() => handleSelectSuggestion(suggestion)}
								>
									<img
										src={`https://img.spoonacular.com/ingredients_100x100/${suggestion.image}`}
										alt=""
										className="size-4"
									/>
									{suggestion.name}
								</button>
							</li>
						))}
					</ul>
				)}
			</div>
			{error && <p className="text-error text-sm pl-2">{error}</p>}

			<ul className="flex flex-wrap gap-2 mt-2 list-none p-0">
				{commonIngredients.map((ingredient) => (
					<li key={ingredient.id}>
						<button
							type="button"
							className="btn btn-sm btn-secondary border-secondary hover:bg-transparent hover:text-secondary"
							onClick={() => handleQuickAdd(ingredient)}
						>
							<img src={ingredient.image} alt="" className="size-4" />
							{ingredient.label}
						</button>
					</li>
				))}
			</ul>
			<RecipeFilters filters={filters} setFilters={setFilters} />
		</section>
	);
}
export default SearchBar;
