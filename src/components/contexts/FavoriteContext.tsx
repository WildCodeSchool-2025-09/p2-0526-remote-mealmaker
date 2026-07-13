import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext(null);

export function FavoriteProvider({ children }) {
	const [favorite, setFavorite] = useState(false);
	return (
		<FavoriteContext value={{ favorite, setFavorite }}>
			{children}
		</FavoriteContext>
	);
}

export const useFavorite = () => {
	return useContext(FavoriteContext);
};
