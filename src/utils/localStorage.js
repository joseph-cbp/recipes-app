const getLocalStorage = {
  setItem: (key, value) => localStorage.setItem(key.toLowerCase(), JSON.stringify(value)),
  getItem: (key) => {
    const result = localStorage.getItem(key.toLowerCase());
    return result && JSON.parse(result);
  },
};

export default getLocalStorage;
