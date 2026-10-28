<script setup lang="ts">
const { project, origin, close } = useProjectDialog()

const visible = computed({
  get: () => Boolean(project.value),
  set: (value) => {
    if (!value) close()
  },
})
</script>

<template>
  <BaseDialog
    v-model="visible"
    labelledby="project-dialog-title"
    :origin="origin"
  >
    <div v-if="project" class="dialog__body">
      <button class="dialog__close" type="button" @click="close">Закрыть ✕</button>
      <p class="mono dialog__meta">
        {{ project.tag }} · {{ project.company }} · {{ project.period }}
      </p>
      <h3 id="project-dialog-title" class="dialog__title">{{ project.title }}</h3>
      <p class="dialog__text">{{ project.description }}</p>
      <ul class="dialog__points">
        <li v-for="point in project.points" :key="point">{{ point }}</li>
      </ul>
      <p class="dialog__metric">
        {{ project.metric.value
        }}<small class="dialog__metric-label">{{ project.metric.label }}</small>
      </p>
      <ul class="dialog__chips">
        <li v-for="tool in project.stack" :key="tool" class="dialog__chip">{{ tool }}</li>
      </ul>
    </div>
  </BaseDialog>
</template>

<style>
.dialog__text {
  margin: 0;
  line-height: 1.55;
}
.dialog__points {
  margin: 1rem 0;
  padding-left: 1.1rem;
}
.dialog__metric {
  margin: 1.4rem 0 0;
  font: 900 clamp(1.6rem, 4vw, 3rem) / 1 var(--fd);
  color: #d92b20;
}
.dialog__metric-label {
  display: block;
  margin-top: 0.4rem;
  font: 500 0.85rem var(--fm);
  color: #5a4637;
}
.dialog__chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  padding: 0;
  list-style: none;
  margin: 1.2rem 0 0;
}
.dialog__chip {
  padding: 0.4rem 0.9rem;
  border-radius: 99px;
  background: #e73228;
  color: #0b0705;
  font-weight: 700;
  font-size: 0.85rem;
}
</style>
