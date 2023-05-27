'use client'
import { Trash } from 'lucide-react'
import { api } from '@/lib/api'
import Cookie from 'js-cookie'
export function DeleteMemory({ id }: { id: string }) {
  async function handleDeleteMemory() {
    const token = Cookie.get('token')
    const response = await api.delete(`/memories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    return response
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
