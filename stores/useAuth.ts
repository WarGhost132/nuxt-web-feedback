import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  const router = useRouter()
  const isAuthenticated = useState('isAuthenticated', () => false)

  const hasRedirected = ref(false)
  const isLoading =ref(false)
  const error = ref<string | null>(null)

  const csrftoken = useCookie('csrftoken')
  const userData = useCookie('userData', {
    maxAge: 60 * 60 * 24 * 7
  })

  const checkAuth = () => {
    isAuthenticated.value = !!userData.value
    return isAuthenticated.value
  }

  const login = async (username: string, password: string) => {
    try {
      isLoading.value = true
      error.value = null

      const startTime = Date.now()

      await $fetch('/api/auth/csrf')

      const response = await $fetch('/api/auth', {
        method: 'POST',
        body: { username, password }
      })

      if (response.success) {
        const elapsedTime = Date.now() - startTime
        const delay = Math.max(2000 - elapsedTime, 0)

        await new Promise((resolve) => setTimeout(resolve, delay))

        userData.value = 'auth'
        hasRedirected.value = false

        return response
      } else {
        throw new Error(response?.message || 'Неизвестная ошибка')
      }
    } catch (error: any) {
      error.value = error.message
      throw error
    } finally {
      isLoading.value = false
    }
  }

  const logout = async () => {
    try {
      isLoading.value = true

      const startTime = Date.now()

      const response = await $fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include'
      })

      if (response.success) {
        const elapsedTime = Date.now() - startTime
        const delay = Math.max(1000 - elapsedTime, 0)

        await new Promise((resolve) => setTimeout(resolve, delay))

        userData.value = null
        csrftoken.value = null
        hasRedirected.value = false
        router.push('/login')
      } else {
        throw new Error(response?.message || 'Неизвестная ошибка')
      }
    } catch (error) {
      console.error('Ошибка выхода из системы', error)
      throw error
    } finally {
      isLoading.value = false
    }
  }

  watch(csrftoken, (newValue) => {
    if (!newValue && !hasRedirected.value) {
      hasRedirected.value = true
      router.push('/login')
    }
  })

  return {
    isAuthenticated,
    isLoading,
    error,
    login,
    logout,
    checkAuth
  }
})
