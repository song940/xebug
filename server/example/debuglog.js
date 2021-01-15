const debuglog = (name) => {
  return (...args) => console.debug(name, ...args);
};

export default debuglog;