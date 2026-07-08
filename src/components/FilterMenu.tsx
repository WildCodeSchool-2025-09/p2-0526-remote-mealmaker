import { Menu } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function FilterMenu({ filters, setFilters }) {
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
							<h3 className="font-heading text-lg text-primary font-semibold">
								Filtres
							</h3>
							<hr className="border-base-300" />
							<li>
								<label className="label cursor-pointer">
									<span> Vegan </span>
									<input
										type="checkbox"
										className="checkbox checkbox-secondary"
										checked={filters.vegan}
										onChange={(e) =>
											setFilters({
												...filters,
												vegan: e.target.checked,
											})
										}
									/>
								</label>
							</li>
							<li>
								<label className="label cursor-pointer">
									<span> Healthy </span>
									<input
										type="checkbox"
										className="checkbox checkbox-secondary"
										checked={filters.healthy}
										onChange={(e) =>
											setFilters({
												...filters,
												healthy: e.target.checked,
											})
										}
									/>
								</label>
							</li>
							<li>
								<label className="label cursor-pointer">
									<span> Sport </span>
									<input
										type="checkbox"
										className="checkbox checkbox-secondary"
										checked={filters.sport}
										onChange={(e) =>
											setFilters({
												...filters,
												sport: e.target.checked,
											})
										}
									/>
								</label>
							</li>
							<hr className="border-base-300" />
							<li>
								<p className="font-heading text-lg text-primary font-semibold">
									Regime
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
									<option>None</option>
									<option>Vegetarian</option>
									<option>Gluten free</option>
								</select>
							</li>
							<li>
								<p className="font-heading text-lg text-primary font-semibold">
									Allergy
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
									<option>None</option>
									<option>Lactose</option>
									<option>Peanuts</option>
								</select>
							</li>
							<li>
								<div className="flex flex-col sm:flex-row gap-3 pt-2">
									<button
										type="button"
										className="btn btn-outline btn-secondary"
										onClick={() => {
											setFilters({
												vegan: false,
												healthy: false,
												sport: false,
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
