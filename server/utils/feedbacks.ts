import { dummyData } from "./data/dummyData"
import type { H3Event } from 'h3'

export const getFeedbacks = defineCachedFunction(async (_event: H3Event) => {
  const data = await dummyData()
  return data
})

export async function feedbackRating(_event: H3Event) {
  const feedbacks = await getFeedbacks(_event)

  const ratingCounts = {
    5: 0,
    4: 0,
    3: 0,
    2: 0,
    1: 0,
  }

  let totalRating = 0

  feedbacks.forEach((feedback) => {
    const rate = feedback.rate
    
    if (rate >= 1 && rate <= 5) {
      ratingCounts[rate as keyof typeof ratingCounts]++
    }

    totalRating += rate
  })

  const averageRating = parseFloat((totalRating / feedbacks.length).toFixed(1))

  return {
    ratingCounts,
    averageRating
  }
}
