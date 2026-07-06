import { useParams } from "react-router";

function CookingMode() {
	const { id } = useParams();

	return (
		<>
			<h1>Mode cuisine — recette {id}</h1>;
		</>
	);
}

export default CookingMode;
