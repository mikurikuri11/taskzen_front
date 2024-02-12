import { getServerSession } from 'next-auth/next'
import { getCategory } from '@/features/category/api/category/getCategory'
import { CategoryTable } from '@/features/category/components/category-setting/CategoryTable'
import { nextAuthOptions } from '@/libs/next-auth/options'

export default async function Page() {
  const session = await getServerSession(nextAuthOptions)
  const userId = session?.user.id
  const categories = await getCategory({ id: userId })

  return <CategoryTable categories={categories} />
}
