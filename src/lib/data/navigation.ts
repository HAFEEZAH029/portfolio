import type { IconProps } from 'lucide-svelte';
import Boxes from 'lucide-svelte/icons/boxes';
import PanelsTopLeft from 'lucide-svelte/icons/panels-top-left';
import Route from 'lucide-svelte/icons/route';
import type { ComponentType, SvelteComponent } from 'svelte';

export type NavLink = {
	label: string;
	href: string;
	icon: ComponentType<SvelteComponent<IconProps>>;
};

export const navLinks: NavLink[] = [
	{
		label: 'Chronicles',
		href: '#chronicles',
		icon: PanelsTopLeft
	},
	{
		label: 'Arsenal',
		href: '#arsenal',
		icon: Boxes
	},
	{
		label: 'Journey',
		href: '#journey',
		icon: Route
	},
]
