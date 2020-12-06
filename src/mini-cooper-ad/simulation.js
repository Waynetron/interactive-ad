import { wrap } from "../utils/math.js";

// Paths are limited to 2 points for now (start and end) to keep implementation simple.
// Aah, but one can dream of long windy roads...
const getPositionAlongPath = function (path, progress) {
  const [[startX, startY], [endX, endY]] = path;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const x = startX + distanceX * progress;
  const y = startY + distanceY * progress;

  return { x, y };
};

const getEdges = (car) => {
  const width = car.rotation === 0 ? 10 : 20; // 8 : 16;
  const height = car.rotation === 0 ? 10 : 5; // 9 : 4.5;

  return {
    top: car.y - height / 2,
    bottom: car.y + height / 2,
    left: car.x - width / 2,
    right: car.x + width / 2,
  };
};

const isOverlapping = (spriteA, spriteB) => {
  const a = getEdges(spriteA);
  const b = getEdges(spriteB);

  return (
    a.bottom > b.top && a.top < b.bottom && a.right > b.left && a.left < b.right
  );
};

const applyCollisions = function (carA, cars, deltaTime) {
  for (const carB of cars) {
    if (carA.id === carB.id) {
      continue;
    }

    if (isOverlapping(carA, carB)) {
      return {
        ...carA,
        stopped: true,
      };
    }
  }

  return carA;
};

const applyMovement = function (car, deltaTime) {
  if (car.stopped) {
    return car;
  }

  let newProgress = car.progress + (deltaTime / 2000) * car.speed;
  // Car wraps back to the start once it exceeds 1.
  newProgress = wrap(newProgress, 0, 1);

  // Scale up the pathProgress so that the car both starts and finishes completely off-screen.
  const pathProgress = newProgress * 1.4 - 0.2;
  const { x, y } = getPositionAlongPath(car.path, pathProgress);

  return {
    ...car,
    progress: newProgress,
    x,
    y,
  };
};

export const updatePlayer = function (gameState, progress) {
  const { player } = gameState;

  if (player.stopped) {
    return gameState;
  }

  // Scale up the pathProgress so that the car both starts and finishes completely off-screen.
  const pathProgress = progress * 1.4 - 0.2;
  const { x, y } = getPositionAlongPath(player.path, pathProgress);
  const newPlayer = { ...player, x, y };

  return { ...gameState, player: newPlayer };
};

export const updateTraffic = function (gameState, deltaTime) {
  const { player, traffic } = gameState;

  if (player.stopped) {
    return gameState;
  }

  const newTraffic = traffic.map((car) => applyMovement(car, deltaTime));
  const newPlayer = applyCollisions(player, traffic, deltaTime);

  return { ...gameState, traffic: newTraffic, player: newPlayer };
};
