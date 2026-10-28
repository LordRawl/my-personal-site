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
    <!-- Нить вдоль всей страницы: прототип держит её на id, это его JS-хуки. -->
    <svg id="pt" aria-hidden="true"><path id="ptb" /><path id="ptp" /><circle id="ptd" r="6" /></svg>

    <div class="bar bar--top" aria-hidden="true" />

    <header class="header">
      <a class="header__brand" href="#top">Иван Есин</a>
      <nav class="header__nav" aria-label="Основная">
        <a class="header__link" href="#about">Обо мне</a>
        <a class="header__link" href="#works">Проекты</a>
        <a class="header__link" href="#stack">Стек</a>
        <a class="header__link" href="#experience">Опыт</a>
        <a class="header__link" href="#contacts">Контакты</a>
      </nav>
    </header>

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
  </div>
</template>

<style>
.header {
  position: fixed;
  inset: 0 0 auto;
  z-index: 50;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: calc(1rem + env(safe-area-inset-top, 0px)) var(--pad) 1rem;
  mix-blend-mode: difference;
  color: #fff;
}
.header--solid {
  mix-blend-mode: normal;
  color: var(--ink);
}
.header__brand,
.header__link {
  text-decoration: none;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
}
.header__nav {
  display: flex;
  gap: clamp(0.8rem, 2vw, 2rem);
}
.header__link {
  position: relative;
  padding: 0.4rem 0;
  transition: opacity 0.35s var(--ease);
}
.header__link::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: currentColor;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.5s var(--ease);
}
.header__nav:hover .header__link:not(:hover) {
  opacity: 0.45;
}
.header__link:hover::after,
.header__link:focus-visible::after {
  transform: scaleX(1);
  transform-origin: left;
}
@media (max-width: 700px) {
  .header__link:nth-child(n + 3) {
    display: none;
  }
}
.bar {
  background: rgba(11, 7, 5, 0.62);
  position: fixed;
  inset: 0 0 auto;
  height: calc(4.8rem + env(safe-area-inset-top, 0px));
  z-index: 49;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.45s var(--ease);
  -webkit-backdrop-filter: blur(5px);
  backdrop-filter: blur(5px);
  -webkit-mask-image: linear-gradient(#000 72%, transparent);
  mask-image: linear-gradient(#000 72%, transparent);
}
.bar--on {
  opacity: 1;
}
</style>
