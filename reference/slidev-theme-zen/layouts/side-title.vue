<template>
  <ZenFrame>
    <template #title>
      <slot name="title" />
    </template>

    <div class="zen-panel">
      <div class="zen-side-title">
        <div class="zen-side-title__title">
          <slot name="title" />
        </div>
        <div class="zen-side-title__content">
          <slot name="content" />
          <slot />
        </div>
      </div>
    </div>
  </ZenFrame>
</template>
