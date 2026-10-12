import Code2 from 'lucide-svelte/icons/code-2';
import Atom from 'lucide-svelte/icons/atom';
import Layers from 'lucide-svelte/icons/layers';
import Wind from 'lucide-svelte/icons/wind';
import Zap from 'lucide-svelte/icons/zap';
import type { IconProps } from 'lucide-svelte';
import type { ComponentType, SvelteComponent } from 'svelte';

export type Skill = {
	name: string;
	icon: ComponentType<SvelteComponent<IconProps>>;
	details: string[];
};

export const skills: Skill[] = [
	{
		name: 'React',
		icon: Atom,
		details: ['</> Component-driven interfaces', '</> Hooks and state logic', '</> Reusable UI patterns']
	},
	{
		name: 'Next.js',
		icon: Layers,
		details: ['</> App Router architecture', '</> Server actions workflow', '</> Production-ready routing']
	},
	{
		name: 'TypeScript',
		icon: Code2,
		details: ['</> Safer component props', '</> Predictable data models', '</> Fewer runtime bugs']
	},
	{
		name: 'Tailwind CSS',
		icon: Wind,
		details: ['</> Responsive design systems', '</> Utility-first styling', '</> Fast UI iteration']
	},
	{
		name: 'Framer Motion',
		icon: Zap,
		details: ['</> Smooth UI transitions', '</> Staggered reveal flows', '</> Interaction micro-motion']
	}
];
