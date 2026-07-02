import { House, Search, Heart } from "lucide-react";
import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<nav className="fixed bottom-0 right-0 left-0 mx-8 p-4 border-2 border-primary rounded-2xl bg-surface ">
			<ul className="flex justify-around ">
				<li className="text-center">
					<NavLink to="/">
						<House className="text-primary m-auto size-8" />
						<p className="text-primary font-bold">Accueil</p>
					</NavLink>
				</li>
				<li className="text-center">
					<Search className="text-secondary m-auto size-8" />
					<p className="text-secondary font-bold">Recherche</p>
				</li>
				<li className="text-center">
					<NavLink to="/favorite">
						<Heart className="text-secondary m-auto size-8" />
						<p className="text-secondary font-bold">Favoris</p>
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default Navbar;
