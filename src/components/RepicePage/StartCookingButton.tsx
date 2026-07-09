import { Link } from "react-router-dom";

type StartCookingButtonProps = {
    id: string;
};

function StartCookingButton({ id }: StartCookingButtonProps) {
    return (
        <div className="p-8">
            <Link
                to={`/recipe/${id}/cooking`}
                className="btn btn-block btn-primary btn-xl"
            >
                Lancer la recette
            </Link>
        </div>
    );
}

export default StartCookingButton;
