<script lang="ts">
	import ProjectCard from '$lib/components/ui/ProjectCard.svelte';
	import { projects } from '$lib/data/projects';
</script>

<section id="chronicles" class="px-5 py-10 md:px-8 md:py-14">
	<div class="container-shell">
		<div class="mb-5 text-center sm:mb-6 md:mb-7">
			<h2
				class="text-xl font-bold uppercase tracking-[0.2em] text-(--color-primary) md:text-3xl"
			>
				FEATURED_WORKS
			</h2>
		</div>

		<div class="chronicles-grid">
			{#each projects as project, index}
				<ProjectCard {project} {index} />
			{/each}
		</div>
	</div>
</section>

<style>
	.chronicles-grid {
		display: grid;
		grid-template-columns: minmax(0, 1fr);
		gap: 0.9rem;
	}

	@media (min-width: 680px) {
		.chronicles-grid {
			grid-template-columns: repeat(2, minmax(0, 1fr));
			gap: 1rem;
		}
	}

	@media (min-width: 1024px) {
		.chronicles-grid {
			gap: 1.15rem;
		}
	}
</style>
