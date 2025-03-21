import { FeedbackPreview } from "~/types/feedbacks.types"

export const dummyData = (): FeedbackPreview[] => {
  return [
    {
      id: 1,
      date: '2025-03-01', // 6 дней назад (в пределах 7 дней)
      address: 'Москва, ул. Пушкина, д. 10',
      platform: 'Google',
      rate: 5,
      name: 'Иван Иванов',
      images: [
        'https://avatars.mds.yandex.net/get-mpic/1865885/img_id463193542123879570.jpeg/orig',
        'https://i01.fotocdn.net/s217/4c194b3aa7811587/public_pin_l/2959166508.jpg',
        'https://avatars.mds.yandex.net/get-mpic/1865885/img_id463193542123879570.jpeg/orig',
        'https://i01.fotocdn.net/s217/4c194b3aa7811587/public_pin_l/2959166508.jpg',
        'https://avatars.mds.yandex.net/get-mpic/1865885/img_id463193542123879570.jpeg/orig',
        'https://i01.fotocdn.net/s217/4c194b3aa7811587/public_pin_l/2959166508.jpg',
      ],
      text: 'Отличный сервис, всем рекомендую!',
      answers_quantity: 2,
      tags: ['быстро', 'качественно'],
    },
    {
      id: 2,
      date: '2025-02-15', // 20 дней назад (в пределах 30 дней)
      address: 'Санкт-Петербург, ул. Лермонтова, д. 5',
      platform: 'Яндекс',
      rate: 4,
      name: 'Мария Петрова',
      images: undefined,
      text: 'Хорошо, но есть куда расти.',
      answers_quantity: null,
      tags: null,
    },
    {
      id: 3,
      date: '2024-12-10', // 87 дней назад (в пределах 90 дней)
      address: 'Казань, ул. Толстого, д. 15',
      platform: '2GIS',
      rate: 3,
      name: 'Алексей Сидоров',
      images: ['https://i.pinimg.com/originals/01/02/2a/01022a591bed1dd4488db2f37d626cef.jpg'],
      text: 'Средненько, ничего особенного.',
      answers_quantity: 1,
      tags: ['удобно'],
    },
    {
      id: 4,
      date: '2024-06-01', // 279 дней назад (старше 90 дней)
      address: 'Москва, ул. Пушкина, д. 10',
      platform: 'Google',
      rate: 5,
      name: 'Иван Иванов',
      images: ['https://avatars.mds.yandex.net/get-mpic/1865885/img_id463193542123879570.jpeg/orig', 'https://i01.fotocdn.net/s217/4c194b3aa7811587/public_pin_l/2959166508.jpg'],
      text: 'Отличный сервис, всем рекомендую!',
      answers_quantity: 2,
      tags: ['быстро', 'качественно'],
    },
  ]
}
