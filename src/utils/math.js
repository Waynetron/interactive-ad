export const wrap = function (val, min, max) {
  const range = max - min;
  val = (val - min) % range;
  if (val < 0) {
    return val + range;
  } else {
    return val;
  }
};

export const clamp = function (value, min, max) {
  return Math.min(Math.max(value, min), max);
};
