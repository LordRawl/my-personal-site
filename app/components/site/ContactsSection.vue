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
  <section id="contacts" class="contacts page-section tone tone--light" aria-labelledby="contacts-heading">
    <SectionSeam fx="ridge" num="05" from="dark" to="light" flip />

    <div class="container section-pad">
      <div class="contacts__grid">
        <div class="contacts__intro">
          <p class="mono">(05) Контакты</p>
          <h2 id="contacts-heading" class="contacts__heading">Обсудим задачу</h2>
          <p class="contacts__lead">
            Открыт к удалённой работе, частичной занятости и проектным задачам.
          </p>

          <ul class="contacts__socials">
            <li class="contacts__social">
              <a
                class="contacts__social-link"
                href="https://github.com/lordrawl"
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub, lordrawl"
                title="GitHub"
              >
                <svg class="contacts__social-icon" aria-hidden="true"><use href="#contact-github" /></svg>
              </a>
            </li>
            <li class="contacts__social">
              <a
                class="contacts__social-link"
                href="https://t.me/lordrawl"
                target="_blank"
                rel="noreferrer"
                aria-label="Telegram, @lordrawl"
                title="Telegram"
              >
                <svg class="contacts__social-icon" aria-hidden="true"><use href="#contact-telegram" /></svg>
              </a>
            </li>
            <li class="contacts__social">
              <a
                class="contacts__social-link"
                href="mailto:lordrawl@gmail.com"
                aria-label="Написать на lordrawl@gmail.com"
                title="lordrawl@gmail.com"
              >
                <svg class="contacts__social-icon" aria-hidden="true"><use href="#contact-mail" /></svg>
              </a>
            </li>
          </ul>

          <svg
            class="contacts__sprite"
            width="0"
            height="0"
            aria-hidden="true"
            focusable="false"
          >
            <defs>
              <symbol id="contact-github" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.7 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3"
                />
              </symbol>
              <symbol id="contact-telegram" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M21.7 3.3 2.6 10.7c-1.3.5-1.3 1.3-.2 1.6l4.9 1.5 1.9 5.8c.2.6.4.8.9.8s.7-.2 1-.5l2.4-2.3 4.9 3.6c.9.5 1.5.2 1.7-.8L23 4.7c.3-1.3-.5-1.9-1.3-1.4Zm-3.1 3.9-8.9 8-.3 3.7-1.5-4.8 10.7-6.7c.5-.3.9-.1.5.3Z"
                />
              </symbol>
              <symbol id="contact-mail" viewBox="0 0 24 24">
                <path
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linejoin="round"
                  stroke-linecap="round"
                  d="M3 6h18v12H3zM3.5 6.5 12 13l8.5-6.5"
                />
              </symbol>
            </defs>
          </svg>
        </div>

        <form class="contacts__form" novalidate @submit.prevent="submit">
          <div class="contacts__field">
            <label class="contacts__label" for="contact-name">Имя</label>
            <input
              id="contact-name"
              ref="nameEl"
              v-model="name"
              class="contacts__input"
              name="name"
              autocomplete="name"
              :aria-invalid="invalid.name"
              required
            />
          </div>
          <div class="contacts__field">
            <label class="contacts__label" for="contact-channel">Контакт</label>
            <input
              id="contact-channel"
              ref="contactEl"
              v-model="contact"
              class="contacts__input"
              name="contact"
              autocomplete="off"
              placeholder="Telegram или e-mail"
              :aria-invalid="invalid.contact"
              required
            />
          </div>
          <div class="contacts__field">
            <label class="contacts__label" for="contact-message">Задача</label>
            <textarea
              id="contact-message"
              ref="messageEl"
              v-model="message"
              class="contacts__input contacts__input--area"
              name="message"
              rows="3"
              :aria-invalid="invalid.message"
              required
            />
          </div>

          <div class="contacts__honeypot" aria-hidden="true">
            <label>Не заполнять<input v-model="website" name="website" tabindex="-1" autocomplete="off" /></label>
          </div>

          <p v-if="status" class="contacts__status" role="status" aria-live="polite">{{ status }}</p>
          
          <button class="btn btn--big" type="submit" :disabled="busy">Отправить</button>
        </form>
      </div>
    </div>
  </section>
</template>

<style>
.contacts__heading .heading-line path {
  stroke: var(--dk);
}
@keyframes wave {
  0% {
    opacity: 1;
    transform: scale(1.1);
  }
  14% {
    transform: scale(1.5);
  }
  20%,
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

.contacts__grid {
  display: grid;
  gap: 3rem;
  margin-top: 1.5rem;
}
@media (min-width: 1024px) {
  .contacts__grid {
    grid-template-columns: 1fr 1fr;
    column-gap: 5rem;
    align-items: start;
  }
}
.contacts__heading {
  margin: 1rem 0 1.5rem;
  font: 900 clamp(2.2rem, 5.4vw, 5rem)/1 var(--fd);
  letter-spacing: -0.02em;
  text-transform: uppercase;
}
.contacts__lead {
  margin: 0;
  max-width: 34rem;
  color: var(--mut);
  font-size: 1.1rem;
}
.contacts__socials {
  display: flex;
  flex-wrap: wrap;
  gap: 2.5rem;
  align-items: center;
  margin: 2.5rem 0 0;
  padding: 0;
  list-style: none;
}
@media (max-width: 1023px) {
  .contacts__grid {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .contacts__intro {
    display: contents;
  }
  .contacts__form {
    order: 2;
    margin-top: 2.5rem;
  }
  .contacts__socials {
    order: 3;
    margin: 4rem auto 0;
    justify-content: space-between;
    gap: 1rem;
    max-width: 20rem;
    width: 100%;
  }
}
.contacts__social-link {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4.5rem;
  height: 4.5rem;
  border-radius: 50%;
  border: 2px solid var(--fg);
  color: var(--fg);
  text-decoration: none;
  transition: 0.3s;
}
.contacts__social-link:hover,
.contacts__social-link:focus-visible {
  border-color: #e73228;
  background: #e73228;
  color: #fff;
}
.contacts__social-link::after {
  content: '';
  position: absolute;
  inset: -2px;
  opacity: 0;
  transform: scale(1.1);
  transform-origin: center;
  border-radius: 50%;
  z-index: -1;
  border: 1px solid #e73228;
  box-shadow: 0 0 10px 5px rgba(231, 50, 40, 0.6);
  animation: wave 15s infinite;
}
.contacts__social:nth-child(2) .contacts__social-link::after {
  animation-delay: 5s;
}
.contacts__social:nth-child(3) .contacts__social-link::after {
  animation-delay: 10s;
}
.contacts__social-icon {
  width: 2.2rem;
  height: 2.2rem;
  fill: currentColor;
  transition: 0.3s;
}
.contacts__sprite {
  position: absolute;
}
.contacts__form {
  display: grid;
  gap: 1.4rem;
}
.contacts__label {
  display: block;
  font: 700 0.75rem var(--fm);
  text-transform: uppercase;
  letter-spacing: 0.14em;
  color: var(--mut);
}
.contacts__input {
  display: block;
  width: 100%;
  margin-top: 0.5rem;
  padding: 0.75rem 0;
  border: 0;
  border-bottom: 2px solid var(--bd);
  border-radius: 0;
  background: transparent;
  color: var(--fg);
  font: 500 1.1rem var(--fm);
}
.contacts__input:focus {
  outline: none;
  border-color: var(--hot);
}
.contacts__input[aria-invalid='true'] {
  border-color: #ff6b61;
}
.contacts__input--area {
  resize: none;
}
.contacts__honeypot {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}
.contacts__form .btn {
  width: 100%;
  justify-content: center;
  margin-top: 0.4rem;
}
.contacts__form .btn:disabled {
  opacity: 0.6;
  cursor: progress;
}
.contacts__status {
  min-height: 1.6em;
  margin: 0;
  color: #e73228;
  font-weight: 700;
}
</style>
