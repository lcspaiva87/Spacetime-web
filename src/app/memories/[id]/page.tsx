import { NewMemoryForm } from '@/components/NewMemoryForm'
import { ChevronLeft } from 'lucide-react'
import { cookies } from 'next/headers'
import { api } from '@/lib/api'
import Link from 'next/link'
interface Memory {
  id: string
  coverUrl: string
  excerpt: string
  createdAt: string
}
export default async function EditMemory({
  params,
}: {
  params: { id: string }
}) {
  const idMemory = params.id
  const token = cookies().get('token')?.value
  const response = await api.get(`/memories/${idMemory}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  const memories: Memory[] = response.data
  console.log(memories)
  return (
    <div className="flex flex-1 flex-col gap-4">
      <Link
        href="/"
        className="flex items-center gap-1 text-sm text-gray-200 hover:text-gray-100"
      >
        <ChevronLeft className="h-4 w-4" />
        voltar a timeline
      </Link>
      <NewMemoryForm />
    </div>
  )
}
