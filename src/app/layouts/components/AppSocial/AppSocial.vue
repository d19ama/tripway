<script lang="ts" setup>
const SOCIAL = [
  {
    name: 'instagram',
    link: 'https://www.instagram.com/d19ama/',
  },
  {
    name: 'telegram',
    link: 'https://t.me/d19ama',
  },
  {
    name: 'github',
    link: 'https://github.com/BlindResist',
  },
];
</script>

<template>
  <div class="app-social">
    <a
      v-for="item in SOCIAL"
      :key="item.name"
      target="_blank"
      :href="item.link"
      :title="item.name"
      :class="`app-social__item icon icon-${item.name}`"
    />
  </div>
</template>

<style lang="scss">
.app-social {
  display: flex;
  align-items: center;
  flex-flow: row nowrap;

  &__item {
    display: block;
    width: 1.5rem;
    height: 1.5rem;
    font-size: 1.25rem;
    text-align: center;
    background-size: 100%;
    background-position: center;
    background-repeat: no-repeat;
    transition: color .3s ease-in-out;

    &+& {
      margin-left: 1rem;
    }

    &:hover {
      color: var(--color-primary);
    }
  }
}
</style>
