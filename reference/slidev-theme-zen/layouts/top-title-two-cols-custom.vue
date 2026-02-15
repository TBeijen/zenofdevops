<template>
  <ZenFrame class="zen-top-title">
    <template #title>
      <slot name="title" />
    </template>

    <div class="zen-panel">
      <div class="zen-two-cols grid grid-cols-2">
        <div class="zen-col ">
          <slot name="left" />
        </div>
        <div class="zen-col">
          <slot name="right" />
        </div>
      </div>
    </div>
    <div class="z-50 absolute bottom-0 w-full"><slot name="custom" /></div>
  </ZenFrame>
</template>
