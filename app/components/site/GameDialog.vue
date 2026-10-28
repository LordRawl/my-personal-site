<script setup lang="ts">
const { open, origin, close } = useGameDialog()
const iframeRef = ref<HTMLIFrameElement | null>(null)
const loaded = ref(false)

watch(open, (value) => {
  if (value) {
    loaded.value = false
    nextTick(() => {
      if (iframeRef.value && !iframeRef.value.src) {
        iframeRef.value.src = '/game-frontend.html'
      }
    })
  } else {
    loaded.value = false
    if (iframeRef.value) {
      iframeRef.value.src = ''
    }
  }
})

const onLoad = () => {
  loaded.value = true
}
</script>

<template>
  <BaseDialog
    v-model="open"
    labelledby="game-dialog-title"
    class="dialog--game"
    :origin="origin"
  >
    <div class="dialog__body dialog__body--game">
      <button class="dialog__close dialog__close--outside" type="button" aria-label="Закрыть" @click="close">×</button>
      <div class="dialog__frame">
        <iframe
          v-if="open"
          ref="iframeRef"
          class="dialog__iframe"
          src="/game-frontend.html"
          title="Frontend Game"
          loading="lazy"
          @load="onLoad"
        />
        <div v-if="!loaded" class="dialog__placeholder">Загрузка игры...</div>
      </div>
    </div>
  </BaseDialog>
</template>

<style>
.dialog--game {
  width: min(90rem, 98vw);
  max-height: 100svh;
  padding: 0;
  background: transparent;
  border: none;
  box-shadow: none;
  backdrop-filter: none;
  -webkit-backdrop-filter: none;
  overflow: visible;
}
.dialog--game .dialog__body {
  padding: 0;
  overflow: visible;
}
.dialog__body--game {
  position: relative;
}
.dialog__close--outside {
  position: absolute;
  top: -2.6rem;
  right: 0;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  padding: 0;
  font-size: 1.4rem;
  line-height: 1;
  background: rgba(11, 7, 5, 0.8);
  border: 1px solid rgba(185, 169, 154, 0.4);
  color: var(--cream);
  z-index: 10;
}
.dialog__frame {
  position: relative;
  width: min(90rem, 98vw);
  height: min(90svh, 56.25vw);
  max-height: 90svh;
  border-radius: 0.8rem;
  overflow: hidden;
  background: #060a1c;
  box-shadow: 0 40px 80px -60px rgba(91, 124, 255, 0.6);
}
.dialog__iframe {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
}
.dialog__placeholder {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: #b9a99a;
  font: 500 0.85rem var(--fm);
}
@media (max-width: 900px) {
  .dialog--game {
    margin: 0;
    align-self: end;
  }
  .dialog__close--outside {
    top: -2.6rem;
    right: 0.8rem;
  }
  .dialog__frame {
    width: 100vw;
    height: calc(100svh - 8rem);
    max-height: calc(100svh - 8rem);
    border-radius: 0.8rem 0.8rem 0 0;
  }
}
</style>
