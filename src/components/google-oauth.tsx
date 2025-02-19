'use client';

import * as React from 'react';
import { OAuthStrategy } from '@clerk/types';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { Button } from './ui/button';
import Image from 'next/image';
import { createUser } from '@/app/_actions';
import { Spinner } from './spinner';

export default function OauthSignIn() {
  const { signIn } = useSignIn();
  const { signUp, setActive } = useSignUp();

  if (!signIn || !signUp) {
    return (
      <div className="flex flex-col items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const signInWith = (strategy: OAuthStrategy) => {
    return signIn.authenticateWithRedirect({
      strategy,
      redirectUrl: '/sign-up/sso-callback',
      redirectUrlComplete: '/',
    });
  };

  async function handleSignIn(strategy: OAuthStrategy) {
    if (!signIn || !signUp) return null;

    // If the user has an account in your application, but does not yet
    // have an OAuth account connected to it, you can transfer the OAuth
    // account to the existing user account.
    const userExistsButNeedsToSignIn =
      signUp.verifications.externalAccount.status === 'transferable' &&
      signUp.verifications.externalAccount.error?.code === 'external_account_exists';

    if (userExistsButNeedsToSignIn) {
      const res = await signIn.create({ transfer: true });

      if (res.status === 'complete') {
        setActive({
          session: res.createdSessionId,
        });
      }
    }

    // If the user has an OAuth account but does not yet
    // have an account in your app, you can create an account
    // for them using the OAuth information.
    const userNeedsToBeCreated = signIn.firstFactorVerification.status === 'transferable';

    if (userNeedsToBeCreated) {
      const res = await signUp.create({
        transfer: true,
      });

      if (res.status === 'complete') {
        setActive({
          session: res.createdSessionId,
        });

        const dbCreateResult = await createUser(res.emailAddress, res.createdUserId!);
        if (!dbCreateResult.success) {
          throw new Error(dbCreateResult.error);
        }
      }
    } else {
      // If the user has an account in your application
      // and has an OAuth account connected to it, you can sign them in.
      signInWith(strategy);
    }
  }

  // Render a button for each supported OAuth provider
  // you want to add to your app. This example uses only Google.
  return (
    <Button
      onClick={() => handleSignIn('oauth_google')}
      className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 flex items-center justify-center py-2 px-4 rounded-md shadow-sm"
    >
      <Image src="/google.svg" alt="Google" width={20} height={20} />
      <span className="ml-2 hidden md:block">Continue with Google</span>
      <span className="ml-2 block md:hidden">Google Sign In</span>
    </Button>
  );
}
