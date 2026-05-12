<script lang="ts">
	import Reveal from '$lib/components/ui/Reveal.svelte';

	type Field = 'name' | 'email' | 'message';
	type FormValues = Record<Field, string>;
	type FormErrors = Partial<Record<Field, string>>;

	const journeyPhases = [
		{
			title: 'Consultation',
			detail: 'Align goals and project needs',
			className: 'consultation'
		},
		{
			title: 'Onboarding',
			detail: 'Assets, access, and direction',
			className: 'onboarding'
		},
		{
			title: 'Proposal',
			detail: 'Scope, timeline, and deliverables',
			className: 'proposal'
		},
		{
			title: 'Prototyping',
			detail: 'Wireframes into interactive flow',
			className: 'prototyping'
		},
		{
			title: 'Development',
			detail: 'Build responsive frontend systems',
			className: 'development'
		},
		{
			title: 'Testing',
			detail: 'Polish, QA, and accessibility',
			className: 'testing'
		},
		{
			title: 'Launch',
			detail: 'Deploy, handoff, and support',
			className: 'launch'
		}
	];

	let values = $state<FormValues>({
		name: '',
		email: '',
		message: ''
	});

	let touched = $state<Record<Field, boolean>>({
		name: false,
		email: false,
		message: false
	});

	let errors = $state<FormErrors>({});
	let submitted = $state(false);

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	function validate(formValues: FormValues): FormErrors {
		const nextErrors: FormErrors = {};

		if (!formValues.name.trim()) {
			nextErrors.name = 'Enter your name.';
		} else if (formValues.name.trim().length < 2) {
			nextErrors.name = 'Name must be at least 2 characters.';
		}

		if (!formValues.email.trim()) {
			nextErrors.email = 'Enter your email address.';
		} else if (!emailPattern.test(formValues.email.trim())) {
			nextErrors.email = 'Enter a valid email address.';
		}

		if (!formValues.message.trim()) {
			nextErrors.message = 'Write a message.';
		} else if (formValues.message.trim().length < 12) {
			nextErrors.message = 'Message must be at least 12 characters.';
		}

		return nextErrors;
	}

	function validateField(field: Field) {
		touched[field] = true;
		errors = validate(values);
		submitted = false;
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		touched = {
			name: true,
			email: true,
			message: true
		};

		errors = validate(values);
		submitted = Object.keys(errors).length === 0;
	}

	function shouldShowError(field: Field) {
		return touched[field] && Boolean(errors[field]);
	}
</script>

<section id="transmission" class="px-5 py-14 md:px-8 md:py-18 lg:py-20">
	<div class="container-shell">
		<div class="transmission-layout">
			<Reveal y={22}>
				<div class="journey-structure" aria-labelledby="journey-structure-title">
					<div class="structure-heading">
						<p>// client journey map</p>
						<h2 id="journey-structure-title">PROCESS_TREE</h2>
					</div>

					<div class="structure-graph">
						<svg class="graph-lines" viewBox="0 0 100 100" aria-hidden="true">
							<defs>
								<linearGradient id="signal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
									<stop offset="0%" stop-color="rgba(0, 240, 255, 0.05)" />
									<stop offset="42%" stop-color="rgba(0, 240, 255, 0.95)" />
									<stop offset="100%" stop-color="rgba(139, 92, 246, 0.08)" />
								</linearGradient>
							</defs>

							<path class="connector base" d="M50 10 L27 27" />
							<path class="connector base" d="M50 10 L73 27" />
							<path class="connector base" d="M27 37 L50 50" />
							<path class="connector base" d="M73 37 L50 50" />
							<path class="connector base" d="M50 60 L31 72" />
							<path class="connector base" d="M31 82 L50 92" />
							<path class="connector base" d="M69 82 L50 92" />
							<path class="connector base" d="M31 72 L69 72" />

							<path class="connector pulse pulse-a" d="M50 10 L27 27" />
							<path class="connector pulse pulse-b" d="M50 10 L73 27" />
							<path class="connector pulse pulse-c" d="M27 37 L50 50" />
							<path class="connector pulse pulse-d" d="M73 37 L50 50" />
							<path class="connector pulse pulse-e" d="M50 60 L31 72" />
							<path class="connector pulse pulse-f" d="M31 82 L50 92" />
							<path class="connector pulse pulse-g" d="M69 82 L50 92" />
							<path class="connector pulse pulse-h" d="M31 72 L69 72" />
						</svg>

						{#each journeyPhases as phase}
							<button class={`phase-node ${phase.className}`} type="button">
								<span class="phase-card">
									<span class="phase-face phase-front">{phase.title}</span>
									<span class="phase-face phase-back">{phase.detail}</span>
								</span>
							</button>
						{/each}
					</div>
				</div>
			</Reveal>

			<Reveal y={22}>
				<form class="transmission-card" novalidate onsubmit={handleSubmit}>
					<div class="form-heading">
						<h2>TRANSMISSION</h2>
						<p>Open for collaborations and technical inquiries.</p>
					</div>

					<div class="field-group">
						<label for="contact-name">IDENTIFIER (NAME)</label>
						<input
							id="contact-name"
							name="name"
							type="text"
							autocomplete="name"
							placeholder="John Doe"
							bind:value={values.name}
							aria-invalid={shouldShowError('name')}
							aria-describedby={shouldShowError('name') ? 'contact-name-error' : undefined}
							class:error={shouldShowError('name')}
							onblur={() => validateField('name')}
							oninput={() => {
								if (touched.name) validateField('name');
							}}
						/>

						{#if shouldShowError('name')}
							<p id="contact-name-error" class="field-error">{errors.name}</p>
						{/if}
					</div>

					<div class="field-group">
						<label for="contact-email">SECURE_CHANNEL (EMAIL)</label>
						<input
							id="contact-email"
							name="email"
							type="email"
							autocomplete="email"
							placeholder="john@domain.com"
							bind:value={values.email}
							aria-invalid={shouldShowError('email')}
							aria-describedby={shouldShowError('email') ? 'contact-email-error' : undefined}
							class:error={shouldShowError('email')}
							onblur={() => validateField('email')}
							oninput={() => {
								if (touched.email) validateField('email');
							}}
						/>

						{#if shouldShowError('email')}
							<p id="contact-email-error" class="field-error">{errors.email}</p>
						{/if}
					</div>

					<div class="field-group">
						<label for="contact-message">MESSAGE_PACKET</label>
						<textarea
							id="contact-message"
							name="message"
							rows="5"
							placeholder="Type your message..."
							bind:value={values.message}
							aria-invalid={shouldShowError('message')}
							aria-describedby={shouldShowError('message') ? 'contact-message-error' : undefined}
							class:error={shouldShowError('message')}
							onblur={() => validateField('message')}
							oninput={() => {
								if (touched.message) validateField('message');
							}}
						></textarea>

						{#if shouldShowError('message')}
							<p id="contact-message-error" class="field-error">{errors.message}</p>
						{/if}
					</div>

					<button class="submit-button" type="submit">EXECUTE SEND</button>

					{#if submitted}
						<p class="form-success" role="status">
							Message packet validated and ready to transmit.
						</p>
					{/if}
				</form>
			</Reveal>
		</div>
	</div>
</section>

<style>
	.transmission-layout {
		display: grid;
		align-items: center;
		gap: clamp(2.5rem, 7vw, 5.5rem);
	}

	.journey-structure {
		margin-inline: auto;
		width: min(100%, 38rem);
		animation: graph-float 8s ease-in-out infinite;
	}

	.structure-heading {
		margin-bottom: 1.25rem;
		text-align: center;
	}

	.structure-heading p {
		font-family: var(--font-mono);
		font-size: 0.58rem;
		font-weight: 800;
		letter-spacing: 0.18em;
		text-transform: uppercase;
		color: var(--color-muted);
	}

	.structure-heading h2 {
		margin-top: 0.45rem;
		font-size: clamp(1.05rem, 2.3vw, 1.45rem);
	}

	.structure-graph {
		position: relative;
		aspect-ratio: 1 / 1.16;
		width: min(100%, clamp(18rem, 76vw, 35rem));
		margin-inline: auto;
	}

	.graph-lines {
		position: absolute;
		inset: 4% 3%;
		width: 94%;
		height: 92%;
		overflow: visible;
	}

	.connector {
		fill: none;
		vector-effect: non-scaling-stroke;
		stroke-linecap: round;
		stroke-linejoin: round;
	}

	.connector.base {
		stroke: rgba(0, 240, 255, 0.2);
		stroke-width: 0.85;
	}

	.connector.pulse {
		stroke: url('#signal-gradient');
		stroke-width: 1.15;
		stroke-dasharray: 6 24;
		animation: signal-flow 3.6s linear infinite;
		filter: drop-shadow(0 0 6px rgba(0, 240, 255, 0.72));
	}

	.pulse-b {
		animation-delay: 0.3s;
	}

	.pulse-c {
		animation-delay: 0.65s;
	}

	.pulse-d {
		animation-delay: 0.95s;
	}

	.pulse-e {
		animation-delay: 1.25s;
	}

	.pulse-f {
		animation-delay: 1.6s;
	}

	.pulse-g {
		animation-delay: 1.95s;
	}

	.pulse-h {
		animation-delay: 2.2s;
	}

	.phase-node {
		position: absolute;
		width: clamp(7.2rem, 26vw, 10.8rem);
		height: clamp(3rem, 10vw, 4.4rem);
		border: 0;
		background: transparent;
		padding: 0;
		color: inherit;
		perspective: 900px;
		cursor: pointer;
	}

	.consultation {
		top: 1%;
		left: 50%;
		transform: translateX(-50%);
	}

	.onboarding {
		top: 21%;
		left: 0;
	}

	.proposal {
		top: 21%;
		right: 0;
	}

	.prototyping {
		top: 42%;
		left: 50%;
		transform: translateX(-50%);
	}

	.development {
		top: 64%;
		left: 7%;
	}

	.testing {
		top: 83%;
		left: 50%;
		transform: translateX(-50%);
	}

	.launch {
		top: 64%;
		right: 7%;
	}

	.phase-card {
		position: relative;
		display: block;
		width: 100%;
		height: 100%;
		transform-style: preserve-3d;
		transition: transform 560ms cubic-bezier(0.16, 1, 0.3, 1);
	}

	.phase-node:hover .phase-card,
	.phase-node:focus .phase-card,
	.phase-node:focus-visible .phase-card {
		transform: rotateY(180deg);
	}

	.phase-node:focus-visible {
		outline: none;
	}

	.phase-node:focus-visible .phase-face {
		box-shadow:
			0 0 0 2px var(--color-bg),
			0 0 0 4px var(--color-primary),
			0 0 28px rgba(0, 240, 255, 0.28);
	}

	.phase-face {
		position: absolute;
		inset: 0;
		display: grid;
		place-items: center;
		backface-visibility: hidden;
		border: 1px solid color-mix(in srgb, var(--color-primary) 42%, transparent);
		border-radius: 999px;
		background:
			linear-gradient(135deg, rgba(0, 240, 255, 0.08), transparent 55%),
			color-mix(in srgb, var(--color-surface) 92%, #11131e);
		box-shadow:
			inset 0 0 0 1px rgba(255, 255, 255, 0.03),
			0 0 24px rgba(0, 240, 255, 0.08);
		padding: 0.7rem 1rem;
		font-family: var(--font-mono);
		font-size: clamp(0.62rem, 1.8vw, 0.82rem);
		font-weight: 800;
		line-height: 1.35;
		text-align: center;
		color: var(--color-primary);
	}

	.phase-back {
		transform: rotateY(180deg);
		border-color: color-mix(in srgb, var(--color-secondary) 52%, transparent);
		font-size: clamp(0.58rem, 1.55vw, 0.72rem);
		color: var(--color-text);
	}

	.transmission-card {
		margin-inline: auto;
		width: min(100%, 35rem);
		border: 1px solid rgba(0, 240, 255, 0.42);
		background: linear-gradient(145deg, rgba(0, 240, 255, 0.045), transparent 34%), #11131e;
		padding: clamp(1.45rem, 5vw, 4rem);
		box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.25);
	}

	.form-heading {
		margin-bottom: clamp(1.35rem, 4vw, 2.2rem);
		text-align: center;
	}

	h2 {
		font-family: var(--font-heading);
		font-size: clamp(1.25rem, 3vw, 1.65rem);
		font-weight: 800;
		line-height: 1;
		color: var(--color-primary);
	}

	.form-heading p {
		margin-top: 0.75rem;
		font-size: clamp(0.7rem, 1.4vw, 0.82rem);
		line-height: 1.6;
		color: var(--color-muted);
	}

	.field-group {
		margin-top: 1rem;
	}

	label {
		display: block;
		font-family: var(--font-mono);
		font-size: 0.58rem;
		font-weight: 800;
		letter-spacing: 0.12em;
		color: var(--color-primary);
	}

	input,
	textarea {
		margin-top: 0.45rem;
		width: 100%;
		border: 1px solid rgba(0, 240, 255, 0);
		border-radius: 0;
		background: #061012;
		padding: 0.9rem 1rem;
		font-size: 0.78rem;
		line-height: 1.5;
		color: var(--color-text);
		outline: none;
		transition:
			border-color 180ms ease,
			box-shadow 180ms ease,
			background 180ms ease;
	}

	input::placeholder,
	textarea::placeholder {
		color: rgba(125, 139, 141, 0.62);
	}

	textarea {
		min-height: 7.2rem;
		resize: vertical;
	}

	input:focus,
	textarea:focus {
		border-color: rgba(0, 240, 255, 0.75);
		box-shadow: 0 0 0 2px rgba(0, 240, 255, 0.13);
		background: #071416;
	}

	input.error,
	textarea.error {
		border-color: #fb7185;
		box-shadow: 0 0 0 2px rgba(251, 113, 133, 0.12);
	}

	.field-error {
		margin-top: 0.4rem;
		font-family: var(--font-mono);
		font-size: 0.62rem;
		line-height: 1.5;
		color: #fb7185;
	}

	.submit-button {
		margin-top: 1.35rem;
		min-height: 3.25rem;
		width: 100%;
		border: 1px solid var(--color-primary);
		background: var(--color-primary);
		font-family: var(--font-mono);
		font-size: 0.9rem;
		font-weight: 800;
		letter-spacing: 0.08em;
		color: #021013;
		cursor: pointer;
		transition:
			transform 220ms ease,
			box-shadow 220ms ease,
			background 220ms ease,
			color 220ms ease;
	}

	.submit-button:hover,
	.submit-button:focus-visible {
		transform: translateY(-2px);
		box-shadow: 0 0 28px rgba(0, 240, 255, 0.28);
	}

	.submit-button:focus-visible {
		outline: 2px solid var(--color-primary);
		outline-offset: 3px;
	}

	.form-success {
		margin-top: 0.9rem;
		font-family: var(--font-mono);
		font-size: 0.66rem;
		line-height: 1.5;
		text-align: center;
		color: var(--color-primary);
	}

	@media (min-width: 768px) {
		.structure-graph {
			width: min(100%, 33rem);
		}

		.transmission-card {
			width: min(100%, 34.5rem);
		}
	}

	@media (min-width: 1024px) {
		.transmission-layout {
			grid-template-columns: minmax(0, 1.03fr) minmax(22rem, 0.97fr);
		}

		.journey-structure {
			margin-left: 0;
			width: min(100%, 36rem);
		}

		.structure-heading {
			text-align: left;
		}

		.transmission-card {
			margin-right: 0;
			width: min(100%, 35rem);
		}
	}

	@keyframes graph-float {
		0%,
		100% {
			transform: translate3d(0, 0, 0);
		}

		50% {
			transform: translate3d(0, -10px, 0);
		}
	}

	@keyframes signal-flow {
		to {
			stroke-dashoffset: -60;
		}
	}

	@media (prefers-reduced-motion: reduce) {
		input,
		textarea,
		.submit-button,
		.phase-card {
			transition: none;
		}

		.journey-structure,
		.connector.pulse {
			animation: none;
		}

		.submit-button:hover,
		.submit-button:focus-visible {
			transform: none;
		}
	}
</style>
