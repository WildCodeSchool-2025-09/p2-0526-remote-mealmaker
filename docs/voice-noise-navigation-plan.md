# Commande vocale simple (détection de bruit) dans le Cooking Mode

## Contexte

Dans `StepNavigation.tsx`, avancer d'une étape nécessite de toucher l'écran — contraignant en pleine cuisine avec les mains sales/occupées. L'utilisateur veut une "commande vocale simple" : pas de reconnaissance de mots, juste une détection de bruit ambiant via le micro qui, une fois activée, déclenche automatiquement la même action que le bouton "Next"/"Finish".

**Portée validée** : détection de volume générique (pas de mot-clé précis), opt-in (bouton toggle, jamais de démarrage auto du micro), libération propre du micro à la désactivation/au démontage, pas de persistance nécessaire (comportement local à la session cooking mode).

## Approche

Aucun code audio n'existe dans le projet à ce jour. On ajoute un hook custom dédié, suivant la convention du seul hook existant (`src/hooks/useRecipeById.ts` : `export default`, `useState`/`useEffect`, retour en objet), et on l'intègre uniquement dans `StepNavigation.tsx` puisque c'est ce composant qui possède déjà la logique `handleNextOrFinish` (gère la bascule Next/Finish sur la dernière étape) — pas besoin de toucher `CookingMode.tsx`.

## 1. Nouveau hook `src/hooks/useNoiseDetection.ts`

API :
```ts
type NoiseDetectionStatus = "idle" | "requesting" | "listening" | "error";
type NoiseDetectionErrorReason = "not-supported" | "permission-denied" | "no-microphone" | "unknown";

function useNoiseDetection(
	onNoiseDetected: () => void,
	options?: { threshold?: number; cooldownMs?: number }
): {
	status: NoiseDetectionStatus;
	errorReason: NoiseDetectionErrorReason | null;
	toggleListening: () => void;
};
```

**Algorithme** (Web Audio API) :
- `getUserMedia({ audio: true })` → `AudioContext` → `createMediaStreamSource` → `AnalyserNode` (`fftSize = 512`).
- Boucle `requestAnimationFrame` (pas `setInterval` : se met en pause en arrière-plan, ce qui évite un déclenchement intempestif si l'onglet n'est plus actif) qui lit `getByteTimeDomainData` et calcule un volume RMS (moyenne quadratique des échantillons normalisés en `[-1, 1]`).
- Déclenchement sur **front montant** (silence → au-dessus du seuil) + **cooldown** (défaut `1500ms`) combinés : un bruit soutenu (voix qui traîne, bruit de fond) ne déclenche qu'une fois, pas en rafale à chaque frame au-dessus du seuil.
- `onNoiseDetected` capturée via une ref mise à jour à chaque render (pas dans `useEffect`), pour que la boucle audio n'ait pas besoin de redémarrer quand `StepNavigation` re-render (ex. changement de step) — le flux micro reste ouvert en continu tant que `listening`.

**Erreurs gérées** : pas de support (`navigator.mediaDevices?.getUserMedia` absent), permission refusée (`NotAllowedError`), pas de micro détecté (`NotFoundError`), autre — chacune mappée sur `errorReason`.

**Cleanup** (pattern déjà utilisé dans `TimerCookModule.tsx` avec `useRef`+`useCallback`+`useEffect`) : arrêt du `requestAnimationFrame`, `stream.getTracks().forEach(t => t.stop())` (libère réellement le micro, éteint l'indicateur du navigateur), fermeture de l'`AudioContext`. Appelé au toggle OFF et au démontage du composant — ce qui couvre gratuitement le cas où `StepNavigation` disparaît (recette terminée → `CompletedRecipe` remplace tout l'arbre, ou "Quit Cooking mode").

## 2. Intégration dans `StepNavigation.tsx`

- `const { status, errorReason, toggleListening } = useNoiseDetection(handleNextOrFinish);` — le hook ne connaît ni `isLastStep` ni `onNext`/`onFinish`, zéro duplication de la logique métier existante.
- Un bouton icône (`Mic`/`MicOff` de `lucide-react`, déjà utilisé ailleurs dans le projet) ajouté dans la même barre flex, avant "Previous", en `btn-circle` pour ne pas rétrécir les boutons existants.
- États visuels : `idle` (icône neutre), `requesting` (bouton désactivé, `loading` daisyUI), `listening` (icône verte + `animate-pulse`, pattern déjà utilisé dans `TimerCookModule.tsx`), `error` (icône rouge + `title`/`aria-label` explicite selon `errorReason`).
- Garantie : quel que soit l'état du hook, "Previous"/"Next"/"Finish" restent cliquables normalement — la voix est strictement additive.

## Fichiers concernés

- **Créer** `src/hooks/useNoiseDetection.ts`
- **Modifier** `src/components/CookingMode/StepNavigation.tsx`
- Aucun changement dans `CookingMode.tsx` ni ailleurs.

## Vérification

Prérequis : `getUserMedia` exige un contexte sécurisé — OK sur `localhost` (Vite dev), à confirmer que le déploiement cible est en HTTPS.

1. `npm run dev`, ouvrir le cooking mode d'une recette → bouton micro en `idle`, aucun prompt au chargement.
2. Previous/Next au clic fonctionnent comme avant (non-régression).
3. Activer le micro → prompt navigateur → accepter → état `listening`, indicateur micro du navigateur/onglet s'allume seulement à ce moment.
4. Silence ~30s → aucune avancée de step (pas de faux positif).
5. Un clap/bruit net → exactement une avancée de step ; plusieurs claps rapprochés dans la fenêtre de cooldown → un seul déclenchement.
6. Bruit soutenu plusieurs secondes → une seule avancée pour tout l'événement, pas une par `cooldownMs` écoulé.
7. Déclenchement sur la dernière étape → `CompletedRecipe` s'affiche, micro libéré automatiquement (démontage de `StepNavigation`).
8. Désactiver manuellement en cours d'écoute → indicateur micro du navigateur s'éteint immédiatement.
9. Refuser la permission → état `error` clair, navigation manuelle toujours utilisable.
10. "Quit Cooking mode" pendant l'écoute → micro bien libéré.
11. `npm run check` (Biome) sur les fichiers touchés + `npx tsc -b tsconfig.app.json` pour valider le typage (voir note ci-dessous).

**Note** : la vérification `tsc` doit utiliser `-b tsconfig.app.json` (project references) — `tsc --noEmit -p .` ne vérifie rien dans ce projet (le `tsconfig.json` racine a `"files": []` et ne fait que référencer les sous-projets sans le flag `--build`), ce qui a faussé une vérification précédente dans cette session.
