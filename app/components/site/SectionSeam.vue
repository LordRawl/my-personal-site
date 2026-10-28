<script setup lang="ts">
withDefaults(
  defineProps<{
    fx: 'ridge' | 'wave' | 'caret' | 'slash'
    num?: string
    from?: 'dark' | 'light' | 'red'
    to?: 'dark' | 'light' | 'red'
    flip?: boolean
    shift?: string
    bare?: boolean
  }>(),
  { num: '', from: 'dark', to: 'dark', flip: false, shift: '', bare: false },
)
</script>

<template>
  <div
    class="seam"
    :data-fx="fx"
    :data-num="num"
    :data-from="from"
    :data-to="to"
    :data-flip="flip ? '1' : ''"
    :data-bare="bare ? '1' : ''"
    :style="shift ? { '--sh': shift } : undefined"
    aria-hidden="true"
  />
</template>

<style>
.seam {
  position: absolute;
  left: 0;
  right: 0;
  bottom: calc(100% - var(--H) / 2 - var(--sh, 0px));
  height: var(--H);
  pointer-events: none;
  z-index: 0;
}
.seam__svg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
  display: block;
}
.seam__fill {
  fill: var(--bg);
}
.seam__text {
  font-family: 'Oswald', 'Arial Narrow', Impact, sans-serif;
  font-weight: 700;
  text-transform: uppercase;
  fill: none;
  stroke-width: 2;
}
.seam ~ .container {
  position: relative;
  z-index: 1;
}
</style>
