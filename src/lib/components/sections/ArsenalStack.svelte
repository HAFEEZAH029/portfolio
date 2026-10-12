<script lang="ts">
	import Reveal from '$lib/components/ui/Reveal.svelte';
	import SkillCard from '$lib/components/ui/SkillCard.svelte';
	import { skills } from '$lib/data/skills';
</script>

<section id="arsenal" class="px-5 py-14 md:px-8 md:py-18 lg:py-20">
	<div class="container-shell">
		<Reveal y={18}>
			<div class="mx-auto mb-7 max-w-2xl text-center">
				<h2
					class="text-xl font-bold uppercase tracking-[0.2em] text-(--color-primary) md:text-3xl"
				>
					ARSENAL_STACK
				</h2>

				<p class="mt-3 text-sm leading-7 text-(--color-muted) md:text-base">
					The core technologies I use to bridge design, interaction, and deployment.
				</p>
			</div>
		</Reveal>

		<div class="arsenal-grid">
			{#each skills as skill, index}
				<Reveal delay={index * 110} y={26}>
					<SkillCard {skill} {index} />
				</Reveal>
			{/each}
		</div>
	</div>
</section>

<style>
	.arsenal-grid {
		margin-inline: auto;
		display: grid;
		width: min(100%, 58rem);
		grid-template-columns: minmax(0, 1fr);
		gap: 0.9rem;
	}

	@media (min-width: 700px) {
		.arsenal-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1rem;
		}
	}

	@media (min-width: 1024px) {
		.arsenal-grid {
			grid-template-columns: repeat(6, minmax(0, 1fr));
			gap: 1.1rem;
		}

		.arsenal-grid :global(.reveal) {
			grid-column: span 2;
		}

		.arsenal-grid :global(.reveal:nth-child(4)) {
			grid-column: 2 / span 2;
		}

		.arsenal-grid :global(.reveal:nth-child(5)) {
			grid-column: 4 / span 2;
		}
	}
</style>