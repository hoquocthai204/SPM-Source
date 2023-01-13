export const uniqueId = (): string =>
  Date.now().toString(36) + Math.random().toString(36).substr(2);

export const isEmptyObject = (obj: Object): boolean =>
  !obj || (Object.keys(obj).length === 0 && Object.getPrototypeOf(obj) === Object.prototype);
