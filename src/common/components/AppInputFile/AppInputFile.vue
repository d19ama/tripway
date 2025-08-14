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

const props = withDefaults(defineProps<AppInputFileProps>(), {
  type: 'base64',
  acceptType: 'image',
  acceptSize: 1048576,
  buttonText: 'Upload photo',
});

const emit = defineEmits<AppInputFileEmits>();

defineSlots<AppInputFileSlots>();

const EXTENSIONS = {
  image: [
    'jpg',
    'jpeg',
    'png',
    'bmp',
  ],
  json: [
    'json',
    'jsonp',
  ],
};

const ACCEPT_SETTINGS = {
  image: '.jpg,.jpeg,.png,.bmp,image/bmp,image/png,image/x-png',
  json: 'application/json',
};

const currentFile = ref<File>();
const message = ref<string>('');
const error = ref<boolean>(false);

const fileName = computed<string>(() => {
  return currentFile.value && currentFile.value.name.length
    ? currentFile.value.name
    : '...';
});

function onChange(event: Event): void {
  const element = event.currentTarget as HTMLInputElement;
  const files: FileList | null = element.files;

  if (!files) {
    return;
  }

  const [
    uploadedFile,
  ] = files;

  if (!uploadedFile || !validate(uploadedFile)) {
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

function validate(file: File): void | boolean {
  if (checkFormat(file.name)) {
    error.value = false;
  } else {
    error.value = true;
    message.value = 'Format is invalid';
    return false;
  }

  if (checkSize(file.size)) {
    error.value = false;
  } else {
    error.value = true;
    message.value = 'Size is invalid';
    return false;
  }

  return true;
}

function checkSize(fileSize: number): boolean {
  return fileSize <= props.acceptSize;
}

function checkFormat(fileName: string): boolean {
  const regexp: RegExp = /(?:\.([^.]+))?$/;
  const name: string = fileName.toLowerCase();
  const extension: RegExpExecArray | null = regexp.exec(name);
  const types: string[] = EXTENSIONS[props.acceptType];

  return extension !== null
    ? types.includes(extension[1] as unknown as string)
    : false;
}
</script>

<template>
  <div class="app-input-file">
    <label class="app-input-file__inner">
      <span class="app-input-file__button">
        {{ props.buttonText }}
      </span>
      <input
        type="file"
        :multiple="props.multiple"
        :accept="ACCEPT_SETTINGS[props.acceptType]"
        class="app-input-file__input"
        @change="onChange"
      >
      <span class="app-input-file__text">
        <slot
          name="file"
          :file="currentFile"
        >
          {{ fileName }}
        </slot>
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
    </label>
  </div>
</template>

<style lang="scss">
$padding: 1rem;

.app-input-file {

  &__input {
    display: none;
  }

  &__inner {
    display: flex;
    align-items: center;
    flex-flow: row nowrap;
    width: 100%;
    position: relative;
    background-color: var(--color-gray-lite);
    border: 1px solid var(--color-gray-dark);
    user-select: none;
    cursor: pointer;
  }

  &__button {
    padding: $padding;
    color: var(--color-white);
    white-space: nowrap;
    background-color: var(--color-gray-dark);
  }

  &__text {
    max-width: 100%;
    overflow: hidden;
    padding: $padding;
    white-space: nowrap;
    text-overflow: ellipsis;
    color: rgba(var(--color-black), .5);
    pointer-events: none;
  }

  &__error {
    display: block;
    position: absolute;
    top: calc(100% + .25rem);
    left: 0;
    z-index: 1;
    font-size: .75rem;
    color: var(--color-red);
  }
}
</style>
