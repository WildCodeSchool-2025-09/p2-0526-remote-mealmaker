const SEMANTIC_COLORS = [
	{ name: "primary", bg: "bg-primary", content: "text-primary-content" },
	{ name: "secondary", bg: "bg-secondary", content: "text-secondary-content" },
	{ name: "accent", bg: "bg-accent", content: "text-accent-content" },
	{ name: "neutral", bg: "bg-neutral", content: "text-neutral-content" },
	{ name: "info", bg: "bg-info", content: "text-info-content" },
	{ name: "success", bg: "bg-success", content: "text-success-content" },
	{ name: "warning", bg: "bg-warning", content: "text-warning-content" },
	{ name: "error", bg: "bg-error", content: "text-error-content" },
];

const BASE_COLORS = [
	{ name: "base-100", bg: "bg-base-100" },
	{ name: "base-200", bg: "bg-base-200" },
	{ name: "base-300", bg: "bg-base-300" },
];

const RAW_TOKENS = [
	"--color-brand",
	"--color-brand-hover",
	"--color-sage",
	"--color-leaf",
	"--color-sky",
	"--color-alert",
	"--color-background",
	"--color-surface",
	"--color-text",
	"--color-text-muted",
];

function Section({ title, children }) {
	return (
		<section className="space-y-3">
			<h2 className="font-heading text-xl font-semibold">{title}</h2>
			{children}
		</section>
	);
}

export default function ThemePreview() {
	return (
		<div
			data-theme="mealmaker"
			className="min-h-screen bg-base-100 text-base-content font-body"
		>
			<div className="mx-auto max-w-5xl space-y-10 p-8">
				<header className="space-y-1">
					<h1 className="font-heading text-3xl font-bold">MealMaker Theme</h1>
					<p className="text-base-content/70">
						Aperçu des couleurs, du texte de contraste et des composants. Titres
						en Poppins, corps en Inter.
					</p>
				</header>

				<Section title="Couleurs sémantiques (fond + texte -content)">
					<div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
						{SEMANTIC_COLORS.map((c) => (
							<div
								key={c.name}
								className={`${c.bg} ${c.content} rounded-box flex h-24 flex-col justify-between p-3`}
							>
								<span className="text-sm font-medium">{c.name}</span>
								<span className="text-xs opacity-90">{c.name}-content</span>
							</div>
						))}
					</div>
				</Section>

				<Section title="Surfaces de base">
					<div className="grid grid-cols-3 gap-3">
						{BASE_COLORS.map((c) => (
							<div
								key={c.name}
								className={`${c.bg} text-base-content rounded-box border border-base-300 flex h-20 items-center justify-center text-sm font-medium`}
							>
								{c.name}
							</div>
						))}
					</div>
				</Section>

				<Section title="Tokens bruts de @theme">
					<div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
						{RAW_TOKENS.map((token) => (
							<div key={token} className="space-y-1">
								<div
									className="rounded-field h-14 border border-base-300"
									style={{ backgroundColor: `var(${token})` }}
								/>
								<code className="block text-[11px] text-base-content/70">
									{token}
								</code>
							</div>
						))}
					</div>
				</Section>

				<Section title="Boutons">
					<div className="flex flex-wrap gap-2">
						<button type="button" className="btn btn-primary">
							primary
						</button>
						<button type="button" className="btn btn-secondary">
							secondary
						</button>
						<button type="button" className="btn btn-accent">
							accent
						</button>
						<button type="button" className="btn btn-neutral">
							neutral
						</button>
						<button type="button" className="btn btn-info">
							info
						</button>
						<button type="button" className="btn btn-success">
							success
						</button>
						<button type="button" className="btn btn-warning">
							warning
						</button>
						<button type="button" className="btn btn-error">
							error
						</button>
					</div>
					<div className="flex flex-wrap gap-2">
						<button type="button" className="btn btn-primary btn-outline">
							outline
						</button>
						<button type="button" className="btn btn-primary btn-soft">
							soft
						</button>
						<button type="button" className="btn btn-primary btn-dash">
							dash
						</button>
						<button type="button" className="btn btn-ghost">
							ghost
						</button>
						<button type="button" className="btn btn-primary btn-disabled">
							disabled
						</button>
					</div>
				</Section>

				<Section title="Badges">
					<div className="flex flex-wrap gap-2">
						<span className="badge badge-primary">primary</span>
						<span className="badge badge-secondary">secondary</span>
						<span className="badge badge-accent">accent</span>
						<span className="badge badge-info">info</span>
						<span className="badge badge-success">success</span>
						<span className="badge badge-warning">warning</span>
						<span className="badge badge-error">error</span>
					</div>
				</Section>

				<Section title="Alertes (test direct du contraste -content)">
					<div className="space-y-2">
						<div className="alert alert-info">
							Information neutre à afficher.
						</div>
						<div className="alert alert-success">Action réussie.</div>
						<div className="alert alert-warning">Attention, à vérifier.</div>
						<div className="alert alert-error">Une erreur est survenue.</div>
					</div>
				</Section>

				<Section title="Carte en contexte">
					<div className="card bg-base-100 border border-base-300 shadow-sm max-w-sm">
						<div className="card-body">
							<h3 className="card-title font-heading">Candidature</h3>
							<p className="text-base-content/70">
								Exemple de contenu sur une surface base-100 avec texte
								base-content.
							</p>
							<div className="card-actions justify-end">
								<button type="button" className="btn btn-ghost">
									Annuler
								</button>
								<button type="button" className="btn btn-primary">
									Enregistrer
								</button>
							</div>
						</div>
					</div>
				</Section>

				<Section title="Rayons (radius-box / field / selector)">
					<div className="flex flex-wrap items-end gap-4">
						<div className="rounded-box bg-primary h-16 w-16" />
						<input
							type="text"
							placeholder="rounded-field"
							className="input input-bordered"
						/>
						<input type="checkbox" className="checkbox checkbox-primary" />
					</div>
				</Section>
			</div>
		</div>
	);
}
