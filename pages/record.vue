<template>
  <div class="p-4 space-y-4 max-w-md mx-auto bg-white rounded shadow">
    <h1 class="text-xl font-bold">音声入力</h1>
    <div class="space-x-2">
      <button @click="startRecording" :disabled="recording" class="bg-blue-500 text-white px-3 py-1 rounded">
        録音開始
      </button>
      <button @click="stopRecording" :disabled="!recording" class="bg-red-500 text-white px-3 py-1 rounded">
        録音停止
      </button>
    </div>
    <div v-if="recording && !loading" class="flex items-center space-x-2 mt-4">
      <svg class="animate-pulse h-5 w-5 text-red-600" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" fill="currentColor" />
      </svg>
      <span>録音中...</span>
    </div>
    <div v-if="loading" class="flex items-center space-x-2 mt-4">
      <svg class="animate-spin h-5 w-5 text-blue-600" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <span>処理中...</span>
    </div>
    <p v-else-if="transcript" class="mt-4">{{ transcript }}</p>
    <textarea
      v-else-if="transcript"
      v-model="transcript"
      rows="6"
      class="mt-4 w-full p-2 border rounded"
    />
    <div v-if="transcript" class="space-y-2">
      <button @click="generateImage" :disabled="imageLoading" class="bg-green-500 text-white px-3 py-1 rounded">
        {{ imageLoading ? '生成中...' : '画像生成' }}
      </button>
      <div v-if="imageUrl" class="mt-2">
        <img :src="imageUrl" alt="生成された画像" class="max-w-full rounded" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const recording = ref(false)
const transcript = ref('')
const loading = ref(false)
const imageLoading = ref(false)
const imageUrl = ref('')

let mediaRecorder: MediaRecorder | null = null
let chunks: BlobPart[] = []

const startRecording = async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
  mediaRecorder = new MediaRecorder(stream)
  chunks = []
  mediaRecorder.ondataavailable = (e) => {
    chunks.push(e.data)
  }
  mediaRecorder.onstop = async () => {
    const blob = new Blob(chunks, { type: 'audio/webm' })
    const formData = new FormData()
    formData.append('file', blob, 'audio.webm')
    loading.value = true
    try {
      const res = await $fetch('/api/whisper', {
        method: 'POST',
        body: formData
      })
      // @ts-ignore
      transcript.value = res.text || ''
    } finally {
      loading.value = false
    }
  }
  mediaRecorder.start()
  recording.value = true
}

const stopRecording = () => {
  if (mediaRecorder) {
    mediaRecorder.stop()
    recording.value = false
  }
}

const generateImage = async () => {
  if (!transcript.value) return
  imageLoading.value = true
  try {
    const res = await $fetch('/api/generate-image', {
      method: 'POST',
      body: { text: transcript.value }
    })
    // @ts-ignore
    imageUrl.value = res.url || ''
  } finally {
    imageLoading.value = false
  }
}
</script>
