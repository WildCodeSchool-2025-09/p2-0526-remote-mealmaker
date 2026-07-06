import { Menu } from "lucide-react";
import { useState } from "react";

function FilterMenu() {
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
									<input type="checkbox" className="checkbox checkbox-secondary" />
								</label>
							</li>
							<li>
								<label className="label cursor-pointer">
									<span> Healthy </span>
									<input type="checkbox" className="checkbox checkbox-secondary" />
								</label>
							</li>
							<li>
								<label className="label cursor-pointer">
									<span> Sport </span>
									<input type="checkbox" className="checkbox checkbox-secondary" />
								</label>
							</li>
                            <hr className="border-base-300" />
							<li>
								<select className="select select-bordered w-full border-primary/20">
									<option>Regime</option>
									<option>Vegetarian</option>
									<option>Gluten free</option>
								</select>
							</li>
							<li>
								<select className="select select-bordered w-full border-primary/20">
									<option>Allergy</option>
									<option>Lactose</option>
								</select>
							</li>
						</ul>
					</div>
				)}
			</div>
		</>
	);
}
export default FilterMenu;
