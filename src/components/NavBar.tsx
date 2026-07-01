import { NavLink } from "react-router-dom";

function Navbar() {
	return (
		<nav>
			<ul className="flex gap-6 p-4">
				<button type="button" className="btn btn-primary">
					<NavLink to="/">Home</NavLink>
				</button>
				<button type="button" className="btn btn-primary">
					<NavLink to="/recipe/42">Recipe</NavLink>
				</button>
				<button type="button" className="btn btn-primary">
					<NavLink to="/recipelive">Recipe live</NavLink>
				</button>
				<button type="button" className="btn btn-primary">
					<NavLink to="/favorite">Favorite</NavLink>
				</button>
				<button type="button" className="btn btn-primary">
					<NavLink to="/themepreview">Theme preview</NavLink>
				</button>
			</ul>
		</nav>
	);
}

export default Navbar;
