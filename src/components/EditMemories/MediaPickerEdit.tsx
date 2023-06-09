'use client'
import { ChangeEvent, useState } from 'react'
export function MediaPickerEdit({ media }: { media: string }) {
  const [preview, setPreview] = useState<string | null>(media)

  function onFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target
    if (!files || files.length === 0) {
      return
    }

    const previewURL = URL.createObjectURL(files[0])
    setPreview(previewURL)
  }

  return (
    <>
      <input
        onChange={onFileSelected}
        type="file"
        name="coverUrl"
        id="media"
        accept="image/*"
        className="invisible h-0 w-0"
      />

      {preview && (
        // eslint-disable-next-line
      <img
          src={preview}
          alt=""
          className="aspect-video w-full rounded-lg object-cover"
        />
      )}
    </>
  )
}
