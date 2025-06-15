<!-- pages/login.vue -->
<template>
  <div class="p-4 max-w-md mx-auto">
    <h1 class="text-2xl font-bold mb-4">ログイン</h1>
    <input v-model="email" type="email" placeholder="メールアドレス" class="border p-2 w-full mb-2" />
    <button @click="login" class="bg-blue-500 text-white px-4 py-2 rounded w-full">ログイン</button>
    <p v-if="message" class="mt-2 text-red-600">{{ message }}</p>
    <div class="mt-4 text-center">
      <NuxtLink to="/signup" class="text-blue-500 underline">アカウント作成はこちら</NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const message = ref('')
const supabase = useNuxtApp().$supabase

const login = async () => {
  const { error } = await supabase.auth.signInWithOtp({ email: email.value })
  if (error) {
    message.value = error.message
  } else {
    message.value = ''
    navigateTo('/')
  }
}
</script>
