const info = (...args: unknown[]) => {
  console.log("Info:", ...args);
};

const error = (...args: unknown[]) => {
  console.log("Error:", ...args);
};

export default {
  info,
  error,
};
