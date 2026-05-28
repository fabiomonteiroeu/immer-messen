import { factories } from "@strapi/strapi";

export default factories.createCoreRouter("api::cookie-banner.cookie-banner", {
  config: {
    find: {
      auth: false,
    },
    findOne: {
      auth: false,
    },
  },
});
