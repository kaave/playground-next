/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import * as configs from '@utils/configs';

// https://developers.google.com/analytics/devguides/collection/gtagjs/pages
export const pageView = (url: string) =>
  typeof window.gtag === 'function' && window.gtag('config', configs.googleAnalytics, { page_path: url });

// https://developers.google.com/analytics/devguides/collection/gtagjs/events
export const event = ({
  action,
  category,
  value,
  name,
  label,
}: {
  action: string;
  category: string;
  value: any;
  name?: string;
  label?: string;
}) =>
  typeof window.gtag === 'function' &&
  window.gtag('event', action, {
    value,
    event_category: category,
    ...(name ? { name } : {}),
    ...(label ? { event_label: label } : {}),
  });

// https://developers.google.com/analytics/devguides/collection/gtagjs/user-timings
export const timing = (name: string, value: number) =>
  event({ action: 'timing_complete', category: 'Web Vitals', name, value });
