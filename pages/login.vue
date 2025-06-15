<!-- pages/login.vue -->
<template>
    <div class="p-4 max-w-md mx-auto">
        <h1 class="text-2xl font-bold mb-4">ログイン</h1>
        <input v-model="email" type="email" placeholder="メールアドレス" class="border p-2 w-full mb-2" />
        <button @click="login" class="bg-blue-500 text-white px-4 py-2 rounded">ログインリンクを送信</button>
        <p v-if="message" class="mt-2 text-green-600">{{ message }}</p>
    </div>
</template>

<script setup lang="ts">
    const email = ref('')
    const message = ref('')
    const supabase = useNuxtApp().$supabase

    const login = async () => {
        const { error } = await supabase.auth.signInWithOtp({
            email: email.value,
            options: {
                emailRedirectTo: window.location.origin // ログイン後の遷移先
            }
        })
        if (error) {
            alert(error.message)
        } else {
            message.value = 'ログインリンクをメールに送信しました'
        }
    }
</script>
