<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';
	import NavBar from '$lib/components/layout/NavBar.svelte';
	import StickyMenu from '$lib/components/layout/StickyMenu.svelte';
	import Footer from '$lib/components/layout/Footer.svelte';

	let { children } = $props();
</script>

<svelte:head>
	<title>vSTUDIO_CORE | Frontend Engineer Portfolio</title>
	<meta
		name="description"
		content="Interactive SvelteKit portfolio for a frontend engineer and visual designer, featuring selected projects, technical skills, process, and contact details."
	/>
	<meta name="robots" content="index, follow" />
	<meta name="theme-color" content="#020b0c" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="vSTUDIO_CORE | Frontend Engineer Portfolio" />
	<meta
		property="og:description"
		content="Explore frontend projects, interaction design work, technical skills, and collaboration details."
	/>
	<meta property="og:url" content="https://khayport.netlify.app/" />
	<meta
		property="og:image"
		content="https://khayport.netlify.app/projects/audiophile-preview.jpg"
	/>
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content="vSTUDIO_CORE | Frontend Engineer Portfolio" />
	<meta
		name="twitter:description"
		content="Interactive frontend engineer portfolio built with SvelteKit, TypeScript, and Tailwind CSS."
	/>
	<meta
		name="twitter:image"
		content="https://khayport.netlify.app/projects/audiophile-preview.jpg"
	/>
	<link rel="canonical" href="https://khayport.netlify.app/" />
	<link rel="icon" href={favicon} />
</svelte:head>

<NavBar />

<main>
	{@render children()}
</main>

<StickyMenu />

<Footer />
