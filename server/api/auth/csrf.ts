export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  setCookie(event, 'csrftoken', 'token', {
    sameSite: 'strict',
    secure: config.public.nodeEnv === 'production',
    path: '/',
    maxAge: 60 * 60 * 24 * 7
  })
  return { success: true }
})
