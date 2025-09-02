<script setup lang="ts">
import {
  onMounted,
  ref,
} from 'vue';
import {
  useRoute,
  useRouter,
} from 'vue-router';
import { usePageLoadingIndicator } from '@/common/composables';
import { UnknownHttpErrorModal } from '@/modules/http';
import { RouteNames } from '@/app/router/route-names';
import {
  BorderCard,
  CreateRouteSectionModal,
  RouteSection,
} from '@/modules/route-sections';
import { AppPage } from '@/common/components';
import { useRoutes } from '@/modules/routes';

const {
  httpError,
  activeRoute,
  readRoute,
} = useRoutes();

const {
  showUntil,
} = usePageLoadingIndicator();

const route = useRoute();
const router = useRouter();

const isCreateRouteSectionModalVisible = ref<boolean>(false);

function openCreateRouteSectionModal(): void {
  isCreateRouteSectionModalVisible.value = true;
}

function returnToList(): void {
  router.replace({
    name: RouteNames.RoutesList,
  });
}

function isLastSection(index: number): boolean {
  return activeRoute.value?.routeSections.length === (index + 1);
}

function isFirstSection(index: number): boolean {
  return index === 0;
}

onMounted(async () => {
  await showUntil(readRoute(String(route.params.id)));
});
</script>

<template>
  <AppPage full-width>
    <template #content>
      <div class="route-page">
        <BorderCard
          icon="icon-home"
          class="route-page__border-left"
        />
        <template v-if="activeRoute && activeRoute.routeSections.length > 0">
          <RouteSection
            v-for="(item, index) in activeRoute.routeSections"
            :key="item.id"
            :data="item"
            :is-last="isLastSection(index)"
            :is-first="isFirstSection(index)"
          />
        </template>
        <BorderCard
          icon="icon-plus"
          class="route-page__border-right"
          @click="openCreateRouteSectionModal"
        />
      </div>
    </template>
  </AppPage>

  <CreateRouteSectionModal
    v-model:visible="isCreateRouteSectionModalVisible"
    :route-id="String(route.params.id)"
    @create:route-section:success="showUntil(readRoute(String(route.params.id)))"
  />

  <UnknownHttpErrorModal
    :visible="httpError"
    @update:visible="returnToList"
  />
</template>

<style lang="scss">
.route-page {
  display: flex;
  flex-flow: row wrap;
  justify-content: flex-start;
  align-content: flex-start;
  align-items: center;
  flex-grow: 1;
  gap: 2rem 0;

  &__border-left {
    margin-right: 2rem;

    @include breakpoint(sm) {
      margin: 0;
    }
  }
}
</style>
