export const sanitizeInput = (value: string) =>
	value.replace(/[\u0000-\u0008\u000b-\u001f\u007f]/g, '').replace(/[<>]/g, '');

export const sanitizeTrimmedInput = (value: string) => sanitizeInput(value).trim();

export const sanitizeFormValues = <T extends Record<string, string>>(values: T): T =>
	Object.fromEntries(
		Object.entries(values).map(([key, value]) => [key, sanitizeTrimmedInput(value)])
	) as T;
