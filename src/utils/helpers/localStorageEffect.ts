export const localStorageEffect =
  (key: string) =>
  ({ setSelf, onSet }: { setSelf: any; onSet: any }) => {
    const storeKey = `DATA`;
    const savedValue: any = localStorage.getItem(storeKey);

    if (savedValue != null) {
      setSelf(JSON.parse(savedValue));
    }

    onSet((newValue: any, _: any, isReset: any) => {
      isReset
        ? localStorage.removeItem(storeKey)
        : localStorage.setItem(storeKey, JSON.stringify({ ...savedValue }));
    });
  };
