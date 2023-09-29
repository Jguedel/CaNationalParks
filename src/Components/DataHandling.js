const addToLoc = (toAdd, key, obj = false) => {
  if (obj) {
    return localStorage.setItem(key, JSON.stringify(toAdd));
  } else {
    return localStorage.setItem(key, toAdd);
  }
  // console.log(localStorage.getItem(key));
};
const getFromLoc = (key, obj = false) => {
  // console.log(localStorage.getItem(key));
  if (obj) {
    return JSON.parse(localStorage.getItem(key));
  } else {
    return localStorage.getItem(key);
  }
};

export { addToLoc, getFromLoc };
