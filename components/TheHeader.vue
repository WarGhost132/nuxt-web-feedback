<template>
  <header class="py-10">
    <div class="flex items-center justify-end gap-12">
      <div class="text-indigo-400">
        <span class="uppercase">Nuxt</span> Feedbacks
      </div>
      <div class="flex items-center gap-4">
        <Icon
          name="ph:squares-four-fill"
          class="text-slate-500 cursor-pointer size-8 hover:text-slate-300 transition-all duration-300"
        />

        <Icon 
          name="ph:sign-out"
          class="text-slate-500 cursor-pointer size-8 hover:text-slate-300 transition-all duration-300"
          @click="authStore.logout"
        />
      </div>
    </div>
  </header>
</template>

<script lang="ts" setup>
const authStore = useAuthStore()
</script>

<style>

</style>
