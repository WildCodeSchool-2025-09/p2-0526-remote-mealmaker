import { Menu } from "lucide-react";
import { useState } from "react";

function FilterMenu({ filters, setFilters }) {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<>
			<div className="dropdown dropdown-end">
				<button
					type="button"
					className="btn"
					onClick={() => setIsOpen(!isOpen)}
				>
					<Menu />
				</button>
				{isOpen && (
					<div>
						<ul className="absolute right-0 mt-2 w-72 bg-surface border border-primary/20 rounded-box shadow-xl p-5 z-50 space-y-4">
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
								<p className="font-heading text-lg text-primary font-semibold">Regime</p>
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
									<option />
									<option>Vegetarian</option>
									<option>Gluten free</option>
								</select>
							</li>
							<li>
								<p className="font-heading text-lg text-primary font-semibold">Allergy</p>
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
									<option />
									<option>Lactose</option>
									<option>Peanuts</option>
								</select>
							</li>
							<li>
								<div className="flex justify-center gap-3 pt-2">
									<button
										type="button"
										className="btn btn-outline btn-secondary"
									>
										Reset
									</button>

									<button type="button" className="btn btn-secondary">
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
