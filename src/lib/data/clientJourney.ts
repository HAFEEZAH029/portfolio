export type ClientJourneyPhase = {
	title: string;
	detail: string;
	className: string;
};

export const clientJourneyPhases: ClientJourneyPhase[] = [
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
