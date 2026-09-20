<script lang="ts">
	import { theme, toggleTheme } from '$lib/store/theme';
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';

	const iconSize = 16;
</script>

<button
	class="theme-toggle"
	type="button"
	aria-label={$theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
	aria-pressed={$theme === 'light'}
	onclick={toggleTheme}
>
	{#if $theme === 'dark'}
		<Sun size={iconSize} strokeWidth={1.9} />
	{:else}
		<Moon size={iconSize} strokeWidth={1.9} />
	{/if}
</button>

<style>
	.theme-toggle {
		display: grid;
		width: 2.25rem;
		height: 2.25rem;
		place-items: center;
		border: 1px solid var(--color-border);
		border-radius: 0.125rem;
		background: color-mix(in srgb, var(--color-surface) 76%, transparent);
		color: var(--color-primary);
		cursor: pointer;
		transition:
			transform 180ms ease,
			border-color 180ms ease,
			box-shadow 180ms ease,
			background 180ms ease;
	}

	.theme-toggle:hover,
	.theme-toggle:focus-visible {
		transform: translateY(-1px);
		border-color: var(--color-primary);
		box-shadow: 0 0 22px rgba(0, 240, 255, 0.18);
		outline: none;
	}

	@media (prefers-reduced-motion: reduce) {
		.theme-toggle {
			transition: none;
		}

		.theme-toggle:hover,
		.theme-toggle:focus-visible {
			transform: none;
		}
	}
</style>
