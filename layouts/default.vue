<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <header class="bg-gray-800 text-white p-4">
      <nav class="mx-auto flex justify-between items-center w-full max-w-md sm:max-w-3xl">
        <NuxtLink to="/" class="font-bold">おんせい日記</NuxtLink>
        <div class="space-x-4">
          <NuxtLink to="/login" class="hover:underline">ログイン</NuxtLink>
          <NuxtLink to="/signup" class="hover:underline">サインアップ</NuxtLink>
        </div>
      </nav>
    </header>
    <main class="flex-1 p-4 w-full mx-auto max-w-md sm:max-w-3xl">
      <slot />
    </main>
  </div>
</template>
