import uniqueId from 'lodash.uniqueid';

export function componentName(prefix: string = 'component'): string {
  return `${prefix}-${uniqueId()}`.toLowerCase();
}
