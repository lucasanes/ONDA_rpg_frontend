export function xpToNextLevel(level: number): number {
  switch (level) {
    case 1:
      return 0;
    case 2:
      return 1000;
    case 3:
      return 3000;
    case 4:
      return 6000;
    case 5:
      return 10000;
    case 6:
      return 15000;
    case 7:
      return 21000;
    case 8:
      return 28000;
    case 9:
      return 36000;
    case 10:
      return 45000;
    case 11:
      return 55000;
    case 12:
      return 66000;
    case 13:
      return 78000;
    case 14:
      return 91000;
    case 15:
      return 105000;
    case 16:
      return 120000;
    case 17:
      return 136000;
    case 18:
      return 153000;
    case 19:
      return 171000;
    case 20:
      return 190000;
    default:
      return 0;
  }
}

export function xpToLevel(xp: number): number {
  if (xp >= 190000) {
    return 20;
  }

  if (xp >= 171000) {
    return 19;
  }

  if (xp >= 153000) {
    return 18;
  }

  if (xp >= 136000) {
    return 17;
  }

  if (xp >= 120000) {
    return 16;
  }

  if (xp >= 105000) {
    return 15;
  }

  if (xp >= 91000) {
    return 14;
  }

  if (xp >= 78000) {
    return 13;
  }

  if (xp >= 66000) {
    return 12;
  }

  if (xp >= 55000) {
    return 11;
  }

  if (xp >= 45000) {
    return 10;
  }

  if (xp >= 36000) {
    return 9;
  }

  if (xp >= 28000) {
    return 8;
  }

  if (xp >= 21000) {
    return 7;
  }

  if (xp >= 15000) {
    return 6;
  }

  if (xp >= 10000) {
    return 5;
  }

  if (xp >= 6000) {
    return 4;
  }

  if (xp >= 3000) {
    return 3;
  }

  if (xp >= 1000) {
    return 2;
  }

  return 1;
}
