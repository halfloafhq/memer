import { redirect } from "next/navigation";
import { checkRole } from "@/utils/roles";
import { SearchUsers } from "./_components/SearchUsers";
import { clerkClient } from "@clerk/nextjs/server";
import { Button } from "@/components/ui/button";
import { Ban, ShieldMinus, ShieldPlus } from "lucide-react";

export default async function AdminDashboardUsersPage(params: {
  searchParams: { search?: string };
}) {
  if (!checkRole("admin")) {
    redirect("/");
  }
  const query = params.searchParams.search;
  const userCount = await clerkClient.users.getCount() - 1;
  const users = (await clerkClient.users.getUserList())
    ? (await clerkClient.users.getUserList({ query })).data
    : [];

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Total Users: {userCount}</h1>
      <SearchUsers />
      <div className="mt-8">
        {users.length === 0 ? (
          <p className="text-gray-500">Search for a user.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {users
              .filter((user) => user.publicMetadata.role !== "admin")
              .map((user) => (
                <div
                  key={user.id}
                  className="bg-white rounded-lg shadow-md p-6"
                >
                  <div className="flex items-center mb-4">
                    <img
                      src={user.imageUrl}
                      alt={`${user.firstName} ${user.lastName}`}
                      className="w-12 h-12 rounded-full mr-4"
                    />
                    <div>
                      <h2 className="text-xl font-semibold">
                        {user.firstName} {user.lastName}
                      </h2>
                      <p className="text-sm text-gray-600">
                        {
                          user.emailAddresses.find(
                            (email) => email.id === user.primaryEmailAddressId,
                          )?.emailAddress
                        }
                      </p>
                    </div>
                  </div>
                  <p className="mb-4">
                    <span className="font-semibold">Role:</span>{" "}
                    {user.publicMetadata.role as string}
                  </p>
                  <div className="flex space-x-2">
                    <Button
                      type="submit"
                      className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded"
                    >
                      <ShieldPlus className="mr-2" />
                      Make Moderator
                    </Button>
                    {user?.banned ? (
                      <Button
                        type="submit"
                        className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
                      >
                        <ShieldMinus className="mr-2" />
                        Unban User
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded"
                      >
                        <Ban className="mr-2" />
                        Ban User
                      </Button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        )}
      </div>
    </main>
  );
}
