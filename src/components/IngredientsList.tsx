function IngredientsList() {
	return (
		<article className=" flex flex-wrap justify-center gap-2 m-4 p-2 rounded-box border  border-solid border-primary bg-surface">
			<p className="w-full text-sage font-bold">Ma liste actuelle :</p>
			<div className="flex items-center gap-2 border rounded-full bg-background px-4 py-2 text-sm font-medium text-primary ">
				<button type="button" className="font-bold">
					Carotte ✕
				</button>
			</div>
		</article>
	);
}

export default IngredientsList;
