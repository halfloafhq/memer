import { redirect } from 'next/navigation';
import { checkRole } from '@/utils/roles';
import { clerkClient } from '@clerk/nextjs/server';
import UserCard from './_components/user-card';
import SearchUsers from '@/components/users/search-users';

export default async function AdminDashboardUsersPage(params: {
  searchParams: { search?: string };
}) {
  if (!checkRole('admin')) {
    redirect('/');
  }
  const query = params.searchParams.search;
  const userCount = (await clerkClient.users.getCount()) - 1;
  const users = (await clerkClient.users.getUserList())
    ? (await clerkClient.users.getUserList({ query })).data
    : [];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Total Users: {userCount}</h1>
      <SearchUsers />
      <div className="mt-8">
        {users.length === 0 ? (
          <p className="text-gray-500">No user found.</p>
        ) : (
          <div className="grid gap-6 grid-cols-1">
            {users
              .filter((user) => user.publicMetadata.role !== 'admin')
              .map((user) => (
                <UserCard
                  key={user.id}
                  userId={user.id}
                  profileImage={user.imageUrl}
                  firstName={user.firstName}
                  lastName={user.lastName}
                  banned={user.banned}
                  email={
                    user.emailAddresses.find((email) => email.id === user.primaryEmailAddressId)
                      ?.emailAddress
                  }
                  role={user.publicMetadata.role as string}
                />
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
