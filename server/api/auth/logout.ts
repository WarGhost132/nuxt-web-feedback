export default defineEventHandler(async (event) => {
  const csrftoken = getCookie(event, 'csrftoken')

  if (csrftoken) {
    return { success: true, message: 'Успешно' }
  } else {
    return { success: false, message: 'Токен не был предоставлен' }
  }
})
