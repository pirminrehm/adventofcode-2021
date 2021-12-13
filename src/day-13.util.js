function fold(world, foldinstruction) {
  const axis = foldinstruction[0];
  const by = parseInt(foldinstruction[1], 10);
  let newWorld;
  if (axis === 'x') {
    newWorld = world.map((xRow) => [...xRow].splice(0, by));
    const oldWorld = world.map((xRow) => [...xRow].splice(by + 1).reverse());
    if (newWorld[0].length !== oldWorld[0].length) throw new Error('world bad');

    for (let r = 0; r < oldWorld.length; r++) {
      const row = oldWorld[r];
      for (let c = 0; c < row.length; c++) {
        if (row[c]) {
          newWorld[r][c] = true;
        }
      }
    }
  }

  if (axis === 'y') {
    newWorld = [...world].splice(0, by);
    const oldWorld = [...world].splice(by + 1).reverse();
    if (newWorld.length !== oldWorld.length) throw new Error('world bad');

    for (let r = 0; r < oldWorld.length; r++) {
      const row = oldWorld[r];
      for (let c = 0; c < row.length; c++) {
        if (row[c]) {
          newWorld[r][c] = true;
        }
      }
    }
  }
  return newWorld;
}

module.exports = {
  fold,
};
