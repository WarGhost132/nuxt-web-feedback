export default defineNuxtRouteMiddleware((to, from) => {
  const authStore = useAuthStore()

  authStore.checkAuth()

  if (!authStore.isAuthenticated) {
    return navigateTo('/login')
  }
})
