export type Project = {
	title: string;
	description: string;
	image: string;
	imageWidth: number;
	imageHeight: number;
	liveUrl: string;
	githubUrl: string;
	tags: string[];
};

export const projects: Project[] = [
	{
		title: 'Audiophile e-commerce app',
		description:
			'A premium end-to-end shopping experience for high-fidelity audio gear. Focused on responsive layouts, cart management and performant checkout flows.',
		image: '/projects/audiophile-preview.jpg',
		imageWidth: 960,
		imageHeight: 413,
		liveUrl: 'https://audiomerce.netlify.app/',
		githubUrl: 'https://github.com/HAFEEZAH029/audiommerce',
		tags: ['Next', 'Redux', 'Prisma']
	},
	{
		title: 'Invoice App',
		description:
			'Advanced invoice management tool for freelancers. Includes real-time status tracking, multi-screen support, and slick modal interactions.',
		image: '/projects/invoice-preview.jpg',
		imageWidth: 960,
		imageHeight: 433,
		liveUrl: 'https://invoicemngt.netlify.app/',
		githubUrl: 'https://github.com/HAFEEZAH029/invoice-mngt',
		tags: ['TypeScript', 'Next.js', 'Storage']
	},
	{
		title: 'Habit Tracker',
		description:
			'A mobile-first PWA that lets users create and manage daily habits, mark them complete for the current day, and track streaks over time.',
		image: '/projects/tracker-preview.jpg',
		imageWidth: 960,
		imageHeight: 500,
		liveUrl: 'https://routinestracker.netlify.app/',
		githubUrl: 'https://github.com/HAFEEZAH029/habit-tracker',
		tags: ['NextJS', 'Tailwind', 'Typescript', 'Playwright']
	},
	{
		title: 'Sanctuary',
		description:
			'An end-to-end messaging platform that enables users send and receive messages, only they can decrypt.',
		image: '/projects/sanctuary-preview.jpg',
		imageWidth: 960,
		imageHeight: 425,
		liveUrl: 'https://sancsecure.netlify.app/',
		githubUrl: 'https://github.com/HAFEEZAH029/sanctuary',
		tags: ['React', 'Tanstack Query', 'Tailwind', 'Typescript', 'Axios']
	}
];
