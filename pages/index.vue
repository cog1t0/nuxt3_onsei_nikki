<!-- pages/login.vue -->
<template>
    <div class="p-4 max-w-md mx-auto">
        <h1 class="text-2xl font-bold mb-4">ログイン中のユーザー:</h1>
        <p>{{ user?.email }}</p>
    </div>
</template>
<script setup lang="ts">
    const supabase = useNuxtApp().$supabase
    const { data: { user } } = await supabase.auth.getUser()

    console.log('ログイン中のユーザー:', user)
</script>
