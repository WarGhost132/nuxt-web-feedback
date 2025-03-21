<template>
  <div class="flex items-center justify-center h-screen">
    <div class="flex flex-col items-center p-8 max-w-lg w-full">
      <h1 class="text-3xl font-semibold mb-6 text-center">Вход</h1>

      <!-- Форма для ввода логина и пароля -->
      <form class="flex flex-col gap-4 mt-4 w-full" @submit.prevent="handleLogin">
        <input
          v-model="username"
          type="text"
          placeholder="Введите логин"
          :class="[
            'py-3 px-4 border-2 rounded-lg w-full bg-transparent transition-all duration-300 focus:outline-none focus:ring-2',
            usernameError ? 'border-red-500 focus:ring-red-500' : 'border-gray-500 focus:ring-indigo-400 hover:border-indigo-400'
          ]"
          @input="resetError"
        >
        <div v-if="usernameError" class="text-red-500 text-sm">{{ usernameError }}</div>

        <input
          v-model="password"
          type="password"
          placeholder="Введите пароль"
          :class="[
            'py-3 px-4 border-2 rounded-lg w-full bg-transparent transition-all duration-300 focus:outline-none focus:ring-2',
            passwordError ? 'border-red-500 focus:ring-red-500' : 'border-gray-500 focus:ring-indigo-400 hover:border-indigo-400'
          ]"
          @input="resetError"
        >
        <div v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</div>

        <div v-if="authStore.error" class="text-red-500 text-sm mt-2">
          {{ authStore.error }}
        </div>

        <button
          type="submit"
          class="bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg w-full mt-4 hover:bg-indigo-500 transition-colors"
          :disabled="authStore.isLoading"
        >
          {{ authStore.isLoading ? 'Загрузка...' : 'Войти' }}
        </button>
      </form>

      <!-- Разделитель -->
      <div class="my-6 flex-row text-center text-sm text-white">Или</div>

      <!-- Кнопки для входа -->
      <div class="flex justify-center gap-4 w-full">
        <button
          class="flex items-center bg-slate-700 text-red-500 size-12 rounded-full justify-center hover:bg-slate-600 transition-colors"
          @click="handleGoogleLogin"
        >
          <Icon name="mdi:google" class="size-6" />
        </button>

        <button
          class="flex items-center bg-slate-700 text-white size-12 rounded-full justify-center hover:bg-slate-600 transition-colors"
          @click="handleYandexLogin"
        >
          <Icon name="gravity-ui:logo-yandex" class="size-6" />
        </button>

        <button
          class="flex items-center bg-slate-700 text-yellow-500 size-12 rounded-full justify-center hover:bg-slate-600 transition-colors"
          @click="handleEmailLogin"
        >
          <Icon name="mdi:mail-ru" class="size-6" />
        </button>
      </div>

      <!-- Переход на страницу регистрации -->
      <div class="flex justify-center mt-6 text-sm">
        <span>Нет аккаунта? <NuxtLink to="register" class="font-bold text-indigo-400 hover:text-indigo-500 transition-colors">Зарегистрируйтесь</NuxtLink></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  title: 'Авторизация',
})

const authStore = useAuthStore()
const username = ref('')
const password = ref('')

const usernameError = ref<string | null>(null)
const passwordError = ref<string | null>(null)

const resetError = () => {
  authStore.error = null
  usernameError.value = null
  passwordError.value = null
}

const validateForm = () => {
  let isValid = true

  usernameError.value = null
  passwordError.value = null

  if (!username.value.trim()) {
    usernameError.value = 'Логин обязателен'
    isValid = false
  }

  if (!password.value.trim()) {
    passwordError.value = 'Пароль обязателен'
    isValid = false
  } else if (password.value.length < 6) {
    passwordError.value = 'Пароль должен содержать минимум 6 символов'
    isValid = false
  }

  return isValid
}

const handleLogin = async () => {
  if (!validateForm()) return

  try {
    const response = await authStore.login(username.value, password.value)

    if (response.success) {
      navigateTo('/')
    } 
  } catch (error: any) {
    authStore.error = error.message
  }
}

const handleVKLogin = () => {
  alert('Вход через ВК')
}

const handleGoogleLogin = () => {
  alert('Вход через Google')
}

const handleYandexLogin = () => {
  alert('Вход через Yandex')
}

const handleEmailLogin = () => {
  alert('Вход через почту')
}
</script>
