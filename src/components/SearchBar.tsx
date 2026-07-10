import { Search } from "lucide-react";
import { useState } from "react";
import FilterMenu from "./FilterMenu";
import type { Ingredient, Filters } from "../Type2";
import type { Dispatch, SetStateAction } from "react";

type QuickIngredient = Ingredient & { label: string };

const commonIngredients: QuickIngredient[] = [
	{
		id: 1001,
		name: "butter",
		label: "Beurre",
		image: "https://img.spoonacular.com/ingredients_100x100/butter-sliced.jpg",
	},
	{
		id: 4053,
		name: "olive oil",
		label: "Huile d'olive",
		image: "https://img.spoonacular.com/ingredients_100x100/olive-oil.jpg",
	},
	{
		id: 1077,
		name: "milk",
		label: "Lait",
		image: "https://img.spoonacular.com/ingredients_100x100/milk.png",
	},
	{
		id: 19335,
		name: "sugar",
		label: "Sucre",
		image: "https://img.spoonacular.com/ingredients_100x100/sugar-in-bowl.png",
	},
	{
		id: 1123,
		name: "egg",
		label: "Œufs",
		image: "https://img.spoonacular.com/ingredients_100x100/egg.png",
	},
	{
		id: 20081,
		name: "wheat flour",
		label: "Farine de blé",
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

	function handleSearch() {
		if (!query) return;

		const myApiKey = import.meta.env.VITE_API_URL;

		fetch(
			`https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&metaInformation=true&apiKey=${myApiKey}`,
		)
			.then((response) => response.json())
			.then((results: AutocompleteResult[]) => {
				const match = results.find(
					(item) => item.name.toLowerCase() === query.toLowerCase(),
				);

				if (!match) {
					setError("Ingrédient introuvable");
					return;
				}

				setError("");
				onAddIngredient({
					id: match.id,
					name: match.name,
					image: `https://img.spoonacular.com/ingredients_100x100/${match.image}`,
				});
				setQuery("");
			});
	}

	function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === "Enter") {
			handleSearch();
		}
	}

	function handleQuickAdd(ingredient: QuickIngredient) {
		onAddIngredient({
			id: ingredient.id,
			name: ingredient.name,
			image: ingredient.image,
		});
	}

	return (
		<section className="w-full flex flex-col gap-1 mt-4">
			<div className="w-full flex justify-between items-center gap-2">
				<label className="input w-full bg-surface border border-solid border-primary">
					<Search />
					<input
						type="search"
						required
						placeholder="Recherche un ingrédient..."
						className="input"
						value={query}
						onChange={(event) => setQuery(event.target.value)}
						onKeyDown={handleKeyDown}
					/>
				</label>
				<FilterMenu filters={filters} setFilters={setFilters} />
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
		</section>
	);
}
export default SearchBar;
