import { v4 as uuidv4 } from "uuid";

// Uses css coordinate system where 0, 0 is top left.
// [x, y] values are percentages, eg: 50, 50 would be the center of the screen.
export const mainRoadPath = [
  [50, 0],
  [50, 100],
];

export const upperSideRoad = [
  [0, 25],
  [100, 25],
];

export const lowerSideRoad = [
  [100, 65],
  [0, 65],
];

export const generateTraffic = function (
  numCars,
  path,
  speed,
  rotation,
  spacing = 0.15
) {
  let traffic = [];
  for (let i = 0; i < numCars; i++) {
    traffic.push({
      id: uuidv4(),
      x: 0,
      y: 0,
      color: Math.random() > 0.5 ? "red" : "blue",
      path,
      rotation,
      speed,
      progress: i * spacing,
      offset: Math.random(),
    });
  }

  return traffic;
};
