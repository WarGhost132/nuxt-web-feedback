export default defineEventHandler(async (event) => {
  const ratingList = await feedbackRating(event)
  return ratingList
})
