import { defineEventHandler, readMultipartFormData } from 'h3'

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event)
  const file = formData?.find((f: any) => f.name === 'file')
  if (!file) {
    return { error: 'No file provided' }
  }

  const runtimeConfig = useRuntimeConfig()
  const apiKey = runtimeConfig.openaiApiKey || ''

  const openaiForm = new FormData()
  const fileBlob = new File([file.data], file.filename || 'audio.webm', {
    type: file.type || 'audio/webm'
  })
  openaiForm.append('file', fileBlob)
  openaiForm.append('model', 'whisper-1')

  const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    body: openaiForm
  })

  if (!response.ok) {
    const errText = await response.text()
    return { error: errText }
  }
  const result = await response.json()
  return result
})
