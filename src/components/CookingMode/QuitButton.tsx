import { useRef } from "react";
import { useNavigate } from "react-router";

function QuitButton({ id }: { id: string | undefined }) {
	const navigate = useNavigate();
	const quitModalRef = useRef<HTMLDialogElement>(null);

	return (
		<>
			<button
				type="button"
				className="btn btn-primary self-end mb-4 py-5"
				onClick={() => quitModalRef.current?.showModal()}
			>
				Quit Cooking mode
			</button>
			<dialog ref={quitModalRef} className="modal">
				<div className="modal-box text-base-content">
					<h3 className="font-bold text-lg">Quit cooking mode ?</h3>
					<p className="py-4">
						Your progress through the steps will not be saved.
					</p>
					<div className="modal-action">
						<button
							type="button"
							className="btn"
							onClick={() => quitModalRef.current?.close()}
						>
							Cancel
						</button>
						<button
							type="button"
							className="btn btn-error"
							onClick={() => navigate(`/recipe/${id}`)}
						>
							Quit
						</button>
					</div>
				</div>
			</dialog>
		</>
	);
}

export default QuitButton;
