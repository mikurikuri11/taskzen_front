import { useSession, signOut } from 'next-auth/react';

export const LogoutButton = () => {
	const { data: session } = useSession();

		return (
				<button
					type="button"
					className='rounded-md bg-red-500 px-4 py-3 text-lg font-semibold text-white shadow-sm hover:bg-red-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-500'
					onClick={() => signOut()}
				>
					ログアウト
				</button>
		);
}
