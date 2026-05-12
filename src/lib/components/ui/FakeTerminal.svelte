<script lang="ts">
	import { createTerminalCommands, terminalCommandLabels } from '$lib/data/commands';
	import { toggleTheme } from '$lib/store/theme';
	import Code2 from 'lucide-svelte/icons/code-2';

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
</script>

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

<style>
	.terminal-panel {
		position: relative;
		overflow: hidden;
		border: 1px solid color-mix(in srgb, var(--color-primary) 34%, transparent);
		border-radius: 6px;
		background:
			linear-gradient(135deg, rgba(0, 240, 255, 0.08), transparent 34%),
			color-mix(in srgb, var(--color-surface) 90%, var(--color-card-solid));
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
		background: color-mix(in srgb, var(--color-card-solid) 78%, transparent);
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
		color: var(--color-danger);
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
		.terminal-panel {
			animation: none;
		}
	}
</style>
