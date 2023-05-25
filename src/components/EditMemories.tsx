'use client'
import { FormEvent, useState } from 'react'
import Cookie from 'js-cookie'
import { Camera } from 'lucide-react'
import { MediaPickerEdit } from './EditMemories/MediaPickerEdit'
import { api } from '@/lib/api'
import { useRouter } from 'next/navigation'

interface Memory {
  id: string
  coverUrls: string
  content: string
  isPublic: boolean
  createAt: string
}
export function EditMemoryForm({ coverUrls, id, content, isPublic }: Memory) {
  const router = useRouter()
  const [isCheck, setIscheck] = useState(isPublic)

  async function handleCreateMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    let coverUrl = ''
    const file = formData.get('coverUrl')
    if (file === null || file === undefined) {
      const fileToUpload = formData.get('coverUrl')
      if (fileToUpload) {
        const uploadFormData = new FormData()
        uploadFormData.set('file', fileToUpload)
        const uploadResponse = await api.post('/upload', uploadFormData)
        coverUrl = uploadResponse.data.fileUrl
      }
    } else {
      // eslint-disable-next-line no-self-assign
      coverUrl = coverUrls
    }

    const token = Cookie.get('token')
    console.log('coverUrl', coverUrl)
    await api.put(
      `/memories/${id}`,
      {
        coverUrl,
        content: formData.get('content'),
        isPublic: formData.get('isPublic'),
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )

    router.push('/')
  }
  const handleCheckboxChange = () => {
    setIscheck(!isCheck)
  }
  return (
    <form onSubmit={handleCreateMemory} className="flex flex-1 flex-col gap-2">
      <div className="flex items-center gap-4">
        <label
          htmlFor="media"
          className="flex cursor-pointer items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <Camera className="h-4 w-4" />
          Anexar mídia
        </label>

        <label
          htmlFor="isPublic"
          className="flex items-center gap-1.5 text-sm text-gray-200 hover:text-gray-100"
        >
          <input
            type="checkbox"
            name="isPublic"
            id="isPublic"
            value="true"
            className="h-4 w-4 rounded border-gray-400 bg-gray-700 text-purple-500"
            checked={isCheck}
            onChange={handleCheckboxChange}
          />
          Tornar memória pública
        </label>
      </div>

      <MediaPickerEdit media={coverUrls} />

      <textarea
        name="content"
        spellCheck={false}
        className="w-full flex-1 resize-none rounded border-0 bg-transparent p-0 text-lg leading-relaxed text-gray-100 placeholder:text-gray-400 focus:ring-0"
        placeholder="Fique livre para adicionar fotos, vídeos e relatos sobre essa experiência que você quer lembrar para sempre."
        defaultValue={content}
      />

      <button
        type="submit"
        className="inline-block self-end rounded-full bg-green-500 px-5 py-3 font-alt text-sm uppercase leading-none text-black hover:bg-green-600"
      >
        Salvar
      </button>
    </form>
  )
}
