<template>
  <div class="relative w-full h-svh overflow-x-hidden">
    <div class="container mx-auto z-10">
      <TheHeader v-if="authStore.checkAuth()" />
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
const route = useRoute()

useHead({
  title: `Nuxt | ${route.meta.title}`,
  meta: [{ property: 'og:title', content: `Nuxt | ${route.meta.title}` }]
})
</script>
