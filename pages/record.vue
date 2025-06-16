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
    <p v-if="transcript" class="mt-4">{{ transcript }}</p>
  </div>
</template>

<script setup lang="ts">
const recording = ref(false)
const transcript = ref('')
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
    const res = await $fetch('/api/whisper', {
      method: 'POST',
      body: formData
    })
    // @ts-ignore
    transcript.value = res.text || ''
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
