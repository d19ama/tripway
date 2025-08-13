import {
  computed,
  ref,
} from 'vue';

interface IDialog {
  id: symbol;
}

const _items = ref<IDialog[]>([]);

export function useModalStore() {
  const items = computed<IDialog[]>(() => {
    return _items.value;
  });

  function add(payload: IDialog): void {
    _items.value = [
      ..._items.value.filter((dialog) => dialog.id !== payload.id),
      payload,
    ];
  }

  function remove<T extends Pick<IDialog, 'id'>>(payload: T): void {
    _items.value = _items.value.filter((dialog) => dialog.id !== payload.id);
  }

  const active = computed<IDialog | undefined>(() => {
    return _items.value[_items.value.length - 1];
  });

  return {
    items,
    active,
    add,
    remove,
  };
}
