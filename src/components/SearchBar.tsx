import { Menu, Search } from "lucide-react";

function SearchBar() {
	return (
		<section className="w-full flex justify-between items-center gap-2 mt-4 ">
			<label className="input w-full bg-surface border border-solid border-primary">
				<Search />
				<input
					type="search"
					required
					placeholder="Recherche un ingrédient..."
					className="input"
				/>
			</label>
			<Menu className="btn mr-2" />
		</section>
	);
}
export default SearchBar;
