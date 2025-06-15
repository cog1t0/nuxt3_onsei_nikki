<template>
  <div>
    <header class="bg-gray-800 text-white p-4">
      <nav class="max-w-3xl mx-auto flex justify-between">
        <NuxtLink to="/" class="font-bold">おんせい日記</NuxtLink>
        <div class="space-x-4">
          <NuxtLink to="/login" class="hover:underline">ログイン</NuxtLink>
          <NuxtLink to="/signup" class="hover:underline">サインアップ</NuxtLink>
        </div>
      </nav>
    </header>
    <main class="p-4 max-w-3xl mx-auto">
      <slot />
    </main>
  </div>
</template>
