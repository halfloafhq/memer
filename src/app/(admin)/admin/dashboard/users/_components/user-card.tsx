import React from 'react';
import { Button } from '@/components/ui/button';
import { Ban, ShieldMinus, ShieldPlus } from 'lucide-react';
import { banUserAction, unbanUserAction } from '../_actions';
import Image from 'next/image';

interface UserCardProps {
  userId: string;
  profileImage: string;
  firstName: string | null;
  lastName: string | null;
  email: string | undefined;
  banned: boolean;
  role: string | undefined;
}

export default function UserCard({
  userId,
  profileImage,
  firstName,
  lastName,
  banned,
  email,
  role,
}: UserCardProps) {
  return (
    <div key={userId} className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center mb-4">
        <Image
          src={profileImage}
          width={120}
          height={120}
          alt={`${firstName} ${lastName}`}
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-semibold dark:text-black">
            {firstName} {lastName}
          </h2>
          <p className="text-sm text-gray-600 dark:text-black">{email}</p>
        </div>
      </div>
      <p className="mb-4 dark:text-black">
        <span className="font-semibold">Role:</span> {role}
      </p>
      <div className="flex space-x-2">
        <Button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded">
          <ShieldPlus className="mr-2" />
          Make Moderator
        </Button>
        {banned ? (
          <form action={unbanUserAction} className="w-full">
            <input type="hidden" name="userId" value={userId} />
            <Button
              type="submit"
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded"
            >
              <ShieldMinus className="mr-2" />
              Unban User
            </Button>
          </form>
        ) : (
          <form action={banUserAction} className="w-full">
            <input type="hidden" name="userId" value={userId} />
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded">
              <Ban className="mr-2" />
              Ban User
            </Button>
          </form>
        )}
      </div>
    </div>
  );
}
