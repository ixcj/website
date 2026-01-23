const umamiUrl = import.meta.env.VITE_UMAMI_URL
const umamiWebsiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID

export const scriptList = [
  (umamiUrl && umamiWebsiteId)
    ? {
        'defer': true,
        'src': umamiUrl,
        'data-website-id': umamiWebsiteId,
      }
    : undefined,
].filter(val => !!val)
