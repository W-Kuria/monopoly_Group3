export function getNewPosition(currentPosition, rollTotal, boardSize = 40) {
  return (currentPosition + rollTotal) % boardSize;
}