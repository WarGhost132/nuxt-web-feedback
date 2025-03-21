import { defineStore } from 'pinia'
import type { FeedbackPreview } from '~/types/feedbacks.types'

interface RatingResult {
  ratingCounts: {
    1: number
    2: number
    3: number
    4: number
    5: number
  }
  averageRating: number
}

export const useFeedbackStore = defineStore('feedback', () => {
  const feedbackList = ref<FeedbackPreview[] | null>(null)
  const ratingList = ref<RatingResult | null>(null)
  const feedbackCount = ref<number>(0)
  const selectedPlatforms = ref<string[]>([])
  const selectedRatings = ref<number[]>([])
  const allPlatforms = ref<string[]>([])

  const fetchFeedback = async () => {
    try {
      const { data } = await useFetch('/api/feedbacks')
      feedbackList.value = data.value
      feedbackCount.value = data.value?.length || 0

      allPlatforms.value = [...new Set(data.value?.map(fb => fb.platform) || [])]

      selectedPlatforms.value = [...allPlatforms.value]
    } catch (error) {
      console.error(error)
    }
  }

  const fetchRating = async () => {
    try {
      const { data } = await useFetch<RatingResult>('/api/feedbacks/rating')
      ratingList.value = data.value
    } catch (error) {
      console.error(error)
    }
  }

  const filteredFeedbacks = computed(() => {
    if (!feedbackList.value) return []
    if (!selectedPlatforms.value.length) return feedbackList.value
    return feedbackList.value.filter(feedback => selectedPlatforms.value.includes(feedback.platform))
  })

  const toggleRating = (rating: number) => {
    if (selectedRatings.value.includes(rating)) {
      selectedRatings.value = selectedRatings.value.filter(r => r !== rating)
    } else {
      selectedRatings.value = [...selectedRatings.value, rating]
    }
  }

  return {
    feedbackList,
    ratingList,
    feedbackCount,
    selectedPlatforms,
    allPlatforms,
    fetchFeedback,
    fetchRating,
    filteredFeedbacks,
    selectedRatings,
    toggleRating
  }
})
