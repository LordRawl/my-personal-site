<script setup lang="ts">
import { navLinks, profile } from '~/data/profile'

const { init } = useTheme()
const scrolled = ref(false)
const menuOpen = ref(false)
const activeSection = ref('about')
const lockedSection = ref<string | null>(null)

const scrollTo = (id: string) => {
  menuOpen.value = false
  activeSection.value = id
  lockedSection.value = id
  scrollToSection(id, { fullpage: true })
  window.setTimeout(() => {
    if (lockedSection.value === id) lockedSection.value = null
  }, 1400)
}

const unlock = () => {
  lockedSection.value = null
}

onMounted(() => {
  init()

  const onScroll = () => {
    scrolled.value = window.scrollY > 24
    if (lockedSection.value) return

    let current = navLinks[0]!.id
    for (const link of navLinks) {
      const el = document.getElementById(link.id)
      if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.4) {
        current = link.id
      }
    }
    activeSection.value = current
  }

  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('fullpage-done', unlock)
  window.addEventListener('fullpage-manual', unlock)
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('fullpage-done', unlock)
    window.removeEventListener('fullpage-manual', unlock)
  })
})
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 border-b transition-all duration-300"
    :class="[
      scrolled || menuOpen
        ? 'border-border bg-background/85 backdrop-blur-md '
        : 'border-transparent',
      menuOpen ? 'h-full flex flex-col' : '',
    ]"
  >
    <div class="flex items-center justify-between px-6 py-4 md:px-14 md:py-5">
      <a
        href="#hero"
        class="flex items-center gap-3 font-display text-base font-semibold tracking-tight text-foreground"
        @click.prevent="scrollTo('hero')"
      >
        <span class="hero-mark-dot block h-2.5 w-2.5 rounded-[2px] bg-primary" />
        {{ profile.name }}
      </a>

      <nav class="hidden items-center gap-9 lg:flex">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="link-underline text-sm font-medium tracking-wide transition-colors cursor-pointer"
          :class="
            activeSection === link.id
              ? 'text-foreground'
              : 'text-muted-foreground hover:text-foreground'
          "
          :data-active="activeSection === link.id"
          @click.prevent="scrollTo(link.id)"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-3">
        <div class="hidden lg:block">
          <ThemeButton />
        </div>

        <AppButton
          :href="profile.telegram"
          external
          size="sm"
          suffix-icon="arrow-up-right"
          class="hidden md:inline-flex"
        >
          Telegram
        </AppButton>

        <AppButton
          variant="outline"
          size="icon"
          aria-label="Меню"
          class="lg:hidden"
          @click="menuOpen = !menuOpen"
        >
          <AppIcon :name="menuOpen ? 'x' : 'menu'" :size="18" />
        </AppButton>
      </div>
    </div>

    <Transition name="menu">
      <div
        v-if="menuOpen"
        class="animate-fade-in border-t border-border bg-background/98 px-6 pb-8 pt-4 backdrop-blur-md lg:hidden flex flex-col grow"
      >
        <nav class="flex flex-col mb-4">
          <a
            v-for="(link, i) in navLinks"
            :key="link.id"
            :href="`#${link.id}`"
            class="flex items-center justify-between border-b border-border py-4 text-left font-display text-lg text-foreground"
            @click.prevent="scrollTo(link.id)"
          >
            {{ link.label }}

            <span class="font-body text-xs text-muted-foreground">
              {{ String(i + 1).padStart(2, '0') }}
            </span>
          </a>
        </nav>

        <ThemeButton class="mt-auto" />
      </div>
    </Transition>
  </header>
</template>

<style scoped>
.menu-enter-active {
  animation: fade-in 0.4s ease-out;
}

.menu-leave-active {
  animation: none;
}
</style>
