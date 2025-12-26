const Storage = {
  appKey: "Tibetan-Mantra-To-Iast-And-Phonetics",

  localStorageSupported() {
    try {
      return !!window.localStorage;
    } catch (error) {
      return false;
    }
  },

  scopedKey(keyName) {
    return this.appKey + "." + keyName;
  },

  get(keyName) {
    let jsonValue;
    const key = this.scopedKey(keyName);
    if (this.localStorageSupported()) {
      jsonValue = localStorage.getItem(key);
    }
    return jsonValue && JSON.parse(jsonValue);
  },

  set(keyName, value) {
    const key = this.scopedKey(keyName);
    const jsonValue = JSON.stringify(value);
    if (this.localStorageSupported()) {
      localStorage.setItem(key, jsonValue);
    }
    return true;
  },

  delete(keyName) {
    const key = this.scopedKey(keyName);
    if (this.localStorageSupported()) {
      localStorage.removeItem(key);
    }
  },
};

export default Storage;
