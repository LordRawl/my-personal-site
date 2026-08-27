import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  modules: ['@nuxt/eslint'],
  components: [
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  runtimeConfig: {
    telegramBotToken: '',
    telegramChatId: '',
    public: {
      siteUrl: '',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  app: {
    head: {
      htmlAttrs: { lang: 'ru' },
      title: 'Frontend-разработчик Иван Есин — Vue 3, Nuxt, TypeScript',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' },
        {
          name: 'description',
          content:
            'Frontend-разработчик: 9 лет опыта, 80+ проектов на Vue 3, Nuxt и TypeScript. Высоконагруженные интерфейсы, дизайн-система, SSR. Открыт к удалённой работе.',
        },
        { name: 'author', content: 'Иван Есин' },
        { name: 'theme-color', media: '(prefers-color-scheme: light)', content: '#f7f2ee' },
        { name: 'theme-color', media: '(prefers-color-scheme: dark)', content: '#0b0705' },
        {
          property: 'og:title',
          content: 'Frontend-разработчик Иван Есин — Vue 3, Nuxt, TypeScript',
        },
        {
          property: 'og:description',
          content:
            '9 лет опыта, 80+ проектов: высоконагруженные интерфейсы, дизайн-система, SSR. Открыт к удалённой работе.',
        },
        { property: 'og:site_name', content: 'Иван Есин' },
        { property: 'og:type', content: 'website' },
        { property: 'og:image', content: '/og.png' },
        { property: 'og:image:width', content: '1200' },
        { property: 'og:image:height', content: '630' },
        {
          property: 'og:image:alt',
          content: 'Иван Есин — фронтенд-разработчик Vue, Nuxt, TypeScript',
        },
        { property: 'og:locale', content: 'ru_RU' },
        { name: 'twitter:card', content: 'summary_large_image' },
        {
          name: 'twitter:title',
          content: 'Frontend-разработчик Иван Есин — Vue 3, Nuxt, TypeScript',
        },
        {
          name: 'twitter:description',
          content: '9 лет опыта, 80+ проектов: высоконагруженные интерфейсы, дизайн-система, SSR',
        },
        { name: 'twitter:image', content: '/og.png' },
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Unbounded:wght@400;600;700&family=Manrope:wght@400;500;600;700&display=swap',
        },
      ],
      script: [
        {
          innerHTML: `try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark',t!=='light')}catch(e){document.documentElement.classList.add('dark')}`,
        },
      ],
    },
  },
})
