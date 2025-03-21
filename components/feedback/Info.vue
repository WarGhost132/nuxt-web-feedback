<template>
  <div class="flex flex-col gap-6">
    <div class="flex flex-col p-6 bg-[#232f3d] rounded-xl">
      <div v-if="status === 'pending'">
        Загрузка...
      </div>
      <div v-else>
        <h3 class="text-7xl">
          {{ filteredAverageRating ?? '-' }}
        </h3>
        <span>{{ filteredFeedbackCount }} отзывов</span>
        
        <div 
          v-for="score in [5, 4, 3, 2, 1]"
          :key="score"
          class="flex items-center gap-4 my-4"
          @click="feedbackStore.toggleRating(score)"
        >
          <div class="flex">
            <span>{{ score }}</span>
          </div>
          <div 
            class="w-full border-2 border-gray-600 bg-slate-800 rounded-full h-6.5 overflow-hidden cursor-pointer hover:border-indigo-500 transition-all duration-300"
            :class="{ 'border-indigo-700': feedbackStore.selectedRatings.includes(score) }"
          >
            <div
              :class="{ 'bg-indigo-500': score === filteredHighestScore, 'bg-slate-700': score !== filteredHighestScore }"
              class="h-6 rounded-full"
              :style="{ width: `${getFilteredPercentage(score)}%` }"
            />
          </div>
        </div>

        <FeedbackPlatformFilter
          :platforms="feedbackStore.allPlatforms"
          :selected-platforms="feedbackStore.selectedPlatforms"
          @update:selected-platforms="feedbackStore.selectedPlatforms = $event"
        />
      </div>
    </div>
    <div class="text-center p-4 bg-[#232f3d] rounded-xl">Избранное</div>
    <div class="text-center p-4 bg-[#232f3d] rounded-xl">без ответов</div>
    <div class="text-center p-4 bg-[#232f3d] rounded-xl">тема</div>
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

const { status } = await useAsyncData('rating', async () => {
  await feedbackStore.fetchFeedback()
  await feedbackStore.fetchRating()
})

const filteredFeedbacks = computed(() => {
  if (!feedbackStore.feedbackList) return []
  if (!feedbackStore.selectedPlatforms.length && !feedbackStore.selectedRatings.length) return []

  const currentDate = new Date()
  const daysAgo = new Date(currentDate)
  daysAgo.setDate(currentDate.getDate() - parseInt(props.selectedDays))

  return feedbackStore.feedbackList.filter(feedback =>{
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

const filteredFeedbackCount = computed(() => filteredFeedbacks.value.length)

const filteredAverageRating = computed(() => {
  if (!filteredFeedbacks.value.length) return 0
  const totalRating = filteredFeedbacks.value.reduce((sum, fb) => sum + fb.rate, 0)
  return (totalRating / filteredFeedbacks.value.length).toFixed(1)
})

const filteredRatingCounts = computed(() => {
  const counts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 }
  filteredFeedbacks.value.forEach(feedback => {
    if (feedback.rate >= 1 && feedback.rate <= 5) {
      counts[feedback.rate as keyof typeof counts]++
    }
  })
  return counts
})

const filteredHighestScore = computed(() => {
  const maxCount = Math.max(...Object.values(filteredRatingCounts.value))
  return Object.keys(filteredRatingCounts.value)
    .map(Number)
    .filter(score => filteredRatingCounts.value[score] === maxCount)
    .reduce((max, score) => Math.max(max, score), 1)
})

const getFilteredPercentage = (score: number) => {
  if (!filteredFeedbackCount.value) return 0
  return (
    (filteredRatingCounts.value[score as keyof typeof filteredRatingCounts.value] / filteredFeedbackCount.value) * 100
  ).toFixed(1)
}
</script>
