<template>
  <div class="flex flex-wrap gap-4">
   <button
    v-for="platform in platforms"
    :key="platform"
    class="px-4 py-2 border border-gray-300 rounded-lg font-semibold transition-all"
    :class="{'bg-indigo-400 border-indigo-400 text-white': selectedPlatforms.includes(platform)}"
    @click="togglePlatform(platform)"
   >
    {{ platform }}
   </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  platforms: {
    type: Array as () => string[],
    required: true
  },
  selectedPlatforms: {
    type: Array as () => string[],
    required: true
  }
})

const emit = defineEmits(['update:selectedPlatforms'])

const togglePlatform = (platform: string) => {
  const updatePlatforms = props.selectedPlatforms.includes(platform)
    ? props.selectedPlatforms.filter((p) => p !== platform)
    : [...props.selectedPlatforms, platform]

  emit('update:selectedPlatforms', updatePlatforms)
}
</script>

<style>

</style>
