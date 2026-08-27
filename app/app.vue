<script setup lang="ts">
import type { Project } from '~/types/site'

const { init: initTheme } = useTheme()
const { init: initReveal } = useReveal()
useFullpageScroll()

const activeProject = ref<Project | null>(null)

const siteUrl = (useRuntimeConfig().public.siteUrl as string) || ''

useHead({
  link: siteUrl ? [{ rel: 'canonical', href: siteUrl }] : [],
  meta: siteUrl ? [{ property: 'og:url', content: siteUrl }] : [],
  script: [
    {
      type: 'application/ld+json',
      innerHTML: JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Иван Есин',
        alternateName: 'Есин Иван Павлович',
        jobTitle: 'Фронтенд-разработчик',
        description: 'Фронтенд-разработчик: 9 лет опыта, 80+ проектов на Vue 3, Nuxt и TypeScript.',
        email: 'mailto:lordrawl@gmail.com',
        telephone: '+7 953 039-73-41',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Краснодар',
          addressCountry: 'RU',
        },
        sameAs: ['https://t.me/lordrawl', 'https://github.com/lordrawl'],
        alumniOf: {
          '@type': 'CollegeOrUniversity',
          name: 'Уральский федеральный университет',
        },
        knowsAbout: [
          'Vue.js',
          'Nuxt',
          'TypeScript',
          'JavaScript',
          'Vite',
          'Pinia',
          'Tailwind CSS',
          'SSR',
        ],
        ...(siteUrl ? { url: siteUrl } : {}),
      }),
    },
  ],
  noscript: [
    {
      innerHTML:
        '<div><img src="https://mc.yandex.ru/watch/112000128" style="position:absolute;left:-9999px" alt=""/></div>',
    },
  ],
})

onMounted(() => {
  initTheme()
  initReveal()

  const script = document.createElement('script')
  script.async = true
  script.src = 'https://mc.yandex.ru/metrika/tag.js'
  document.head.appendChild(script)
  script.onload = () => {
    ;(window as any).ym(112000128, 'init', {
      defer: true,
      clickmap: true,
      trackLinks: true,
      accurateTrackBounce: true,
      webvisor: true,
    })
  }
})
</script>

<template>
  <div class="min-h-screen bg-background font-body text-foreground transition-colors">
    <AppHeader />

    <main>
      <HeroSection />
      <AboutSection />
      <StackSection />
      <WorksSection @open="activeProject = $event" />
      <ExperienceSection />
      <ContactsSection />
    </main>

    <SiteFooter />

    <ProjectModal :project="activeProject" @close="activeProject = null" />
  </div>
</template>
