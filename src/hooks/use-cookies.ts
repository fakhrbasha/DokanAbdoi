'use server';

import { cookies } from 'next/headers';

export async function setCookie(name: string, token: string): Promise<void> {
  // Set the cookie with a maxAge of 1 day from now
  const OneDay = 24 * 60 * 60 * 1000;
  (await cookies()).set(name, token, { maxAge: OneDay });
}

export async function deleteCookie(name: string): Promise<void> {
  (await cookies()).delete(name);
}

