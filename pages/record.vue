<template>
  <div class="p-4 space-y-4">
    <h1 class="text-xl font-bold">音声入力</h1>
    <div class="space-x-2">
      <button @click="startRecording" :disabled="recording" class="bg-blue-500 text-white px-3 py-1 rounded">
        録音開始
      </button>
      <button @click="stopRecording" :disabled="!recording" class="bg-red-500 text-white px-3 py-1 rounded">
        録音停止
      </button>
    </div>
    <div v-if="loading" class="flex items-center space-x-2 mt-4">
      <svg class="animate-spin h-5 w-5 text-blue-600" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
      </svg>
      <span>処理中...</span>
    </div>
    <p v-else-if="transcript" class="mt-4">{{ transcript }}</p>
  </div>
</template>

<script setup lang="ts">
const recording = ref(false)
const transcript = ref('')
const loading = ref(false)
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
</script>
