import { getFeedbacks } from "~/server/utils/feedbacks"

export default defineEventHandler(async (event) => {
  const result = await getFeedbacks(event)
  return result
})
