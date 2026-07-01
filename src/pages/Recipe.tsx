import { useParams } from "react-router";

function Recipe() {
	const { id } = useParams();

	return (
		<>
			<h1>Hello from Recipe {id}</h1>
		</>
	);
}

export default Recipe;
