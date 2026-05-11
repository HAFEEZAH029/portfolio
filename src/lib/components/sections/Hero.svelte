<script lang="ts">
	import BriefcaseBusiness from 'lucide-svelte/icons/briefcase-business';
	import Code2 from 'lucide-svelte/icons/code-2';
	import Mail from 'lucide-svelte/icons/mail';

	const socials = [
		{
			label: 'GitHub',
			href: 'https://github.com/HAFEEZAH029',
			icon: Code2
		},
		{
			label: 'LinkedIn',
			href: 'https://www.linkedin.com/feed/',
			icon: BriefcaseBusiness
		},
		{
			label: 'Email',
			href: 'https://mail.google.com/',
			icon: Mail
		}
	];
</script>

<section
	id="top"
	class="relative isolate overflow-hidden px-5 pb-24 pt-16 md:px-8 md:pb-28 md:pt-24 lg:min-h-130 lg:pt-28"
>
	<div class="hero-grid absolute inset-0 -z-20"></div>
	<div class="hero-glow absolute right-48 top-8 -z-10 h-80 w-80 rounded-full bg-(--color-secondary)/20 blur-3xl md:right-0"></div>
	<div class="hero-orb absolute left-8 top-24 -z-10 h-32 w-32 rounded-full bg-(--color-primary)/10 blur-2xl"></div>

	<div class="container-shell">
		<div class="max-w-3xl">
			<p
				class="hero-kicker mb-5 text-xs font-semibold uppercase tracking-[0.24em] text-(--color-primary)"
			>
				// Available for collaborations
			</p>

			<h1
				class="hero-title max-w-4xl text-4xl font-bold leading-[1.04] tracking-[-0.04em] text-(--color-text) md:text-6xl lg:text-7xl"
			>
				Frontend Engineer &amp;
				<span class="text-(--color-primary)">Visual Designer</span>
			</h1>

			<p class="hero-copy mt-5 max-w-2xl text-sm leading-7 text-(--color-muted) md:text-base">
				Crafting immersive digital interfaces where high-performance engineering meets cinematic
				aesthetics. Specialized in building interactive mastery through precise frontend architecture.
			</p>

			<div class="hero-actions mt-8 flex flex-wrap items-center gap-4">
				<a
					href="/resume.pdf"
					download
					class="inline-flex min-h-11 items-center justify-center rounded-sm bg-(--color-primary) px-6 text-xs font-bold uppercase tracking-wider text-slate-950 transition hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(0,240,255,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)"
				>
					Download Resume
				</a>

				<div class="flex items-center gap-3" aria-label="Social links">
					{#each socials as social}
						{@const Icon = social.icon}

						<a
							href={social.href}
							target="_blank"
							rel="noreferrer"
							aria-label={social.label}
							class="grid h-10 w-10 place-items-center rounded-sm border border-(--color-border) bg-(--color-surface)/70 text-slate-300 transition hover:-translate-y-1 hover:border-(--color-primary) hover:text-(--color-primary) focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary)"
						>
							<Icon size={16} strokeWidth={1.8} />
						</a>
					{/each}
				</div>
			</div>
		</div>
	</div>
</section>

<style>
	.hero-grid {
		background-image:
			linear-gradient(rgba(0, 240, 255, 0.03) 1px, transparent 1px),
			linear-gradient(90deg, rgba(0, 240, 255, 0.03) 1px, transparent 1px);
		background-size: 36px 36px;
		mask-image: linear-gradient(to bottom, black, transparent 85%);
	}

	.hero-glow {
		animation: pulse-glow 7s ease-in-out infinite alternate;
	}

	.hero-orb {
		animation: float-orb 9s ease-in-out infinite;
	}

	.hero-kicker,
	.hero-title,
	.hero-copy,
	.hero-actions {
		opacity: 0;
		transform: translateY(22px);
		animation: hero-reveal 800ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
	}

	.hero-title {
		animation-delay: 120ms;
	}

	.hero-copy {
		animation-delay: 220ms;
	}

	.hero-actions {
		animation-delay: 320ms;
	}

	@keyframes hero-reveal {
		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@keyframes pulse-glow {
		from {
			opacity: 0.45;
			transform: scale(0.95);
		}

		to {
			opacity: 0.8;
			transform: scale(1.08);
		}
	}

	@keyframes float-orb {
		0%,
		100% {
			transform: translate3d(0, 0, 0);
		}

		50% {
			transform: translate3d(18px, -18px, 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-glow,
		.hero-orb,
		.hero-kicker,
		.hero-title,
		.hero-copy,
		.hero-actions {
			animation: none;
			opacity: 1;
			transform: none;
		}
	}
</style>
