'use client';

import { SessionProvider } from 'next-auth/react';
import { NextAuthProviderProps } from './types';


const NextAuthProvider = ({ children }: NextAuthProviderProps ) => {
	return <SessionProvider>{children}</SessionProvider>;
};

export default NextAuthProvider;
