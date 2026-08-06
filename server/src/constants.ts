// roles
export const ROLES = ['admin', 'user'] as const;
export type Role = (typeof ROLES)[number];

// password salt
export const SALT_ROUNDS = 10;
