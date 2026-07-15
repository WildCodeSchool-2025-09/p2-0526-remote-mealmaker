import type { Dispatch, SetStateAction } from "react";
import type { Filters } from "../types/recipe.types";
import { ChevronDown, ChevronRight } from "lucide-react";
import { useState } from "react";

interface RecipeFiltersProps {
	filters: Filters;
	setFilters: Dispatch<SetStateAction<Filters>>;
}

const dietOptions = [
	{ value: "vegetarian", label: "Vegetarian" },
	{ value: "vegan", label: "Vegan" },
	{ value: "gluten free", label: "Gluten Free" },
	{ value: "ketogenic", label: "Ketogenic" },
	{ value: "pescetarian", label: "Pescetarian" },
	{ value: "paleo", label: "Paleo" },
];

const intoleranceOptions = [
	{ value: "dairy", label: "Dairy" },
	{ value: "egg", label: "Egg" },
	{ value: "gluten", label: "Gluten" },
	{ value: "peanut", label: "Peanut" },
	{ value: "sesame", label: "Sesame" },
	{ value: "soy", label: "Soy" },
	{ value: "tree nut", label: "Tree Nut" },
	{ value: "seafood", label: "Seafood" },
];

function RecipeFilters({ filters, setFilters }: RecipeFiltersProps) {
	const [dietOpen, setDietOpen] = useState(false);
	const [intolerancesOpen, setIntolerancesOpen] = useState(false);

	function toggleIntolerance(value: string) {
		if (filters.intolerances.includes(value)) {
			setFilters({
				...filters,
				intolerances: filters.intolerances.filter((item) => item !== value),
			});
		} else {
			setFilters({
				...filters,
				intolerances: [...filters.intolerances, value],
			});
		}
	}

	return (
		<section className="mt-3 flex flex-col gap-4">
			{/* Diet */}
			<div className="border-b border-base-300 pb-2">
				<button
					type="button"
					onClick={() => setDietOpen(!dietOpen)}
					className="w-full flex items-center justify-between py-2"
				>
					<span className="font-semibold text-primary">Diet</span>

					{dietOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
				</button>
				{dietOpen && (
					<div className="flex flex-wrap gap-2">
						{dietOptions.map((diet) => (
							<button
								key={diet.value}
								type="button"
								onClick={() =>
									setFilters({
										...filters,
										diet: filters.diet === diet.value ? "" : diet.value,
									})
								}
								className={`btn btn-sm rounded-full transition-all
								${filters.diet === diet.value
										? "btn-primary"
										: "btn-outline btn-primary"
									}`}
							>
								{diet.label}
							</button>
						))}
					</div>
				)}
			</div>

			{/* Intolerances */}
			<div>
				<button
					type="button"
					onClick={() => setIntolerancesOpen(!intolerancesOpen)}
					className="w-full flex items-center justify-between py-2"
				>
					<span className="font-semibold text-primary">Intolerances</span>

					{intolerancesOpen ? (
						<ChevronDown size={18} />
					) : (
						<ChevronRight size={18} />
					)}
				</button>
				{intolerancesOpen && (
					<div className="flex flex-wrap gap-2">
						{intoleranceOptions.map((option) => (
							<button
								key={option.value}
								type="button"
								onClick={() => toggleIntolerance(option.value)}
								className={`btn btn-sm rounded-full transition-all
								${filters.intolerances.includes(option.value)
										? "btn-secondary"
										: "btn-outline btn-secondary"
									}`}
							>
								{option.label}
							</button>
						))}
					</div>
				)}
			</div>
		</section>
	);
}

export default RecipeFilters;
