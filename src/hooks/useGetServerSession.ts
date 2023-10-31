import { getServerSession, Session } from "next-auth";

export interface SessionInfo {
  name: string;
  email: string;
}

export const useGetServerSession = async (): Promise<SessionInfo | null> => {
  const session: Session | null = await getServerSession();
  if (!session) return null;
  return {
    name: session.user?.name ?? '',
    email: session.user?.email ?? '',
  };
};
