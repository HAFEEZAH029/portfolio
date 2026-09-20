<script lang="ts">
	type Props = {
		eyebrow?: string;
		title: string;
		description?: string;
	};

	let { eyebrow, title, description }: Props = $props();
</script>

<div class="mx-auto mb-10 max-w-2xl text-center md:mb-14">
	{#if eyebrow}
		<p class="mb-3 font-(--font-mono) text-xs uppercase tracking-[0.24em] text-(--color-primary)">
			{eyebrow}
		</p>
	{/if}

	<h2 class="font-boldtext-2xl font-bold tracking-tight text---color-text) md:text-4xl">
		{title}
	</h2>

	{#if description}
		<p class="mt-3 text-sm leading-7 text-(--color-muted) md:text-base">
			{description}
		</p>
	{/if}
</div>