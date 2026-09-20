<script lang="ts">
	import Reveal from '$lib/components/ui/Reveal.svelte';

	const phases = [
		{
			kicker: 'PHASE_01',
			title: 'Discovery & Blueprinting',
			description:
				'Defining goals, mapping user journeys, and creating the functional technical architecture.'
		},
		{
			kicker: 'PHASE_02',
			title: 'Visual Engineering',
			description:
				'High-fidelity UI design in Figma, focusing on motion systems and design system scalability.'
		},
		{
			kicker: 'PHASE_03',
			title: 'Development & Core',
			description:
				'Translating pixels to performant code using React, ensuring accessible and responsive structures.'
		}
	];
</script>

<section id="journey" class="px-5 py-14 md:px-8 md:py-18 lg:py-20">
	<div class="container-shell">
		<Reveal y={18}>
			<h2 class="journey-title">From Concept to Code</h2>
		</Reveal>

		<div class="journey-timeline" aria-label="Development process">
			{#each phases as phase, index}
				<Reveal delay={index * 140} y={28}>
					<article class="phase-card" style:--phase-index={index + 1}>
						<p>{phase.kicker}</p>
						<h3>{phase.title}</h3>
						<span>{phase.description}</span>
					</article>
				</Reveal>
			{/each}
		</div>
	</div>
</section>

<style>
	.journey-title {
		margin-inline: auto;
		max-width: 42rem;
		text-align: center;
		font-family: var(--font-heading);
		font-size: clamp(1.05rem, 2.2vw, 1.45rem);
		font-weight: 700;
		letter-spacing: 0;
		color: var(--color-text);
	}

	.journey-timeline {
		position: relative;
		margin-inline: auto;
		margin-top: clamp(2rem, 5vw, 3rem);
		display: grid;
		width: min(100%, 70rem);
		gap: 1.35rem;
		padding-left: 2.1rem;
	}

	.journey-timeline::before {
		content: '';
		position: absolute;
		left: 0.7rem;
		top: 0.2rem;
		bottom: 0.2rem;
		width: 1px;
		background: linear-gradient(
			to bottom,
			transparent,
			rgba(0, 240, 255, 0.55) 12%,
			rgba(0, 240, 255, 0.55) 88%,
			transparent
		);
	}

	.journey-timeline :global(.reveal) {
		position: relative;
	}

	.journey-timeline :global(.reveal)::before {
		content: counter(phase-counter, decimal-leading-zero);
		counter-increment: phase-counter;
		position: absolute;
		left: -2.1rem;
		top: 1.35rem;
		z-index: 1;
		display: grid;
		height: 1.1rem;
		width: 1.1rem;
		place-items: center;
		border: 1px solid var(--color-primary);
		border-radius: 999px;
		background: var(--color-bg);
		font-family: var(--font-mono);
		font-size: 0.48rem;
		font-weight: 700;
		color: var(--color-primary);
		box-shadow: 0 0 18px rgba(0, 240, 255, 0.18);
	}

	.journey-timeline {
		counter-reset: phase-counter;
	}

	.phase-card {
		position: relative;
		overflow: hidden;
		min-height: 7.4rem;
		border: 1px solid var(--color-border);
		background:
			linear-gradient(135deg, rgba(0, 240, 255, 0.07), transparent 34%), var(--color-card-solid);
		padding: clamp(0.95rem, 2.6vw, 1.35rem);
		transition:
			transform 260ms ease,
			border-color 260ms ease,
			box-shadow 260ms ease;
	}

	.phase-card::after {
		content: '';
		position: absolute;
		inset: 0 auto 0 0;
		width: 2px;
		background: linear-gradient(to bottom, var(--color-primary), transparent 72%);
		opacity: 0.9;
	}

	.phase-card:hover {
		transform: translateY(-4px);
		border-color: color-mix(in srgb, var(--color-primary) 55%, transparent);
		box-shadow: 0 0 32px rgba(0, 240, 255, 0.1);
	}

	p {
		font-family: var(--font-mono);
		font-size: 0.56rem;
		font-weight: 800;
		letter-spacing: 0.15em;
		color: var(--color-primary);
	}

	h3 {
		margin-top: 0.45rem;
		font-family: var(--font-heading);
		font-size: clamp(0.86rem, 1.55vw, 1rem);
		font-weight: 600;
		line-height: 1.25;
		color: var(--color-text);
	}

	span {
		margin-top: 0.45rem;
		display: block;
		max-width: 34rem;
		font-size: clamp(0.68rem, 1.2vw, 0.78rem);
		line-height: 1.65;
		color: var(--color-muted);
	}

	@media (min-width: 700px) {
		.journey-timeline {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1.5rem 2.5rem;
			padding-left: 0;
		}

		.journey-timeline::before {
			left: 50%;
			top: 0;
			bottom: 0;
		}

		.journey-timeline :global(.reveal:nth-child(odd)) {
			grid-column: 1;
		}

		.journey-timeline :global(.reveal:nth-child(even)) {
			grid-column: 2;
			margin-top: 5.6rem;
		}

		.journey-timeline :global(.reveal:nth-child(3)) {
			margin-top: -1.4rem;
		}

		.journey-timeline :global(.reveal)::before {
			left: auto;
			right: -2rem;
			top: 2.1rem;
			height: 1.35rem;
			width: 1.35rem;
			font-size: 0.56rem;
		}

		.journey-timeline :global(.reveal:nth-child(even))::before {
			left: -1.6rem;
			right: auto;
		}
	}

	@media (min-width: 1024px) {
		.journey-timeline {
			width: min(100%, 67.5rem);
			gap: 1.7rem 4.25rem;
		}

		.phase-card {
			min-height: 7.9rem;
		}

		.journey-timeline :global(.reveal:nth-child(even)) {
			margin-top: 6.6rem;
		}

		.journey-timeline :global(.reveal:nth-child(3)) {
			margin-top: -1.8rem;
		}

		.journey-timeline :global(.reveal)::before {
			right: -2.7rem;
			height: 1.5rem;
			width: 1.5rem;
			font-size: 0.62rem;
		}

		.journey-timeline :global(.reveal:nth-child(even))::before {
			left: -2.65rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.phase-card,
		.phase-card:hover {
			transform: none;
			transition: none;
		}
	}
</style>
