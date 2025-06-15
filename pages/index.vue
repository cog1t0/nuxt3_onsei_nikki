<!-- pages/index.vue -->
<template>
  <div>
    <h1 class="text-2xl font-bold mb-4">ダッシュボード</h1>
    <div v-if="user">
      <p>ログイン中: {{ user.email }}</p>
      <button @click="logout" class="mt-2 bg-gray-700 text-white px-3 py-1 rounded">ログアウト</button>
    </div>
    <p v-else>ログインしていません</p>
  </div>
</template>

<script setup lang="ts">
const supabase = useNuxtApp().$supabase
const { data: { user } } = await supabase.auth.getUser()

const logout = async () => {
  await supabase.auth.signOut()
  navigateTo('/login')
}
</script>
