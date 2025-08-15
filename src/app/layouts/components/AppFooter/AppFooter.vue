<script lang="ts" setup>
import { AppLink } from '@/common/components';

const currentYear = new Date().getFullYear();
</script>

<template>
  <footer class="app-footer">
    <span class="app-footer__text">&#169; {{ currentYear }}</span>
    <span>
      Создано
      <AppLink
        target="_blank"
        href="http://artemanpilov.ru"
        :underline="false"
        theme="secondary"
      >
        artem anpilov
      </AppLink>
    </span>
  </footer>
</template>

<style lang="scss">
.app-footer {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 1rem;
  position: fixed;
  left: 0;
  bottom: 0;
  z-index: 100;
  pointer-events: none;

  &:before {
    display: block;
    width: 100%;
    height: 120%;
    position: absolute;
    left: 0;
    bottom: 0;
    background: linear-gradient(to bottom, rgba(255,255,255,0) 0%,rgba(255,255,255,1) 31%);
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#00ffffff', endColorstr='#ffffff',GradientType=0 );
    pointer-events: none;

    @include breakpoint(mobile) {
      content: '';
    }
  }

  &__text {
    font-size: .875rem;
    pointer-events: auto;
    user-select: none;
    cursor: default;

    .love {
      transition: color .3s;
    }

    &:hover {

      .love {
        color: var(--color-red);
      }
    }
  }

  &__social {
    pointer-events: auto;
  }
}
</style>
