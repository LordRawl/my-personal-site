<script setup lang="ts">
const siteUrl = (useRuntimeConfig().public.siteUrl as string) || ''

useHead({
  link: siteUrl ? [{ rel: 'canonical', href: siteUrl }] : [],
  meta: [
    { name: 'theme-color', content: '#0b0705' },
    ...(siteUrl ? [{ property: 'og:url', content: siteUrl }] : []),
  ],
  script: [
    {
      key: 'reveal-flag',
      innerHTML:
        "if(!matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('reveal')",
    },
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
    {
      key: 'yandex-metrika',
      type: 'text/javascript',
      innerHTML: `(function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};m[i].l=1*new Date();for(var j=0;j<document.scripts.length;j++){if(document.scripts[j].src===r){return}}k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})(window,document,'script','https://mc.yandex.ru/metrika/tag.js?id=112000128','ym');ym(112000128,'init',{ssr:true,webvisor:true,clickmap:true,referrer:document.referrer,url:location.href,accurateTrackBounce:true,trackLinks:true});`,
    },
  ],
  noscript: [
    {
      innerHTML:
        '<div><img src="https://mc.yandex.ru/watch/112000128" style="position:absolute;left:-9999px" alt=""/></div>',
    },
  ],
})
</script>

<template>
  <div>
    <SiteHeader />
    <SiteMenu />

    <main id="top">
      <HeroSection />
      <AboutSection />
      <WorksSection />
      <StackSection />
      <ExperienceSection />
      <ContactsSection />
    </main>

    <SiteFooter />

    <ProjectDialog />
    <GameDialog />
  </div>
</template>
