type Props = {
  uuid: string;
}

export const getUserId = async (props: Props): Promise<string> => {
  const { uuid } = props;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/users/${uuid}`, { cache: 'no-store' });
  const user = await res.json();
  return user.id;
}
