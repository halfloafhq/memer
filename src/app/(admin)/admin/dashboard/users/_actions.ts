'use server';

import { clerkClient } from '@clerk/nextjs/server';
import { revalidatePath } from 'next/cache';

export async function banUserAction(formData: FormData) {
  try {
    const userId = formData.get('userId') as string;
    await clerkClient.users.banUser(userId);
    revalidatePath('/admin/dashboard/users');
  } catch (error) {
    console.error(error);
  }
}

export async function unbanUserAction(formData: FormData) {
  try {
    const userId = formData.get('userId') as string;
    await clerkClient.users.unbanUser(userId);
    revalidatePath('/admin/dashboard/users');
  } catch (error) {
    console.error(error);
  }
}
