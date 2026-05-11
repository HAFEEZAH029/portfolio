<script lang="ts">
	const links = [
		{
			label: 'Github',
			href: 'https://github.com/HAFEEZAH029'
		},
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/feed/'
		}
	];
</script>

<footer class="site-footer" aria-label="Site footer">
	<div class="container-shell">
		<div class="footer-inner">
			<p>&copy; 2026 STUDIO_CORE, ALL RIGHTS RESERVED.</p>

			<nav aria-label="Social links">
				{#each links as link}
					<a href={link.href} target="_blank" rel="noreferrer">{link.label}</a>
				{/each}
			</nav>
		</div>
	</div>
</footer>

<style>
	.site-footer {
		border-top: 1px solid rgba(0, 240, 255, 0.08);
		padding: 1.25rem 1.25rem 6.75rem;
		background: var(--color-bg);
	}

	.footer-inner {
		display: flex;
		flex-direction: column;
		gap: 1rem;
		align-items: flex-start;
		justify-content: space-between;
	}

	p,
	a {
		font-family: var(--font-mono);
		font-size: 0.8rem;
		font-weight: 700;
		letter-spacing: 0.14em;
		text-transform: uppercase;
	}

	p {
		color: color-mix(in srgb, var(--color-muted) 80%, transparent);
	}

	nav {
		display: flex;
		flex-wrap: wrap;
		gap: 0.85rem;
	}

	a {
		color: color-mix(in srgb, var(--color-muted) 78%, transparent);
		text-decoration: none;
		transition:
			color 180ms ease,
			text-shadow 180ms ease;
	}

	a:hover,
	a:focus-visible {
		color: var(--color-primary);
		text-shadow: 0 0 16px rgba(0, 240, 255, 0.35);
	}

	a:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 4px;
	}

	@media (min-width: 768px) {
		.site-footer {
			padding: 1.35rem 2rem 6rem;
		}

		.footer-inner {
			flex-direction: row;
			align-items: center;
		}

		nav {
			justify-content: flex-end;
		}
	}

	@media (min-width: 1024px) {
		.site-footer {
			padding-bottom: 1.35rem;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		a {
			transition: none;
		}
	}
</style>
