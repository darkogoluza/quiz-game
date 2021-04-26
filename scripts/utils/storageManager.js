export function setItem(key, value) {
  sessionStorage.setItem(key, value);
}

export function getItem(key) {
  return sessionStorage.getItem(key);
}

export function changeItem(key, value) {
  setItem(key, parseInt(getItem(key)) + value);
  return getItem(key);
}
