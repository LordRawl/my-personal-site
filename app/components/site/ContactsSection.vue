<script setup lang="ts">
const name = ref('')
const contact = ref('')
const message = ref('')
const website = ref('')
const status = ref('')
const busy = ref(false)
const invalid = ref({ name: false, contact: false, message: false })

const nameEl = ref<HTMLInputElement | null>(null)
const contactEl = ref<HTMLInputElement | null>(null)
const messageEl = ref<HTMLTextAreaElement | null>(null)

const t0 = import.meta.client ? Date.now() : 0

const submit = async () => {
  if (busy.value) return
  invalid.value = {
    name: name.value.trim().length < 2,
    contact: contact.value.trim().length < 3,
    message: message.value.trim().length < 10,
  }
  const el = invalid.value.name
    ? nameEl
    : invalid.value.contact
      ? contactEl
      : invalid.value.message
        ? messageEl
        : null
  if (el) {
    el.value?.focus()
    status.value = 'Проверьте поля: имя от 2, контакт от 3, задача от 10 символов.'
    return
  }
  busy.value = true
  status.value = 'Отправляю…'
  try {
    const res = await $fetch<{ ok?: boolean }>('/api/contact', {
      method: 'POST',
      body: {
        name: name.value,
        contact: contact.value,
        message: message.value,
        website: website.value,
        loadTime: t0,
      },
    })
    if (!res.ok) throw new Error('send failed')
    status.value = 'Готово: заявка отправлена. Отвечу в ближайшее время.'
    name.value = ''
    contact.value = ''
    message.value = ''
  } catch {
    status.value = 'Не получилось отправить. Напишите в Telegram: @lordrawl'
  } finally {
    busy.value = false
  }
}
</script>

<template>
  <section id="contacts" class="contacts" aria-labelledby="ch">
    <p class="mono contacts__kicker">(05) Контакты</p>
    <h2 id="ch" class="contacts__heading">Обсудим задачу</h2>

    <div class="contacts__grid">
      <div class="contacts__intro">
        <p class="contacts__lead">
          Открыт к удалённой работе, частичной занятости и проектным задачам.
        </p>
        <ul class="contacts__links">
          <li><a href="https://github.com/lordrawl">GitHub — lordrawl</a></li>
          <li><a href="https://t.me/lordrawl">Telegram — @lordrawl</a></li>
          <li><a href="mailto:lordrawl@gmail.com">lordrawl@gmail.com</a></li>
        </ul>
      </div>

      <form id="form" class="contacts__form" novalidate @submit.prevent="submit">
        <label class="contacts__field"
          >Имя<input
            ref="nameEl"
            v-model="name"
            name="name"
            autocomplete="name"
            :aria-invalid="invalid.name"
            required
        /></label>
        <label class="contacts__field"
          >Контакт
          <input
            ref="contactEl"
            v-model="contact"
            name="contact"
            autocomplete="off"
            placeholder="Telegram или e-mail"
            :aria-invalid="invalid.contact"
            required
          /></label
        >
        <label class="contacts__field"
          >Задача<textarea
            ref="messageEl"
            v-model="message"
            name="message"
            rows="4"
            :aria-invalid="invalid.message"
            required
        /></label>

        <div class="contacts__hp" aria-hidden="true">
          <label>Не заполняйте<input v-model="website" name="website" tabindex="-1" autocomplete="off" /></label>
        </div>

        <button class="btn btn--big" data-magnet type="submit" :disabled="busy">Отправить</button>
        <p id="st" class="contacts__status" role="status" aria-live="polite">{{ status }}</p>
      </form>
    </div>
  </section>
</template>

<style>
.contacts {
  position: relative;
  background: var(--acc);
  color: var(--dk);
  padding: 16vh var(--pad) 34vh;
}
.contacts__kicker {
  color: #2b0b07;
}
.contacts__heading {
  margin: 1rem 0 1.5rem;
  font: 900 clamp(2.4rem, 10.5vw, 10rem) / 0.92 var(--fd);
  letter-spacing: -0.03em;
}
.contacts__grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 2rem;
  margin-top: 3rem;
}
.contacts__intro {
  grid-column: 1 / 6;
}
.contacts__lead {
  font-weight: 700;
  font-size: 1.15rem;
  margin: 0;
}
.contacts__links {
  display: grid;
  gap: 0.5rem;
  margin: 2rem 0 0;
  padding: 0;
  list-style: none;
  font: 700 1.1rem var(--fm);
}
.contacts__form {
  grid-column: 7 / 13;
  display: grid;
  gap: 1rem;
}
.contacts__field {
  display: grid;
  gap: 0.4rem;
  font: 700 0.75rem var(--fm);
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.contacts__field input,
.contacts__field textarea {
  width: 100%;
  padding: 1rem;
  border: 2px solid var(--dk);
  border-radius: 0.8rem;
  background: #f3e9df;
  color: var(--dk);
  font: 500 1rem var(--fm);
}
.contacts__field input:focus-visible,
.contacts__field textarea:focus-visible {
  outline: 3px solid var(--dk);
  outline-offset: 2px;
}
.contacts__field input[aria-invalid='true'],
.contacts__field textarea[aria-invalid='true'] {
  border-color: #fff;
  box-shadow: 0 0 0 3px var(--dk);
}
.contacts__hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.contacts .btn {
  background: var(--dk);
  color: var(--cream);
  justify-self: start;
}
.contacts .btn:hover {
  background: #2a1a12;
}
.contacts .btn:disabled {
  opacity: 0.6;
  cursor: progress;
}
.contacts__status {
  min-height: 1.6em;
  margin: 0;
  font-weight: 700;
}
@media (max-width: 800px) {
  .contacts__intro,
  .contacts__form {
    grid-column: 1 / -1;
  }
}
</style>