import { House, Search, Heart, Timer } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useLocation } from "react-router-dom";
import TimerCookModule from "./CookingMode/TimerCookModule";

function Navbar() {
	const { pathname } = useLocation();
	const isCooking = pathname.endsWith("/cooking");

	return (
		<>
			<div className="w-full h-24"> </div>
			<nav className="fixed bottom-0 right-0 left-0 mx-8 p-4 border-2 border-primary rounded-2xl bg-surface ">
				<ul className="flex justify-around ">
					<li className="text-center">
						<NavLink to="/">
							<House className="text-primary m-auto size-8" />
							<p className="text-primary font-bold">Home</p>
						</NavLink>
					</li>
					<li className="text-center">
						<Search className="text-secondary m-auto size-8" />
						<p className="text-secondary font-bold">Search</p>
					</li>
					<li className="text-center">
						{ !isCooking ? (
							<NavLink to="/favorite">
								<Heart className="text-secondary m-auto size-8" />
								<p className="text-secondary font-bold">Favorites</p>
							</NavLink>
							) : (
								<>
									<div onClick={() => {
										const dialog = document.getElementById('modal_timer') as HTMLDialogElement | null;
										dialog?.showModal();
									}}>
										<Timer className="text-secondary m-auto size-8" />
										<p className="text-secondary font-bold">Timer</p>
									</div>
									<dialog id="modal_timer" className="modal">
										<div className="modal-box">
											<TimerCookModule />
											<div className="modal-action">
												<form method="dialog">
												{/* if there is a button in form, it will close the modal */}
													<button className="btn">Close</button>
												</form>
											</div>
										</div>
										<form method="dialog" className="modal-backdrop">
											<button>close</button>
										</form>
									</dialog>
									
								</>
							)}
					</li>
				</ul>
			</nav>
		</>
	);
}

export default Navbar;
