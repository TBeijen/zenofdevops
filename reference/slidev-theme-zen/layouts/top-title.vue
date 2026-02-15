<template>
  <ZenFrame class="zen-top-title">
    <template #title>
      <slot name="title" />
    </template>

    <div class="zen-panel">
      <slot name="content" />
      <slot />
    </div>
  </ZenFrame>
</template>
