const TRACKING_PARAMS = [
  'utm_source',
  'utm_medium',
  'utm_campaign',
  'utm_term',
  'utm_content',
  'utm_id',
  'utm_name',
  'utm_reader',
  'utm_referrer',
  'utm_social',
  'utm_social-type',
  'gclid',
  'fbclid',
  'msclkid',
  'dclid',
  'yclid',
  '_hsenc',
  '_hsmi',
  'mc_cid',
  'mc_eid',
];

export const sanitizeUrl = (input: string): string => {
  const url = new URL(input.trim());
  // Only allow HTTP and HTTPS
  if (!['http:', 'https:'].includes(url.protocol)) {
    throw new Error('Only HTTP and HTTPS URLs are allowed.');
  }
  // Lowercase protocol and hostname
  url.protocol = url.protocol.toLowerCase();
  url.hostname = url.hostname.toLowerCase();
  // Remove default ports
  if (
    (url.protocol === 'http:' && url.port === '80') ||
    (url.protocol === 'https:' && url.port === '443')
  ) {
    url.port = '';
  }
  // Remove trailing slash (except root)
  if (url.pathname !== '/') {
    url.pathname = url.pathname.replace(/\/+$/, '');
  }
  // Remove hash fragments
  url.hash = '';
  // Remove common tracking parameters
  for (const param of TRACKING_PARAMS) {
    url.searchParams.delete(param);
  }
  // Sort query parameters for consistent URLs
  const sortedParams = [...url.searchParams.entries()].sort(([a], [b]) =>
    a.localeCompare(b)
  );
  url.search = '';
  for (const [key, value] of sortedParams) {
    url.searchParams.append(key, value);
  }
  return url.toString();
};
