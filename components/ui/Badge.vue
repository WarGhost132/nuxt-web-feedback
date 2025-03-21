<template>
  <div :class="[props.color, 'flex justify-center items-center p-2 text-black text-sm rounded-lg']">
    {{ props.content }}
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  content: string,
  color: string
}>()
</script>

<style>

</style>
