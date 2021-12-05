erg = input.reduce(
  (acc, curr) => {
    switch (curr.c) {
      case 'up':
        acc.aim -= curr.v;
        break;
      case 'down':
        acc.aim += curr.v;
        break;
      case 'forward':
        acc.y += curr.v;
        acc.x += curr.v * acc.aim;
        break;
    }
    return acc;
  },
  { x: 0, y: 0, aim: 0 }
);
