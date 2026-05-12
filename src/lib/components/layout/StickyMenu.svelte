<script lang="ts">
	import { navLinks } from '$lib/data/navigation';
</script>

<nav aria-label="Mobile section navigation" class="sticky-menu">
	{#each navLinks as link}
		{@const Icon = link.icon}
		<a href={link.href}>
			<span class="icon-shell">
				<Icon size={15} strokeWidth={1.8} />
			</span>
			<span>{link.label}</span>
		</a>
	{/each}
</nav>

<style>
	.sticky-menu {
		position: fixed;
		bottom: 1rem;
		left: 50%;
		z-index: 50;
		display: flex;
		width: 90%;
		max-width: 24rem;
		transform: translateX(-50%);
		align-items: center;
		justify-content: space-around;
		border: 1px solid var(--color-border);
		border-radius: 0.75rem;
		background: color-mix(in srgb, var(--color-surface) 88%, transparent);
		padding: 0.5rem 0.75rem;
		box-shadow: 0 1.5rem 3rem color-mix(in srgb, var(--color-primary) 16%, transparent);
		backdrop-filter: blur(18px);
	}

	a {
		display: flex;
		min-width: 5rem;
		flex-direction: column;
		align-items: center;
		gap: 0.25rem;
		border-radius: 0.5rem;
		padding: 0.5rem 0.75rem;
		font-size: 0.6rem;
		font-weight: 700;
		letter-spacing: 0.06em;
		text-transform: uppercase;
		color: var(--color-muted);
		transition: color 180ms ease;
	}

	a:hover,
	a:focus-visible {
		color: var(--color-primary);
		outline: none;
	}

	a:focus-visible {
		box-shadow: 0 0 0 2px var(--color-primary);
	}

	.icon-shell {
		display: grid;
		width: 1.25rem;
		height: 1.25rem;
		place-items: center;
		border: 1px solid var(--color-border);
		border-radius: 0.375rem;
		color: var(--color-primary);
	}

	@media (min-width: 1024px) {
		.sticky-menu {
			display: none;
		}
	}
</style>
