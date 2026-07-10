export interface Ingredient {
    id: number;
    name: string;
    image?: string;
}

export interface Filters {
    diet: string;
    intolerances: string;
}

export interface Recipe {
    id: number;
    title: string;
    image: string;
    readyInMinutes: number;
}