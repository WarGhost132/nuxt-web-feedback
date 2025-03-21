<template>
  <div class="flex flex-col gap-6 pb-10">
    <div class="flex items-center gap-4">
      <span>Последние</span>
      <select
        v-model="selectedDays"
        class="bg-[#232f3d] text-white p-2 rounded-lg cursor-pointer"
      >
        <option value="7">7 дней</option>
        <option value="30">30 дней</option>
        <option value="90">90 дней</option>
        <option value="all">Все</option>
      </select>
    </div>

    <div class="grid grid-cols-4 gap-6">
      <div class="col-span-3">
        <FeedbackList :selected-days="selectedDays" />
      </div>
      <div class="col-span-1">
        <FeedbackInfo :selected-days="selectedDays" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'auth',
  title: 'Главная страница'
})

const selectedDays = ref<string>('30')
</script>

<style>
</style>
