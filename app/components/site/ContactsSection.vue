<script setup lang="ts">
import { profile } from '~/data/profile'

const form = reactive({ name: '', contact: '', message: '', website: '' })
const errors = reactive<Record<string, string | undefined>>({})
const submitted = ref(false)
const pending = ref(false)
const toastVisible = ref(false)
const toastType = ref<'success' | 'error'>('success')
const loadTime = ref(0)

let toastTimer: ReturnType<typeof setTimeout> | undefined
let resetTimer: ReturnType<typeof setTimeout> | undefined

onMounted(() => {
  loadTime.value = Date.now()
})

const validate = () => {
  const e: Record<string, string> = {}
  if (form.name.trim().length < 2) e.name = 'Как к вам обращаться?'
  if (form.contact.trim().length < 3) e.contact = 'Оставьте почту или ник в Telegram'
  if (form.message.trim().length < 10) e.message = 'Опишите задачу чуть подробнее — от 10 символов'
  return e
}

const submit = async () => {
  if (pending.value || submitted.value) return

  const e = validate()
  Object.keys(errors).forEach((key) => {
    errors[key] = undefined
  })
  Object.assign(errors, e)
  if (Object.keys(e).length) return

  pending.value = true
  toastType.value = 'success'

  try {
    const res = await $fetch('/api/contact', {
      method: 'POST',
      body: {
        name: form.name.trim(),
        contact: form.contact.trim(),
        message: form.message.trim(),
        website: form.website,
        loadTime: loadTime.value,
      },
    })

    if (!(res as { ok?: boolean }).ok) throw new Error('Send failed')

    toastType.value = 'success'
    submitted.value = true
    form.name = ''
    form.contact = ''
    form.message = ''
    loadTime.value = Date.now()
    clearTimeout(resetTimer)
    resetTimer = setTimeout(() => (submitted.value = false), 4000)
  } catch {
    toastType.value = 'error'
  } finally {
    pending.value = false
    toastVisible.value = true
    clearTimeout(toastTimer)
    toastTimer = setTimeout(() => (toastVisible.value = false), 6000)
  }
}

const onInput = (field: 'name' | 'contact' | 'message', value: string) => {
  form[field] = value
  errors[field] = undefined
}

onBeforeUnmount(() => {
  clearTimeout(toastTimer)
  clearTimeout(resetTimer)
})
</script>

<template>
  <section
    id="contacts"
    class="screen grid-lines border-t border-border px-6 py-24 md:px-14 md:py-32 lg:py-10"
  >
    <div class="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-12">
      <div class="flex flex-col justify-between">
        <SectionHeading index="05" eyebrow="Контакты и ссылки">
          <template #title> Обсудим <span class="text-primary">задачу</span> </template>
          <template #note>
            Открыт к удалённой работе, частичной занятости и проектным задачам. Отвечаю в течение
            дня, срочное — сразу в Telegram.
          </template>
        </SectionHeading>

        <div class="reveal flex gap-3" style="transition-delay: 120ms">
          <AppButton
            variant="outline-muted"
            size="icon-lg"
            :href="profile.github"
            external
            icon="github"
            aria-label="GitHub"
          />
          <AppButton
            variant="outline-muted"
            size="icon-lg"
            :href="profile.telegram"
            external
            icon="send"
            aria-label="Telegram"
          />
          <AppButton
            variant="outline-muted"
            size="icon-lg"
            :href="`mailto:${profile.email}`"
            icon="mail"
            aria-label="Почта"
          />
        </div>
      </div>

      <form novalidate class="reveal" style="transition-delay: 450ms" @submit.prevent="submit">
        <h3 class="hidden">Написать сообщение</h3>

        <div class="space-y-[clamp(0.75rem,1.8vh,1.25rem)]">
          <div class="hidden" aria-hidden="true" tabindex="-1">
            <label for="cf-website">Не заполняйте</label>
            <input
              id="cf-website"
              v-model="form.website"
              type="text"
              name="website"
              autocomplete="off"
            />
          </div>

          <div>
            <label
              class="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground"
              for="cf-name"
            >
              Имя
            </label>
            <input
              id="cf-name"
              class="flex h-10 w-full rounded-md border border-border bg-secondary px-3 py-2 text-base text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Как к вам обращаться"
              :value="form.name"
              @input="onInput('name', ($event.target as HTMLInputElement).value)"
            />
            <p v-if="errors.name" class="mt-2 animate-fade-in text-xs text-destructive">
              {{ errors.name }}
            </p>
          </div>

          <div>
            <label
              class="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground"
              for="cf-contact"
            >
              Контакт
            </label>
            <input
              id="cf-contact"
              class="flex h-10 w-full rounded-md border border-border bg-secondary px-3 py-2 text-base text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              placeholder="Почта или @telegram"
              :value="form.contact"
              @input="onInput('contact', ($event.target as HTMLInputElement).value)"
            />
            <p v-if="errors.contact" class="mt-2 animate-fade-in text-xs text-destructive">
              {{ errors.contact }}
            </p>
          </div>

          <div>
            <label
              class="mb-2 block text-xs uppercase tracking-[0.16em] text-muted-foreground"
              for="cf-message"
            >
              Задача
            </label>
            <textarea
              id="cf-message"
              rows="4"
              class="flex min-h-20 w-full resize-none rounded-md border border-border bg-secondary px-3 py-2 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Продукт, сроки, стек"
              :value="form.message"
              @input="onInput('message', ($event.target as HTMLTextAreaElement).value)"
            />
            <p v-if="errors.message" class="mt-2 animate-fade-in text-xs text-destructive">
              {{ errors.message }}
            </p>
          </div>
        </div>

        <AppButton
          type="submit"
          size="md"
          :disabled="pending || submitted"
          :suffix-icon="submitted ? 'x' : pending ? undefined : 'arrow-right'"
          class="mt-[clamp(1rem,2.6vh,1.75rem)] w-full"
        >
          {{ submitted ? 'Отправлено' : pending ? 'Отправка...' : 'Отправить' }}
        </AppButton>
      </form>
    </div>

    <Teleport to="body">
      <Transition name="toast-slide">
        <div
          v-if="toastVisible"
          class="pointer-events-auto fixed bottom-0 right-0 z-100 m-4 w-[calc(100%-2rem)] rounded-lg border border-border bg-card p-4 text-card-foreground shadow-lg sm:max-w-105"
          role="status"
        >
          <div class="flex items-start gap-3">
            <span
              class="mt-0.5 flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary/15 text-primary"
            >
              <AppIcon name="send" :size="15" />
            </span>

            <div>
              <p class="font-display text-sm font-semibold text-foreground">
                {{ toastType === 'success' ? 'Заявка отправлена' : 'Не удалось отправить' }}
              </p>
              <p class="mt-1 text-sm leading-relaxed text-muted-foreground">
                {{
                  toastType === 'success'
                    ? 'Отвечу в ближайшее время — проверьте Telegram или почту.'
                    : 'Попробуйте ещё раз или напишите напрямую в Telegram.'
                }}
              </p>
            </div>

            <AppButton
              variant="bare"
              icon="x"
              class="ml-auto"
              aria-label="Закрыть уведомление"
              @click="toastVisible = false"
            />
          </div>
        </div>
      </Transition>
    </Teleport>
  </section>
</template>
