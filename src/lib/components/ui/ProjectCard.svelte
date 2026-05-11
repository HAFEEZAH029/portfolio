<script lang="ts">
	import Code2 from 'lucide-svelte/icons/code-2';
	import ExternalLink from 'lucide-svelte/icons/external-link';
	import type { Project } from '$lib/data/projects';

	type Props = {
		project: Project;
		index?: number;
	};

	let { project, index = 0 }: Props = $props();
</script>

<article
	class="project-card group"
	style:animation-delay={`${index * 120}ms`}
>
	<a
		href={project.liveUrl}
		target="_blank"
		rel="noreferrer"
		class="block"
		aria-label={`Open ${project.title}`}
	>
		<div class="image-wrap">
			<img
				src={project.image}
				alt={`${project.title} preview`}
				width={project.imageWidth}
				height={project.imageHeight}
				loading={index < 2 ? 'eager' : 'lazy'}
				decoding="async"
			/>
		</div>
	</a>

	<div class="card-body">
		<div class="title-row">
			<h3 class="text-base md:text-xl">{project.title}</h3>

			<div class="actions">
				<a href={project.liveUrl} target="_blank" rel="noreferrer" aria-label={`${project.title} live site`}>
					<ExternalLink size={12} strokeWidth={1.8} />
				</a>

				<a
					href={project.githubUrl}
					target="_blank"
					rel="noreferrer"
					aria-label={`${project.title} GitHub repository`}
				>
					<Code2 size={12} strokeWidth={1.8} />
				</a>
			</div>
		</div>

		<p>{project.description}</p>

		<ul aria-label={`${project.title} technologies`}>
			{#each project.tags as tag}
				<li>{tag}</li>
			{/each}
		</ul>
	</div>
</article>

<style>
	.project-card {
		overflow: hidden;
		border: 1px solid rgba(0, 240, 255, 0.14);
		background:
			linear-gradient(145deg, rgba(0, 240, 255, 0.075), transparent 36%),
			var(--color-surface-soft);
		opacity: 0;
		transform: translateY(28px);
		animation: card-enter 700ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
		transition:
			transform 250ms ease,
			border-color 250ms ease,
			box-shadow 250ms ease;
	}

	.project-card:hover {
		transform: translateY(-6px);
		border-color: rgba(0, 240, 255, 0.55);
		box-shadow: 0 0 35px rgba(0, 240, 255, 0.12);
	}

	.image-wrap {
		aspect-ratio: 2.08 / 1;
		display: grid;
		place-items: center;
		overflow: hidden;
		border-bottom: 1px solid rgba(0, 240, 255, 0.08);
		background:
			radial-gradient(circle at 50% 100%, rgba(0, 240, 255, 0.18), transparent 45%),
			linear-gradient(90deg, rgba(0, 240, 255, 0.12), transparent 18%, transparent 82%, rgba(0, 240, 255, 0.1)),
			#041012;
	}

	img {
		display: block;
		height: calc(100% - 1rem);
		width: calc(100% - 1rem);
		object-fit: contain;
		transition:
			transform 500ms ease,
			filter 500ms ease;
	}

	.project-card:hover img {
		transform: scale(1.06);
		filter: saturate(1.2);
	}

	.card-body {
		padding: 0.75rem 0.8rem 0.85rem;
	}

	.title-row {
		display: flex;
		align-items: flex-start;
		justify-content: space-between;
		gap: 1rem;
	}

	h3 {
		font-family: var(--font-heading);
		/**font-size: clamp(0.78rem, 1.6vw, 0.92rem); **/
		font-weight: 700;
		line-height: 1.25;
		color: var(--color-primary);
	}

	.actions {
		display: flex;
		flex: none;
		gap: 0.4rem;
	}

	.actions a {
		display: grid;
		height: 1.35rem;
		width: 1.35rem;
		place-items: center;
		color: #cbd5e1;
		transition: color 180ms ease;
	}

	.actions a:hover {
		color: var(--color-primary);
	}

	p {
		margin-top: 0.42rem;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		overflow: hidden;
		font-size: clamp(0.66rem, 1.3vw, 0.76rem);
		line-height: 1.6;
		color: var(--color-muted);
	}

	ul {
		margin-top: 0.75rem;
		display: flex;
		flex-wrap: wrap;
		gap: 0.35rem;
	}

	li {
		font-family: var(--font-mono);
		font-size: 0.52rem;
		font-weight: 700;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-primary);
	}

	li:not(:last-child)::after {
		content: '/';
		margin-left: 0.35rem;
		color: var(--color-secondary);
	}

	@keyframes card-enter {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.project-card {
			animation: none;
			opacity: 1;
			transform: none;
		}

		.project-card,
		img {
			transition: none;
		}
	}

	@media (max-width: 420px) {
		.image-wrap {
			aspect-ratio: 1.85 / 1;
		}

		img {
			height: calc(100% - 0.75rem);
			width: calc(100% - 0.75rem);
		}
	}
</style>
