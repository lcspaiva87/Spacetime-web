'use client'
import { Trash } from 'lucide-react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
import { toast } from 'react-toastify'
import { useRouter } from 'next/navigation'
export function DeleteMemory({ id }: { id: string }) {
  const router = useRouter()
  async function handleDeleteMemory() {
    const token = Cookie.get('token')

    const response = await api.delete(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    if (response.status === 200) {
      router.push('/')
      toast.success('Memória deletada com sucesso!')

      return response
    } else {
      toast.error('Erro ao tentar apagar memória!')
    }
  }

  return (
    <button
      onClick={handleDeleteMemory}
      className="flex items-center gap-2 text-sm text-gray-200 hover:text-gray-100"
    >
      Apagar
      <Trash className="h-4 w-4" />
    </button>
  )
}
