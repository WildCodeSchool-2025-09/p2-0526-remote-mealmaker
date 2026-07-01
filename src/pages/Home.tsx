import { Menu, Search } from "lucide-react";
import Header from "../components/Header";
import Hero from "../components/Hero";

function Home() {
	return (
		<>
			<Header />
			<Hero />
			<section className="w-full flex justify-center items-center gap-2 mt-4 px-4">
				<label className="input bg-surface border border-solid border-primary">
					<Search />
					<input
						type="search"
						required
						placeholder="Recherche un ingrédient..."
						className="input"
					/>
				</label>

				<Menu />
			</section>
		</>
	);
}

export default Home;
