import logo from "../assets/img/Logo.png"

function Header() {
	return (
		<header className="w-full p-4">
			<img className="w-7/12" src={logo} alt="logo" />
		</header>
	);
}
export default Header;
