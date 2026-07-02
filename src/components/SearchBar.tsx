import { Menu, Search } from "lucide-react";
import { useState } from "react";

function SearchBar({ onAddIngredient }) {
	const [query, setQuery] = useState("");
	const [error, setError] = useState("");

	function handleSearch() {
		if (!query) return;

		const myApiKey = import.meta.env.VITE_API_URL;

		fetch(
			`https://api.spoonacular.com/food/ingredients/autocomplete?query=${query}&metaInformation=true&apiKey=${myApiKey}`,
		)
			.then((response) => response.json())
			.then((results) => {
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

	function handleKeyDown(event) {
		if (event.key === "Enter") {
			handleSearch();
		}
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
				<Menu className="btn mr-2" />
			</div>
			{error && <p className="text-error text-sm pl-2">{error}</p>}
		</section>
	);
}
export default SearchBar;
