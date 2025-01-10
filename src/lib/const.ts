export const Languages = ['en', 'ja'] as const;
export type Language = (typeof Languages)[number];
