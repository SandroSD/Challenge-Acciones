export const setToLocalStorage = (key, value) => {
  localStorage.setItem(key, value);
};

export const getFromLocalStorage = (key) => {
  return localStorage.getItem(key);
};
