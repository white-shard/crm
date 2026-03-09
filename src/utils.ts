export function getReadableTextColor(background: string): 'primary' | 'primary-foreground' {
  let r = 0,
    g = 0,
    b = 0;

  if (background.startsWith('#')) {
    let hex = background.slice(1);

    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('');
    }

    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else if (background.startsWith('rgb')) {
    const values = background.match(/\d+/g);
    if (!values) return 'primary';

    [r, g, b] = values.map(Number);
  }

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  return brightness > 186 ? 'primary' : 'primary-foreground';
}
