# 📖 Convention de code – Projet MealMaker

Ce document définit les conventions de développement utilisées pour le projet **MealMaker** afin de garantir un code homogène, lisible et maintenable par l'ensemble de l'équipe.

---

# 1. User Stories

Les User Stories sont identifiées par un numéro unique.

## Format

```text
US01
US02
US03
...
```

## Exemple

```text
US01 - Rechercher une recette par ingrédients
US02 - Filtrer les recettes
US03 - Ajouter une recette aux favoris
US04 - Consulter ses favoris
```

---

# 2. Convention Git

## Nom des branches

Les branches de développement suivent le format suivant :

```text
feature/US01-recherche-recette
feature/US02-filtres
feature/US03-favoris

fix/navbar
```

## Convention des commits

Nous utilisons des messages de commit explicites (en Anglais).

```text
feat(US01): Add search by ingredients
feat(US03): Add favorite system
fix(US02): Fix on vegan filter
style: interface improvement
refactor: components simplification 
```

---

# 3. Structure du projet

```text
src/
│
├── assets/
├── components/
├── pages/
├── hooks/
├── services/
├── utils/
├── data/
└── styles/
```

## Détail

- **assets/** : images, icônes...
- **components/** : composants réutilisables
- **pages/** : pages de l'application
- **hooks/** : hooks personnalisés
- **services/** : appels API
- **utils/** : fonctions utilitaires
- **data/** : données statiques
- **styles/** : styles globaux (si nécessaire)

---

# 4. Convention de nommage

## Composants React

Les composants utilisent le **PascalCase**.

✅ Correct

```jsx
RecipeCard.jsx
SearchBar.jsx
FavoriteButton.jsx
```

❌ Incorrect

```jsx
recipeCard.jsx
recipe_card.jsx
searchbar.jsx
```

---

## Variables

Les variables utilisent le **camelCase**.

```javascript
selectedIngredients
favoriteRecipes
recipeList
currentRecipe
isLoading
```

---

## Fonctions

Les fonctions utilisent également le **camelCase** et commencent par un verbe.

```javascript
searchRecipes()
addIngredient()
removeIngredient()
toggleFavorite()
filterRecipes()
```

---

## Constantes

Les constantes utilisent le **UPPER_SNAKE_CASE**.

```javascript
API_URL
MAX_RESULTS
DEFAULT_FILTER
```

---

# 5. Langue du projet

Le code est écrit en **anglais**.

```javascript
const favoriteRecipes = [];
const selectedIngredients = [];
```

L'interface utilisateur reste en **français**.

```text
Favoris
Rechercher
Recettes du moment
```

---

# 6. Tailwind CSS

Le projet utilise **Tailwind CSS**.

Nous privilégions les classes utilitaires plutôt que les fichiers CSS.

## Ordre des classes

Les classes Tailwind sont écrites dans l'ordre suivant :

1. Layout
2. Flex / Grid
3. Espacement
4. Taille
5. Bordures
6. Couleurs
7. Typographie
8. Ombres
9. États

### Exemple

```jsx
className="
flex
items-center
justify-between
gap-4
p-4
rounded-xl
bg-white
text-gray-800
shadow-md
hover:bg-primary
"
```

---

# 7. Palette de couleurs

Les couleurs du projet sont centralisées dans la configuration Tailwind.

| Nom                 | Couleur |
|---------------------|---------|
| --color-brand       | #e67e52 |
| --color-brand-hover | #d96a3b |
| --color-sage        | #7a9e7e |
| --color-leaf        | #5e8c61 |
| --color-sky         | #b3ebf2 |
| --color-alert       | #d9534f |
| --color-background  | #f8f6f2 |
| --color-surface     | #ffffff |
| --color-text        | #2d2d2d |
| --color-text-muted  | #6b6b6b |

Utilisation :

```jsx
bg-primary
text-primary
bg-secondary
text-secondary
```

Éviter :

```jsx
bg-[#E67E52]
```

---

# 8. Structure d'un composant

Chaque composant suit l'ordre suivant :

```jsx
// Imports

// Hooks

// States

// Fonctions

// Return
```

Exemple :

```jsx
import RecipeCard from "../components/RecipeCard";

function Home() {
  const [recipes, setRecipes] = useState([]);

  const searchRecipes = () => {
    // ...
  };

  return (
    <main>
      ...
    </main>
  );
}

export default Home;
```

---

# 9. Props

Les noms de props doivent être explicites.

✅

```jsx
<RecipeCard
  recipe={recipe}
  isFavorite={true}
  onFavorite={handleFavorite}
/>
```

❌

```jsx
<RecipeCard
  data={recipe}
  fav={true}
  click={handleFavorite}
/>
```

---

# 10. Icônes

Le projet utilise une seule bibliothèque d'icônes :

```text
lucide
```

Exemple :

```jsx
import { Camera } from 'lucide-react';
```

---

# 11. Bonnes pratiques

- Une seule responsabilité par composant.
- Éviter la duplication de code.
- Créer des composants réutilisables.
- Garder des fonctions courtes et lisibles.
- Nommer les fichiers comme leur composant.
- Respecter une indentation de **tab**.

---

# ✅ Résumé

- User Stories : `US01`, `US02`, ...
- Branches : `feature/US01-recherche-recette`
- Composants : **PascalCase**
- Variables et fonctions : **camelCase**
- Constantes : **UPPER_SNAKE_CASE**
- Code en anglais
- Interface utilisateur en français
- Tailwind CSS avec couleurs centralisées
- Commits liés aux User Stories (`feat(US01): ...`)