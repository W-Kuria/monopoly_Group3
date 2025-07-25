const boardTiles = Array.from({ length: 40 }, (_, i) => {
  let type;

  if (i === 0) {
    type = 'GO';
  } else if (i === 30) {
    type = 'Go to Jail';
  } else {
    type = 'Property';
  }

  return {
    id: i,
    name: `Tile ${i}`,
    type: type,
  };
});

export default boardTiles;
