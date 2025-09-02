<script lang="ts" setup>
import {
  computed,
  ref,
} from 'vue';
import type {
  AppInputFileEmits,
  AppInputFileProps,
  AppInputFileSlots,
} from './types';
import { componentName } from '@/common/helpers';

const props = withDefaults(defineProps<AppInputFileProps>(), {
  hint: '',
  label: '',
  errorText: '',
  type: 'base64',
  multiple: false,
  required: false,
  placeholder: '...',
  acceptType: 'image',
  acceptSize: 1048576,
  buttonText: 'Загрузить',
});

const emit = defineEmits<AppInputFileEmits>();

const slots = defineSlots<AppInputFileSlots>();

const ACCEPT_SETTINGS = {
  image: '.jpg, .jpeg, .png, .gif, .svg',
  json: 'application/json',
};

const currentFile = ref<File>();
const message = ref<string>('');
const error = ref<boolean>(false);

const hasLabel = computed<boolean>(() => {
  return !!slots.label! || props.label;
});

const hasHint = computed<boolean>(() => {
  return !!slots.hint! || props.hint;
});

const hasButton = computed<boolean>(() => {
  return !!slots.button! || props.buttonText;
});

const fileName = computed<string>(() => {
  return currentFile.value && currentFile.value.name.length
    ? currentFile.value.name
    : props.placeholder;
});

const errorMessage = computed<string | undefined>(() => {
  if (props.errorText) {
    return props.errorText;
  }

  if (props.validation) {
    return props.validation.$errors.map(({
      $message,
    }) => $message.toString()).at(0);
  }

  return undefined;
});

const isErrorVisible = computed<boolean>(() => {
  return props.required
    && error.value
    && !!errorMessage.value;
});

function onChange(event: Event): void {
  const element = event.currentTarget as HTMLInputElement;
  const files: FileList | null = element.files;

  validate();

  if (!files) {
    return;
  }

  const [
    uploadedFile,
  ] = files;

  if (!uploadedFile || props.validation?.$invalid) {
    return;
  }

  if (props.type === 'base64') {
    encodeImageFileAsURL(uploadedFile, (encodedFile: string) => {
      emit('update:base64', encodedFile);
    });
  }

  if (props.type === 'file') {
    currentFile.value = uploadedFile;
    emit('update:file', uploadedFile);
  }
}

function encodeImageFileAsURL(file: File, callback: Function): void {
  const reader: FileReader = new FileReader();

  reader.onload = (event: ProgressEvent<FileReader>) => {
    callback(event.target?.result);
  };

  reader.readAsDataURL(file);
}

function validate(): void {
  props.validation?.$touch();
  error.value = !!props.validation?.$error;
}
</script>

<template>
  <label class="app-input-file">
    <span
      v-if="hasLabel"
      class="app-input-file__label"
    >
      <slot name="label">
        {{ props.label }}
      </slot>
      <span
        v-if="props.required"
        class="app-input-file__label-asterisk"
      >*</span>
    </span>

    <span class="app-input-file__inner">
      <span
        v-if="hasButton"
        class="app-input-file__button"
      >
        <slot name="button">
          {{ props.buttonText }}
        </slot>
      </span>
      <input
        type="file"
        :name="componentName('app-input-file')"
        :multiple="props.multiple"
        :accept="ACCEPT_SETTINGS[props.acceptType]"
        class="app-input-file__input"
        @change="onChange"
      >
      <span class="app-input-file__placeholder">
        <slot
          name="file"
          :file="currentFile"
        >
          {{ fileName }}
        </slot>
      </span>
    </span>

    <span
      v-if="error"
      class="app-input-file__error"
    >
      <slot
        name="error"
        :error="message"
      >
        {{ message }}
      </slot>
    </span>

    <span
      v-if="hasHint && !isErrorVisible"
      class="app-input-file__hint"
    >
      <slot name="hint">
        {{ props.hint }}
      </slot>
    </span>
  </label>
</template>

<style lang="scss">
.app-input-file {
  $padding: 1rem;
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  gap: .25rem;

  &__label,
  &__error,
  &__hint {
    font-size: .75rem;
    font-weight: 400;
    line-height: 1.4;
  }

  &__label {
    display: flex;
    flex-flow: row nowrap;
    align-items: flex-start;
    justify-content: flex-start;
    gap: .125rem;
    width: 100%;
    color: var(--color-gray-dark);
    user-select: none;
  }

  &__label-asterisk {
    color: var(--color-red);
  }

  &__inner {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    overflow: hidden;
    width: 100%;
    position: relative;
    border-radius: .5rem;
    background-color: var(--color-gray-lite);
    cursor: pointer;
  }

  &__input {
    display: none;
  }

  &__button,
  &__placeholder {
    padding: $padding;
    font-weight: 400;
    line-height: 1.5;
    font-size: .875rem;
    white-space: nowrap;
  }

  &__button {
    color: var(--color-gray-dark);
    background-color: var(--color-gray-middle);
  }

  &__placeholder {
    opacity: .5;
    max-width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    color: var(--color-gray-dark);
    pointer-events: none;
  }

  &__hint {
    opacity: .5;
    color: var(--color-gray-dark);
  }

  &__error {
    color: var(--color-red);
  }
}
</style>
