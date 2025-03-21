<template>
  <div>
    <div v-if="status === 'pending'">Загрузка...</div>

    <div v-else-if="status === 'error'">Ошибка при загрузке данных</div>

    <div v-else-if="filteredFeedbacks.length === 0" class="text-center text-gray-200 p-4">
      Отзывов нет
    </div>
    
    <div v-else class="flex flex-col gap-y-10">
      <div v-for="feedback in filteredFeedbacks" :key="feedback.id">
        <div class="flex flex-col gap-y-4 w-full bg-[#232f3d] p-5 rounded-xl">

          <div class="flex justify-between items-center">
            <div class="flex gap-4 text-slate-500">
              <span>Дата: {{ formatDate(feedback.date) }}</span>
              <span>{{ feedback.address }}</span>
            </div>
            <div class="flex gap-4 items-center">
              <UiBadge :content="feedback.platform" color="bg-slate-700 text-white" />
              <FeedbackRating :rate="feedback.rate" />
            </div>
          </div>

          <div class="flex justify-start">
            <span>{{ feedback.name }}</span>
          </div>

          <div>
            <div v-if="feedback.images" class="flex gap-3">
              <div 
                v-for="(image, index) in feedback.images.slice(0, 3)"
                :key="image"
                class="size-32 cursor-pointer"
                @click="openModal(feedback.images, index)"
              >
                <img v-bind:src="image" alt="image" class="w-full h-full object-cover rounded-lg">
              </div>

              <div
                v-if="feedback.images.length > 3"
                class="size-32 cursor-pointer relative"
                @click="openModal(feedback.images, 3)"
              >
                <div class="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm rounded-lg"></div>

                <div class="absolute inset-0 flex items-center justify-center text-white text-lg font-bold">
                  +{{ feedback.images.length - 3 }}
                </div>

                <img v-bind:src="feedback.images[3]" alt="image" class="w-full h-full object-cover rounded-lg">
              </div>
            </div>
          </div>

          <div>
            <span class="text-white">{{ feedback.text }}</span>
          </div>

          <div class="flex justify-between items-center">
            <div class="flex items-center gap-4">
              <button
                class="bg-indigo-400 hover:bg-indigo-500 transition-all duration-300 text-white font-semibold py-2 px-5 rounded-lg"
              >
                Посмотреть ответы
              </button>
              <span v-if="feedback.answers_quantity">{{ feedback.answers_quantity }} ответа</span>
            </div>
            <div class="flex items-center gap-4 text-slate-500">
              <div class="flex items-center gap-2">
                <span v-for="tag in feedback.tags" v-if="feedback.tags?.length" :key="tag">{{ tag }}</span>
                <span v-else>Нет тегов</span>
              </div>

              <Icon name="material-symbols:warning-outline-rounded" class="size-8 cursor-pointer hover:text-indigo-400 transition-all duration-300" />
              <Icon name="material-symbols:favorite-outline-rounded" class="size-8 cursor-pointer hover:text-indigo-400 transition-all duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>

    <UiGalleryModal
      :isOpen="modalOpen"
      :images="modalImages"
      :initialIndex="modalIndex"
      @close="closeModal"
    />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  selectedDays: {
    type: String,
    default: '30'
  }
})

const feedbackStore = useFeedbackStore()

const { status } = await useAsyncData('feedbacks', async () => {
  await feedbackStore.fetchFeedback()
})

const modalOpen = ref(false)
const modalImages = ref<string[]>([])
const modalIndex = ref(0)

const openModal = (images: string[], index: number) => {
  modalImages.value = images
  modalIndex.value = index
  modalOpen.value = true
}

const closeModal = () => {
  modalOpen.value = false
  modalImages.value = []
  modalIndex.value = 0
}

const filteredFeedbacks = computed(() => {
  if (!feedbackStore.feedbackList) return []

  if (!feedbackStore.selectedPlatforms.length) return []

  const currentDate = new Date()
  const daysAgo = new Date(currentDate)
  daysAgo.setDate(currentDate.getDate() - parseInt(props.selectedDays))

  return feedbackStore.feedbackList.filter(feedback => {
    const feedbackDate = new Date(feedback.date)

    const matchesDays = props.selectedDays === 'all' || feedbackDate >= daysAgo

    const matchesPlatform = feedbackStore.selectedPlatforms.length
      ? feedbackStore.selectedPlatforms.includes(feedback.platform)
      : false

    const matchesRating = feedbackStore.selectedRatings.length
      ? feedbackStore.selectedRatings.includes(feedback.rate)
      : true

    return matchesPlatform && matchesRating && matchesDays
  })
})
</script>

<style>

</style>
