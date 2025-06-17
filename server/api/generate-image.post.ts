import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const text: string = body?.text || ''
  if (!text) {
    return { error: 'No text provided' }
  }

  const runtimeConfig = useRuntimeConfig()
  const apiKey = runtimeConfig.openaiApiKey || ''

  // Step 1: create a short English prompt from the provided text
  const chatRes = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You create short English prompts for a watercolor style children\'s picture diary.'
        },
        { role: 'user', content: text }
      ]
    })
  })

  if (!chatRes.ok) {
    const errText = await chatRes.text()
    return { error: errText }
  }

  const chatData = await chatRes.json()
  const prompt = chatData.choices?.[0]?.message?.content?.trim() || text

  // Step 2: generate image using DALL-E
  const imageRes = await fetch('https://api.openai.com/v1/images/generations', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      prompt,
      n: 1,
      size: '1024x1024',
      model: 'dall-e-3'
    })
  })

  if (!imageRes.ok) {
    const errText = await imageRes.text()
    return { error: errText }
  }

  const imageData = await imageRes.json()
  const url = imageData.data?.[0]?.url
  return { url }
})
