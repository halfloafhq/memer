import { Roles } from '@/types/globals';
import { auth } from '@clerk/nextjs/server';

/**
 * Checks user role from session claims
 * @param {Roles} role - User role
 * @returns {Boolean} If user matches role or not
 */
export const checkRole = (role: Roles) => {
  const { sessionClaims } = auth();

  return sessionClaims?.metadata.role === role;
};
