const source = [
  'Googlebot',
  'Bingbot',
  'Slurp',
  'DuckDuckBot',
  'Baiduspider',
  'YandexBot',
  'Exabot',
  'facebot',
  'ia_archiver',
];

export const crawlers = {
  origin: source,
  lower: source.map((s) => s.toLowerCase()),
  upper: source.map((s) => s.toUpperCase()),
};

const isCrawlers = (ua: string) => {
  const lowerUA = ua.toLowerCase();
  return crawlers.lower.some((s) => lowerUA.includes(s));
};

export const crawlerAccess = typeof navigator !== 'undefined' && isCrawlers(navigator.userAgent);
