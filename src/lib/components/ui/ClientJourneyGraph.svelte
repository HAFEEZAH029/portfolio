<script lang="ts">
	import { clientJourneyPhases } from '$lib/data/clientJourney';
	import ArrowRight from 'lucide-svelte/icons/arrow-right';
</script>

<div class="journey-structure" aria-labelledby="journey-structure-title">
	<div class="structure-heading">
		<p>// client journey map</p>
		<h2 id="journey-structure-title">PROCESS_TREE</h2>
	</div>

	<div class="structure-graph">
		<svg class="graph-lines" viewBox="0 0 100 100" aria-hidden="true">
			<defs>
				<linearGradient id="signal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
					<stop offset="0%" stop-color="rgba(0, 240, 255, 0.05)" />
					<stop offset="42%" stop-color="rgba(0, 240, 255, 0.95)" />
					<stop offset="100%" stop-color="rgba(139, 92, 246, 0.08)" />
				</linearGradient>
			</defs>

			<path class="connector base" d="M50 10 L27 27" />
			<path class="connector base" d="M50 10 L73 27" />
			<path class="connector base" d="M27 37 L50 50" />
			<path class="connector base" d="M73 37 L50 50" />
			<path class="connector base" d="M50 60 L31 72" />
			<path class="connector base" d="M31 82 L50 92" />
			<path class="connector base" d="M69 82 L50 92" />
			<path class="connector base" d="M31 72 L69 72" />

			<path class="connector pulse pulse-a" d="M50 10 L27 27" />
			<path class="connector pulse pulse-b" d="M50 10 L73 27" />
			<path class="connector pulse pulse-c" d="M27 37 L50 50" />
			<path class="connector pulse pulse-d" d="M73 37 L50 50" />
			<path class="connector pulse pulse-e" d="M50 60 L31 72" />
			<path class="connector pulse pulse-f" d="M31 82 L50 92" />
			<path class="connector pulse pulse-g" d="M69 82 L50 92" />
			<path class="connector pulse pulse-h" d="M31 72 L69 72" />
		</svg>

		{#each clientJourneyPhases as phase}
			<button class={`phase-node ${phase.className}`} type="button">
				<span class="phase-card">
					<span class="phase-face phase-front">
						<span>{phase.title}</span>
						<ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
					</span>
					<span class="phase-face phase-back">{phase.detail}</span>
				</span>
			</button>
		{/each}
	</div>
</div>

<style>
	.journey-structure {
		margin-inline: auto;
		width: min(100%, 38rem);
		animation: graph-float 8s ease-in-out infinite;
	}

	.structure-heading {
		margin-bottom: 1.25rem;
		text-align: center;
	}

	.structure-heading p {
		font-family: var(--font-mono);
		font-size: 0.58rem;
		font-weight: 800;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-muted);
	}

	.structure-heading h2 {
		margin-top: 0.45rem;
		font-family: var(--font-heading);
		font-size: clamp(1.05rem, 2.3vw, 1.45rem);
		font-weight: 800;
		line-height: 1;
		color: var(--color-primary);
	}

	.structure-graph {
		position: relative;
		aspect-ratio: 1 / 1.16;
		width: min(100%, clamp(18rem, 76vw, 35rem));
		margin-inline: auto;
	}

	.graph-lines {
		position: absolute;
		inset: 4% 3%;
		width: 94%;
		height: 92%;
		overflow: visible;
	}

	.connector {
		fill: none;
		vector-effect: non-scaling-stroke;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.connector.base {
		stroke: rgba(0, 240, 255, 0.2);
		stroke-width: 0.85;
	}

	.connector.pulse {
		stroke: url('#signal-gradient');
		stroke-width: 1.15;
		stroke-dasharray: 6 24;
		animation: signal-flow 3.6s linear infinite;
		filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.72));
	}

	.pulse-b {
		animation-delay: 0.3s;
	}

	.pulse-c {
		animation-delay: 0.65s;
	}

	.pulse-d {
		animation-delay: 0.95s;
	}

	.pulse-e {
		animation-delay: 1.25s;
	}

	.pulse-f {
		animation-delay: 1.6s;
	}

	.pulse-g {
		animation-delay: 1.95s;
	}

	.pulse-h {
		animation-delay: 2.2s;
	}

	.phase-node {
		position: absolute;
		width: clamp(7.2rem, 26vw, 10.8rem);
		height: clamp(3rem, 10vw, 4.4rem);
		border: 0;
		background: transparent;
		padding: 0;
		color: inherit;
		perspective: 900px;
		cursor: pointer;
	}

	.consultation {
		top: 1%;
		left: 50%;
		transform: translateX(-50%);
	}

	.onboarding {
		top: 21%;
		left: 0;
	}

	.proposal {
		top: 21%;
		right: 0;
	}

	.prototyping {
		top: 42%;
		left: 50%;
		transform: translateX(-50%);
	}

	.development {
		top: 64%;
		left: 7%;
	}

	.testing {
		top: 83%;
		left: 50%;
		transform: translateX(-50%);
	}

	.launch {
		top: 64%;
		right: 7%;
	}

	.phase-card {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition: transform 560ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.phase-node:hover .phase-card,
	.phase-node:focus .phase-card,
	.phase-node:focus-visible .phase-card {
		transform: rotateY(180deg);
	}

	.phase-node:focus-visible {
		outline: none;
	}

	.phase-node:focus-visible .phase-face {
		box-shadow:
			0 0 0 2px var(--color-bg),
			0 0 0 4px var(--color-primary),
			0 0 28px rgba(0, 240, 255, 0.28);
	}

	.phase-face {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		backface-visibility: hidden;
		border: 1px solid color-mix(in srgb, var(--color-primary) 42%, transparent);
		border-radius: 999px;
		background:
			linear-gradient(135deg, rgba(0, 240, 255, 0.08), transparent 55%),
			color-mix(in srgb, var(--color-surface) 92%, var(--color-card-solid));
		box-shadow:
			inset 0 0 0 1px rgba(255, 255, 255, 0.03),
			0 0 24px rgba(0, 240, 255, 0.08);
		padding: 0.7rem 1rem;
		font-family: var(--font-mono);
		font-size: clamp(0.62rem, 1.8vw, 0.82rem);
		font-weight: 800;
		line-height: 1.35;
		text-align: center;
		color: var(--color-primary);
	}

	.phase-front {
		grid-template-columns: minmax(0, auto) auto;
		column-gap: 0.45rem;
	}

	.phase-front span {
		min-width: 0;
	}

	.phase-front :global(svg) {
		flex: none;
		transition: transform 220ms ease;
	}

	.phase-node:hover .phase-front :global(svg),
	.phase-node:focus .phase-front :global(svg),
	.phase-node:focus-visible .phase-front :global(svg) {
		transform: translateX(2px);
	}

	.phase-back {
		transform: rotateY(180deg);
		border-color: color-mix(in srgb, var(--color-secondary) 52%, transparent);
		font-size: clamp(0.58rem, 1.55vw, 0.72rem);
		color: var(--color-text);
	}

	@media (min-width: 768px) {
		.structure-graph {
			width: min(100%, 33rem);
		}
	}

	@media (min-width: 1024px) {
		.journey-structure {
			margin-left: 0;
			width: min(100%, 36rem);
		}

		.structure-heading {
			text-align: left;
		}
	}

	@keyframes graph-float {
		0%,
		100% {
			transform: translate3d(0, 0, 0);
		}

		50% {
			transform: translate3d(0, -10px, 0);
		}
	}

	@keyframes signal-flow {
		to {
			stroke-dashoffset: -60;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.phase-card,
		.phase-front :global(svg) {
			transition: none;
		}

		.journey-structure,
		.connector.pulse {
			animation: none;
		}
	}
</style>
