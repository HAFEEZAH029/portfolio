export const terminalCommandLabels = [
	'open chronicles',
	'show arsenal',
	'view journey',
	'contact me',
	'download resume',
	'toggle theme'
] as const;

export type TerminalCommand = (typeof terminalCommandLabels)[number];

type CommandActions = {
	scrollToSection: (sectionId: string) => void;
	downloadResume: () => void;
	toggleTheme: () => void;
};

export const createTerminalCommands = ({
	scrollToSection,
	downloadResume,
	toggleTheme
}: CommandActions): Record<TerminalCommand, () => void> => ({
	'open chronicles': () => scrollToSection('chronicles'),
	'show arsenal': () => scrollToSection('arsenal'),
	'view journey': () => scrollToSection('journey'),
	'contact me': () => scrollToSection('transmission'),
	'download resume': () => downloadResume(),
	'toggle theme': () => toggleTheme()
});
