export function loadState<T>(key: string): T | undefined {
  try {
    const jsonState = localStorage.getItem(key);
    if (!jsonState) {
      return undefined;
    }
    return JSON.parse(jsonState);
  } catch (e) {
    console.error(e);
    return undefined;
  }
}

export const saveState = (key: string, state: any) => {
  try {
    const jsonState = JSON.stringify(state);
    localStorage.setItem(key, jsonState);
  } catch (e) {
    console.error(e);
  }
};
