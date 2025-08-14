<template>
  <section class="app-content">
    <RouterView />
  </section>
</template>

<style lang="scss">
.app-content {
  flex: 1 0 auto;
  overflow: hidden;
  position: relative;

  &:before {
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    background-size: cover;
    background-position: center;
    background-image: url('@/app/assets/images/bg.jpg');
    filter: blur(5px);
    transform-origin: center;
    transform: scale(1.1);
  }
}
</style>
