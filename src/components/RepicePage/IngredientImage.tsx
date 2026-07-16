import { ChefHat } from "lucide-react";
import { useState } from "react";

type IngredientImageProps = {
	image: string;
	alt: string;
	size?: string;
};

const NO_IMAGE_FILENAMES = new Set(["no.jpg", "no.png"]);

function IngredientImage({
	image,
	alt,
	size = "size-12",
}: IngredientImageProps) {
	const [hasError, setHasError] = useState(false);

	if (!image || NO_IMAGE_FILENAMES.has(image) || hasError) {
		return (
			<span
				className={`${size} rounded-full bg-surface flex items-center justify-center`}
			>
				<ChefHat className="size-6 text-text-muted" />
			</span>
		);
	}

	return (
		<img
			src={`https://img.spoonacular.com/ingredients_100x100/${image}`}
			alt={alt}
			className={`${size} rounded-full object-cover bg-surface`}
			onError={() => setHasError(true)}
		/>
	);
}

export default IngredientImage;
