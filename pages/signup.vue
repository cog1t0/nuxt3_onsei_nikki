<!-- pages/signup.vue -->
<template>
  <div class="p-4 max-w-md mx-auto bg-white rounded shadow">
    <h1 class="text-2xl font-bold mb-4">サインアップ</h1>
    <input v-model="email" type="email" placeholder="メールアドレス" class="border p-2 w-full mb-2" />
    <button @click="signup" class="bg-green-500 text-white px-4 py-2 rounded">アカウント作成</button>
    <p v-if="message" class="mt-2 text-green-600">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const message = ref('')
const supabase = useNuxtApp().$supabase

const signup = async () => {
  const { error } = await supabase.auth.signInWithOtp({ email: email.value })
  if (error) {
    alert(error.message)
  } else {
    message.value = '確認メールを送信しました'
  }
}
</script>
