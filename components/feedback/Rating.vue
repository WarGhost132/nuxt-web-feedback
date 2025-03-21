<template>
  <div class="flex items-center gap-x-1">
    <span
      v-for="star in 5"
      :key="star"
    >
      <Icon
        name="material-symbols:star"
        :class="['size-6', star <= rate ? 'text-indigo-400' : 'text-slate-500']"
      />
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  rate: number
}>();
</script>
