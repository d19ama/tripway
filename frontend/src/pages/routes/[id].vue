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
  CreateRouteSectionModal,
  RouteSection,
  useRouteSection,
} from '@/modules/route-sections';
import { AppPage } from '@/common/components';
import {
  BorderCard,
  useRoutes,
} from '@/modules/routes';

const {
  httpError: isRouteError,
  readRoute,
} = useRoutes();

const {
  httpError: isRouteSectionError,
  routeSections,
  readRouteSections,
} = useRouteSection();

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

onMounted(async () => {
  await showUntil(readRoute(String(route.params.id)));
  await showUntil(readRouteSections(String(route.params.id)));
});
</script>

<template>
  <AppPage full-width>
    <template #content>
      <div class="route-page">
        <BorderCard
          icon="icon-home"
        />
        <template v-if="routeSections.length > 0">
          <RouteSection
            v-for="item in routeSections"
            :key="item.id"
            :data="item"
          />
        </template>
        <BorderCard
          icon="icon-plus"
          @click="openCreateRouteSectionModal"
        />
      </div>
    </template>
  </AppPage>

  <CreateRouteSectionModal
    v-model:visible="isCreateRouteSectionModalVisible"
    :route-id="String(route.params.id)"
    @create:route-section:success="showUntil(readRouteSections(String(route.params.id)))"
  />

  <UnknownHttpErrorModal
    :visible="isRouteError || isRouteSectionError"
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
  gap: 2rem;
}
</style>
