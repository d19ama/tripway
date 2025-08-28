import type { Ref } from 'vue';

export type HttpMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface HttpStates {
  httpError: Ref<boolean>;
  httpLoading: Ref<boolean>;
}
