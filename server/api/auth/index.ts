import { H3Event } from 'h3'

export default defineEventHandler(async (event: H3Event) => {
  const { username, password } = await readBody(event)

  if (username === '1' && password === '123456') {
    return { success: true, user: { username }, message: 'Успешная авторизация' }
  } else {
    return { success: false, message: 'Неверный логин или пароль' }
  }
})
