import type { Ref } from 'vue';

export type HttpMethods = 'get' | 'post' | 'put' | 'patch' | 'delete';

export interface HttpStates {
  isError: Ref<boolean>;
  isLoading: Ref<boolean>;
}
