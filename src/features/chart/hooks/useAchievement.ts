import useSWR from "swr";

async function fetchAchievement(url: string) {
  const res = await fetch(url);
  return res.json();
}

export function useAchievement(id: string | null) {
  const { data, error, isLoading } = useSWR(
    id ? `${process.env.NEXT_PUBLIC_API_URL}/api/v1/achievements/achievements_by_uid/${id}` : null,
    fetchAchievement
  );

  return { data, error, isLoading };
}
