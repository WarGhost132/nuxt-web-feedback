<template>
  <div class="flex items-center justify-center h-screen">
    <div class="flex flex-col items-center p-8 max-w-lg w-full">
      <h1 class="text-3xl font-semibold mb-6 text-center">Регистрация</h1>

      <!-- Форма для ввода -->
      <form class="flex flex-col gap-4 mt-4 w-full" @submit.prevent="handleRegister">
        <input
          v-model="email"
          type="email"
          placeholder="Введите ваш Email"
          :class="[
            'py-3 px-4 border-2 rounded-lg w-full bg-transparent transition-all duration-300 focus:outline-none focus:ring-2',
            emailError ? 'border-red-500 focus:ring-red-500' : 'border-gray-500 focus:ring-indigo-400 hover:border-indigo-400'
          ]"
          @input="resetError"
        >
        <div v-if="emailError" class="text-red-500 text-sm">{{ emailError }}</div>

        <button
          type="submit"
          class="bg-indigo-400 text-white font-semibold py-3 px-6 rounded-lg w-full mt-4 hover:bg-indigo-500 transition-colors"
        >
          Зарегистрироваться
        </button>
      </form>

      <!-- Переход на страницу регистрации -->
      <div class="flex justify-center mt-6 text-sm">
        <span>Уже есть аккаунт? <NuxtLink to="login" class="font-bold text-indigo-400 hover:text-indigo-500 transition-colors">Войдите</NuxtLink></span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

definePageMeta({
  title: 'Регистрация',
})

const email = ref('')

const emailError = ref<string | null>(null)

const resetError = () => {
  emailError.value = null
}

const validateForm = () => {
  let isValid = true

  // Сброс ошибок
  emailError.value = null

  // Валидация email
  if (!email.value.trim()) {
    emailError.value = 'Email обязателен'
    isValid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
    emailError.value = 'Введите корректный email'
    isValid = false
  }

  return isValid
}

const handleRegister = async () => {
  if (!validateForm()) return

  navigateTo('/login')
}
</script>
