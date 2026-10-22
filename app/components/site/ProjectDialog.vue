<template>
  <dialog id="dlg" class="dialog" data-lenis-prevent aria-labelledby="dt">
    <div class="dialog__body">
      <button id="dx" class="dialog__close" type="button">Закрыть ✕</button>
      <p id="dm" class="mono dialog__meta" />
      <h3 id="dt" class="dialog__title" />
      <p id="dd" class="dialog__desc" />
      <div id="dmetric" class="dialog__metric" hidden />
      <p class="dialog__label">Мой вклад</p>
      <ul id="ddetails" class="dialog__details" />
      <ul id="dc" class="dialog__chips" />
    </div>
  </dialog>
</template>

<style>
.dialog {
  border: 0;
  padding: 0;
  margin: auto;
  background: var(--cream);
  color: var(--dk);
  width: min(44rem, 92vw);
  border-radius: 1.5rem;
  max-height: 88vh;
  overflow: auto;
}
.dialog::backdrop {
  background: rgba(11, 7, 5, 0.78);
}
.dialog__body {
  padding: 2.4rem;
}
.dialog__meta {
  color: #5a4637;
}
.dialog__title {
  margin: 0.6rem 0 1rem;
  font: 900 clamp(1.4rem, 3vw, 2.2rem) / 1.1 var(--fd);
}
.dialog__close {
  float: right;
  background: var(--dk);
  color: var(--cream);
  border: 0;
  border-radius: 99px;
  padding: 0.6rem 1.1rem;
  font: 700 0.75rem var(--fm);
  text-transform: uppercase;
}
.dialog__metric {
  margin: 1.4rem 0;
  padding: 1.2rem 1.4rem;
  border: 1.5px solid var(--dk);
  border-radius: 1rem;
}
.dialog__metric-value {
  display: block;
  font: 900 clamp(1.4rem, 2.6vw, 2rem) / 1 var(--fd);
  color: var(--acc);
}
.dialog__metric-label {
  display: block;
  margin-top: 0.4rem;
  font: 500 0.75rem var(--fm);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #5a4637;
}
.dialog__label {
  margin: 1.8rem 0 0.7rem;
  font: 500 0.75rem var(--fm);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #5a4637;
}
.dialog__details {
  margin: 0;
  padding: 0;
  list-style: none;
  display: grid;
  gap: 0.7rem;
}
.dialog__detail {
  position: relative;
  padding-left: 1.5rem;
  font-size: 0.95rem;
  line-height: 1.55;
}
.dialog__detail::before {
  content: '→';
  position: absolute;
  left: 0;
  color: var(--acc);
  font-weight: 700;
}
.dialog__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  list-style: none;
  margin: 1.8rem 0 0;
}
.dialog__chip {
  padding: 0.4rem 0.9rem;
  border-radius: 99px;
  background: var(--acc);
  font-weight: 700;
  font-size: 0.85rem;
}
</style>
