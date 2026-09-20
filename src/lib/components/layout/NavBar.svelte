<script lang="ts">
	import { navLinks } from '$lib/data/navigation';
	import ThemeToggle from '$lib/components/ui/ThemeToggle.svelte';
</script>

<header class="site-header">
	<nav class="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:px-8">
		<a href="#top" class="brand-link">
			<span></span>
			vSTUDIO_CORE
		</a>

		<div class="hidden items-center gap-8 lg:flex">
			{#each navLinks as link}
				<a href={link.href} class="nav-link">
					{link.label}
				</a>
			{/each}
		</div>

		<div class="header-actions">
			<ThemeToggle />

			<a href="#transmission" aria-label="Jump to contact section" class="command-link">
				Ctrl + K
			</a>
		</div>
	</nav>
</header>

<style>
	.site-header {
		position: fixed;
		top: 0;
		left: 0;
		z-index: 50;
		width: 100%;
		border-bottom: 1px solid color-mix(in srgb, var(--color-primary) 12%, transparent);
		background: color-mix(in srgb, var(--color-bg) 84%, transparent);
		box-shadow: 0 0.65rem 1.6rem color-mix(in srgb, var(--color-primary) 13%, transparent);
		backdrop-filter: blur(18px);
	}

	.brand-link {
		display: flex;
		align-items: center;
		gap: 0.5rem;
		font-size: 0.875rem;
		font-weight: 800;
		letter-spacing: 0.025em;
		color: var(--color-primary);
	}

	.brand-link span {
		width: 0.5rem;
		height: 0.5rem;
		border: 1px solid var(--color-primary);
		border-radius: 0.125rem;
	}

	.nav-link {
		font-size: 0.65rem;
		font-weight: 700;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: color-mix(in srgb, var(--color-text) 78%, transparent);
		transition: color 180ms ease;
	}

	.nav-link:hover,
	.nav-link:focus-visible {
		color: var(--color-primary);
		outline: none;
	}

	.nav-link:focus-visible,
	.command-link:focus-visible {
		box-shadow: 0 0 0 2px var(--color-primary);
	}

	.header-actions {
		display: flex;
		align-items: center;
		gap: 0.65rem;
	}

	.command-link {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		min-height: 2.25rem;
		border: 1px solid var(--color-primary);
		border-radius: 0.125rem;
		background: var(--color-primary);
		padding-inline: 0.75rem;
		font-size: 0.65rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		text-transform: uppercase;
		color: var(--color-primary-contrast);
		transition:
			background 180ms ease,
			color 180ms ease,
			transform 180ms ease;
	}

	.command-link:hover,
	.command-link:focus-visible {
		transform: translateY(-1px);
		background: color-mix(in srgb, var(--color-secondary) 10%, transparent);
		color: var(--color-primary);
		outline: none;
	}

	@media (min-width: 768px) {
		.brand-link {
			font-size: 1.25rem;
		}

		.nav-link {
			font-size: 0.8rem;
		}

		.command-link {
			font-size: 0.7rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.nav-link,
		.command-link {
			transition: none;
		}

		.command-link:hover,
		.command-link:focus-visible {
			transform: none;
		}
	}
</style>
