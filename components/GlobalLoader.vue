<template>
  <div v-if="authStore.isLoading" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div class="animate-spin rounded-full h-16 w-16 border-t-4 border-indigo-500"/>
  </div>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
</script>

<style>

</style>
