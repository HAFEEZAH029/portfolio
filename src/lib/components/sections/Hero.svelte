<script lang="ts">
	import { browser } from '$app/environment';
	import { createTerminalCommands, terminalCommandLabels } from '$lib/data/commands';
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

	let commandInput = $state('');
	let terminalStatus = $state('Ready to execute portfolio commands');
	let terminalTone = $state<'idle' | 'success' | 'error'>('idle');

	const normalizeCommand = (command: string) => command.trim().toLowerCase();

	const scrollToSection = (sectionId: string) => {
		document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
	};

	const downloadResume = () => {
		const link = document.createElement('a');
		link.href = '/resume.pdf';
		link.download = 'resume.pdf';
		document.body.appendChild(link);
		link.click();
		link.remove();
	};

	const toggleTheme = () => {
		const root = document.documentElement;
		const nextTheme = root.dataset.theme === 'light' ? 'dark' : 'light';
		root.dataset.theme = nextTheme;
		localStorage.setItem('studio-theme', nextTheme);
	};

	const commands = createTerminalCommands({
		scrollToSection,
		downloadResume,
		toggleTheme
	});

	const runCommand = () => {
		const command = normalizeCommand(commandInput);

		if (!command) {
			terminalStatus = 'Type a command from the manifest';
			terminalTone = 'idle';
			return;
		}

		if (command in commands) {
			commands[command as keyof typeof commands]();
			commandInput = '';
			terminalStatus = `Executed: ${command}`;
			terminalTone = 'success';
			return;
		}

		terminalStatus = 'Unknown command. Try one from the manifest';
		terminalTone = 'error';
	};

	const handleTerminalKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter') {
			event.preventDefault();
			runCommand();
		}
	};

	if (browser) {
		const storedTheme = localStorage.getItem('studio-theme');

		if (storedTheme === 'light' || storedTheme === 'dark') {
			document.documentElement.dataset.theme = storedTheme;
		}
	}
</script>

<section
	id="top"
	class="relative isolate overflow-hidden px-5 pt-16 pb-24 md:px-8 md:pt-24 md:pb-28 lg:min-h-130 lg:pt-28"
>
	<div class="hero-grid absolute inset-0 -z-20"></div>
	<div
		class="hero-glow absolute top-8 right-48 -z-10 h-80 w-80 rounded-full bg-(--color-secondary)/20 blur-3xl md:right-0"
	></div>
	<div
		class="hero-orb absolute top-24 left-8 -z-10 h-32 w-32 rounded-full bg-(--color-primary)/10 blur-2xl"
	></div>

	<div class="container-shell">
		<div
			class="hero-shell grid items-center gap-12 lg:grid-cols-[minmax(0,1.08fr)_minmax(320px,0.72fr)]"
		>
			<div class="hero-content max-w-3xl">
				<p
					class="hero-kicker mb-5 text-xs font-semibold tracking-[0.24em] text-(--color-primary) uppercase"
				>
					// Available for collaborations
				</p>

				<h1
					class="hero-title max-w-4xl text-4xl leading-[1.04] font-bold tracking-[-0.04em] text-(--color-text) md:text-6xl lg:text-7xl"
				>
					Frontend Engineer &amp;
					<span class="text-(--color-primary)">Visual Designer</span>
				</h1>

				<p class="hero-copy mt-5 max-w-2xl text-sm leading-7 text-(--color-muted) md:text-base">
					Crafting immersive digital interfaces where high-performance engineering meets cinematic
					aesthetics. Specialized in building interactive mastery through precise frontend
					architecture.
				</p>

				<div class="hero-actions mt-8 flex flex-wrap items-center gap-4">
					<a
						href="/resume.pdf"
						download
						class="inline-flex min-h-11 items-center justify-center rounded-sm bg-(--color-primary) px-6 text-xs font-bold tracking-wider text-slate-950 uppercase transition hover:-translate-y-1 hover:shadow-[0_0_28px_rgba(0,240,255,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-(--color-primary) focus-visible:ring-offset-2 focus-visible:ring-offset-(--color-bg)"
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

			<div class="terminal-wrap justify-self-center lg:justify-self-end">
				<div class="terminal-panel" aria-label="Interactive portfolio terminal">
					<div class="terminal-chrome">
						<div class="terminal-dots" aria-hidden="true">
							<span></span>
							<span></span>
							<span></span>
						</div>
						<p>navigation.command</p>
					</div>

					<div class="terminal-body">
						<p class="terminal-line">
							<span class="terminal-muted">&gt;</span>
							<span>command_manifest</span>
						</p>

						<ul class="terminal-list" aria-label="Available terminal commands">
							{#each terminalCommandLabels as command}
								<li>
									<span class="terminal-muted">+</span>
									<span>{command}</span>
								</li>
							{/each}
						</ul>

						<p
							class="terminal-status"
							class:success={terminalTone === 'success'}
							class:error={terminalTone === 'error'}
						>
							<span>status:</span>
							{terminalStatus}
						</p>

						<label class="terminal-input-row">
							<span>studio:</span>
							<input
								bind:value={commandInput}
								onkeydown={handleTerminalKeydown}
								type="text"
								autocomplete="off"
								autocapitalize="off"
								spellcheck="false"
								aria-label="Type a portfolio terminal command"
								placeholder="type command + enter"
							/>
						</label>
					</div>

					<button
						class="terminal-submit"
						type="button"
						aria-label="Run terminal command"
						onclick={runCommand}
					>
						<Code2 size={18} strokeWidth={1.7} />
					</button>
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
	.hero-actions,
	.terminal-wrap {
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

	.terminal-wrap {
		width: min(100%, 440px);
		animation-delay: 420ms;
	}

	.terminal-panel {
		position: relative;
		overflow: hidden;
		border: 1px solid color-mix(in srgb, var(--color-primary) 34%, transparent);
		border-radius: 6px;
		background:
			linear-gradient(135deg, rgba(0, 240, 255, 0.08), transparent 34%),
			color-mix(in srgb, var(--color-surface) 90%, #111827);
		box-shadow:
			0 0 0 1px rgba(139, 92, 246, 0.12),
			0 24px 80px rgba(0, 0, 0, 0.32),
			0 0 34px rgba(0, 240, 255, 0.13);
		font-family: var(--font-mono);
		animation: terminal-float 6.5s ease-in-out infinite;
	}

	.terminal-panel::before {
		position: absolute;
		inset: 0;
		pointer-events: none;
		content: '';
		background-image: linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px);
		background-size: 100% 9px;
		opacity: 0.35;
	}

	.terminal-chrome {
		position: relative;
		z-index: 1;
		display: grid;
		grid-template-columns: auto 1fr;
		align-items: center;
		gap: 1rem;
		border-bottom: 1px solid rgba(0, 240, 255, 0.1);
		background: rgba(6, 12, 20, 0.78);
		padding: 0.75rem 1rem;
	}

	.terminal-chrome p {
		text-align: center;
		font-size: 0.56rem;
		font-weight: 800;
		letter-spacing: 0.2em;
		text-transform: uppercase;
		color: var(--color-muted);
	}

	.terminal-dots {
		display: flex;
		gap: 0.35rem;
	}

	.terminal-dots span {
		width: 0.48rem;
		height: 0.48rem;
		border-radius: 999px;
		background: var(--color-primary);
		box-shadow: 0 0 12px rgba(0, 240, 255, 0.65);
	}

	.terminal-dots span:nth-child(1) {
		background: #ff5f57;
		box-shadow: none;
	}

	.terminal-dots span:nth-child(2) {
		background: #ffbd2e;
		box-shadow: none;
	}

	.terminal-dots span:nth-child(3) {
		background: #28c840;
		box-shadow: none;
	}

	.terminal-body {
		position: relative;
		z-index: 1;
		min-height: 220px;
		padding: 1.25rem;
		font-size: 0.72rem;
		line-height: 1.9;
		color: color-mix(in srgb, var(--color-text) 86%, transparent);
	}

	.terminal-line,
	.terminal-list li,
	.terminal-status,
	.terminal-input-row {
		display: flex;
		align-items: baseline;
		gap: 0.5rem;
	}

	.terminal-muted {
		color: var(--color-secondary);
	}

	.terminal-list {
		margin: 0.35rem 0 1rem;
		color: var(--color-muted);
	}

	.terminal-status {
		margin-top: 0.9rem;
		color: var(--color-muted);
	}

	.terminal-status span,
	.terminal-input-row span {
		font-weight: 800;
		text-transform: uppercase;
		color: var(--color-secondary);
	}

	.terminal-status.success {
		color: var(--color-primary);
	}

	.terminal-status.error {
		color: #fb7185;
	}

	.terminal-input-row {
		margin-top: 0.2rem;
		color: var(--color-primary);
	}

	.terminal-input-row input {
		min-width: 0;
		flex: 1;
		border: 0;
		background: transparent;
		padding: 0;
		font: inherit;
		color: var(--color-primary);
		caret-color: var(--color-primary);
		outline: none;
	}

	.terminal-input-row input::placeholder {
		color: color-mix(in srgb, var(--color-primary) 48%, transparent);
	}

	.terminal-submit {
		position: absolute;
		right: 0.85rem;
		bottom: 0.85rem;
		z-index: 2;
		display: grid;
		width: 2rem;
		height: 2rem;
		place-items: center;
		border: 1px solid color-mix(in srgb, var(--color-primary) 24%, transparent);
		border-radius: 4px;
		background: rgba(255, 255, 255, 0.03);
		color: var(--color-muted);
		transition:
			border-color 180ms ease,
			color 180ms ease,
			transform 180ms ease;
	}

	.terminal-submit:hover,
	.terminal-submit:focus-visible {
		border-color: var(--color-primary);
		color: var(--color-primary);
		transform: translateY(-1px);
		outline: none;
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

	@keyframes terminal-float {
		0%,
		100% {
			transform: translate3d(0, 0, 0);
		}

		50% {
			transform: translate3d(0, -12px, 0);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		.hero-glow,
		.hero-orb,
		.terminal-panel,
		.hero-kicker,
		.hero-title,
		.hero-copy,
		.hero-actions,
		.terminal-wrap {
			animation: none;
			opacity: 1;
			transform: none;
		}
	}
</style>
