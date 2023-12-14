<template>
  <div class="flex">
    <div class="h-screen w-150">
      <img class="h-screen w-full" src="@/assets/images/login/login-banner.png" alt="" />
    </div>
    <div class="h-screen flex-1 relative">
      <div class="absolute top-0 flex items-center justify-center h-12 w-full enter-y">
        <slot name="message"></slot>
      </div>
      <div class="w-80 mt-28 mx-auto">
        <slot name="form"></slot>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style lang="less" scoped></style>
