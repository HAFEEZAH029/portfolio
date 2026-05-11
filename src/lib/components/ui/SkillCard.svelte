<script lang="ts">
	import ChevronDown from 'lucide-svelte/icons/chevron-down';
	import type { Skill } from '$lib/data/skills';

	type Props = {
		skill: Skill;
		index?: number;
	};

	let { skill, index = 0 }: Props = $props();
	let isOpen = $state(false);
	let Icon = $derived(skill.icon);
</script>

<button
	type="button"
	class:open={isOpen}
	class="skill-card"
	aria-expanded={isOpen}
	aria-label={`${skill.name} skill details`}
	onclick={() => (isOpen = !isOpen)}
>
	<span class="skill-main">
		<span class="icon-box">
			<Icon size={18} strokeWidth={1.9} />
		</span>

		<span class="skill-name">{skill.name}</span>

		<span class="mobile-arrow" aria-hidden="true">
			<ChevronDown size={16} strokeWidth={1.9} />
		</span>
	</span>

	<span class="skill-details">
		{#each skill.details as detail}
			<span>{detail}</span>
		{/each}
	</span>
</button>

<style>
	.skill-card {
		min-height: 6rem;
		width: 100%;
		overflow: hidden;
		border: 1px solid rgba(0, 240, 255, 0.18);
		background:
			linear-gradient(145deg, rgba(0, 240, 255, 0.08), transparent 36%),
			var(--color-surface-soft);
		color: var(--color-text);
		cursor: pointer;
		transition:
			min-height 260ms ease,
			transform 240ms ease,
			border-color 240ms ease,
			box-shadow 240ms ease;
	}

	.skill-card:hover,
	.skill-card:focus-visible,
	.skill-card.open {
		min-height: 11.5rem;
		transform: translateY(-4px);
		border-color: rgba(0, 240, 255, 0.58);
		box-shadow: 0 0 32px rgba(0, 240, 255, 0.1);
	}

	.skill-card:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 3px;
	}

	.skill-main {
		display: grid;
		place-items: center;
		gap: 0.55rem;
		padding: 1.1rem 1rem 0.8rem;
	}

	.icon-box {
		display: grid;
		height: 2rem;
		width: 2rem;
		place-items: center;
		color: var(--color-primary);
	}

	.skill-name {
		font-family: var(--font-mono);
		font-size: 0.72rem;
		font-weight: 600;
		letter-spacing: 0.03em;
		color: #dceff0;
	}

	.mobile-arrow {
		display: grid;
		color: var(--color-primary);
		transition: transform 220ms ease;
	}

	.skill-card.open .mobile-arrow {
		transform: rotate(180deg);
	}

	.skill-details {
		display: grid;
		gap: 0.45rem;
		max-height: 0;
		padding: 0 1rem;
		opacity: 0;
		transform: translateY(-6px);
		transition:
			max-height 260ms ease,
			opacity 220ms ease,
			transform 220ms ease,
			padding 220ms ease;
	}

	.skill-card:hover .skill-details,
	.skill-card:focus-visible .skill-details,
	.skill-card.open .skill-details {
		max-height: 8rem;
		padding: 0 1rem 1rem;
		opacity: 1;
		transform: translateY(0);
	}

	.skill-details span {
		font-family: var(--font-mono);
		font-size: 0.62rem;
		line-height: 1.45;
		text-align: left;
		color: var(--color-primary);
	}

	@media (min-width: 768px) {
		.skill-card {
			min-height: 5.8rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.skill-card {
			animation: none;
			opacity: 1;
			transform: none;
			transition: none;
		}

		.skill-details,
		.mobile-arrow {
			transition: none;
		}
	}
</style>
