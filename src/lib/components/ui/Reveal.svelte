<script lang="ts">
	import { onMount } from 'svelte';

	type Props = {
		delay?: number;
		y?: number;
		class?: string;
		children: import('svelte').Snippet;
	};

	let { delay = 0, y = 24, class: className = '', children }: Props = $props();

	let element: HTMLElement;
	let visible = $state(false);

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

		if (prefersReducedMotion) {
			visible = true;
			return;
		}

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					visible = true;
					observer.disconnect();
				}
			},
			{ threshold: 0.18 }
		);

		observer.observe(element);

		return () => observer.disconnect();
	});
</script>

<div
	bind:this={element}
	class={`reveal ${className}`}
	style:transition-delay={`${delay}ms`}
	style:--reveal-y={`${y}px`}
	class:is-visible={visible}
>
	{@render children()}
</div>

<style>
	.reveal {
		opacity: 0;
		transform: translateY(var(--reveal-y));
		transition:
			opacity 700ms ease,
			transform 700ms cubic-bezier(0.16, 1, 0.3, 1);
		will-change: opacity, transform;
	}

	.reveal.is-visible {
		opacity: 1;
		transform: translateY(0);
	}

	@media (prefers-reduced-motion: reduce) {
		.reveal {
			opacity: 1;
			transform: none;
			transition: none;
		}
	}
</style>
