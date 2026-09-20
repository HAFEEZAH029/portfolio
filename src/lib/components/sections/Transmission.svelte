<script lang="ts">
	import ClientJourneyGraph from '$lib/components/ui/ClientJourneyGraph.svelte';
	import Reveal from '$lib/components/ui/Reveal.svelte';
	import { sanitizeFormValues, sanitizeInput } from '$lib/utils/sanitize';

	type Field = 'name' | 'email' | 'message';
	type FormValues = Record<Field, string>;
	type FormErrors = Partial<Record<Field, string>>;

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
	let showSuccessToast = $state(false);
	let toastTimer: ReturnType<typeof setTimeout> | undefined;

	const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const emptyValues: FormValues = {
		name: '',
		email: '',
		message: ''
	};
	const untouchedFields: Record<Field, boolean> = {
		name: false,
		email: false,
		message: false
	};

	function hideSuccessToast() {
		showSuccessToast = false;
	}

	function queueSuccessToast() {
		if (toastTimer) {
			clearTimeout(toastTimer);
		}

		showSuccessToast = true;
		toastTimer = setTimeout(() => {
			hideSuccessToast();
			toastTimer = undefined;
		}, 10000);
	}

	$effect(() => {
		return () => {
			if (toastTimer) {
				clearTimeout(toastTimer);
			}
		};
	});

	function validate(formValues: FormValues): FormErrors {
		const nextErrors: FormErrors = {};
		const cleanValues = sanitizeFormValues(formValues);

		if (!cleanValues.name) {
			nextErrors.name = 'Enter your name.';
		} else if (cleanValues.name.length < 2) {
			nextErrors.name = 'Name must be at least 2 characters.';
		}

		if (!cleanValues.email) {
			nextErrors.email = 'Enter your email address.';
		} else if (!emailPattern.test(cleanValues.email)) {
			nextErrors.email = 'Enter a valid email address.';
		}

		if (!cleanValues.message) {
			nextErrors.message = 'Write a message.';
		} else if (cleanValues.message.length < 12) {
			nextErrors.message = 'Message must be at least 12 characters.';
		}

		return nextErrors;
	}

	function validateField(field: Field) {
		touched[field] = true;
		values[field] = sanitizeInput(values[field]);
		errors = validate(values);
	}

	function handleSubmit(event: SubmitEvent) {
		event.preventDefault();

		touched = {
			name: true,
			email: true,
			message: true
		};

		values = sanitizeFormValues(values);
		errors = validate(values);

		if (Object.keys(errors).length > 0) {
			hideSuccessToast();
			return;
		}

		values = { ...emptyValues };
		touched = { ...untouchedFields };
		queueSuccessToast();
	}

	function shouldShowError(field: Field) {
		return touched[field] && Boolean(errors[field]);
	}
</script>

<section id="transmission" class="px-5 py-14 md:px-8 md:py-18 lg:py-20">
	<div class="container-shell">
		<div class="transmission-layout">
			<Reveal y={22}>
				<ClientJourneyGraph />
			</Reveal>

			<Reveal y={22}>
				<form class="transmission-card" novalidate onsubmit={handleSubmit}>
					{#if showSuccessToast}
						<div class="success-toast" role="status" aria-live="polite">
							Message packet validated and transmitted successfully.
						</div>
					{/if}

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

	.transmission-card {
		position: relative;
		margin-inline: auto;
		width: min(100%, 35rem);
		border: 1px solid color-mix(in srgb, var(--color-primary) 42%, transparent);
		background:
			linear-gradient(145deg, rgba(0, 240, 255, 0.045), transparent 34%), var(--color-card-solid);
		padding: clamp(1.45rem, 5vw, 4rem);
		box-shadow: 0 1.5rem 4rem rgba(0, 0, 0, 0.25);
	}

	.success-toast {
		position: absolute;
		top: 1rem;
		right: 1rem;
		left: 1rem;
		z-index: 1;
		border: 1px solid color-mix(in srgb, var(--color-primary) 56%, transparent);
		background: color-mix(in srgb, var(--color-card-solid) 86%, var(--color-primary) 14%);
		padding: 0.85rem 1rem;
		box-shadow: 0 1rem 2.5rem rgba(0, 0, 0, 0.28);
		font-family: var(--font-mono);
		font-size: 0.66rem;
		font-weight: 700;
		line-height: 1.5;
		text-align: center;
		color: var(--color-primary);
		animation: toast-in 220ms ease both;
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
		border: 1px solid transparent;
		border-radius: 0;
		background: var(--color-field);
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
		background: var(--color-field-focus);
	}

	input.error,
	textarea.error {
		border-color: var(--color-danger);
		box-shadow: 0 0 0 2px rgba(251, 113, 133, 0.12);
	}

	.field-error {
		margin-top: 0.4rem;
		font-family: var(--font-mono);
		font-size: 0.62rem;
		line-height: 1.5;
		color: var(--color-danger);
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
		color: var(--color-primary-contrast);
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

	@keyframes toast-in {
		from {
			opacity: 0;
			transform: translateY(-0.5rem);
		}

		to {
			opacity: 1;
			transform: translateY(0);
		}
	}

	@media (min-width: 768px) {
		.transmission-card {
			width: min(100%, 34.5rem);
		}
	}

	@media (min-width: 1024px) {
		.transmission-layout {
			grid-template-columns: minmax(0, 1.03fr) minmax(22rem, 0.97fr);
		}

		.transmission-card {
			margin-right: 0;
			width: min(100%, 35rem);
		}
	}

	@media (prefers-reduced-motion: reduce) {
		input,
		textarea,
		.submit-button,
		.success-toast {
			animation: none;
			transition: none;
		}

		.submit-button:hover,
		.submit-button:focus-visible {
			transform: none;
		}
	}
</style>
