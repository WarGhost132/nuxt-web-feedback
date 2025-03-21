<template>
  <Teleport to="body">
    <transition>
      <div v-if="isOpen" class="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
        <div class="relative max-w-2xl w-full" @close.prevent>
          <!-- Индикатор текущего изображения -->
          <div class="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-lg text-sm">
            {{ activeIndex + 1 }} / {{ images.length }}
          </div>

          <!-- Анимированный контейнер для изображения -->
          <transition name="fade" mode="out-in">
            <img
              :key="activeIndex"
              :src="images[activeIndex]"
              alt="image"
              class="w-full h-auto max-h-[90vh] object-contain rounded-lg"
            />
          </transition>

          <!-- Кнопка закрытия -->
          <button class="absolute bg-black/50 hover:bg-black/70 border border-white rounded-full size-10 top-2 right-2 text-white text-2xl transition-all duration-300" @click="closeModal">
            <Icon name="mdi:close" class="size-4" />
          </button>

          <!-- Кнопки навигации -->
          <button
            class="absolute bg-black/50 hover:bg-black/70 border border-white rounded-full size-10 top-1/2 -translate-y-1/2 left-2 text-white text-2xl transition-all duration-300"
            @click.stop="prevImage"
          >
            <Icon name="mdi:arrow-left" class="size-4" />
          </button>
          <button
            class="absolute bg-black/50 hover:bg-black/70 border border-white rounded-full size-10 top-1/2 -translate-y-1/2 right-2 text-white text-2xl transition-all duration-300"
            @click.stop="nextImage"
          >
            <Icon name="mdi:arrow-right" class="size-4" />
          </button>

          <!-- Миниатюры -->
          <div class="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            <div
              v-for="(image, index) in images"
              :key="index"
              class="size-12 cursor-pointer border-2 rounded-lg overflow-hidden transition-all duration-300 hover:scale-105"
              :class="{ 'border-indigo-400 scale-110': index === activeIndex, 'border-transparent opacity-50 hover:opacity-100': index !== activeIndex }"
              @click.stop="setActiveIndex(index)"
            >
              <img :src="image" alt="thumbnail" class="w-full h-full object-cover">
            </div>
          </div>
        </div>
      </div>
    </transition>
  </Teleport>
</template>

<script lang="ts" setup>
const props = defineProps({
  isOpen: Boolean,
  initialIndex: { type: Number, default: 0 },
  images: { type: Array as () => string[], required: true }
});

const emit = defineEmits(['close']);
const activeIndex = ref(props.initialIndex);

watch(() => props.initialIndex, (newIndex) => activeIndex.value = newIndex);
watch(() => props.images, (newImages) => {
  if (activeIndex.value >= newImages.length) {
    activeIndex.value = 0;
  }
});

const closeModal = () => emit('close');
const prevImage = () => activeIndex.value = (activeIndex.value - 1 + props.images.length) % props.images.length;
const nextImage = () => activeIndex.value = (activeIndex.value + 1) % props.images.length;
const setActiveIndex = (index: number) => activeIndex.value = index;

// Обработчик клавиш
onMounted(() => {
  const handleKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') closeModal();
    if (event.key === 'ArrowLeft') prevImage();
    if (event.key === 'ArrowRight') nextImage();
  };

  window.addEventListener('keydown', handleKeydown);
  onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
});
</script>

<style>
/* Анимация появления и исчезновения галереи (только для контента) */
.fade-scale-content-enter-active, .fade-scale-content-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

/* Анимация смены изображений */
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
