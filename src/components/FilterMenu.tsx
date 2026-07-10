import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import type { Filters } from "../Type2";
import type { Dispatch, SetStateAction } from "react";

interface FilterMenuProps {
	filters: Filters;
	setFilters: Dispatch<SetStateAction<Filters>>;
}

function FilterMenu({ filters, setFilters }: FilterMenuProps) {
	const [isOpen, setIsOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(event: MouseEvent) {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);

		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, []);

	return (
		<>
			<div ref={menuRef} className="dropdown dropdown-end">
				<button
					type="button"
					className="btn"
					onClick={() => setIsOpen(!isOpen)}
				>
					<Menu />
				</button>
				{isOpen && (
					<div>
						<ul className=" absolute right-0 mt-2 w-[90vw] sm:w-80 max-w-sm p-4 sm:p-5 bg-surface border border-primary/20 rounded-box shadow-xl z-5 space-y-4">
							<li>
								<h2 className=" text-center pb-4 font-heading text-lg text-primary font-semibold">
									Filtres
								</h2>
								<hr className="border-base-300" />
								<p className=" py-4 font-heading text-lg text-primary font-semibold">
									Régime
								</p>

								<select
									className="select select-bordered w-full border-primary/20"
									value={filters.diet}
									onChange={(e) =>
										setFilters({
											...filters,
											diet: e.target.value,
										})
									}
								>
									<option value="">Aucun</option>
									<option value="vegetarian">Végétarien</option>
									<option value="vegan">Vegan</option>
									<option value="gluten free">Sans gluten</option>
									<option value="ketogenic">Cétogène</option>
									<option value="pescetarian">Pescétarien</option>
									<option value="paleo">Paléo</option>
								</select>
							</li>
							<li>
								<p className=" py-4 font-heading text-lg text-primary font-semibold">
									Intolérances
								</p>

								<select
									className="select select-bordered w-full border-primary/20"
									value={filters.intolerances}
									onChange={(e) =>
										setFilters({
											...filters,
											intolerances: e.target.value,
										})
									}
								>
									<option value="">Aucune</option>
									<option value="dairy">Lactose</option>
									<option value="egg">Œufs</option>
									<option value="gluten">Gluten</option>
									<option value="peanut">Arachides</option>
									<option value="sesame">Sésame</option>
									<option value="soy">Soja</option>
									<option value="tree nut">Fruits à coque</option>
									<option value="seafood">Fruits de mer</option>
								</select>
							</li>
							<li>
								<div className="flex flex-col sm:flex-row gap-3 pt-2">
									<button
										type="button"
										className="btn btn-outline btn-secondary"
										onClick={() => {
											setFilters({
												diet: "",
												intolerances: "",
											});
										}}
									>
										Reset
									</button>

									<button
										type="button"
										className="btn btn-secondary"
										onClick={() => setIsOpen(false)}
									>
										Apply
									</button>
								</div>
							</li>
						</ul>
					</div>
				)}
			</div>
		</>
	);
}
export default FilterMenu;
